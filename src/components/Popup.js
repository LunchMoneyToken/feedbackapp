import FeedbackForm from './SubComponents/FeedbackForm'
import Rewards from './SubComponents/Rewards'
import { useState } from 'react'

export default function Popup(props) {

    const [nl, setnl] = useState(1)

    return (
        <div id="backdropCon" className={props.closeVal == 1 ? "col-md-8 hide" : "col-md-8"}>
            <nav className="navbar nv navbar-expand-lg">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="nvs collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li onClick={() => setnl(1)} className="nav-item">
                                <a className={nl == 1 ? 'nav-link nl nl_active' : "nav-link nl"}>Feedback</a>
                            </li>
                            <li onClick={() => setnl(2)} className="nav-item">
                                <a className={nl == 2 ? 'nav-link nl nl_active' : "nav-link nl"}>Rewards</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link smText"><i className="fa fa-cog"></i><br />Token List</a>
                            </li>
                            <li onClick={() => props.clickEvent(1)} className="nav-item">
                                <a className="nav-link smText"><i className="fa fa-times"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
            <FeedbackForm />
            <br />
            <Rewards />
        </div >
    )
}