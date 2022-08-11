function sendEmail() {
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "testing47@feedback.com",
        Password: "DB9DEFE7A5D81E6B063A9C99D6DB2313D15A",
        Port:2525,
        To: 'itz.kartik7@gmail.com',
        From: "testing47@feedback.com",
        Subject: "Sending Email using javascript",
        Body: "Well that was easy!!",
    })
        .then(function (message) {
            console.log(message)
            alert("mail sent successfully")
        });
}

// sendEmail()