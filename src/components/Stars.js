import { useState } from 'react'

export default function Stars() {

    const [val, setVal] = useState(1)
    const [starval, setstarVal] = useState('POOR')

    return (
        <ul className='starlists text-center mx-auto row col-md-8'>
            <p id="starsCount" className='hide'>{starval}</p>
            <li className='sl col-md-2' onClick={() => {setVal(1); setstarVal('POOR')}}>
                <img className='starImg' src={val >= 1 ? "/assets/markedStar.png" : "/assets/star.png"} />
                <p className="rateText">POOR</p>
            </li>
            <li className='sl col-md-2' onClick={() => {setVal(2); setstarVal('FAIR')}}>
                <img className='starImg' src={val >= 2 ? "/assets/markedStar.png" : "/assets/star.png"} />
                <p className="rateText">FAIR</p>
            </li>
            <li className='sl col-md-2' onClick={() => {setVal(3); setstarVal('GOOD')}}>
                <img className='starImg' src={val >= 3 ? "/assets/markedStar.png" : "/assets/star.png"} />
                <p className="rateText">GOOD</p>
            </li>
            <li className='sl col-md-2' onClick={() => {setVal(4); setstarVal('VERY GOOD')}}>
                <img className='starImg' src={val >= 4 ? "/assets/markedStar.png" : "/assets/star.png"} />
                <p className="rateText">VERY GOOD</p>
            </li>
            <li className='sl col-md-2' onClick={() => {setVal(5); setstarVal('EXCELLENT')}}>
                <img className='starImg' src={val === 5 ? "/assets/markedStar.png" : "/assets/star.png"} />
                <p className="rateText">EXCELLENT</p>
            </li>
        </ul>
    )
}