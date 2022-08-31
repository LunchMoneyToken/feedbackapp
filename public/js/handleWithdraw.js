let redeemData = {}
let withdrawn

async function withdraw() {
    userBalance = userBalance-10
    await db.collection(walletAddress).doc('reward').update({ earned: userBalance }).then(async () => {
        withdrawn = true        
        setBalance(userBalance)
    }).catch((e) => {
        alert("Something went wrong on our side !!!")
    });
}

async function mainVerifications() {
    // cut the 10$ from firebase
    await withdraw()
    if (withdrawn == true) {
        //run the _HASH_ func
        await contract.methods.hash().send({ from: walletAddress }).then(async (res, err) => {
            if (res) {
                // viewCode func
                await contract.methods.viewCode(walletAddress).call().then(async (res, err) => {
                    if (res) {
                        redeemData['redeemcode'] = res
                        // sendMail to the client
                        emailjs.send("service_zergj1h", 'template_7nf9wa5', redeemData, 'mczNUKgXiFaj8nhbj').then(function () {
                            addMarked('received_reward')
                            $('#overlay').hide()
                            $('#Popup2').hide()
                            alert('YOU HAVE SUCCESSFULLY WITHDRAWN $10 REDEEM CODE !!!');
                        }, function (error) {
                            alert("Unable to send email at the moment here is your redeem code: " + res)
                        });
                    } else {
                        alert("Unable to get the redeem Code !!!")
                    }
                })
            } else {
                alert("Hash Function Not Working !!!")
            }
        });
    }

}

$(document).ready(async () => {
    $('#withdrawBtn').click(async () => {
        $('#withdrawBtn').prop("disabled", true)
        if (userBalance > 9) {
            let mailtemp = $('#emailAddress2').val()
            if (mailtemp !== null) {
                redeemData['emailAddress'] = mailtemp
                await mainVerifications()
            } else {
                $('#withdrawBtn').prop("disabled", false)
                alert("Enter your email in order to proceed !!!")
            }
        } else {
            $('#withdrawBtn').prop("disabled", false)
            alert("You must have more than $10 in order to use this !!!")
        }
    });

    $('#claimBtn').click(async () => {
        $('#claimBtn').prop("disabled", true)
        let redeemCode = $('#redeemCode').val()
        if (redeemCode !== '') {
            await db.collection("password").doc('pass').get().then(async (doc) => {
                if (doc.exists) {
                    $('#claimWarn').html("Wait for the transaction to complete !!!")
                    // run the getrewards func
                    await contract.methods.getreward(redeemCode, doc.data().password)
                        .send({
                            from: walletAddress
                        }).then(function (res, err) {
                            if (res) {
                                alert("TOKENS CLAIMED SUCCESSFULLY!!!")
                                location.reload()
                            } else {
                                alert("CLAIMED FAILED!!!")
                            }
                        });
                }
            }).catch(function (error) {
                $('#claimBtn').prop("disabled", false)
                console.log("Error getting document:", error);
            });
        } else {
            $('#claimBtn').prop("disabled", false)
            alert("Enter a valid redeem code to claim !!!")
        }
    })

});