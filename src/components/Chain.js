export default function Chain() {
    return (
        <>
            <div id="mobileIcons" className="row hide_it_now">
                <div className="set text-center mx-auto">
                    <img className="mx-auto" src="/assets/1.png" />
                    <br />
                    <h6 className="setTitle">Connect<br />Wallet</h6>
                </div>

                <div className="set text-center mx-auto">
                    <img className="mx-auto" src="/assets/2.png" />
                    <br />
                    <h6 className="setTitle">Add restaurants to do ratings on and write feedback</h6>
                </div>

                <div className="set text-center mx-auto">
                    <img className="mx-auto" src="/assets/3.png" />
                    <br />
                    <h6 className="setTitle">Receive email for how many LMY you earned</h6>
                </div>

                <div className="set text-center mx-auto">
                    <img className="mx-auto" src="/assets/4.png" />
                    <br />
                    <h6 className="setTitle">Receive an email with a rewards code to redeem ( When Balance reached $10 USD )</h6>
                </div>
            </div>
            {/* <div id="pcIcons" className="hide_it">
                <img alt="No Img" className="text-center mx-auto" style={{ width: 90 + '%' }} src="/assets/4_icons.png" />
            </div> */}
            <div className="container hide_it">
                <div className="row">
                    <div className="col-md-3">
                        <div className="set text-center mx-auto">
                            <img className="cImg mx-auto" src="/assets/1.png" />
                            <br />
                            <h6 className="setTitle">Connect<br />Wallet</h6>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="set text-center mx-auto">
                            <img className="cImg mx-auto" src="/assets/2.png" />
                            <br />
                            <h6 className="setTitle">Add restaurants to do ratings on and write feedback</h6>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="set text-center mx-auto">
                            <img className="cImg mx-auto" src="/assets/3.png" />
                            <br />
                            <h6 className="setTitle">Receive email for how many LMY you earned</h6>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="set text-center mx-auto">
                            <img className="cImg mx-auto" src="/assets/4.png" />
                            <br />
                            <h6 className="setTitle">Receive an email with a rewards code to redeem ( When Balance reached $10 USD )</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hide_it pr text-center mx-auto d-flex align-items-center">

                <div className="fa-stack fa-2x text-center">
                    <i className="fa fa-circle-o fa-stack-2x"></i>
                    <div><b><span class="dot2 dotMarked"></span></b></div>
                </div>
                <div className="line-btw"></div>
                <div className="fa-stack fa-2x text-center">
                    <i className="fa fa-circle-o fa-stack-2x"></i>
                    <div><b><span class="dot2"></span></b></div>
                </div>
                <div className="line-btw"></div>
                <div className="fa-stack fa-2x text-center">
                    <i className="fa fa-circle-o fa-stack-2x"></i>
                    <div><b><span class="dot2"></span></b></div>
                </div>
                <div className="line-btw"></div>
                <div className="fa-stack fa-2x text-center">
                    <i className="fa fa-circle-o fa-stack-2x"></i>
                    <div><b><span class="dot2"></span></b></div>
                </div>

            </div>
        </>
    )
}