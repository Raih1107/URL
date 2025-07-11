

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
import { signup } from '../db/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '../Context';



const Signup = () => {

    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        profilepic:null,
    });

    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); 
    const longLink = searchParams.get("createNew");

    const handleInputChange = (e) => {
        const {name,value, files} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    };
    
    const {data, error, loading, fn:fnSignup }= useFetch(signup, formData);

    const {fetchUser} = UrlState();

    useEffect(() => {
        console.log(data);

        if(error == null && data){
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : "" }`);
            fetchUser();

        }

    },[error, loading]);

    const handleSignup = async () => {
        setErrors([]);

        try {
            const schema = Yup.object().shape({
                name: Yup.string().required("Name is required"),
                email:Yup.string()
                    .email("Invalid Email")
                    .required("Email is required!"),
                password:Yup.string()
                    .min(6,"Password must be at least 6 characters")
                    .required("Password is required!"),
                profilepic:Yup.mixed().required("Profile picture is required"),
            });

            await schema.validate(formData, {abortEarly:false})

            //api call
            await fnSignup();

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
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create a new account if you have&rsquo;t already</CardDescription>
    </CardHeader>
    {error && <Error message={error.message} /> }
    <CardContent className="space-y-2">
        <div className="space-y-1">
            <Input 
                name="name" 
                type="text" 
                placeholder="Enter Name" 
                onChange={handleInputChange} 
                />
            {errors.name && <Error message={errors.name} /> }
        </div>
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
        <div className="space-y-1">
            <Input 
                name="profilepic" 
                type="file" 
                accept="image/*"
                onChange={handleInputChange}
                />
            {errors.password && <Error message={errors.password} /> }
        </div>
    </CardContent>
    <CardFooter>
        <Button onClick={handleSignup} className="bg-wisteria hover:bg-silver text-oxford">
            {loading ? <BeatLoader size={10} color="black" /> : "Create account"}
        </Button>
    </CardFooter>
    </Card>


    </div>
)
};

export default Signup;