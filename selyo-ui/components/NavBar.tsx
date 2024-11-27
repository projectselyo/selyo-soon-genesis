import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import { API_URL, UI_URL } from "@/constants/constants";
import { IoIosArrowForward } from "react-icons/io";

const emailSchema = z.string().email({ message: "Invalid email address" });

export default function useUserdata() {
  const [email, setEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = () => {
    try {
      emailSchema.parse(email);
      setError(null);

      const url = `${UI_URL}/${encodeURIComponent(email)}`;
      router.push(url);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="z-10 sticky top-0">
      <div
        className={`grid grid-cols-9 gap-9 py-5 max-[320px]:px-5 sm:px-10 bg-neutral-900/50 ${
          isTop ? "lg:bg-transparent" : "backdrop-blur-md shadow-lg "
        }`}
      >
        <img
          src="selyo-logo.png"
          alt="selyo logo"
          className="xl:w-[4rem] lg:w-[3rem] md:w-[2.5rem] sm:w-[2.5rem] col-span-2 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        />
        <div className="Tomorrow text-white grid grid-cols-4 col-span-4 text-center content-center xl:gap-14 lg:gap-5 md:gap-2">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-white w-full xl:text-[1rem] lg:text-[0.7rem] md:text-[0.6rem] md:block sm:hidden max-[320px]:hidden"
            >
              HOME
            </Button>
          </Link>
          <Link
            href="https://selyo.gitbook.io/selyo-docs"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant={"ghost"}
              className="text-white w-full xl:text-[1rem] lg:text-[0.7rem] md:text-[0.6rem] md:block sm:hidden max-[320px]:hidden"
            >
              DOCS
            </Button>
          </Link>
          <Button
            variant={"ghost"}
            className="w-full xl:text-[1rem] lg:text-[0.7rem] md:text-[0.6rem] md:block sm:hidden max-[320px]:hidden"
          >
            ABOUT
          </Button>
          <Link href="./listing" rel="noreferrer noopener">
            <Button
              variant={"ghost"}
              className="text-white w-full xl:text-[1rem] lg:text-[0.7rem] md:text-[0.6rem] md:block sm:hidden max-[320px]:hidden"
            >
              EVENTS
            </Button>
          </Link>
        </div>
        <div></div>
        <div className="col-span-2 content-center">
          <div className="flex w-full max-w-lg items-center space-x-2 md:outline md:outline-1 md:outline-white sm:outline-none max-[320px]:outline-none">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-none border-none text-white Tomorrow xl:h-[2rem] xl:text-[1rem] lg:h-[1.5rem] lg:text-[0.7rem] md:h-full md:text-[0.6rem] md:block sm:hidden max-[320px]:hidden"
            />
            <Button
              variant="ghost"
              onClick={handleSubmit}
              className="text-white bg-transparent rounded-none lg:text-[0.7rem] md:size-fit md:block sm:hidden max-[320px]:hidden"
            >
              {">"}
            </Button>
            <div className="md:hidden sm:block max-[320px]:block">
              {!menuOpen ? (
                <RxHamburgerMenu
                  onClick={toggleMenu}
                  className="text-white size-8 cursor-pointer hover:text-zinc-400 transition duration-200 ease-in-out"
                />
              ) : (
                <MdClose
                  onClick={toggleMenu}
                  className="text-white size-8 cursor-pointer hover:text-zinc-400 transition duration-200 ease-in-out"
                />
              )}
              {menuOpen && (
                <div className="absolute top-20 left-0 right-0 bg-neutral-900/90 z-20 py-10 px-5 rounded-md h-screen backdrop-blur-md">
                  <div className="flex flex-col items-center space-y-5">
                    {/* Navigation buttons */}
                    <Link
                      href="https://selyo.quest"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button variant="ghost" className="text-white">
                        HOME
                      </Button>
                    </Link>
                    <Link
                      href="https://selyo.gitbook.io/selyo-docs"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button variant={"ghost"} className="text-white">
                        DOCS
                      </Button>
                    </Link>
                    <Button variant={"ghost"} className="text-white">
                      ABOUT
                    </Button>
                    <Button variant={"ghost"} className="text-white">
                      CONTACT US
                    </Button>

                    <div className="flex w-full max-w-sm items-center space-x-2 outline outline-1 outline-white">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-none border-none text-white Tomorrow"
                      />
                      <Separator orientation="vertical" />
                      <Button
                        variant="ghost"
                        onClick={handleSubmit}
                        className="text-white bg-transparent rounded-none "
                      >
                        <IoIosArrowForward />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {error && (
        <Alert
          variant={"destructive"}
          className="md:w-[20rem] sm:w-[10rem] max-[320px]:w-[10rem] fixed bottom-5 right-5 opacity-100 bg-black/80 z-20"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>Invalid Email Address.</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
