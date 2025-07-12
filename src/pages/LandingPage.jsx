import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
Accordion,
AccordionContent,
AccordionItem,
AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
const [longUrl, setLongUrl] = useState("");
const navigate = useNavigate();

const handleShorten = (e) => {
e.preventDefault();
if (longUrl) navigate(`/auth?createNew=${longUrl}`);
};

return (
<div className="flex flex-col items-center bg-lavender text-silver transition-colors duration-300">
    <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-center font-extrabold">
    The only URL Shortener <br /> you&rsquo;ll ever need! 👇
    </h2>

    <form
    onSubmit={handleShorten}
    className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2 items-center"
    >
    <Input
        type="url"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Enter your loading URL"
        className="h-full flex-1 py-4 px-4  border border-silver"
    />
    <Button
        className="bg-wisteria text-black hover:bg-silver hover:text-lavender transition-colors duration-200 shadow"
        type="submit"
    >
        Shorten!
    </Button>
    </form>

    <img src="/logo3.png" className="w-full my-11 md:px-11" />

<Accordion
type="multiple"
collapsible
className=" w-full px-4 sm:px-6 md:px-11 space-y-2 sm:space-y-3 mb-10"
>
{[1, 2, 3].map((item) => (
<AccordionItem
    key={item}
    value={`item-${item}`}
    className= "border-white bg-silver rounded-md  backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 shadow-sm sm:shadow-md transition-all duration-300"
>
    <AccordionTrigger className="text-oxford hover:no-underline hover:text-wisteria text-left font-medium text-base sm:text-lg">
    {item === 1 && "How does the LinkVault URL shortener work?"}
    {item === 2 && "Do I need an account to use the app?"}
    {item === 3 && "What analytics are available for my shortened URLs?"}
    </AccordionTrigger>
    <AccordionContent className="text-oxford text-sm sm:text-base pt-2 transition-all duration-300">
    {item === 1 &&
        "When you enter a long URL, our system generates a shorter version you can easily share and track."}
    {item === 2 &&
        "Yes. Creating an account allows you to manage your URLs, access analytics, and save link history."}
    {item === 3 &&
        "You can view the number of clicks, geolocation data, referral sources, and click time trends."}
    </AccordionContent>
</AccordionItem>
))}
</Accordion>

</div>
);
};

export default LandingPage;
