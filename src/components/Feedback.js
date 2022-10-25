import Stars from './Stars'
import $ from 'jquery'

export default function Feedback(props) {

    const handleClick = () => {
        $(window).scrollTop(0);
        props.clickEvent(1);
    }

    return (
        <>
            <h1>Submit Your Feedback</h1>
            <h6>(1 feedback/day allowed)</h6>
            <br/>
            <select id="restroName" className="form-select">
                <option selected value="KFC">KFC</option>
                <option value="McDonald's">McDonald's</option>
                <option value="Burger King">Burger King</option>
                <option value="Wendy's">Wendy's</option>
                <option value="Dairy Queen">Dairy Queen</option>
                <option value="Sonic">Sonic</option>
                <option value="Fatburger">Fatburger</option>
                <option value="Popeyes">Popeyes</option>
                <option value="Pizza Hut">Pizza Hut</option>
                <option value="AMC">AMC</option>
            </select>
            <br/>
            <Stars />
            <button onClick={handleClick} id="writefeedback" className="btn btn-primary">Write Feedback</button>
        </>
    )
}