const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

let web3Modal, provider, web3, contract
var chainId = 1;

var t_address = "0x66fD97a78d8854fEc445cd1C80a07896B0b4851f"
var t_abi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "initialSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "burn", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_subtractedValue", "type": "uint256" }], "name": "decreaseApproval", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_addedValue", "type": "uint256" }], "name": "increaseApproval", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "burner", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }]

function truncateString(str, length) {
    return str.length > length ? str.substring(0, length - 1) + '...' : str
}

function init() {

    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: "c0db0b85222f4f5c82dd2bed1fc843f9",
            }
        }
    };

    web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
    });

}

async function claim() {
    // var final_wei_Val = (final_cost * Math.pow(10, 18)).toFixedSpecial(0)
    await contract.methods.mint(String(mint_count))
        .send({
            from: user_address,
            value: final_wei_Val
        }).then(function (res, err) {
            if (res) {
                alert("MINTED SUCCESSFULLY!")
            } else {
                alert("MINTING FAILED!")
            }
        });

}

async function switch_network(chainId) {
    await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(chainId) }]
    });
}

function addMarked(idName) {
    $('#' + idName).addClass('dotMarked');
}

function check() {
    web3.eth.getAccounts().then(async (tx) => {
        if (tx[0] !== undefined) {
            walletAddress = tx[0]

            alert("Wallet connected !!!")

            await fetchStamp(walletAddress)

            addMarked('wallet_connected')

            web3.eth.net.getId().then(async (netId) => {
                if (netId === chainId) {
                    $('#connect_btn').html('Connected : ' + truncateString(String(walletAddress), 10));

                    // Setting the event to update 
                    $('#submitForm').html("Submit")
                    $('#submitForm').unbind('click');

                    $('#submitForm').click(async (e) => {
                        e.preventDefault();
                        if (eligible === true) {
                            $('#submitForm').prop('disabled', true);

                            feedBackData['restroName'] = $('#restroName').val()
                            feedBackData['restroNum'] = $('#restroNum').val()
                            feedBackData['attendDate'] = $('#attendDate').val()
                            feedBackData['attendTime'] = $('#attendTime').val()
                            feedBackData['feedbackText'] = $('#feedbackText').val()
                            feedBackData['emailAddress'] = $('#emailAddress').val()
                            feedBackData['starsCount'] = $('#starsCount').text()
                            alert("Give us a moment we are working on your feedback !!!")
                            $('#feedbackForm')[0].reset()

                            await push_it(walletAddress, feedBackData)
                            await updateReward(walletAddress)
                            sendMail(feedBackData)

                            // Closing up
                            alert("Thanks for your feedback !!!")
                            location.reload()
                            
                            
                        } else {
                            alert("You can give only 1 feedback in one day. Please try again tomorrow !!!")
                        }
                    })

                } else {
                    switch (chainId) {
                        case 1:
                            alert("Connect to ETH mainnet");
                            break;
                        case 4:
                            alert("Connect to Rinkeby");
                            break;
                    }

                    await switch_network(chainId)

                }
            });
        }
    });
}

async function connectweb3() {
    try {
        provider = await web3Modal.connect();
        web3 = new Web3(provider);
        contract = new web3.eth.Contract(t_abi, t_address);
        check()
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

    provider.on("accountsChanged", (accounts) => {
        location.reload();
    });

    provider.on("chainChanged", (chainId) => {
        location.reload();
    });

    provider.on("networkChanged", (networkId) => {
        location.reload();
    });

}


$(document).ready(() => {
    init();
    $('#connect_btn').click(async () => { await connectweb3(); })

    $('#submitForm').click(async (e) => { e.preventDefault(); alert("Connect Wallet in order to continue !!!") })

    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
});


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