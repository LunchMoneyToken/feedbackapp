const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

let web3Modal, provider, web3, contract
var chainId = 1;

// Token Holders
let AKEY = "EK-pPZot-bWrZAqo-bmGfw"
let ETHURL = "https://api.ethplorer.io"
let TokenAddress = "0x66fD97a78d8854fEc445cd1C80a07896B0b4851f"
let ENDPOINT = `/getTopTokenHolders/` + TokenAddress + `?apiKey=` + AKEY + `&limit=100`


// Reward Contract
var t_address = "0xAf8b54D31332046aBa2432fa40e1CEE76C344995"
var t_abi = [{ "inputs": [{ "internalType": "address", "name": "_tokenAddress", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "Rewards", "outputs": [{ "internalType": "uint256", "name": "timestart", "type": "uint256" }, { "internalType": "uint256", "name": "timeEnd", "type": "uint256" }, { "internalType": "uint256", "name": "reward", "type": "uint256" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "bool", "name": "staked", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_add", "type": "address" }], "name": "balance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "time", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tokenAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "unstake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

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

async function stakeFunc() {
    await contract.methods.stake()
        .send({
            from: walletAddress
        }).then(function (res, err) {
            if (res) {
                alert("Staked Successfully !!!")
                location.reload()
            } else {
                alert("Staking failed.")
            }
        });
}

async function unstakeFunc() {
    await contract.methods.unstake()
        .send({
            from: walletAddress
        }).then(function (res, err) {
            if (res) {
                alert("Unstaked Successfully !!!")
                location.reload()
            } else {
                alert("Unstaking failed.")
            }
        });
}

async function fetchBalance() {
    await contract.methods.balance(walletAddress).call().then(async (res, err) => {
        if (res) {
            var bal = (eToNumber(res) / Math.pow(10, 18)).toFixed(2)
            var icon = calculateBaltoIcon(bal)
            $('#staking_balance > span > img').attr('src',icon)
            $('#stakedBalance').html(res + ' LMY')

            $('#staking_balance').show()
        }
    });
}

function check() {
    web3.eth.getAccounts().then(async (tx) => {
        if (tx[0] !== undefined) {
            walletAddress = tx[0]

            web3.eth.net.getId().then(async (netId) => {
                if (netId === chainId) {

                    $('.connectBTN').off();

                    $('#stakeBTN').click(async () => {
                        await stakeFunc()
                    })

                    $('#unstakeBTN').click(async () => {
                        await unstakeFunc()
                    })

                    await fetchBalance();

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

function calculateBaltoIcon(earned) {
    if ((earned > 0) && (earned < 200001)) {
        // apprentice
        return '/wallet/img/apprentice.png'
    } else if ((earned > 200000) && (earned < 500001)) {
        // journeyman
        return '/wallet/img/journeyman.png'
    } else if ((earned > 500000) && (earned < 2000001)) {
        // master
        return '/wallet/img/master.png'
    } else if ((earned > 2000000) && (earned < 5000001)) {
        // whale
        return '/wallet/img/whale.png'
    } else if (earned > 5000000) {
        // narwhal
        return '/wallet/img/narwhal.png'
    } else {
        return '/wallet/img/profilepng.png'
    }
}

function eToNumber(num) {
    let sign = "";
    (num += "").charAt(0) == "-" && (num = num.substring(1), sign = "-");
    let arr = num.split(/[e]/ig);
    if (arr.length < 2) return sign + num;
    let dot = (.1).toLocaleString().substr(1, 1), n = arr[0], exp = +arr[1],
        w = (n = n.replace(/^0+/, '')).replace(dot, ''),
        pos = n.split(dot)[1] ? n.indexOf(dot) + exp : w.length + exp,
        L = pos - w.length, s = "" + BigInt(w);
    w = exp >= 0 ? (L >= 0 ? s + "0".repeat(L) : r()) : (pos <= 0 ? "0" + dot + "0".repeat(Math.abs(pos)) + s : r());
    L = w.split(dot); if (L[0] == 0 && L[1] == 0 || (+w == 0 && +s == 0)) w = 0; //** added 9/10/2021
    return sign + w;
    function r() { return w.replace(new RegExp(`^(.{${pos}})(.)`), `$1${dot}$2`) }
}

function setHoldersONDiv(res) {
    $('#divChange').hide()
    console.log(res)
    for (var i = 0; i < res.length; i++) {
        var bal = (eToNumber(res[i]['balance']) / Math.pow(10, 18)).toFixed(2)
        var icon = calculateBaltoIcon(bal)
        var count = i + 1;
        $('#divChange').append(`<div class="row h-25 my-2 card-container">
        <div class="col-2 numberColumn">
          <span class="leaderBoardSpan">`+ count + `</span>
          <img src=`+ icon + ` alt="" class="my-2 imgHeight" height="40px" width="auto" />
        </div>
    
        <div class="col-6 over">
          <span class="btcAddress" id="overflowed">`+ res[i]['address'] + `</span>
        </div>
        <div class="col-4">
          <span class="spanSize">`+ bal + ` LMY</span>
        </div>
      </div>`)
    }

}

async function fetchAddress() {
    $.ajax({
        url: ETHURL + ENDPOINT,
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            setHoldersONDiv(res['holders'])
        }
    });
}


$(document).ready(async () => {
    init();

    if (web3 === undefined) {

        $('.connectBTN').click(async () => { await connectweb3(); })

    }

    $('#submitForm').click(async (e) => { e.preventDefault(); alert("Please connect wallet.") })

    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    await fetchAddress()

    setTimeout(() => {
        var classes = ['first w', 'w second', 'w third']
        let count = 0;
        $(".card-container").each(function () {
            if (count < 3) {
                $(this).addClass(classes[count])
                count++;
            }
        });
        $('#divChange').fadeIn()
    }, 2000)
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