import { useEffect, useState} from "react"
import { retrieveAllTodosForUsernameApi, deleteTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"

export default function ListTodoComponent(){

    const authContext = useAuth()

    const username = authContext.username

    const navigate = useNavigate()

    // const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())

    const [todos, setTodos] = useState([])

    const [message, setMessage] = useState(null)

    //call refreshTodos when refresh this page (only the 1st time)
    useEffect(() => refreshTodos(), [])

    function refreshTodos(){
         retrieveAllTodosForUsernameApi(username)
              .then(response => {
                    setTodos(response.data) 
                })
    }

    function deleteTodo(id){
        deleteTodoApi(username, id)
                  .then(()=>
                    //1.display message
                    {setMessage(`Delete of Todo with id ${id} successfully`)
                    //2.update Todo List
                    refreshTodos()}
                  )
    }

    function updateTodo(id){
        navigate(`/todo/${id}`)
    }

    function createTodo(){
        navigate(`/todo/-1`)
    }

    return (
        <div className="container">
            <h1>Things You Plan to Do!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done ?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           //for each todo in todos, make a row
                           todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td>
                                            <button className="btn btn-warning"
                                                    onClick= {() =>{deleteTodo(todo.id)}}>Delete</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick= {() =>{updateTodo(todo.id)}}>Update</button>
                                        </td>
                                    </tr>
                                )
                            )
                        }

                    </tbody>
                </table>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={createTodo}>Add New Todo</button>
            </div>
        </div>
    )
}