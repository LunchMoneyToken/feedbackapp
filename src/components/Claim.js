export default function Feedback() {
    return (
        <div className="row">
            <div className="col-md-9 claimCon">
                <h1>Claim Your Rewards</h1>
                <p style={{color: 'red'}} id="claimWarn"></p>
                <br/>
                <div className="form-group">
                    <input id="redeemCode" type="text"  className="form-control fc" placeholder="Enter LMY Rewards Code" />
                </div>
                <br/>
                <button id="claimBtn" className="btn btn-primary">Claim</button>
            </div>
            <div className="col-md-3">
                <img src="/assets/tmmark.png"/>
            </div>
        </div>
    )
}