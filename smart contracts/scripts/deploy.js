const { ethers } = require("hardhat");

async function main() {
  const [deployer, user1, user2, user3, user4, user5, user6, user7] =
    await ethers.getSigners();

  const Raffle = await ethers.getContractFactory("Raffle");
  const raffle = await Raffle.deploy();
  await raffle.waitForDeployment();
  const raffleContractAddress = raffle.target;

  


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//
