const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

let web3Modal, provider, web3, contract
var chainId = 3;

var t_address = "0xb8778CE2D56c3B19169A4ed272FDC0928Cd6468C"
var t_abi = [{ "inputs": [{ "internalType": "string", "name": "_password", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "changeRewardAmount", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_newpassword", "type": "string" }], "name": "changepassword", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "value", "type": "string" }, { "internalType": "string", "name": "_password", "type": "string" }], "name": "getreward", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "hash", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "viewCode", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }]

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

async function switch_network(chainId) {
    await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(chainId) }]
    });
}

function addMarked(idName) {
    $('#' + idName).addClass('dotMarked');
}

async function submitForm() {
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
            alert("Your feedback is processing.")
            $('#feedbackForm')[0].reset()

            await push_it(walletAddress, feedBackData)
            await updateReward(walletAddress)
            sendMail(feedBackData)

            // Closing up
            alert("Your feedback is complete.")
            location.reload()


        } else {
            alert("You can give only 1 feedback in one day. Please try again tomorrow !!!")
        }
    })
}

async function beginWorks() {
    
    // Fetch balance and show
    await updateReward(walletAddress, true)

    // Checking the alst feedback time and making him eligible to give another or not
    await fetchStamp(walletAddress)

    // Putting green dot if the wallet is connected
    addMarked('wallet_connected')

    $('#connect_btn').html('Connected : ' + truncateString(String(walletAddress), 10));

    // Updating current block
    await getprevBlockNum()

    // Fetching the users token lists
    await fetchTokenList(walletAddress)


    // Updating the div and DB onClick of the rewards tab ADD button
    $('#submittokenAddress').click(async () => {
        let tokenAddress = $('#tokenAddress').val()
        if ((tokenAddress !== '') && (tokenAddress.length > 35)) {
            await updateTokenList(walletAddress, tokenAddress)
            $('#tokenAddress').val('')
        } else {
            alert("Enter valid token address !!!")
        }
    })

    // Submitting Feedback
    await submitForm()
}

function check() {
    web3.eth.getAccounts().then(async (tx) => {
        if (tx[0] !== undefined) {
            walletAddress = tx[0]

            web3.eth.net.getId().then(async (netId) => {
                if (netId === chainId) {

                    await beginWorks()

                } else {

                    await switch_network(chainId)

                    switch (chainId) {
                        case 1:
                            alert("Connect to ETH mainnet");
                            break;
                        case 4:
                            alert("Connect to Rinkeby");
                            break;
                    }

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


$(document).ready(async () => {
    init();

    // Needs
    // await connectweb3();

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