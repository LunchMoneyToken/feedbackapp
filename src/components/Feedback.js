import Stars from './Stars'

export default function Feedback(props) {

    const handleClick = () => {
        props.clickEvent(0)
    }

    return (
        <>
            <h1>Submit Your Feedback</h1>
            <select id="restroName" className="form-select" defaultValue="KFC">
                <option value="KFC">KFC</option>
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
            <button onClick={handleClick} className="btn btn-primary">Write Feedback</button>
        </>
    )
}