const fs = require("fs"); 
const { ethers } = require("hardhat");
const snarkjs = require("snarkjs");

// Função para converter strings grandes em BigInt, pois snarkjs.utils.unstringifyBigInts pode não existir
function unstringifyBigInts(o) {
  if ((typeof(o) == "string") && (/^[0-9]+$/.test(o)))  {
    return BigInt(o);
  } else if (Array.isArray(o)) {
    return o.map(unstringifyBigInts);
  } else if (typeof o == "object" && o !== null) {
    const res = {};
    for (let k in o) {
      res[k] = unstringifyBigInts(o[k]);
    }
    return res;
  } else {
    return o;
  }
}

async function main() {
  console.log("⏳ Gerando prova com snarkjs...");

  // 1. Gera o witness
  let input = JSON.parse(fs.readFileSync("circuits/input.json"));
  input = unstringifyBigInts(input);

  await snarkjs.wtns.calculate(
    input,
    "circuits/balance_check_js/balance_check.wasm", // <-- caminho correto
    "circuits/witness.wtns"
  );  

  // 2. Gera a prova
  const { proof, publicSignals } = await snarkjs.groth16.prove(
    "circuits/balance_check_final.zkey",
    "circuits/witness.wtns"
  );

  const callData = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);
  const argv = callData
    .replace(/["[\]\s]/g, "")
    .split(",")
    .map((x) => BigInt(x));

  // Estrutura esperada pelo contrato
  const a = [argv[0], argv[1]];
  const b = [
    [argv[2], argv[3]],
    [argv[4], argv[5]],
  ];
  const c = [argv[6], argv[7]];
  const inputSignal = [argv[8]];

  console.log("✅ Prova gerada com sucesso!");

  // 3. Conecta no contrato
  const [deployer] = await ethers.getSigners();
  // Endereço do contrato Exchange após o deploy
  const exchangeAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const exchange = await ethers.getContractAt("Exchange", exchangeAddress, deployer);


  console.log("🔍 Verificando a prova on-chain...");

  const result = await exchange.verifyBalanceProof(a, b, c, inputSignal);
  console.log("✅ Resultado da verificação:", result);
}

main().catch((error) => {
  console.error("Erro:", error);
  process.exit(1);
});
