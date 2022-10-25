let APIKEY = 'LBdTmlr3x5t1TPsMDgaf6lGZdbQ3lgwvNnrEj0B1mBC0nydoALOJFkspR3eCcO4J'
let userBalance, walletAddress

function convertToETH(userBalance) {
    $.ajax({
        url: 'https://deep-index.moralis.io/api/v2/erc20/0x66fD97a78d8854fEc445cd1C80a07896B0b4851f/price?chain=eth',
        method: 'GET',
        headers: { 'accept': 'application/json', 'X-API-Key': APIKEY },
        success: (data) => {
            let ethValinWei = data['nativePrice']['value']
            let ethVal = ethValinWei / 1000000000000000000
            $('#ethBalance').html('= ' + userBalance * ethVal + ' ETH')
        }
    });
}

function fetchUserBal(address) {
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
            }

        }
    });
}

$(document).ready(() => {
    walletAddress = location.search.split('=')[1]
    fetchUserBal(walletAddress)
})

// fetchUserBal("0x6f1aF2Eeab8BA073D674dbD1D6d2f82996504133")