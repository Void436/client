import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector , useDispatch } from "react-redux";
import { gettask , addtask , updatetask , deletetask } from '../redux/slices/todoSlice';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";



const Home = () => {

    const dispatch=useDispatch()

    const [visible , setvisible] = useState({visibility:"Hidden"})
    const [updated , setupdated] = useState({})
    const {taskList , isLoading} = useSelector(state => state.task)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {console.log(data);
    dispatch(addtask(data))};
    console.log("errors" , errors);
    useEffect(()=>{dispatch(gettask())},[dispatch])

    const handlechange = (e) => {
        setupdated({...taskList , [e.target.name]:[e.target.value]})
    }
    

    return (
        <>
            <div id="mainn">
                <form onSubmit={handleSubmit(onSubmit)}><br/><br/>
                    <legend><strong>Add  a new task!</strong></legend> <br/><br/>
                    <input type="text" placeholder="Add Title" {...register("title", {required: true})} /><br/><br/>
                    <input type="text" placeholder="Description" {...register("desc", {required: true})} /><br/><br/>
                    <Button variant="success" type="submit" >Submit</Button>{' '}<br/><br/>
                </form>
                
                {isLoading && <p>loading...</p>}
                {Array.isArray(taskList) && taskList.map(el => 
                    <div>
                        <p>{el.title}</p>
                        <p>{el.desc}</p>
                        

                        <Button variant="light" onClick={() => (visible.visibility==="Hidden") ? setvisible({visibility:"Visible"}): setvisible({visibility:"Hidden"})}>Edit</Button>{' '}<br/><br/>
                        <div style={visible}>
                            <input type="text" placeholder="New Title" onChange={handlechange} name="title"/><br/><br/>
                            <input type="text" placeholder="Edit Description" onChange={handlechange} name="desc"/><br/><br/>
                            <Button variant="info" onClick={() => dispatch(updatetask({...updated,_id:el._id}))}>Update</Button>{' '}<br/><br/>
                        </div>
                        <Button variant="danger" onClick={() => dispatch(deletetask(el))}>Delete</Button>{' '} <br/><br/>
                    </div>
                )}
            </div>
        </>
    )
}

export default Home
