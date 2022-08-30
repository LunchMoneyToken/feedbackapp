let redeemData = {}

function alertError() {
    alert("Something went wrong in our side, Please contact admin if your money deducted !!!")
}

async function hashFunc() {
    await contract.methods.hash()
        .send({
            from: walletAddress
        }).then(function (res, err) {
            if (res) {
                return true
            } else {
                alertError()
            }
        });
}

async function withdrawnRequest() {
    await db.collection(walletAddress)
        .doc('reward')
        .get()
        .then(async (doc) => {
            // Updating the reward
            await setReward(walletAddress, parseInt(doc.data().earned) - 10)
        })
        .catch(function (error) {
            return false
        });
}

async function getRedeemCode(walletAddress) {
    await contract.methods.viewCode(walletAddress)
        .call().then(function (res, err) {
            if (res) {
                redeemData['redeemcode'] = res
                console.log(res)
                return true
            } else {
                return false
            }
        });
}


$(document).ready(async () => {


    $('#withdrawBtn').click(async () => {
        if (userBalance > 9) {
            let mailtemp = $('#emailAddress2').val()
            if (mailtemp !== null) {
                redeemData['emailAddress'] = mailtemp
                //run the _HASH_ func
                await hashFunc().then((e) => {
                    console.log(e)
                    // cut the 10$ from firebase
                    // await withdrawnRequest().then(() => {
                    //     // run the _getCode_ func
                    //     await getRedeemCode().then(() => {
                    //         // sendMail to the client
                    //         await sendRedeemMail().then(() => {
                    //             // *hide progress bar and alert client that _Withdraw Successful_*
                    //         })
                    //     })
                    // });
                })
            } else {
                alert("Enter your email in order to proceed !!!")
            }
        } else {
            alert("You must have more than $10 in order to use this !!!")
        }
    })
});

async function getKey() {
    await db.collection("password")
        .doc('pass')
        .get()
        .then(async (doc) => {
            if (doc.exists) {
                let key = doc.data().password
                console.log(key)
                return key
            }
        })
        .catch(function (error) {
            console.log("Error getting document:", error);
            return null
        });
}

$('#claimBtn').click(async () => {
    let redeemCode = $('#redeemCode').val()
    const keyCode = await getKey()

    //run the getrewards func
    await contract.methods.getreward(redeemCode, keyCode())
        .send({
            from: user_address,
            value: final_wei_Val
        }).then(function (res, err) {
            if (res) {
                alert("CLAIMED SUCCESSFULLY!")
            } else {
                alert("CLAIMED FAILED!")
            }
        });
})