import hre, { ethers } from "hardhat";

async function main() {
  // deploy NemeosMarketplace
  const contract1 = await ethers.deployContract("NemeosMarketplace");
  await contract1.deployed();
  console.log("NemeosMarketplace deployed to:", contract1.address);

  /* // deploy NemeosMarketSettlementManager
  const contract2 = await ethers.deployContract(
    "NemeosMarketSettlementManager",
    new Array(contract1.address)
  );
  await contract2.deployed();
  console.log("NemeosMarketSettlementManager deployed to:", contract2.address);

  // deploy DelegationManager
  const contract3 = await ethers.deployContract(
    "DelegationManager",
    new Array("0x6f10411CB4A5Ff7BCfe61Cf338aaebE7016AB698", contract2.address)
  );
  await contract3.deployed();
  console.log("DelegationManager deployed to:", contract3.address); */
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
