export default function Feedback() {
    return (
        <div className="row">
            <div className="col-md-9 claimCon">
                <h1>Claim Your Rewards</h1>
                <br/>
                <div className="form-group">
                    <input id="lmycode" type="text"  className="form-control fc" placeholder="Enter LMY Rewards Code" />
                </div>
                <br/>
                <button className="btn btn-primary">Submit</button>
            </div>
            <div className="col-md-3">
                <img src="/assets/tmmark.png"/>
            </div>
        </div>
    )
}