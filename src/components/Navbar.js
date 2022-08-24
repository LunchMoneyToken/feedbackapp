export default function Navbar() {
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
                            <li className="nav-item dropdown">
                                <button className="mx-auto text-center btn-sm-same btn-extra-sm nav-link" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{width: 200+'px'}}>
                                    <table id="menuTable">
                                        <tr>
                                            <td><a target="_blank" href="https://www.linkedin.com/company/lunch-money-token">About Us</a></td>
                                            <td></td>
                                            <td className="textabs"><img className="menuicons" src="/menuIcons/info.png"/></td>
                                        </tr>
                                        <tr>
                                            <td><a target="_blank" href="https://ivendpay.com/clients">Partners</a></td>
                                            <td></td>
                                            <td className="textabs"><img className="menuicons" src="/menuIcons/handshake.png"/></td>
                                        </tr>
                                        <tr>
                                            <td><a target="_blank" href="https://github.com/lunchmoneytoken">Github</a></td>
                                            <td></td>
                                            <td className="textabs"><img className="menuicons" src="/menuIcons/github.png"/></td>
                                        </tr>
                                        <tr>
                                            <td><a target="_blank" href="mailto:admin@lunchmoney.io">Contact</a></td>
                                            <td></td>
                                            <td className="textabs"><img className="menuicons" src="/menuIcons/question.png"/></td>
                                        </tr>
                                        <tr>
                                            <td><a target="_blank" href="https://www.dropbox.com/s/lc00b569xz637kv/0x66fd97a78d8854fec445cd1c80a07896b0b4851f.pdf?dl=0">Smart Contract Audits</a></td>
                                            <td></td>
                                            <td className="textabs"><img className="menuicons" src="/menuIcons/smart-contracts.png"/></td>
                                        </tr>
                                        <tr>
                                            <td><a target="_blank" href="https://www.dropbox.com/s/afncoszngmikxsp/LunchMoney%20Defi%20Whitepaper.pdf?dl=0">Whitepaper</a></td>
                                            <td></td>
                                            <td className="textabs"><img className="menuicons" src="/menuIcons/document.png"/></td>
                                        </tr>
                                        <tr>
                                            <td><a target="_blank" href="https://www.sec.gov/edgar/browse/?CIK=1742054">Form D<br/><small>Exception Notice</small></a></td>
                                            <td></td>
                                            <td className="textabs"><img className="menuicons" src="/menuIcons/form.png"/></td>
                                        </tr>
                                        <tr>
                                            <td><a target="_blank" href="https://v2.info.uniswap.org/pair/0x01d39ba3bda3df8b8a7cb1627f56eee91bce0c0d">Swap</a></td>
                                            <td></td>
                                            <td className="textabs"><img className="menuicons" src="/menuIcons/coin.png"/></td>
                                        </tr>
                                    </table>
                                    {/* <li><a className="ic dropdown-item" target="_blank" href="https://www.linkedin.com/company/lunch-money-token">About Us</a></li>
                                    <li><a className="ic dropdown-item" target="_blank" href="https://ivendpay.com/clients">Partners</a></li>
                                    <li><a className="ic dropdown-item" target="_blank" href="https://github.com/lunchmoneytoken">Github</a></li>
                                    <li><a className="ic dropdown-item" target="_blank" href="mailto:admin@lunchmoney.io">Contact</a></li>
                                    <li><a className="ic dropdown-item" target="_blank" href="https://www.dropbox.com/s/lc00b569xz637kv/0x66fd97a78d8854fec445cd1c80a07896b0b4851f.pdf?dl=0">Smart Contract Audits</a></li>
                                    <li><a className="ic dropdown-item" target="_blank" href="https://www.dropbox.com/s/afncoszngmikxsp/LunchMoney%20Defi%20Whitepaper.pdf?dl=0">Whitepaper</a></li>
                                    <li><a className="ic dropdown-item" target="_blank" href="https://www.sec.gov/edgar/browse/?CIK=1742054">Form D Exemption Notice</a></li>
                                    <li><a className="ic dropdown-item" target="_blank" href="https://v2.info.uniswap.org/pair/0x01d39ba3bda3df8b8a7cb1627f56eee91bce0c0d">Swap</a></li> */}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}