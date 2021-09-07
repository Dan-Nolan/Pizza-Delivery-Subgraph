async function main() {
  const contract = await ethers.getContractAt("Pizza", "0x7062e3399692d3f6A17e4529191EF6C032014451");
  const time = 60 * 25;
  const now = Math.floor(Date.now() / 1000);
  await contract.takeOnDelivery(2, now + time);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
