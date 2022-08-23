let defaulttokenList = '&addresses=0x4Fabb145d64652a948d72533023f6E7A623C7C53&addresses=0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE&addresses=0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599&addresses=0x514910771AF9Ca656af840dff83E8264EcF986CA&addresses=0xdAC17F958D2ee523a2206206994597C13D831ec7&addresses=0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984&addresses=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&addresses=0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0&addresses=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
let usersTokenList
let APIKEY = 'LBdTmlr3x5t1TPsMDgaf6lGZdbQ3lgwvNnrEj0B1mBC0nydoALOJFkspR3eCcO4J'
let blockNum

async function addtoDiv(logo, name, price, type) {
    $('#tokens').prepend(
        `
        <div class="row" style='margin-bottom: 10px'>
            <div class="col-2 text-center mx-auto">
                <img class="tokenImg" src=`+ logo + ` />
            </div>
            <div class="col-4 text-center mx-auto">
                <h6 class="tokenName pt-3">`+ name + `</h6>
            </div>
            <div class="col-2 text-right ml-auto">
                <h6 className="tokenBal pt-3">`+type+`</h6>
            </div>
            <div class="col-4 text-right ml-auto">
                <h6 className="tokenBal pt-3">`+price+`</h6>
            </div>
        </div>
        `
    )
}

async function fetchTokenbal(logo, name, tokenAdd, blockNum, again, price) {
    let oldPrice = price
    $.ajax({
        url: 'https://deep-index.moralis.io/api/v2/erc20/' + tokenAdd + '/price?chain=eth&to_block=' + blockNum,
        method: 'GET',
        headers: { 'accept': 'application/json', 'X-API-Key': APIKEY },
        success: async (e) => {
            let newprice = Number(e['usdPrice'])
            if (again !== true) {
                setTimeout(async () => {
                    await fetchTokenbal(logo, name, tokenAdd, blockNum + 1, true, newprice)
                }, 2000)
            } else {
                console.log(oldPrice, newprice)
                if (oldPrice > newprice) {
                    type = '<i class="fa fa-caret-down"></i>'
                } else {
                    type = '<i class="fa fa-caret-up"></i>'
                }
                await addtoDiv(logo, name, newprice.toFixed(2), type)
            }
        },
        error: (e) => {
            console.log(e)
        }
    })
}

async function getprevBlockNum() {
    let today = new Date();
    $.ajax({
        url: 'https://deep-index.moralis.io/api/v2/dateToBlock?chain=eth&date=' + today,
        method: 'GET',
        headers: { 'accept': 'application/json', 'X-API-Key': APIKEY },
        success: (data) => {
            blockNum = data.block - 100
        }
    });
}

async function updateTokens(tokens) {
    $.ajax({
        url: 'https://deep-index.moralis.io/api/v2/erc20/metadata?chain=eth' + tokens,
        method: 'GET',
        headers: { 'accept': 'application/json', 'X-API-Key': APIKEY },
        success: async (data) => {
            j = data.length-1
            c = 0
            let dataInt = setInterval(async () => {
                if (c > j) {
                    clearInterval(dataInt)
                } else {
                    await fetchTokenbal(data[c]['thumbnail'], data[c]['name'], data[c]['address'], blockNum, false, 0)
                    c = c+1
                }
            }, 1000)
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
            } else {
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

