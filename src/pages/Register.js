import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector , useDispatch } from "react-redux";
import { signup } from '../redux/slices/userSlice';
import { useNavigate } from "react-router-dom";
import "./styles.css";


const Register = () => {
    const {errors: err , isAuth} = useSelector(state => state.user)
    const  dispatch = useDispatch()
    const navigate = useNavigate()


    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {console.log(data);
    dispatch(signup(data))};
    console.log("errors" , errors);
    console.log("err" , err);
    useEffect(() => {
        if (isAuth) navigate("/")
    }, [isAuth , navigate , dispatch])
    

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Name" {...register("name", {required: true, max: 20, min: 3})} />
                <p className='error'>{errors.name && "This field is required!"}</p>
                <input type="email" placeholder="Email" {...register("email", {required: true})} />
                <p className='error'>{errors.email && "This email exist! Please try logging in."}</p>
                <input type="password" placeholder="Password" {...register("password", {required: true})} />
                <p className='error'>{errors.password && "Weak password!"}</p>
                <input type="submit" />
            </form>
        </>
    )
}


export default Register
