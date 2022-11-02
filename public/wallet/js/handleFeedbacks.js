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

function setUserStatus(earned){
    // set status based on earning
    if((earned > 0) && (earned < 200001)){
        // apprentice
        $('#currentStatus').attr('src', '/wallet/img/apprentice.png')
        $('#currentTitle').html("Apprentice")
    }else if((earned > 200000) && (earned < 500001)){
        // journeyman
        $('#currentStatus').attr('src', '/wallet/img/journeyman.png')
        $('#currentTitle').html("Journeyman")
    }else if((earned > 500000) && (earned < 2000001)){
        // master
        $('#currentStatus').attr('src', '/wallet/img/master.png')
        $('#currentTitle').html("Master")
    }else if((earned > 2000000) && (earned < 5000001)){
        // whale
        $('#currentStatus').attr('src', '/wallet/img/whale.png')
        $('#currentTitle').html("Whale")
    }else if(earned > 5000000){
        // narwhal
        $('#currentStatus').attr('src', '/wallet/img/narwhal.png')
        $('#currentTitle').html("Narwhal")
    }else{
        $('#currentTitle').html("Give Feedback To Get A Status !!!")
    }
}

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
        } else if(data['earned'] !== 0){
            setUserStatus(data['earned'])
        }
    }
}


$(document).ready(async () => {

    // Initializing Firebase
    await firebase.initializeApp(firebaseConfig);
    db = firebase.firestore()

    walletAddress = location.search.split('=')[1]
    if (walletAddress != '') {
        fetchUserTokens(walletAddress)
        await fetchFeedbacks(walletAddress)
    }
})