import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { Facebook, Mails } from "lucide-react";

export default function Footer() {
  return (
    <>
      <section className="bg-gray-200 py-2">
        <div className="py-6 lg:py-8 px-4 sm:px-6 lg:px-8 lg:pt-12 mx-auto max-w-5xl">
          <div className="w-full flex flex-col">
            <div className="grid grid-cols-3">
              <ul className="text-center text-gray-600 hover:cursor-pointer">
                <Link href="/">Summarize</Link>
                <li>Contact Us</li>
              </ul>
              <ul className="text-center text-gray-600 hover:cursor-pointer">
                <Link href="/#pricing">Pricing</Link>
              </ul>
              <ul className="text-center text-gray-600 hover:cursor-pointer">
                <Link href="">About Us</Link>
              </ul>
            </div>
            <div className="flex justify-center items-center gap-4 mt-6">
              <Linkedin
                size={22}
                className="text-gray-500 hover:cursor-pointer"
              />
              <Instagram
                size={22}
                className="text-gray-500 hover:cursor-pointer"
              />
              <Facebook
                size={22}
                className="text-gray-500 hover:cursor-pointer"
              />
              <Mails size={22} className="text-gray-500 hover:cursor-pointer" />
            </div>
            <p className="text-center font-semibold text-gray-500 pt-6">
              Copyright @2025 All Rights Reserved
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
