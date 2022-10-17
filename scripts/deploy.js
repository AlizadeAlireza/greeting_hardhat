// imports
const { ethers, run, network } = require("hardhat")

// async
async function main() {
    // initialize
    const GreetingFactory = await ethers.getContractFactory("Greeting")
    console.log("deploying contract...")
    const firstName = "alireza"
    const greeting = await GreetingFactory.deploy(firstName)
    await greeting.deployed()
    console.log(`Deployed contract to : ${greeting.address}`)

    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block txes...")
        await greeting.deployTransaction.wait(6)

        await verify(greeting.address, [firstName])
    }

    // interacting with the contract
    const firstNameToInitialize = await greeting.name()
    console.log(
        `this is the first name witch initialized: ${firstNameToInitialize}`
    )

    // set new name and update
    const setName = await greeting.setName("saleh")
    await setName.wait(1)
    const updatedName = await greeting.name()
    const completeGreeting = await greeting.getGreeting()
    console.log(`this is the new name: ${updatedName}`)
    console.log(`the complete greeting for the new name: ${completeGreeting}`)
}

// verify function
// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verifyed!")
        } else {
            console.log(e)
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
