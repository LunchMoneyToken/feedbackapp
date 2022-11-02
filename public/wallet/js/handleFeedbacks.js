let db;

// Firebase configuration
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

    walletAddress = location.search.split('=')[1]
    if (walletAddress != '') {
        fetchUserBal(walletAddress)
        await fetchFeedbacks(walletAddress)
    }
})