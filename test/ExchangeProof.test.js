const { expect } = require("chai");
const { ethers } = require("hardhat");
const snarkjs = require("snarkjs");
const fs = require("fs");

function unstringifyBigInts(o) {
  if (typeof o === "string" && /^[0-9]+$/.test(o)) {
    return BigInt(o);
  } else if (Array.isArray(o)) {
    return o.map(unstringifyBigInts);
  } else if (typeof o === "object" && o !== null) {
    const res = {};
    for (let k in o) {
      res[k] = unstringifyBigInts(o[k]);
    }
    return res;
  }
  return o;
}

async function gerarProvaValida() {
  let input = JSON.parse(fs.readFileSync("circuits/input.json"));
  input = unstringifyBigInts(input);

  await snarkjs.wtns.calculate(
    input,
    "circuits/balance_check_js/balance_check.wasm",
    "circuits/witness.wtns"
  );

  const { proof, publicSignals } = await snarkjs.groth16.prove(
    "circuits/balance_check_final.zkey",
    "circuits/witness.wtns"
  );

  const callData = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);
  const argv = callData
    .replace(/["[\]\s]/g, "")
    .split(",")
    .map((x) => BigInt(x));

  const a = [argv[0], argv[1]];
  const b = [
    [argv[2], argv[3]],
    [argv[4], argv[5]],
  ];
  const c = [argv[6], argv[7]];
  const inputSignal = [argv[8]];

  return { a, b, c, inputSignal };
}

describe("Exchange - Verificação de provas", function () {
  let exchange;

  before(async function () {
    const Verifier = await ethers.getContractFactory("Groth16Verifier");
    const verifier = await Verifier.deploy();
    await verifier.waitForDeployment();
  
    const EnerZ = await ethers.getContractFactory("EnerZ");
    const token = await EnerZ.deploy(ethers.parseEther("1000")); // ✅ 1000 tokens para testes
    await token.waitForDeployment();

  
    const Exchange = await ethers.getContractFactory("Exchange");
    exchange = await Exchange.deploy(await token.getAddress(), await verifier.getAddress());
    await exchange.waitForDeployment();
  });
  

  it("Deve aceitar uma prova válida", async function () {
    const { a, b, c, inputSignal } = await gerarProvaValida();
    const resultado = await exchange.verifyBalanceProof(a, b, c, inputSignal);
    expect(resultado).to.equal(true);
  });

  it("Deve rejeitar uma prova inválida", async function () {
    const { a, b, c, inputSignal } = await gerarProvaValida();
    inputSignal[0] += 1n; // corrompe a prova

    const resultado = await exchange.verifyBalanceProof(a, b, c, inputSignal);
    expect(resultado).to.equal(false);
  });
});
