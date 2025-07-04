import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import NavLink from "./nav-link";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import PlanBadge from "./planBadge";

export default function Header() {
  const isLoggedIn = false;

  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-extrabold lg:text-xl text-gray-900">
            Sommarise
          </span>
        </NavLink>
      </div>

      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <SignedIn>
          <NavLink href="/#pricing">Pricing</NavLink>
          <NavLink href="/dashboard">Your Summaries</NavLink>
        </SignedIn>
      </div>

      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <SignedIn>
              <PlanBadge />
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>

        <SignedOut>
          {/* <SignInButton /> */}
          {/* <SignUpButton /> */}
          <NavLink href="/sign-in" className="mr-4">
            Sign In
          </NavLink>
          <NavLink href="/sign-up">Sign Up</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
}
