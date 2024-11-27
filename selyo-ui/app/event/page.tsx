"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatetimePicker } from "@/components/ui/extension/datetime-picker";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  event_title: z.string().max(60),
  event_desc: z.string().max(600),
  datetime: z.coerce.date(),
  venue: z.string(),
  organizer: z.string().max(100),
  blockchain: z.string(),
  nftstandard: z.string(),
});

export default function Event() {
  const nftstndrd = [
    {
      label: "MPLX Bubblegum",
      value: "mplx-bbg"
    },
    {
      label: "MPLX Core",
      value: "mplx-core"
    },
    {
      label: "MPLX Token Metadata",
      value: "mplx-tm"
    },
    // {
    //   label: "ERC-721",
    //   value: "721",
    // },
    // {
    //   label: "ERC-721A",
    //   value: "721A",
    // },
    // {
    //   label: "ERC-1155",
    //   value: "1155",
    // },
    // {
    //   label: "ERC-998",
    //   value: "998",
    // },
  ] as const;
  const chains = [
    {
      label: "Solana",
      value: "sol",
    },
    {
      label: "SOON (Mainnet)",
      value: "soon",
    },
    {
      label: "SelyoNet (SOON L2)",
      value: "selyonet",
    }
    // {
    //   label: "Ethereum",
    //   value: "eth",
    // },
    // {
    //   label: "Sui",
    //   value: "sui",
    // },
    // {
    //   label: "Core",
    //   value: "cor",
    // },
  ] as const;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      datetime: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="bg-[#121212] ">
      <NavBar />
      <main className="h-full px-[4rem]">
        <div className="flex grid-cols-2 gap-20 text-[#f1f1f1] w-full">
          <div className="bg-[#f1f1f112] p-12 border-2 rounded-[12px] w-[50rem]">
            <Form {...form}>
              <p className="text-[#fdd100] text-4xl font-bold tracking-widest Tomorrow">
                Create Event
              </p>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 max-w-3xl mx-auto py-10"
              >
                <FormField
                  control={form.control}
                  name="event_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Event Title" type="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="event_desc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What is the event all about?"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4">
                  <div className="">
                    <FormField
                      control={form.control}
                      name="datetime"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date & Time</FormLabel>
                          <DatetimePicker
                            {...field}
                            format={[
                              ["months", "days", "years"],
                              ["hours", "minutes", "am/pm"],
                            ]}
                          />

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="">
                    <FormField
                      control={form.control}
                      name="venue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Venue</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="City, Country"
                              type=""
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="organizer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organizer</FormLabel>
                      <FormControl>
                        <Input placeholder="Organizer" type="text" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <FormField
                      control={form.control}
                      name="blockchain"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Blockchain</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-[200px] justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? chains.find(
                                        (chain) => chain.value === field.value
                                      )?.label
                                    : "Select Blockchain"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Search Blockchain..." />
                                <CommandList>
                                  <CommandEmpty>
                                    No Blockchain Found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {chains.map((chain) => (
                                      <CommandItem
                                        value={chain.label}
                                        key={chain.value}
                                        onSelect={() => {
                                          form.setValue(
                                            "blockchain",
                                            chain.value
                                          );
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            chain.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {chain.label}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-6">
                    <FormField
                      control={form.control}
                      name="nftstandard"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>NFT Standard</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-[200px] justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? nftstndrd.find(
                                        (nftstndrd) =>
                                          nftstndrd.value === field.value
                                      )?.label
                                    : "Select NFT Standard"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Search NFT Standard..." />
                                <CommandList>
                                  <CommandEmpty>
                                    No NFT Standard Found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {nftstndrd.map((chain) => (
                                      <CommandItem
                                        value={chain.label}
                                        key={chain.value}
                                        onSelect={() => {
                                          form.setValue(
                                            "nftstandard",
                                            chain.value
                                          );
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            chain.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {chain.label}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
          <div className="w-full">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="bg-[#f1f1f1] text-black"
              />
              <Label className="pt-5" htmlFor="image">NFT Metadata</Label>
              <Input
                id="nft-metadata"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="bg-[#f1f1f1] text-black"
              />
              {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-[30rem] object-cover object-center rounded-[12px] border-gray-200 border-2"
                  />
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
