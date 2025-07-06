import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosLink } from "react-icons/io";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuTrigger
} from './ui/dropdown-menu';
import { LinkIcon, LogOut } from "lucide-react";

const Header = () => {
const navigate = useNavigate();
const user = true;

return (
<nav className="bg-custom-gradient text-black shadow-md p-4 rounded-b-xl mb-6">
    <div className="container mx-auto flex justify-between items-center px-4">
    <Link to="/" className="flex items-center gap-2">
        <IoIosLink size={42} className="text-yellow-400" />
        <span className="text-xl font-semibold tracking-wide">LinkVault</span>
    </Link>

    <div className="flex items-center gap-4">
        <Button className="bg-wisteria text-black hover:bg-silver">
        Login
        </Button>

        {user && (
        <DropdownMenu>
            <DropdownMenuTrigger className="overflow-hidden w-10 rounded-full">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-silver text-black shadow-lg rounded-lg mt-2">
            <DropdownMenuLabel className="font-semibold">
                Himanshu Rai
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
            <LinkIcon className="mr-2 h-4 w-4"/>
            <span>My Links</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-800">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        )}
    </div>
    </div>
</nav>
);
};

export default Header;
