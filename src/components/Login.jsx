import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {Input} from "@/components/ui/input";
import { Button } from './ui/button';
import {BeatLoader} from 'react-spinners';
import Error from './Error';


import * as Yup from 'yup';
import useFetch from '../Hooks/useFetch';
import { login } from '../db/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '../Context';

const Login = () => {

    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    });

    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); 
    const longLink = searchParams.get("createNew");

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    };
    
    const {data, error, loading, fn:fnLogin }= useFetch(login, formData);

    const {fetchUser} = UrlState();

    useEffect(() => {
        console.log(data);

        if(error == null && data){
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : "" }`);
            fetchUser();

        }

    },[data,error])

    const handleLogin = async () => {
        setErrors([]);

        try {
            const schema = Yup.object().shape({
                email:Yup.string()
                    .email("Invalid Email")
                    .required("Email is required!"),
                password:Yup.string()
                    .min(6,"Password must be at least 6 characters")
                    .required("Password is required!")
            });

            await schema.validate(formData, {abortEarly:false})

            //api call
            await fnLogin();

        } catch (e) {
            const newError = {};

            e?.inner?.forEach((err) => {
                newError[err.path] = err.message;
            });

            setErrors(newError);
        }
    }

return (
    <div>
    <Card>
    <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>to your account if you already have one</CardDescription>
    </CardHeader>
    {error && <Error message={error.message} /> }
    <CardContent className="space-y-2">
        <div className="space-y-1">
            <Input 
                name="email" 
                type="email" 
                placeholder="Enter Email" 
                onChange={handleInputChange} 
                />
            {errors.email && <Error message={errors.email} /> }
        </div>
        <div className="space-y-1">
            <Input 
                name="password" 
                type="password" 
                placeholder="Enter Password"
                onChange={handleInputChange}
                />
            {errors.password && <Error message={errors.password} /> }
        </div>
    </CardContent>
    <CardFooter>
        <Button onClick={handleLogin} className="bg-wisteria hover:bg-silver">
            {loading ? <BeatLoader size={10} color="black" /> : "Login"}
        </Button>
    </CardFooter>
    </Card>


    </div>
)
};

export default Login;