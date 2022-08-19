export default function FeedbackForm() {
    return (
        <>
            <form id="feedbackForm">
                <div className="row">
                    <div className="col-md-3">
                        <label className="form-input">Restaurant number:</label>
                        <input id="restroNum" required name="restroNum" type="number" className="form-control" placeholder="ex:987321" />

                        <br />

                        <label className="form-input">Date:</label>
                        <input id="attendDate" required name="attendDate" type="date" className="form-control" placeholder="01-01-2022" />

                        <br />

                        <label className="form-input">Time:</label>
                        <input id="attendTime" required name="attendTime" type="time" className="form-control" placeholder="01-01-2022" />
                    </div>
                    <div className="col-md-8 rmp" style={{ paddingLeft: 40 + 'px' }}>
                        <label>Feedback:</label>
                        <small className="smText">How was your customer experience? ( 50 characters maximum )</small>
                        <textarea id="feedbackText" required name="feedbackText" placeholder="I love it :)" maxLength="50" className="form-control" rows="2"></textarea>

                        <br />
                        <label className="form-input">Email Address:</label>
                        <br />
                        <input id="emailAddress" required name="emailAddress" className="form-control" placeholder="email@example.com" />
                    </div>
                    <div className="mx-auto text-center" style={{marginTop: 30+'px'}}>
                        <button id="submitForm" className="text-center mx-auto btn btn-sm">Submit</button>
                    </div>
                </div>

            </form >
        </>
    )
}   