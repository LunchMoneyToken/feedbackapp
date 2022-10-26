const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

let web3Modal, provider, web3, contract

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

async function receiveLMY() {
    // show the qr somehow
    alert("hari2")
}


async function sendLMY() {
    let amtTokens = parseInt($('#nostokens').val())
    let finalAmt = web3.utils.toWei(amtTokens.toString(), 'ether')
    var value = web3.utils.numberToHex(finalAmt);
    const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
            {
                from: walletAddress,
                to: '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
                value: value,
                gasPrice: '0x09184e72a000',
                gas: '0x2710',
            },
        ],
    })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.error);
}

function check() {
    web3.eth.getAccounts().then(async (tx) => {
        if (tx[0] !== undefined) {
            walletAddress = tx[0]
            $('.walletAddress').val(walletAddress)
            $('#hideConnect').addClass('hide')
            $('#hideBtns').removeClass('hide')
            
            fetchUserBal(walletAddress)
            await fetchFeedbacks(walletAddress)
        }
    });
}

async function connectweb3() {
    try {
        provider = await web3Modal.connect();
        web3 = new Web3(provider);
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

    $('#connectBTN').click(async () => {
        await connectweb3();
    });

    $('.sendLMY').click(async () => {
        $('.sendLMY').off()
        $('#hideBtns').addClass('hide')
        $('#hideCon').removeClass('hide')
        $('.sendLMY').click(async () => {
            await sendLMY();
        })
    })

    $('.receiveLMY').click(async () => {
        $('.receiveLMY').off()
        $('#hideBtns').addClass('hide')
        $('#hideCon2').removeClass('hide')
        $('.receiveLMY').click(async () => {
            navigator.clipboard.writeText(walletAddress);
            alert("Copied to Clipboard !!!");
        })
    })
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