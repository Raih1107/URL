import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useFetch from "../Hooks/useFetch"
import { getLongUrl } from '../db/apiUrls';
import {BarLoader} from "react-spinners";
import { storeClicks } from '../db/apiClicks';



const RedirectLink = () => {
    const {id} = useParams();

    const {loading, data, fn} = useFetch(getLongUrl, id);

    const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks, {
        id: data?.id,
        originalUrl: data?.original_url,
    });

    useEffect(() => {
        fn();
    }, [])
    
    useEffect(() => {
        if (!loading && data?.original_url) {
            fnStats({
            id: data.id,
            originalUrl: data.original_url,
            });
        }

        window.location.href = data.original_url;
    }, [loading, data]);







    if(loading || loadingStats) {
        return(
            <>
                <BarLoader className="mb-4" width={"100%"} color="#b497d6"  /> 
                <br />
                Redirecting...
            </>
        )
    }

    return null;


}

export default RedirectLink;