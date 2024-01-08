import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment/moment"

export default function TodoComponent(){

    const {id} = useParams()
    const authContext = useAuth()
    const navigate = useNavigate()

    const username = authContext.username
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')
    

    //call the funtcion when loading the page
    //only being refresh when id value changes
    useEffect(() => retrieveTodo(),[id])
    function retrieveTodo(){
        if (id!= -1){
            retrieveTodoApi(username, id)
            .then(response=>{setDescription(response.data.description)
                             setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))
        }
    }

    //validate the input
    function validate(values){
        let errors = {
        }
        if (values.description.length < 5) {
            errors.description = "Enter at least 5 characters"
        }
        if (values.targetDate == '' || !moment(values.targetDate).isValid()) {
            errors.targetDate = "Enter a valid date"
        }
        return errors
    }

    //submit and update todo
    function onSubmit(values){
        const todo = {
            id:id, username:username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        if (id==-1){
            createTodoApi(username, todo)
             .then(response => navigate('/todos'))
             .catch(error=>console.log(error))
        } else{
            updateTodoApi(username, id, todo)
            .then(response => navigate('/todos'))
            .catch(error=>console.log(error))
        }
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={{description, targetDate}}
                       //when form created, its initialValue = useState(null)
                       //let the modified value reinitialize the formik to show info
                        enableReinitialize = {true}
                        onSubmit={onSubmit}
                        validate={validate}
                        //no validaion whild typing in
                        validateOnBlur={false}
                        validateOnChange={false}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" 
                                    component="div" className="alert alert-warning"/>
                                <ErrorMessage name="targetDate" 
                                    component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field name = "description" type="text" className="form-control"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field name = "targetDate" type="date" className="form-control"></Field>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save Update</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}