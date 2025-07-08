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

const Header = () => {
  const navigate = useNavigate();
  const { user } = UrlState();

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
    <nav className="bg-custom-gradient text-black shadow-md p-4 rounded-b-xl mb-6">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <IoIosLink size={42} className="text-yellow-400" />
          <span className="text-xl font-semibold tracking-wide">LinkVault</span>
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
                    className="w-full h-full object-cover"
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
                  <LinkIcon className="mr-2 h-4 w-4" />
                  <span>My Links</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-800"
                  onClick={() => navigate("/")}
                >
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
