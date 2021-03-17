async function main() {
  const contract = await ethers.getContractAt("Pizza", "0xc42CA295ab4F83CA1097dC9C7F63988c340Ba569");
  const tenMinutes = 60 * 10;
  const now = Math.floor(Date.now() / 1000);
  await contract.takeOnDelivery(1, now + tenMinutes);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
