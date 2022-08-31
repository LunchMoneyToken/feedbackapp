const sendMail = (feedBackData) => {
    emailjs.send("service_zergj1h", 'template_oavehte', feedBackData, 'mczNUKgXiFaj8nhbj')
        .then(function (response) {
            addMarked('receive_mail')
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });
};