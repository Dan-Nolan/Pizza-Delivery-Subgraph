async function main() {
  const contract = await ethers.getContractAt("Pizza", "0xc42CA295ab4F83CA1097dC9C7F63988c340Ba569");
  await contract.completeDelivery(1, 100);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
