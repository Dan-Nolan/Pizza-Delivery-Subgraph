async function main() {
  const Pizza = await hre.ethers.getContractFactory("Pizza");
  const pizza = await Pizza.deploy();

  await pizza.deployed();

  console.log("Pizza deployed to:", pizza.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
