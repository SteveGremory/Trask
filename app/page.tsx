"use client";
import React from "react";
import Image from "next/image";

import Item from "@/components/item/item";
import Date from "@/components/date/date";
import CustomModal from "@/components/modal/modal";
import { useDisclosure } from "@nextui-org/modal";
import { raleway } from "./fonts";

const tasks = [
  {
    name: "Code",
    subtitle: "10:00AM, 27th Feb, 2024",
    key: 1,
  },
  {
    name: "Read",
    subtitle: "11:00AM, 27th Feb, 2024",
    key: 2,
  },
  {
    name: "Eat",
    subtitle: "12:00PM, 27th Feb, 2024",
    key: 3,
  },
  {
    name: "Sleep",
    subtitle: "1:00PM, 27th Feb, 2024",
    key: 4,
  },
  {
    name: "Repeat",
    subtitle: "2:00PM, 27th Feb, 2024",
    key: 5,
  },
];

const notes = [
  {
    name: "C++ Pt. 1",
    subtitle: "10:00AM, 27th Feb, 2024",
    key: 1,
  },
  {
    name: "C++ Pt. 2",
    subtitle: "11:00AM, 27th Feb, 2024",
    key: 2,
  },
  {
    name: "C++ Pt. 3",
    subtitle: "12:00PM, 27th Feb, 2024",
    key: 3,
  },
  {
    name: "C++ Pt. 4",
    subtitle: "1:00PM, 27th Feb, 2024",
    key: 4,
  },
  {
    name: "C++ Pt. 5",
    subtitle: "2:00PM, 27th Feb, 2024",
    key: 5,
  },
];

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="h-screen relative">
      <Image
        src="/background.png"
        className="object-cover object-center h-screen"
        fill
        alt="Background"
      />
      {/* Outer Flexbox for the division into 25:75 */}
      <div className="flex flex-row">
        {/* Sidebar content goes here */}
        <div className="hidden md:block w-1/4 left-0 top-0 h-screen bg-white bg-opacity-20 backdrop-blur-md">
          <div>
            <div
              className={`mt-8 m-4 text-white font-normal text-left text-5xl ${raleway.className}`}
            >
              <h2>Good Evening,</h2>
              <h1 className={`font-semibold`}>Steve!</h1>
              <Date />
            </div>

            <div className="absolute bottom-0 p-4 flex-1 ">
              <button className="py-2 px-4 bg-white bg-opacity-20 backdrop-blur-md hover:bg-opacity-40 text-white rounded-md">
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="sm:flex pl-10 pr-10">
            <div className="h-screen p-8 sm:w-1/2 text-left ">
              <div className="bg-[#969696] bg-opacity-50 backdrop-blur-md h-full rounded-lg flex flex-col overflow-auto">
                <div className="mt-8 m-6">
                  <div
                    className={`flex justify-between text-white font-normal text-4xl ${raleway.className}`}
                  >
                    <h2 className={`font-semibold text-6xl`}>Tasks</h2>

                    <button onClick={onOpen}>
                      <Image
                        priority
                        src="/plus.svg"
                        height={56}
                        width={56}
                        alt="Add a task"
                      />
                    </button>
                  </div>

                  <Item items={tasks} />
                </div>
              </div>
            </div>

            <div className="h-screen p-8 sm:w-1/2 text-left ">
              <div className="bg-[#969696] bg-opacity-50 backdrop-blur-md h-full rounded-lg flex flex-col overflow-auto">
                <div className="mt-8 m-6">
                  <div
                    className={`flex justify-between text-white font-normal text-4xl ${raleway.className}`}
                  >
                    <h2 className={`font-semibold text-6xl`}>Notes</h2>

                    <button>
                      <Image
                        priority
                        src="/plus.svg"
                        height={56}
                        width={56}
                        alt="Add a task"
                      />
                    </button>
                  </div>

                  <Item items={notes} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
