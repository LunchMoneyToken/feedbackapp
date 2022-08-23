let defaulttokenList = '&addresses=0x4Fabb145d64652a948d72533023f6E7A623C7C53&addresses=0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE&addresses=0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599&addresses=0x514910771AF9Ca656af840dff83E8264EcF986CA&addresses=0xdAC17F958D2ee523a2206206994597C13D831ec7&addresses=0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984&addresses=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&addresses=0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0&addresses=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
let usersTokenList
let APIKEY = 'LBdTmlr3x5t1TPsMDgaf6lGZdbQ3lgwvNnrEj0B1mBC0nydoALOJFkspR3eCcO4J'

async function fetchTokenbal(logo, name, tokenAdd) {
    $.ajax({
        url: 'https://deep-index.moralis.io/api/v2/erc20/' + tokenAdd + '/price?chain=eth',
        metehod: 'GET',
        headers: { 'accept': 'application/json', 'X-API-Key': APIKEY },
        success: (e) => {
            $('#tokens').prepend(
                `
                <div class="row" style='margin-bottom: 10px'>
                    <div class="col-2 text-center mx-auto">
                        <img class="tokenImg" src=`+ logo + ` />
                    </div>
                    <div class="col-6 text-center mx-auto">
                        <h6 class="tokenName pt-3">`+ name + `</h6>
                    </div>
                    <div class="col-4 text-right ml-auto">
                        <h6 class="tokenBal pt-3">`+ Number(e['usdPrice']).toFixed(3) + `</h6>
                    </div>
                </div>
                `
            )
        },
        error: (e) => {
            console.log(e)
        }
    })
}

async function updateTokens(tokens) {
    $.ajax({
        url: 'https://deep-index.moralis.io/api/v2/erc20/metadata?chain=eth' + tokens,
        method: 'GET',
        headers: { 'accept': 'application/json', 'X-API-Key': APIKEY },
        success: async (data) => {
            console.log(data)
            for (var j = 0; j < data.length; j++) {
                await fetchTokenbal(data[j]['thumbnail'], data[j]['name'], data[j]['address'])
            }
        }
    });
}

async function fetchTokenList(walletAddress) {
    await db.collection(walletAddress)
        .doc('tokenList')
        .get()
        .then(async (doc) => {
            if (doc.exists) {
                usersTokenList = doc.data().tokenAddresses
                if (usersTokenList !== undefined) {
                    updateTokens(usersTokenList + defaulttokenList)
                } else {
                    updateTokens(defaulttokenList)
                }
            }else{
                updateTokens(defaulttokenList)
            }
        })
        .catch(function (error) {
            console.log("Error getting document:", error);
        });
}

async function updateTokenList(walletAddress, tokenAddress) {
    let tokenList
    if (usersTokenList !== undefined) {
        tokenList = '&addresses=' + tokenAddress + usersTokenList
    } else {
        tokenList = '&addresses=' + tokenAddress
    }
    await db.collection(walletAddress).doc('tokenList').set({ tokenAddresses: tokenList });
    updateTokens('&addresses=' + tokenAddress)
}

