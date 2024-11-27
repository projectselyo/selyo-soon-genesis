"use client";
import { useState, useEffect, useRef } from "react";
import * as jdenticon from "jdenticon";
import {
  BsTwitterX,
  BsWallet,
  BsTag,
  BsTelegram,
  BsGithub,
} from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import NewNavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useUserData } from "@/hooks/useUserdata";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE = 8;

interface TruncatedTextSplitProps {
  text: string;
  startChars?: number;
  endChars?: number;
}

export default function Profile({ params }: { params: { uid: string } }) {
  const { uid } = params;
  const { userData, error, isLoading } = useUserData(uid);
  const identiconRef = useRef<SVGSVGElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (userData && identiconRef.current) {
      const value = `${userData.user.email}${userData.user.publicKey}`;
      jdenticon.update(identiconRef.current, value);
    }
  }, [userData]);

  const TruncatedTextSplit: React.FC<TruncatedTextSplitProps> = ({
    text = "",
    startChars = 6,
    endChars = 6,
  }) => {
    const truncate = (str: string) => {
      if (str.length <= startChars + endChars) return str;
      return `${str.slice(0, startChars)}...${str.slice(-endChars)}`;
    };

    return <span>{truncate(text)}</span>;
  };

  const totalPages =
    userData && userData.items
      ? Math.ceil(userData.items.length / ITEMS_PER_PAGE)
      : 1;

  const paginatedItems =
    userData && userData.items
      ? userData.items.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE
        )
      : [];

  const renderNFTGrid = () => {
    const itemsToRender = [];

    for (let i = 0; i < ITEMS_PER_PAGE; i++) {
      if (i < paginatedItems.length) {
        const item = paginatedItems[i];
        itemsToRender.push(
          <div
            key={item.id}
            className="bg-gray-500/80 rounded-lg m-auto sm:h-40 sm:w-40 md:h-40 md:w-40 lg:size-[5rem] overflow-hidden"
          >
            <img
              src={item.metadata.image}
              alt={item.metadata.name}
              className="w-full h-full object-cover"
            />
          </div>
        );
      } else {
        itemsToRender.push(
          <div
            key={`filler-${i}`}
            className="bg-gray-500/80 rounded-lg m-auto sm:h-40 sm:w-40 md:h-40 md:w-40 lg:size-[5rem]"
          />
        );
      }
    }

    return itemsToRender;
  };

  return (
    <div className="bg-neutral-900 min-h-screen ">
      <div>
        <NewNavBar />
        {/* Profile Header */}
        <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-600 to-black sm:h-64 sm:gap-4 sm:mb-20 lg:grid lg:grid-cols-9 lg:grid-rows-8 lg:gap-0 lg:container mx-auto">
          {/* Yellow Box */}
          <img
            src="pfp.png"
            className="absolute 
                        sm:-bottom-1/4 sm:left-1/2 sm:transform sm:-translate-x-1/2 
                        bg-yellow-400 sm:w-32 sm:h-32 
                        lg:col-start-2 lg:col-span-2 lg:-bottom-1/2 lg:left-0 lg:transform-none lg:size-fit"
          />
        </div>
        {/* Content Area */}
        <div className="lg:grid lg:grid-cols-9 lg:grid-rows-8 lg:container mx-auto Tomorrow">
          {/* User Info */}
          <div className="lg:text-left lg:row-span-1 lg:row-start-1 lg:col-start-5 lg:col-span-3 sm:text-center text-white">
            {isLoading ? (
              <div className="flex justify-center lg:justify-start">
                <Skeleton className="lg:h-8 lg:w-96 h-5 w-56 bg-gray-500/80" />
              </div>
            ) : error ? (
              <p className="sm:text-sm lg:text-2xl ">User not found</p>
            ) : userData ? (
              <p className="sm:text-sm lg:text-2xl">{userData.user.email}</p>
            ) : (
              <div className="flex justify-center lg:justify-start">
                <Skeleton className="lg:h-8 lg:w-96 h-5 w-56 bg-gray-500/80" />
              </div>
            )}
          </div>

          {/* Social Icons & Details */}
          <div className="Tomorrow col-span-1 sm:p-4 sm:flex sm:items-center sm:justify-center sm:gap-5 sm:flex-col lg:bg-zinc-800 lg:col-span-2 lg:col-start-2 lg:row-start-3 lg:row-span-full lg:justify-start lg:pt-20">
            <div className="sm:flex sm:justify-center sm:gap-4 sm:flex-wrap ">
              <BsTwitterX className="text-yellow-400 sm:h-8 sm:w-8" />
              <FaFacebook className="text-yellow-400 sm:h-8 sm:w-8" />
              <BsTelegram className="text-yellow-400 sm:h-8 sm:w-8" />
              <BsGithub className="text-yellow-400 sm:h-8 sm:w-8" />
            </div>
            <div className="sm:flex sm:gap-5 sm:items-center sm:justify-center lg:flex-col">
              <div className="text-center sm:flex sm:gap-5 sm:items-center sm:justify-center lg:flex-col lg:pt-5">
                <BsWallet className="sm:h-6 sm:w-6 text-yellow-400 sm:mx-auto " />
                {isLoading ? (
                  <div className="flex justify-center lg:justify-start">
                    <Skeleton className="h-5 lg:w-36 w-16  bg-gray-500/80" />
                  </div>
                ) : error ? (
                  <p className="text-sm text-white">User not found</p>
                ) : userData ? (
                  <span className="text-white text-sm ">
                    <TruncatedTextSplit text={userData?.user.publicKey} />
                  </span>
                ) : (
                  <div className="flex justify-center lg:justify-start">
                    <Skeleton className="h-5 lg:w-36 w-16  bg-gray-500/80" />
                  </div>
                )}
              </div>
              <div className="text-center sm:flex sm:gap-5 sm:items-center sm:justify-center lg:flex-col">
                <BsTag className="sm:h-6 sm:w-6 text-yellow-400 sm:mx-auto" />
                {isLoading ? (
                  <div className="flex justify-center lg:justify-start">
                    <Skeleton className="h-5 lg:w-36 w-16 bg-gray-500/80" />
                  </div>
                ) : error ? (
                  <p className="text-sm text-white">User not found</p>
                ) : userData ? (
                  <span className="text-white text-sm ">
                    <TruncatedTextSplit text={userData?.user.uid} />
                  </span>
                ) : (
                  <div className="flex justify-center lg:justify-start">
                    <Skeleton className="h-5 lg:w-36 w-16  bg-gray-500/80" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="sm:col-span-1 bg-zinc-800 rounded-2xl sm:p-4 lg:col-start-5 lg:col-span-4 lg:row-start-3 lg:row-span-full">
            <div className="sm:grid sm:grid-cols-2 sm:gap-4 lg:grid lg:grid-cols-4 lg:gap-4 lg:pt-14 lg:pb-14 sm:pt-10 sm:pb-10">
              {isLoading ? (
                Array(ITEMS_PER_PAGE)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      className="bg-gray-500/80 rounded-lg m-auto sm:h-40 sm:w-40 md:h-40 md:w-40 lg:size-[5rem]"
                    />
                  ))
              ) : error ? (
                <p className="text-white col-span-full text-center">
                  No NFTs Found
                </p>
              ) : userData && userData.items && userData.items.length > 0 ? (
                renderNFTGrid()
              ) : (
                Array(ITEMS_PER_PAGE)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      className="bg-gray-500/80 rounded-lg m-auto sm:h-40 sm:w-40 md:h-40 md:w-40 lg:size-[5rem]"
                    />
                  ))
              )}
            </div>

            {/* Pagination */}
            <Pagination className="text-white sm:mt-4 sm:mb-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(index + 1);
                      }}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
