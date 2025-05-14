const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const initialSupply = ethers.parseEther("1000000"); // Para ethers v6
  // Se estiver usando ethers v5, use: ethers.utils.parseEther("1000000");

  const EnerZ = await ethers.getContractFactory("EnerZ");
  const enerZ = await EnerZ.deploy(initialSupply);

  console.log("EnerZ deployed to:", enerZ.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
