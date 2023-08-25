"use client";
import React, { useEffect } from "react";
import Image from "next/image";

import Task from "@/components/task/task";
import Note from "@/components/notes/notes";
import Date from "@/components/date/date";
import CustomModal from "@/components/modal/modal";
import { useDisclosure } from "@nextui-org/modal";
import { raleway } from "./fonts";

const tasks_arr = [
  {
    name: "Code",
    time: "10:00AM, 27th Feb, 2024",
    key: 1,
  },
  {
    name: "Read",
    time: "11:00AM, 27th Feb, 2024",
    key: 2,
  },
  {
    name: "Eat",
    time: "12:00PM, 27th Feb, 2024",
    key: 3,
  },
  {
    name: "Sleep",
    time: "1:00PM, 27th Feb, 2024",
    key: 4,
  },
  {
    name: "Repeat",
    time: "2:00PM, 27th Feb, 2024",
    key: 5,
  },
];

const notes_arr = [
  {
    name: "C++ Pt. 1",
    time: "10:00AM, 27th Feb, 2024",
    key: 1,
  },
  {
    name: "C++ Pt. 2",
    time: "11:00AM, 27th Feb, 2024",
    key: 2,
  },
  {
    name: "C++ Pt. 3",
    time: "12:00PM, 27th Feb, 2024",
    key: 3,
  },
  {
    name: "C++ Pt. 4",
    time: "1:00PM, 27th Feb, 2024",
    key: 4,
  },
  {
    name: "C++ Pt. 5",
    time: "2:00PM, 27th Feb, 2024",
    key: 5,
  },
];

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    document.getElementById("modalOpener")?.addEventListener("click", onOpen);
  }, [onOpen]);

  return (
    <div className="h-screen relative">
      <Image
        src="/background.png"
        className="object-cover object-center h-full"
        layout="fill"
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

            <div className="absolute bottom-0 w-full p-4">
              <button className="w-full py-2 px-4 bg-white bg-opacity-20 backdrop-blur-md hover:bg-opacity-40 text-white rounded-md">
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

                    <button id="modalOpener">
                      <Image
                        priority
                        src="/plus.svg"
                        height={56}
                        width={56}
                        alt="Add a task"
                      />
                    </button>
                  </div>

                  <Task tasks_array={tasks_arr} />
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

                  <Note notes_array={notes_arr} />
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
