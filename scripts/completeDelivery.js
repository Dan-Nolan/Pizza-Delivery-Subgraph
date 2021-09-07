async function main() {
  const contract = await ethers.getContractAt("Pizza", "0x7062e3399692d3f6A17e4529191EF6C032014451");
  await contract.completeDelivery(2, 25);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
