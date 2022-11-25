let APIKEY = 'LBdTmlr3x5t1TPsMDgaf6lGZdbQ3lgwvNnrEj0B1mBC0nydoALOJFkspR3eCcO4J'
let userBalance, walletAddress, web3;

function setText(src, txt) {
    $('#currentStatus').attr('src', src)
    $('#currentTitle').html(txt)
}

function setUserStatus(earned) {
    // set status based on earning
    if ((earned > 0) && (earned < 200001)) {
        // apprentice
        setText('/wallet/img/apprentice.png', "Apprentice")
    } else if ((earned > 200000) && (earned < 500001)) {
        // journeyman
        setText('/wallet/img/journeyman.png', "Journeyman")
    } else if ((earned > 500000) && (earned < 2000001)) {
        // master
        setText('/wallet/img/master.png', "Master")
    } else if ((earned > 2000000) && (earned < 5000001)) {
        // whale
        setText('/wallet/img/whale.png', "Whale")
    } else if (earned > 5000000) {
        // narwhal
        setText('/wallet/img/narwhal.png', "Narwhal")
    } else {
        setText('/wallet/img/profilepng.png', "Status will be based on<Br/>number of LMY token holdings.")
    }
}

function convertToETH(userBalance) {
    $.ajax({
        url: 'https://deep-index.moralis.io/api/v2/erc20/0x66fD97a78d8854fEc445cd1C80a07896B0b4851f/price?chain=eth',
        method: 'GET',
        headers: { 'accept': 'application/json', 'X-API-Key': APIKEY },
        success: (data) => {
            let oneLMYinETH = web3.utils.fromWei(data['nativePrice']['value'], 'ether')
            $('#ethBalance').html('= ' + userBalance * oneLMYinETH + ' ETH')
        }
    });
}

function fetchUserTokens(address) {
    $.ajax({
        url: 'https://deep-index.moralis.io/api/v2/' + address + '/erc20?chain=eth',
        method: 'GET',
        headers: { 'accept': 'application/json', 'X-API-Key': APIKEY },
        success: (data) => {
            if (data.length != 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i]['symbol'] === 'LMY') {
                        userBalance = (data[i]['balance'] / 1000000000000000000)
                    }
                }
                $('#userBalance').html(userBalance.toFixed(2) + ' LMY')
                setUserStatus(userBalance)
                convertToETH(userBalance)
            } else {
                setUserStatus(0)
            }

        }
    });
}
// fetchUserBal("0x6f1aF2Eeab8BA073D674dbD1D6d2f82996504133")
$(document).ready(() => {
    web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/c0db0b85222f4f5c82dd2bed1fc843f9"));
})
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