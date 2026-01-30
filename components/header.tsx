"use client ";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button} from "./ui/button";
import { ChevronDown, LayoutDashboard, StarsIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Header = () => {
  return (
  <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
    <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
      <Link href="/">
      <Image 
      src="/logo.png" 
      alt="AI Career Coach Logo"
      width={150}
       height={50}
       className="h-12 py-1 w-auto object"
       />

      </Link>
      <div>
        <SignedIn>
          <Link href={"/dashboard"}>
          <Button>
            <LayoutDashboard className="h-4 w-4" />
            <span className="ml-2 hidden lg:inline">Industry Insights </span>
          </Button>
          </Link>
        </SignedIn>

         <DropdownMenu>
  <DropdownMenuTrigger >
    <Button>
            <StarsIcon className="h-4 w-4" />
            <span className=" ml-2 hidden lg:inline">Growth Tools</span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
    
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
      </div>
    </nav>
  
    <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
  </header>
  );
}

export default Header;