export default function FeedbackForm() {
    return (
        <div className="container">
            <div className="row">
                <div id="tokens" className="col-md-7 text-center mx-auto" style={{ height: 200 + 'px', overflowX: 'hidden', padding: '0px 20px 20px 20px' }}>
                </div>
                <div className="col-md-5">
                    <div id="token_listCon" style={{ background: 'white', color: 'black', borderRadius: 10 + 'px', padding: 20 + 'px', marginTop: 15 + 'px' }}>
                        <h1 style={{ fontSize: 1.5 + 'rem' }}>Add Tokens</h1>
                        {/* <br />
                        <div className="row" style={{ padding: '0px 10px 0px 10px' }}>
                            <div className="col-2 text-center mx-auto p-0">
                                <img id="tokenImg" src="/assets/logo.png" />
                            </div>
                            <div className="col-7 text-center mx-auto" style={{ paddingTop: 3 + '%' }}>
                                <h5 style={{ fontSize: 0.8 + 'rem' }}>Lunch Money ( LMY )<br />
                                    <h6 style={{ fontSize: 0.7 + 'rem' }}>lunchmoney.io</h6>
                                </h5>
                            </div>
                            <div className="col-3 text-center mx-auto">
                                <button id="submitLMYtokenAddress" style={{ marginTop: 10 + '%', color: '#fff', width: 60 + 'px', fontSize: 0.7 + 'rem' }} className="btnNon text-center mx-auto btn">Select</button>
                            </div>
                        </div>
                        <br /> */}
                        <div style={{ padding: '0px 10px 0px 10px' }}>
                            <input id="tokenAddress" required name="tokenAddress" className="form-control" placeholder="Enter token address" />
                            <button id="submittokenAddress" style={{ marginTop: 10 + 'px', color: '#fff', width: 100 + 'px', fontSize: 1 + 'rem' }} className="btnNon text-center mx-auto btn">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}