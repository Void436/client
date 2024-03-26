import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector , useDispatch } from "react-redux";
import { gettask , addtask , updatetask , deletetask } from '../redux/slices/todoSlice';
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
    useEffect(() => {dispatch(gettask())} , {dispatch})

    const handlechange = (e) => {
        setupdated({...taskList , [e.target.name]:[e.target.value]})
    }
    

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Add Task" {...register("title", {required: true})} />
                <input type="text" placeholder="Description" {...register("desc", {required: true})} />
                <input type="submit" />
            </form>
            
            {isLoading && <p>loading</p>}
            {Array.isArray(taskList) && taskList.map(el => 
                <div>
                    <p>{el.title}</p>
                    <p>{el.desc}</p>
                    

                    <button onClick={() => (visible.visibility==="Hidden") ? setvisible({visibility:"Visible"}): setvisible({visibility:"Hidden"})}>Edit</button>
                    <div style={visible}>
                        <input type="text" placeholder="Edit Task Title" onChange={handlechange} name="title"/> 
                        <input type="text" placeholder="Edit Description" onChange={handlechange} name="desc"/>
                        <button onClick={() => dispatch(updatetask({...updated,_id:el._id}))}>Updating</button>
                    </div>
                    <button onClick={() => dispatch(deletetask(el))}>Delete</button>
                </div>
            )}
        </>
    )
}

export default Home
