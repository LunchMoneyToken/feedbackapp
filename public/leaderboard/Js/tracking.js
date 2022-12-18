//RESET INSTRUCTIONS:
//Put 0 to last_block_number.json and then run to filter the blocks from begining of the contract

let w3, CONTRACT, DICT = {};
// Switch Mainnet/Testnet
let TESTURL = "https://eth-goerli.g.alchemy.com/v2/surwT5Ql_QhEc083ru_C98XrwbDj-jVx"
let CONTRACT_ADDRESS = "0x60F2CE0a06E1974a1378322B948567673f6eBF89";
let CONTRACT_ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "initialSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "burn", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_subtractedValue", "type": "uint256" }], "name": "decreaseApproval", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_addedValue", "type": "uint256" }], "name": "increaseApproval", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "burner", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }]

// Initializing web3
w3 = new Web3(new Web3.providers.HttpProvider(TESTURL))
// Initializing Contract
CONTRACT = new w3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

function fill_Dict(ev) {
    if (DICT[ev.returnValues.to] !== undefined) {
        DICT[ev.returnValues.to] = (parseFloat(DICT[ev.returnValues.to]) + parseFloat(ev.returnValues.value)).toFixedSpecial(0)
    } else {
        DICT[ev.returnValues.to] = parseFloat(ev.returnValues.value).toFixedSpecial(0)
    }
}

function sortObj(obj) {
    // Sort object as list based on values
    return Object.keys(obj).map(k => ([k, obj[k]])).sort((a, b) => (b[1] - a[1]))
}

async function finalWorks() {
    let finalLST = []

    // Filling the sorted wallet address to a final list
    for (var i = 0; i < 100; i++) {
        if (DICT[i]) {
            finalLST.push(DICT[i][0])
        } else {
            break
        }
    }

    return finalLST
}

async function fetch_my_events(CONTRACT) {

    let ev = null
    let error = null

    try {
        await CONTRACT.getPastEvents('Transfer', {
            fromBlock: 0,
            toBlock: 'latest'
        }, function (errors, events) {
            ev = events;
        })
    } catch (e) {
        error = e
        console.log("Something went wrong" + e)
    }

    if (error == null) {

        // Checking event if its not 0 then update the LAST BLOCK NUMBER
        for (var i = 1; i < ev.length; i++) {

            // Filling up the dict with wallet address and nos of tokens  
            fill_Dict(ev[i])

        }

        // Sorting all and filtering 25 our
        DICT = sortObj(DICT)

        return await finalWorks(DICT)

    } else {
        console.log("Something went wrong")
        return {}
    }

}

// Run THIS
async function fetchAddress() {
    return await fetch_my_events(CONTRACT, 0).then(async (final) => {
        return final
    })
}

Number.prototype.toFixedSpecial = function (n) {
    var str = this.toFixed(n);
    if (str.indexOf("e+") === -1) return str;

    str = str
        .replace(".", "")
        .split("e+")
        .reduce(function (p, b) {
            return p + Array(b - p.length + 2).join(0);
        });

    if (n > 0) str += "." + Array(n + 1).join(0);

    return str;
};