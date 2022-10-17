const { ethers } = require("hardhat")
const { ether, assert, expect } = require("chai")

describe("Greeting", function () {
    // before each one of our tests we're going deploy our
    // simple storage
    let greetingFactory, greeting, firstName
    beforeEach(async function () {
        firstName = "alireza"
        greetingFactory = await ethers.getContractFactory("Greeting")
        greeting = await greetingFactory.deploy(firstName)
    })
    it("Should start with our first name", async function () {
        const our_firstName = await greeting.name()
        const expectedName = firstName
        // assert
        // expect
        assert.equal(our_firstName, expectedName)
        expect(our_firstName).to.equal(expectedName)
    })
    it("Should update when we call setName", async function () {
        const expectedName = "saleh"
        const transactionResponse = await greeting.setName(expectedName)
        await transactionResponse.wait(1)
        const currentName = await greeting.name()
        // assert
        // expect
        assert.equal(expectedName, currentName)
        expect(expectedName).to.equal(currentName)
    })
    it("Should say hello to updated name", async function () {
        const expectedName = "saleh"
        const expectedGreeting = "Hello saleh"
        const transactionResponse = await greeting.setName(expectedName)
        await transactionResponse.wait(1)
        await greeting.name()
        const fullGreeting = await greeting.getGreeting()
        // assert
        // expect
        assert.equal(expectedGreeting, fullGreeting)
        expect(expectedGreeting).to.equal(fullGreeting)
    })
})
