import $ from 'jquery'

export default function Navbar(props) {

    const handleClick = () => {
        $(window).scrollTop(0);
        props.clickEvent(0);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container cn">
                    <a className="navbar-brand" href="#"><img src="/assets/logo.png" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        </ul>
                        <ul className="navbar-nav">
                            <li>
                                <button id="connect_btn" className="text-center mx-auto btn-sm-same btn-sm nav-link">Connect Wallet</button>
                            </li>
                            <li id="earnedCon" className='hide' style={{marginLeft: 5+'px'}}>
                                <button onClick={handleClick} className="text-center mx-auto btn-sm-same btn-extra-sm nav-link">$<span id="earned">0</span></button>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="mx-auto text-center btn-sm-same btn-extra-sm nav-link" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ width: 200 + 'px' }}>
                                    <table id="menuTable">
                                        <tr>
                                            <td><a href="/about-us.html">About Us</a></td>
                                            <td></td>
                                            <td className="textabs"><img className="menuicons" src="/menuIcons/info.png" /></td>
                                        </tr>
                                        <tr>
                                            <td><a target="_blank" href="https://ivendpay.com/clients">Partners</a></td>
                                            <td></td>
                                            <td className="textabs"><img className="menuicons" src="/menuIcons/handshake.png" /></td>
                                        </tr>
                                        <tr>
                                            <td><a target="_blank" href="https://github.com/lunchmoneytoken">Github</a></td>
                                            <td></td>
                                            <td className="textabs"><img className="menuicons" src="/menuIcons/github.png" /></td>
                                        </tr>
                                        <tr>
                                            <td><a target="_blank" href="mailto:admin@lunchmoney.io">Contact</a></td>
                                            <td></td>
                                            <td className="textabs"><img className="menuicons" src="/menuIcons/question.png" /></td>
                                        </tr>
                                        <tr>
                                            <td><a target="_blank" href="https://www.dropbox.com/s/lc00b569xz637kv/0x66fd97a78d8854fec445cd1c80a07896b0b4851f.pdf?dl=0">Smart Contract Audits</a></td>
                                            <td></td>
                                            <td className="textabs"><img className="menuicons" src="/menuIcons/smart-contracts.png" /></td>
                                        </tr>
                                        <tr>
                                            <td><a target="_blank" href="https://www.dropbox.com/s/afncoszngmikxsp/LunchMoney%20Defi%20Whitepaper.pdf?dl=0">Whitepaper</a></td>
                                            <td></td>
                                            <td className="textabs"><img className="menuicons" src="/menuIcons/document.png" /></td>
                                        </tr>
                                        <tr>
                                            <td><a target="_blank" href="https://www.sec.gov/edgar/browse/?CIK=1742054">Form D<br /><small>Exception Notice</small></a></td>
                                            <td></td>
                                            <td className="textabs"><img className="menuicons" src="/menuIcons/form.png" /></td>
                                        </tr>
                                        <tr id='walletextensionCon' className='hide'>
                                            <td id="walletextension" className='cr'><a >LMY Extension Wallet</a></td>
                                            <td></td>
                                            <td className="textabs"><img className="menuicons" src="/menuIcons/coin.png" /></td>
                                        </tr>
                                    </table>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}