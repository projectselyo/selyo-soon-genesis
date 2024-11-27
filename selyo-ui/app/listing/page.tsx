"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: string[];
};

const events: Event[] = [
  {
    id: 1,
    title: "SOON Developers Bootcamp",
    date: "Jan 12, 2025",
    time: "08:00 - 17:00",
    location: "Adamson University",
    description: "Learn how to use SOON mainnet and SOON Stack to deploy SVM-based L2 rollups",
    attendees: ["Peer", "Leslie"],
  },
  {
    id: 2,
    title: "Cebu Blockchain Conference 2025",
    date: "Jan 19, 2025",
    time: "08:00 - 17:30",
    location: "Cebu City",
    description: "The biggest blockchain conference lead by the Visayas region communities",
    attendees: ["Product Team", "Stakeholders"],
  },
  {
    id: 3,
    title: "JBECP Falcons General Assembly",
    date: "Mar 1, 2025",
    time: "09:00 - 15:45",
    location: "Adamson University",
    description: "General Assembly of the members of the JBECP Falcons.",
    attendees: ["Olivia", "Liam", "Alban"],
  },
];

const EventList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#121212] h-full">
      <NavBar />
      <div className="max-w-4xl mx-auto p-6 h-screen">
        <h1 className="text-5xl font-bold mb-6 Tomorrow text-[#fdd100] tracking-widest">
          Events
        </h1>
        <Input
          placeholder="Search events"
          className="mb-4 text-[#f1f1f1]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div>
          {filteredEvents.map((event) => (
            <Card key={event.id} className="mb-4">
              <CardContent>
                {/* pt-5 is temporary */}
                <div className="flex justify-between items-center pt-5">
                  <div>
                    <CardTitle className="text-xl font-semibold Tomorrow tracking-wide">
                      {event.title}
                    </CardTitle>
                    <p className="text-gray-600">{event.date}</p>
                    <p>
                      {event.time} | {event.location}
                    </p>
                    <p className="text-gray-500">{event.description}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">View</Button>
                    </DropdownMenuTrigger>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Pagination className="text-[#f1f1f1] pt-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <Link href="./event" rel="noreffer">
          <Button className="fixed bottom-10 right-10 z-10 bg-[#f1f1f1] text-[#0b0b0b] hover:text-[#f1f1f1] border-2 border-[#f1f1f130] Tomorrow font-bold tracking-wide">
            {"Create Event"}
          </Button>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default EventList;
