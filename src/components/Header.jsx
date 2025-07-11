// src/components/Header.jsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosLink } from "react-icons/io";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "../Context";
import useFetch from "../Hooks/useFetch";
import { logout } from "../db/apiAuth";

import {BarLoader} from "react-spinners";


const Header = () => {
  const navigate = useNavigate();
  const { user , fetchUser} = UrlState();

  const {loading , fn:fnLogout} = useFetch(logout); 

  // Extract and validate profile picture
  const rawPic = user?.user_metadata?.profilepic?.trim()?.replace(/\s/g, "");
  const profilePicUrl = rawPic?.startsWith("http") ? rawPic : null;

  // Get user initials fallback
  const initials =
    user?.user_metadata?.name
      ?.split(" ")
      ?.map((w) => w[0])
      .join("")
      .toUpperCase() || "PA";

    useEffect(() => {
  console.log("🧪 Profile Pic URL →", user?.user_metadata?.profilepic);
}, [user])

  return (
    <>
      <nav className="bg-custom-gradient text-black shadow-md p-4 rounded-b-xl mb-6">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <IoIosLink size={42} className="text-silver" />
          <span className="text-xl sm:text-4xl font-semibold tracking-wide text-silver">LinkVault</span>
        </Link>

        <div className="flex items-center gap-4">
          {!user ? (
            <Button
              onClick={() => navigate("/auth")}
              className="bg-wisteria text-black hover:bg-silver"
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="overflow-hidden w-10 h-10 rounded-full">
                <Avatar>
                  <AvatarImage
                    src={profilePicUrl}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-silver text-black shadow-lg rounded-lg mt-2">
                <DropdownMenuLabel className="font-semibold">
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>

                <Link to="/dashboard" className="flex">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  <span>My Links</span>
                </Link>

                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-800"
                  
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span
                      onClick={() => {
                        fnLogout().then(() => {
                          fetchUser();
                          navigate("/")
                        })
                        
                      }}
                  >
                  Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      
    </nav>
        {loading && <BarLoader className="mb-4" width={"100%"} color="#b497d6"  /> }

    </>
  );
};

export default Header;
