let APIKEY = 'LBdTmlr3x5t1TPsMDgaf6lGZdbQ3lgwvNnrEj0B1mBC0nydoALOJFkspR3eCcO4J'
let userBalance, walletAddress

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
            let ethValinWei = data['nativePrice']['value']
            let ethVal = ethValinWei / 1000000000000000000
            setUserStatus(ethVal)
            $('#ethBalance').html('= ' + userBalance * ethVal + ' ETH')
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
                convertToETH(userBalance)
            } else {
                setUserStatus(0)
            }

        }
    });
}
// fetchUserBal("0x6f1aF2Eeab8BA073D674dbD1D6d2f82996504133")