import React, { useEffect, useRef, useState } from 'react'
import {UrlState} from "@/context"
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { Input } from './ui/input';
import {Card} from './ui/card';
import Error from './Error';
import * as yup from 'yup';
import { QRCode } from 'react-qrcode-logo';
import useFetch from "../Hooks/useFetch";
import {BeatLoader} from "react-spinners";
import { createUrl } from '../db/apiUrls';




const CreateLink = () => {

    const {user} = UrlState();
    const navigate = useNavigate();
    const ref = useRef();

    let [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get("createNew")

    const [errors, setErrors] = useState({});
    const [formValues, setFormValues] = useState({
        title: "",
        longUrl: longLink ? longLink : "",
        customUrl: "",
    });

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        longUrl: yup
            .string()
            .url("Must be a valid URL")
            .required("Long URL is required"),
        customUrl: yup.string(),
    })

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value,
        });
    };

    const {loading, error, data, fn:fnCreateUrl} = useFetch(createUrl, {...formValues, user_id: user.id});


    useEffect(() => {
        if(error === null && data){
            navigate(`/link/${data[0].id}`)
        }
    }, [error, data]);


    const createNewLink = async () => {
        setErrors([]);

        try {
            await schema.validate(formValues, {abortEarly:false});
            const canvas = ref.current?.canvasRef?.current;
            if (!canvas) {
                console.error("QR canvas not ready");
                return;
            }

            const blob = await new Promise((resolve) => canvas.toBlob(resolve));

            await fnCreateUrl(blob);
        } catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
    }


return (

    <Dialog defaultOpen={longLink} onOpenChange={ (res) => {
        if(!res) setSearchParams({})
        }}
    >
    <DialogTrigger>
        <Button variant="destructive" className="bg-wisteria hover:bg-silver">
        Create new Link
        </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md bg-silver">
        <DialogHeader>
        <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
        </DialogHeader>
    {formValues.longUrl && <QRCode value={formValues.longUrl} size={150} ref={ref} />}

    <Input
    id="title"
    placeholder="Short Link's Title"
    value={formValues.title}
    onChange={handleChange}
    />
    {errors.title && <Error message={errors.title} />}

    <Input
    id="longUrl"
    placeholder="Enter your long URL"
    value={formValues.longUrl}
    onChange={handleChange}
    />
    {errors.longUrl && <Error message={errors.longUrl} />}

    <div className="flex items-center gap-2">
    <Card className="p-2">linkvault.in</Card> /
    <Input
        id="customUrl"
        placeholder="Custom Link (optional)"
        value={formValues.customUrl}
        onChange={handleChange}
    />
    </div>
    {errors.customUrl && <Error message={errors.customUrl} />}

        
        <DialogFooter className="sm:justify-start">
            <Button
                type="button" 
                disabled={loading}
                onClick={createNewLink} 
                variant="destructive" 
                className="bg-oxford text-silver"
            >
                {loading ? <BeatLoader size={10} color="white" /> : "Create" }
            </Button>
        </DialogFooter>
    </DialogContent>
    </Dialog>


)
}

export default CreateLink;