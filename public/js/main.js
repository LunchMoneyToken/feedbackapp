let walletAddress
let feedBackData = {}
let db
let eligible = false

// Firebase configuration
// Needs
// const firebaseConfig = {
//     apiKey: "AIzaSyDLDvv4up4sqgqY56ywCYmJ0z5A6raTacc",
//     authDomain: "feedback-59934.firebaseapp.com",
//     projectId: "feedback-59934",
//     storageBucket: "feedback-59934.appspot.com",
//     messagingSenderId: "593711442758",
//     appId: "1:593711442758:web:ce3b84e9bbf64ba9ef1347"
// };

const firebaseConfig = {
    apiKey: "AIzaSyBOnpimk6YIKsIUcvccH72qZQS4W1eNmtM",
    authDomain: "feedback-5e5de.firebaseapp.com",
    projectId: "feedback-5e5de",
    storageBucket: "feedback-5e5de.appspot.com",
    messagingSenderId: "880572061052",
    appId: "1:880572061052:web:e76a69f6c040fab2f540f9"
};

function uuid(mask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') {
    return `${mask}`.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function check_if_eligible(createdAt) {
    let currentSeconds = new Date().getTime() / 1000;
    let after24hours = parseInt(createdAt['seconds']) + 86400
    if (after24hours < currentSeconds) {
        // Allow them
        eligible = true
    } else {
        // Needs
        addMarked('wallet_connected')
        addMarked('add_restro')
        addMarked('receive_mail')
        $('#writefeedback').prop('disabled', true);
        eligible = false
    }
}

async function setReward(walletAddress, amt) {
    await db.collection(walletAddress).doc('reward').set({ earned: amt, createdAt: new Date() });
}

async function updateReward(walletAddress) {
    await db.collection(walletAddress)
        .doc('reward')
        .get()
        .then(async (doc) => {
            if (doc.exists) {
                // Updating the reward
                await setReward(walletAddress, parseInt(doc.data().earned) + 1)
            } else {
                // Setting Reward for the first time
                await setReward(walletAddress, 1)
            }
        })
        .catch(function (error) {
            console.log("Error getting document:", error);
        });

}

async function fetchStamp(walletAddress) {
    await db.collection(walletAddress)
        .doc('reward')
        .get()
        .then(async (doc) => {
            if (doc.exists) {
                // Getting the createdAt time
                check_if_eligible(doc.data().createdAt)
            } else {
                eligible = true
            }

        })
        .catch(function (error) {
            console.log("Error getting document:", error);
        });

}

async function push_it(walletAddress, sign) {
    await db.collection(walletAddress).doc(uuid('LMYxxxxxxx')).set(sign);
}

$(document).ready(async () => {

    // Initializing Firebase
    await firebase.initializeApp(firebaseConfig);
    db = firebase.firestore()

})