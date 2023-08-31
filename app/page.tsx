"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Item, { ItemInterface, refetch } from "@/components/item/item";
import Date from "@/components/date/date";
import CustomModal from "@/components/modal/modal";
import { useDisclosure } from "@nextui-org/modal";
import { raleway } from "./fonts";
import { v4 as uuidv4 } from "uuid";
import { Store } from "tauri-plugin-store-api";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentItem, setCurrentItem] = useState<ItemInterface>({
    title: "",
    subtitle: "",
    notes: "",
    key: "",
  });
  const [tasks, setTasks] = useState<ItemInterface[]>([]);
  const [notes, setNotes] = useState<ItemInterface[]>([]);

  const noteStore = useMemo(() => new Store(".notes.dat"), []);
  const taskStore = useMemo(() => new Store(".tasks.dat"), []);

  const [itemType, setItemType] = useState("tasks");

  React.useEffect(() => {
    refetch(taskStore, setTasks);
    refetch(noteStore, setNotes);

    setItemType("tasks");
  }, [taskStore, noteStore]);

  return (
    <div className="h-auto relative">
      <Image
        src="/background.png"
        className="object-cover object-center h-auto"
        fill
        alt="Background"
      />
      {/* Outer Flexbox for the division into 25:75 */}
      <div className="flex flex-row">
        {/* Sidebar content goes here */}
        <div className="hidden lg:block w-1/4 left-0 top-0 h-screen bg-white bg-opacity-20 backdrop-blur-md">
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
          <div className="sm:flex lg:pl-10 lg:pr-10">
            <div className="h-screen p-8 sm:w-1/2 text-left ">
              <div className="bg-[#969696] bg-opacity-50 backdrop-blur-md h-full rounded-lg flex flex-col overflow-auto">
                <div className="mt-8 m-6">
                  <div
                    className={`flex justify-between text-white font-normal text-4xl ${raleway.className}`}
                  >
                    <h2 className={`font-semibold text-5xl lg:text-6xl`}>
                      Tasks
                    </h2>

                    <button
                      onClick={() => {
                        setCurrentItem({
                          title: "",
                          subtitle: "",
                          notes: "",
                          key: "",
                        });
                        onOpen();
                        setItemType("task");
                      }}
                    >
                      <Image
                        priority
                        src="/plus.svg"
                        height={48}
                        width={48}
                        alt="Add a task"
                      />
                    </button>
                  </div>

                  <Item items={tasks} store={taskStore} setItems={setTasks} />
                </div>
              </div>
            </div>

            <div className="h-screen p-8 sm:w-1/2 text-left ">
              <div className="bg-[#969696] bg-opacity-50 backdrop-blur-md h-full rounded-lg flex flex-col overflow-auto">
                <div className="mt-8 m-6">
                  <div
                    className={`flex justify-between text-white font-normal text-4xl ${raleway.className}`}
                  >
                    <h2 className={`font-semibold text-5xl lg:text-6xl`}>
                      Notes
                    </h2>

                    <button
                      onClick={() => {
                        setCurrentItem({
                          title: "",
                          subtitle: "",
                          notes: "",
                          key: "",
                        });
                        onOpen();
                        setItemType("note");
                      }}
                    >
                      <Image
                        priority
                        src="/plus.svg"
                        height={48}
                        width={48}
                        alt="Add a note"
                      />
                    </button>
                  </div>

                  <Item items={notes} store={noteStore} setItems={setNotes} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        item={currentItem}
        itemSetter={setCurrentItem}
        onClose={async () => {
          if (!currentItem.title) {
            return;
          }

          if (itemType === "task") {
            currentItem.key = uuidv4();
            await taskStore.set(currentItem.key, currentItem);

            await refetch(taskStore, setTasks);
          } else {
            currentItem.key = uuidv4();
            await noteStore.set(currentItem.key, currentItem);

            await refetch(noteStore, setNotes);
          }
        }}
      />
    </div>
  );
}
