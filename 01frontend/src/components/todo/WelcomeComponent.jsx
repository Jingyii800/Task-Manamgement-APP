import { BrowserRouter, Routes, Route, useNavigate, useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAuth } from './security/AuthContext'
import { useState } from 'react'
import { retrieveHelloWorldBeanParam } from './api/HelloWorldAPIService'

export default function WelcomeComponent(){

    //const param = useParams() will pass an object "param" to the page
    //param.username
    //const {username} = useParams() //username is a value, can directly use the username
    const authContext = useAuth()
    const username = authContext.username
    //const [message, setMessage] = useState(null)

    // function CallHelloWorldParam(){
    //     retrieveHelloWorldBeanParam(username)
    //          .then((response)=> ShowSuccessMessage(response) )
    //          .catch((error)=> ShowErrorMessage(error))
    //          .finally(() => console.log('cleanup'))
    // }

    // function ShowSuccessMessage(response){
    //     console.log(response)
    //     setMessage(response.data.message)
    // }

    // function ShowErrorMessage(error){
    //     console.log(error)
    // }

    return (
        <div className="WelcomeComponent">
           <h1>Welcome {username}</h1> 
           <div>
              Manage Your Todos - <Link to="/todos">Here!</Link>
           </div>
           {/* <div>
              <button className='btn btn-success'
                      onClick={CallHelloWorldParam}>Hello-World-Param RestAPI</button>
           </div>
           <div className='text-info'>{message}</div> */}
        </div>
    )
}