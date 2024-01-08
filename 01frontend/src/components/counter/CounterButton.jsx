import './Counter.css'
import propTypes from 'prop-types'

export default function CounterButton({by, inmethod, demethod}){

    return(
        <div className="count">
            {/* <span className="count">{count}</span> */}
            <div>
                <button className="counterButton" 
                    onClick={() => inmethod(by)} // a lambda function here
                >+{by}</button>
                <button className="counterButton" 
                    onClick={() => demethod(by)}
                >-{by}</button>
            </div>
        </div>
    )
}

CounterButton.propTypes = {
    by: propTypes.number
}


    //[0,f] 0 is the initial value, f is a function to update this state
    //const state = useState(0)

    //count is the state value, setCount is a function
    //useState returns an array back
    //const [first, second] = array
    //const [count, setCount] = useState(0)
    //console.log(by)

    //function incrementCounterFunction(){
        //state[1] is a fucntion, state[0] current value, +1 is what to do
        //state[1](state[0]+ 1)
        //console.log(state[0])
        //console.log(state[1])

        //call the function and update the current state value
        //setCount(count + by)
        //inmethod(by)
    //}

    //function decrementCounterFunction(){
        //call the function and update the current state value
        //setCount(count - by)
        //demethod(by)
    //}
