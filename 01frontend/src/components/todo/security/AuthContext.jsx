import { createContext, useState, useContext } from "react";
import { executeAuthenticationService, executeJWTAuthenticationService } from "../api/TodoApiService";
import { apiClient } from "../api/ApiClient";

//1.create a context 
//give access to authContext
export const AuthContext = createContext()

//if want to use AuthContext, they can make use of the useAuth
//A hook useAuth make things easy to use the context
export const useAuth = () => useContext(AuthContext)

//2.share context with other children of AuthProvider
export default function AuthProvider({children}){
    //3.put some state in the context 
    const [isAuthenticated, setAuthenticated] = useState(false)

    //username state
    const [username, setUsername] = useState(null)

    //set token to context
    const [token, setToken] = useState(null)

    async function login(username, password){
        try {
              //pass to authenticationAPI
              //wait for the response to execute the next step
              const response = await executeJWTAuthenticationService(username, password)
              //add username authentication to the Context
              if (response.status == 200){
                setAuthenticated(true)
                setUsername(username)
                //create token
                const JwtToken = 'Bearer ' + response.data.token
                setToken(JwtToken)
                //add this token into header to any apiClient calls
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = JwtToken
                        return config
                    }
                )
                return true
              }else{
                logout()
                return false               
              }
        }  catch(error) {
            logout()
            return false  
        } 
    }

    function logout(){
        setAuthenticated(false)
        setUsername(null)
        setToken(null)
    }

    // //set values in one object
    // const valueToBeShared = {number, isAuthenticated, setAuthenticated}

    return(
        //value = {object}, {{value}} 
        // number, isAuthenticated, setAuthenticated are all values
        <AuthContext.Provider value={{isAuthenticated, setAuthenticated, username, login, logout, token}}>
            {children}
        </AuthContext.Provider>
    )
}