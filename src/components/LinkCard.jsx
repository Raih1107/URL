import { Link } from "react-router-dom"
import React from 'react'
import { Copy, Delete, Download, Ghost, Trash } from "lucide-react"
import { Button } from "./ui/button"
import useFetch from "../Hooks/useFetch"
import { deleteUrl } from "../db/apiUrls"
import { BeatLoader } from "react-spinners"

const LinkCard = ({url,fetchUrls}) => {
   
    const downloadImage = () => {
        const imageUrl = url?.qr;
        const fileName = url?.title;

        const anchor = document.createElement("a");
        anchor.href = imageUrl;
        anchor.download = fileName;

        anchor.click();
        document.body.removeChild(anchor);
    }

    const {loading: loadingDelete, fn:fnDelete} = useFetch(deleteUrl, url.id);


return (
    <div className="flex flex-col md:flex-row gap-5  p-4 bg-lavender rounded-lg">
        <img src={url?.qr} alt="qr code" className="h-32 object-contain  self-start" />

        <Link to={`/link/${url?.id}`} className="flex flex-col flex-1"> 
            <span className="text-2xl font-extrabold hover:underline cursor-pointer">
                {url?.title} 
            </span>
            <span className="text-1xl text-gray-700 font-bold hover:underline cursor-pointer">
                https://www.linkvault.in/{url?.custom_url ? url?.custom_url : url.short_url}
            </span>
            <span className="flex items-center gap-1 hover:underlinebreak-words overflow-hidden cursor-pointer">
                {url?.original_url}
            </span>
            <span className="flex items-end font-extralight text-sm flex-1">
                {new Date(url?.created_at).toLocaleString()}
            </span>

        </Link>

        <div className="flex gap-2">
            <Button 
                variant="ghost" 
                onClick={() => navigator.clipboard.writeText(`https://linkvault.in?${url?.short_url}`)}
            >
                <Copy />
            </Button>
            <Button variant="ghost" onClick={downloadImage}>
                <Download />
            </Button>            
            <Button variant="ghost" onClick={() => fnDelete().then(() => fetchUrls())} disable={loadingDelete}>
                {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash /> }
            </Button>
        </div>
    </div>
)
}

export default LinkCard