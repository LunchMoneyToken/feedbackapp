let feedBackData = {}
let db;

// Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDLDvv4up4sqgqY56ywCYmJ0z5A6raTacc",
//     authDomain: "feedback-59934.firebaseapp.com",
//     projectId: "feedback-59934",
//     storageBucket: "feedback-59934.appspot.com",
//     messagingSenderId: "593711442758",
//     appId: "1:593711442758:web:ce3b84e9bbf64ba9ef1347"
// };

// Clients
// Need
const firebaseConfig = {
    apiKey: "AIzaSyBOnpimk6YIKsIUcvccH72qZQS4W1eNmtM",
    authDomain: "feedback-5e5de.firebaseapp.com",
    projectId: "feedback-5e5de",
    storageBucket: "feedback-5e5de.appspot.com",
    messagingSenderId: "880572061052",
    appId: "1:880572061052:web:e76a69f6c040fab2f540f9"
};

async function fetchFeedbacks(walletAddress) {
    let dbRef = db.collection(walletAddress);
    let allFeedbacks = await dbRef.get();
    for (const doc of allFeedbacks.docs) {
        data = doc.data()
        // Populate the div
        console.log(data)
        if (data['attendDate'] !== undefined) {
            $('#feedbackDiv').append(`
                <tr>
                <td>`+ data["attendDate"] + `</td>
                <td>`+ data["restroName"] + `</td>
                <td>`+ data["starsCount"] + `</td>
                <td><span>`+ data['feedbackText'] + `</span></td>
                <td><img src="wallet/feedbackImages/small logo.png" alt="" />1 LMY</td>
            </tr>`)
        }
    }
}

$(document).ready(async () => {

    // Initializing Firebase
    await firebase.initializeApp(firebaseConfig);
    db = firebase.firestore()
    await fetchFeedbacks(walletAddress)

})