export default function Popup(props) {

    return (
        <div id="backdropCon" className={props.closeVal == 0 ? "col-md-8" : "col-md-8 hide"}>
            <div>
                <div className="container" style={{padding: 40+'px'}}>
                    <h3 style={{ color: 'white' }}>Withdraw</h3>
                    <br/>
                    <input id="emailAddress2" type="email" className="form-control" placeholder="Email Address" />
                    <br/>
                    <div className='row mx-auto text-center'>
                        <div className='col-md-6'><button id="withdrawBtn" className="myBTN btnNon text-center mx-auto btn">Get Redeem Code</button></div>
                        <div className='col-md-6'><button onClick={() => props.clickEvent(-1)} className="myBTN btnNon text-center mx-auto btn" style={{ background: 'red' }}>Cancel</button></div>
                    </div>
                </div>
            </div>
        </div >
    )
}