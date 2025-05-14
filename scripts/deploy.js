const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Se estiver usando ethers v6
  const initialSupply = ethers.parseEther("1000000");

  // Se der erro aqui, tente usar:
  // const initialSupply = ethers.utils.parseEther("1000000");

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
