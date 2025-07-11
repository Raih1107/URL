import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {UrlState} from '@/context'
import { deleteUrl, getUrl } from '../db/apiUrls';
import useFetch from "../Hooks/useFetch"
import { getClicksForUrl } from '../db/apiClicks';
import { BarLoader, BeatLoader } from 'react-spinners';
import { Copy, Download, LinkIcon, Trash } from 'lucide-react';
import { Button } from '../components/ui/button';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LocationStats from '../components/LocationStats';
import DeviceStats from '../components/DeviceStats';


const Link = () => {

    const downloadImage = () => {
        const imageUrl = url?.qr;
        const fileName = url?.title;

        const anchor = document.createElement("a");
        anchor.href = imageUrl;
        anchor.download = fileName;

        anchor.click();
        document.body.removeChild(anchor);
    }
    
    const {id} = useParams();
    const {user} = UrlState();

    const navigate = useNavigate();

    const {loading, data: url, fn, error} = useFetch(() => getUrl(id, user?.id));

    const {loading:loadingStats, data: stats, fn:fnStats} = useFetch(getClicksForUrl, id);

    const {loading:loadingDelete, fn:fnDelete} = useFetch(deleteUrl, id);


    useEffect(() => {
        fn();
    }, []);

    useEffect(() => {
        if (!error && loading === false) fnStats();
    }, [loading, error]);

    if(error){
        navigate("/dashboard")
    }

    let link = "";
    if(url) {
        link = url?.custom_url ? url?.custom_url : url.short_url;
    }



return (
    <>
        {(loading || loadingStats) && (
            <BarLoader className="mb-4" width={"100%"} color="#b497d6"  />
        )}

        <div className="flex flex-col gap-8 sm:flex-row justify-between text-silver">
            <div className="flex flex-col items-start  gap-8 rounded-lg sm:w-2/5">
                <span className="text-4xl font-extrabold hover:underline cursor-pointer"> 
                    {url?.title} 
                </span>
                <a 
                    className="text-xl sm:text-3xl text-blue-400 font-bold hover:underline cursor-pointer"
                    href={`https://linkvault.in/${link}`} target="_blank">
                    https://linkvault.in/{link}
                </a>
                <a 
                    className="flex items-center gap-1 hover:underline cursor-pointer"
                    href={url?.original_url} target="_blank">
                    <LinkIcon className="p-1" />
                    {url?.original_url}
                </a>

                <span className="flex items-end font-extralight text-sm"> 
                    {new Date(url?.created_at).toLocaleString()} 
                </span>

            
            <div>
                <Button 
                    variant="ghost" 
                    onClick={() => navigator.clipboard.writeText(`https://linkvault.in?${url?.short_url}`)}
                >
                <Copy />
                </Button>
                <Button variant="ghost" onClick={downloadImage}>
                    <Download />
                </Button>            
                <Button variant="ghost" onClick={() => fnDelete()} disable={loadingDelete}>
                    {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash /> }
                </Button>


                <div className="p-6 w-60 h-60 md:w-80 md:h-80  rounded-xl overflow-hidden">
                <img
                    src={url?.qr}
                    alt="qr-code"
                    className="w-full h-full object-contain rounded-xl"
                />
                </div>




            </div>




            </div>



        
            <Card className="sm:w-3/5 ">
            <CardHeader>
                <CardTitle className="text-3xl font-extrabold">Stats</CardTitle>
            </CardHeader>
            {stats && stats.length ? (
                <CardContent className="flex flex-col gap-6">
                <Card>
                    <CardHeader>
                    <CardTitle>Total Clicks</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p>{stats?.length}</p>
                    </CardContent>
                </Card>

                <CardTitle>Location Data</CardTitle>
                <LocationStats stats={stats} />
                <CardTitle>Device Info</CardTitle>
                <DeviceStats stats={stats} />
                </CardContent>
            ) : (
                <CardContent>
                {loadingStats === false
                    ? "No Statistics yet"
                    : "Loading Statistics.."}
                </CardContent>
            )}
        </Card>   


        </div>
    </>
)
}

export default Link;