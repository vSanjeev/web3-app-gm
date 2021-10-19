
const main = async () => {
    const gmContractFactory = await hre.ethers.getContractFactory('GmPortal');
    const gmContract = await gmContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'),
    });
    await gmContract.deployed();

    console.log("Contract deployed at: ", gmContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(
        gmContract.address
      );
      console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
      );

    // let gmCount;
    // gmCount = await gmContract.getTotalGms();
    // console.log(gmCount.toNumber());

    let gmTxn = await gmContract.gm("gm!");
    await gmTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(gmContract.address);
    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
    );

    const [_, randomPerson] = await ethers.getSigners();

    gmTxn = await gmContract.connect(randomPerson).gm("gm! -rando here");
    await gmTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(gmContract.address);
    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
    );

    // gmTxn = await gmContract.connect(randomPerson).gm("gm! -rando here");
    // await gmTxn.wait();

    // contractBalance = await hre.ethers.provider.getBalance(gmContract.address);
    // console.log(
    //     'Contract balance:',
    //     hre.ethers.utils.formatEther(contractBalance)
    // );

    let allGms = await gmContract.getAllGms();
    console.log(allGms);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

runMain();