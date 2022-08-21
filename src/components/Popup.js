import FeedbackForm from './SubComponents/FeedbackForm'
import Rewards from './SubComponents/Rewards'
import { useState } from 'react'
import $ from 'jquery'

export default function Popup(props) {

    const [nl, setnl] = useState(1)

    return (
        <div id="backdropCon" className={props.closeVal == 1 ? "col-md-8 hide" : "col-md-8"}>
            <div className="nv navbar-expand-lg">
                <div className="container">
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
                                <a className="nl nav-link smText"><i className="fa fa-cog"></i><br />Token List</a>
                            </li>
                            <li onClick={() => { props.clickEvent(1); }} className="nav-item">
                                <a className="nl nav-link smText"><i className="fa fa-times"></i><br />Close</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div >
            <div className="container hide_it_now">
                <div className="row">
                    <div className='col-6'>
                        <li onClick={() => setnl(1)} className="nav-item">
                            <a className={nl == 1 ? 'nav-link nl nl_active' : "nav-link nl"}>Feedback</a>
                        </li>
                        <li className="nav-item">
                            <a className="nl nav-link smText"><i className="fa fa-cog"></i><br />Token List</a>
                        </li>


                    </div>
                    <div className='col-6'>
                        <li onClick={() => setnl(2)} className="nav-item">
                            <a className={nl == 2 ? 'nav-link nl nl_active' : "nav-link nl"}>Rewards</a>
                        </li>
                        <li onClick={() => { props.clickEvent(1); }} className="nav-item">
                            <a className="nl nav-link smText"><i className="fa fa-times"></i><br />Close</a>
                        </li>
                    </div>
                </div>
                <hr />
            </div >
            <div style={{display: nl == 1 ? 'block': 'none'}}>
                <FeedbackForm />
            </div>
            <div style={{display: nl == 2 ? 'block': 'none'}}>
                <Rewards />
            </div>
        </div >
    )
}