import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useParams} from 'react-router-dom'
import { useAuth } from './security/AuthContext'

export default function LoginComponent(){
    //set useState
    const [username, setUsername] = useState('Jingyi')
    const [password, setPassword] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate()

    const authContext = useAuth()

    //make it as a controlled component
    function handleUsernameChange(event){
        setUsername(event.target.value) 
    }

    function handlePasswordChange(event){
        setPassword(event.target.value) 
    }

    //set true/false for authentication
    async function handleSubmit(){
        if (await authContext.login(username, password)){
            navigate(`/welcome/${username}`)
        }else{
            setShowErrorMessage(true)
        }
    }

    return (
        <div className="Login">
            <h1>Please Login Here!</h1>
            {showErrorMessage && <div className='errorMessage'>Failed. Please check your credentials</div>}
            <div className="LoginForm">
                <div>
                    <label>Username: </label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>login</button>
                </div>
            </div>
        </div>
    )
}