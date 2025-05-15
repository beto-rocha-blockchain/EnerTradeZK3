const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const initialSupply = ethers.parseEther("1000000");

  // Deploy EnerZ
  const EnerZ = await ethers.getContractFactory("EnerZ");
  const enerZ = await EnerZ.deploy(initialSupply);
  await enerZ.waitForDeployment();
  console.log("✅ EnerZ deployed to:", await enerZ.getAddress());

  // Deploy Verifier
  const Verifier = await ethers.getContractFactory("Groth16Verifier");
  const verifier = await Verifier.deploy();
  await verifier.waitForDeployment();
  console.log("✅ Verifier deployed to:", await verifier.getAddress());

  // Deploy Exchange, passando os endereços
  const Exchange = await ethers.getContractFactory("Exchange");
  const exchange = await Exchange.deploy(await enerZ.getAddress(), await verifier.getAddress());
  await exchange.waitForDeployment();
  console.log("✅ Exchange deployed to:", await exchange.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
