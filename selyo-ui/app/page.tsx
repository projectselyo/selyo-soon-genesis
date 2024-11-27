"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NewNavBar from "../components/NavBar";

import Footer from "../components/Footer";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (email) {
      const url = `https://selyo.quest/${encodeURIComponent(email)}`;
      router.push(url);
    }
  };

  return (
    <main className="h-full Tomorrow bg-gradient-to-t from-zinc-800 from-10% to-neutral-900 to-100%">
      <NewNavBar />

      <div className="grid grid-cols-2 grid-rows-4 h-screen text-white px-16 md:px-10">
        <div className="content-center hidden md:block">
          <img
            src="assetbar.png"
            className="scale-y-75 xl:w-[40rem] lg:w-[30rem]"
          />
        </div>
        <div className="row-span-4 xl:col-span-1 md:col-span-1 col-span-2 items-center justify-center flex relative">
          <img
            src="cardelement.png"
            className="static xl:h-[45rem] xl:top-[5rem] xl:right-[2rem] lg:h-[35rem] lg:top-[2rem] lg:right-[1rem] md:h-[30rem] md:top-[5rem] md:right-[1.1rem] h-[20rem] md:absolute max-[320px]:h-[17rem]"
          />
          <img
            src="linehero.png"
            className="absolute hidden xl:h-[13rem] xl:right-[25rem] xl:top-[5rem] xl:block"
          />
        </div>
        <div className="grid gap-4 xl:content-end xl:col-span-1 lg:content-end lg:col-span-1 md:content-end md:col-span-1 content-center col-span-2">
          <img src="selyo-maintype.png" className="xl:w-[40rem] lg:w-[38rem]" />
          <p className="text-yellow-400 tracking-[0.3rem] font-thin xl:text-3xl lg:text-xl md:text-lg md:text-start text-xs text-center max-[320px]:text-[0.5rem]">
            TOKENIZING SOCIAL INTERACTION
          </p>
        </div>
        <div className="md:grid md:justify-start md:pt-12 md:col-span-1 justify-center flex col-span-2 pt-5">
          <p className="text-white font-thin text-sm tracking-wider w-4/5 leading-snug xl:text-[0.93rem] lg:text-[0.65rem] md:text-xs md:text-start text-center text-[0.7rem] max-[320px]:text-[0.4rem]">
            Platform for tokenizing social interaction bringing next-gen
            experience to your events and organizations powered by Web3 and IoT
          </p>
        </div>
        <div className="flex grid-cols-2 items-center mt-[-5rem]">
          <img
            src="barcode.png"
            className="lg:h-[1.5rem] md:h-[1rem] h-[1rem] hidden md:block"
          />
          <p className="text-white px-2 leading-snug tracking-widest font-thin xl:text-[0.8rem] lg:text-[0.55rem] md:text-[0.4rem] hidden md:block">
            Selyo provides NFC powered IDs that records interactions and
            engagements all on-chain
          </p>
        </div>
      </div>
      <Separator className=" my-5" />
      <div className="place-items-center text-white grid grid-rows-2 mb-10">
        <p className="tracking-widest text-2xl">OUR PARTNERS</p>
        <div className="place-items-center flex justify-center">
          <img
            src="BCC.png"
            className="lg:w-[15rem] w-[10rem] max-[320px]:w-2/5"
          />
          <img
            src="JBECP.png"
            className="lg:w-[15rem] w-[10rem] max-[320px]:w-2/5"
          />
        </div>
      </div>
      <Separator />
      <Footer />
    </main>
  );
}
