import { useState } from 'react'
import CounterButton from './CounterButton'

export default function Counter(){

    const [count, setCount] = useState(0)
    
    function incrementCounterParentFunction(by) {
        setCount(count + by)
    }
    function decrementCounterParentFunction(by) {
        setCount(count - by)
    }

    function reset(){
        //count = 0 or setCount(count=0) cannot assign value to a constant variable
        //count == 0 not expect an expression
        setCount(0)
        //setCount(count == 0) can work but will not show 0 after reset
    }
    
    return (
        <>
        <span className="total">{count}</span>
        <CounterButton by = {1} inmethod = {incrementCounterParentFunction} 
                                demethod = {decrementCounterParentFunction} />
        <CounterButton by = {2} inmethod = {incrementCounterParentFunction} 
                                demethod = {decrementCounterParentFunction}/>
        <CounterButton by = {5} inmethod = {incrementCounterParentFunction} 
                                demethod = {decrementCounterParentFunction}/>
        <button className="resetButton" onClick={reset}>Reset</button>
      </>
    )
}
