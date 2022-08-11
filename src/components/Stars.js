import { useState } from 'react'

export default function Stars() {

    const [val, setVal] = useState(1)

    return (
        <ul className='starlists text-center mx-auto row col-md-8'>
            <p id="starsCount" className='hide'>{val}</p>
            <li className='sl col-md-2' onClick={() => setVal(1)}>
                <img className='starImg' src={val >= 1 ? "/assets/markedStar.png" : "/assets/star.png"} />
                <p className="rateText">POOR</p>
            </li>
            <li className='sl col-md-2' onClick={() => setVal(2)}>
                <img className='starImg' src={val >= 2 ? "/assets/markedStar.png" : "/assets/star.png"} />
                <p className="rateText">FAIR</p>
            </li>
            <li className='sl col-md-2' onClick={() => setVal(3)}>
                <img className='starImg' src={val >= 3 ? "/assets/markedStar.png" : "/assets/star.png"} />
                <p className="rateText">GOOD</p>
            </li>
            <li className='sl col-md-2' onClick={() => setVal(4)}>
                <img className='starImg' src={val >= 4 ? "/assets/markedStar.png" : "/assets/star.png"} />
                <p className="rateText">VERY GOOD</p>
            </li>
            <li className='sl col-md-2' onClick={() => setVal(5)}>
                <img className='starImg' src={val === 5 ? "/assets/markedStar.png" : "/assets/star.png"} />
                <p className="rateText">EXCELLENT</p>
            </li>
        </ul>
    )
}