import './TodoApp.css'
import { BrowserRouter, Routes, Route, useNavigate, useParams} from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import ErrorComponent from './ErrorComponent'
import ListTodoComponent from './ListTodoComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginComponent'
import TodoComponent from './TodoComponent'
import AuthProvider, { useAuth } from './security/AuthContext'

function AuthenticatedRoute({children}){
    const authContext = useAuth()
    if (authContext.isAuthenticated){
        return children
    }

    return <Navigate to="/" />
}

export default function TodoApp(){
    return(
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>

                {/* always shows header and footer */}
                <HeaderComponent />

                <Routes>
                {/* specific component below: showing one of those per time */}
                    <Route path='/' element={<LoginComponent />}/>
                    <Route path='/login' element={<LoginComponent />}/>
                    <Route path='/welcome/:username' element={
                        //if the user is authenticated, naviaget to welcome page
                        //if not, navigate to login page
                         <AuthenticatedRoute>
                              <WelcomeComponent />
                         </AuthenticatedRoute>
                          }/>
                    <Route path='/todos' element={
                         <AuthenticatedRoute>
                            <ListTodoComponent />
                         </AuthenticatedRoute>
                          }/>
                    <Route path='/todo/:id' element={
                          <AuthenticatedRoute>
                            <TodoComponent />
                          </AuthenticatedRoute>
                          }/>
                    <Route path='/logout' element={<LogoutComponent /> }/>

                    <Route path='*' element={<ErrorComponent /> } />
                </Routes>

                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
















