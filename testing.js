const { providers, Contract } = require("ethers");

const testingABI = require("./abi.json")

const testingAddress = "0xba72b008D53D3E65f6641e1D63376Be2F9C1aD05"

const socketProvider = new providers.WebSocketProvider("wss://mainnet.infura.io/ws/v3/ba292433385a46808635f242c994220d");
const testingContract = new Contract(testingAddress, testingABI, socketProvider);
const provider = new providers.JsonRpcProvider("https://mainnet.infura.io/v3/ba292433385a46808635f242c994220d");
const contract = new Contract(testingAddress, testingABI, provider);

console.log("listening for transfer events");
testingContract.on("Transfer", async (from, to, value, event) => {
    console.log(from, to, value);
});

(async () => {
    try {
        let block = await provider.getBlockNumber()
        console.log(block);
        let events = await contract.queryFilter("Transfer", block - 1000000, block)
        console.log(events);
    } catch (error) {
        console.log(error);
    }
})()