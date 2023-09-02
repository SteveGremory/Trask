"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useDisclosure } from "@nextui-org/modal";
import { v4 as uuidv4 } from "uuid";
import { Store } from "tauri-plugin-store-api";

import Item from "@/components/item/item";
import Date, { getGreeting } from "@/components/date/date";
import ItemModal from "@/components/item_modal/modal";
import Settings from "@/components/settings/settings";

import { raleway } from "./fonts";
import { ItemInterface } from "@/interfaces/interfaces";
import { fetchItems, fetchSettings } from "@/helpers/fetchers";

export default function Home() {
  const {
    isOpen: isItemModalOpen,
    onOpen: onItemModalOpen,
    onOpenChange: onItemModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isSettingsModalOpen,
    onOpen: onSettingsModalOpen,
    onOpenChange: onSettingsModalOpenChange,
  } = useDisclosure();

  const settingsStore: Store = useMemo(() => new Store(".settings.dat"), []);
  const noteStore: Store = useMemo(() => new Store(".notes.dat"), []);
  const taskStore: Store = useMemo(() => new Store(".tasks.dat"), []);

  const [currentItem, setCurrentItem] = useState<ItemInterface>({
    title: "",
    subtitle: "",
    notes: "",
    key: "",
    tags: [],
  });

  const [tasks, setTasks] = useState<ItemInterface[]>([]);
  const [notes, setNotes] = useState<ItemInterface[]>([]);

  const [username, setUsername] = useState<string>("");
  const [background, setBackground] = useState<string>("");

  const [itemType, setItemType] = useState("tasks");

  React.useEffect(() => {
    fetchSettings(settingsStore).then((settings) => {
      if (background !== settings.background_path) {
        setBackground(settings.background_path);
      }
      if (username !== settings.username) {
        setUsername(settings.username);
      }
    });

    fetchItems(taskStore).then((tasks) => setTasks(tasks));
    fetchItems(noteStore).then((notes) => setNotes(notes));

    setItemType("tasks");
  }, [taskStore, noteStore, settingsStore, background, username]);

  const handleItemClick = (type: string) => {
    setCurrentItem({
      title: "",
      subtitle: "",
      notes: "",
      key: "",
      tags: [],
    });
    setItemType(type);
    onItemModalOpen();
  };

  return (
    <div className="relative h-auto">
      <Image
        src={background}
        className="h-auto object-cover object-center"
        fill
        alt="Background"
      />
      {/* Outer Flexbox for the division into 25:75 */}
      <div className="flex flex-row">
        {/* Sidebar content goes here */}
        <div className="left-0 top-0 hidden h-screen w-1/4 bg-white bg-opacity-20 backdrop-blur-md lg:block">
          <div>
            <div
              className={`m-4 mt-8 text-left text-5xl font-normal text-white ${raleway.className}`}
            >
              <h2>{getGreeting()},</h2>
              <input
                className="bg-transparent text-4xl font-semibold placeholder-current outline-none"
                placeholder="Type a username"
                value={username}
                onChange={async (e) => {
                  setUsername(e.target.value);
                  await settingsStore.set("username", e.target.value);
                }}
              />
              <Date />
            </div>
          </div>

          <div className="absolute bottom-0 flex-1 p-4 ">
            <button
              onClick={() => onSettingsModalOpen()}
              className="rounded-md bg-white bg-opacity-20 px-4 py-2 text-white backdrop-blur-md hover:bg-opacity-40"
            >
              Settings
            </button>
          </div>
        </div>

        <div className="flex-1">
          <div className="sm:flex lg:pl-10 lg:pr-10">
            <div className="h-screen p-8 text-left sm:w-1/2 ">
              <div className="flex h-full flex-col overflow-auto rounded-lg bg-[#969696] bg-opacity-50 backdrop-blur-md">
                <div className="m-6 mt-8">
                  <div
                    className={`flex justify-between text-4xl font-normal text-white ${raleway.className}`}
                  >
                    <h2 className={`text-5xl font-semibold lg:text-6xl`}>
                      Tasks
                    </h2>

                    <button onClick={() => handleItemClick("task")}>
                      <Image
                        priority
                        src="/plus.svg"
                        height={48}
                        width={48}
                        alt="Add a task"
                      />
                    </button>
                  </div>

                  <Item
                    items={tasks}
                    setItems={setTasks}
                    store={taskStore}
                    settingsStore={settingsStore}
                  />
                </div>
              </div>
            </div>

            <div className="h-screen p-8 text-left sm:w-1/2 ">
              <div className="flex h-full flex-col overflow-auto rounded-lg bg-[#969696] bg-opacity-50 backdrop-blur-md">
                <div className="m-6 mt-8">
                  <div
                    className={`flex justify-between text-4xl font-normal text-white ${raleway.className}`}
                  >
                    <h2 className={`text-5xl font-semibold lg:text-6xl `}>
                      Notes
                    </h2>

                    <button onClick={() => handleItemClick("note")}>
                      <Image
                        priority
                        src="/plus.svg"
                        height={48}
                        width={48}
                        alt="Add a note"
                      />
                    </button>
                  </div>

                  <Item
                    items={notes}
                    setItems={setNotes}
                    store={noteStore}
                    settingsStore={settingsStore}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Settings
        store={settingsStore}
        isOpen={isSettingsModalOpen}
        onOpenChange={onSettingsModalOpenChange}
        setUsername={setUsername}
        setBackground={setBackground}
        onClose={async () => {
          await settingsStore.save();
        }}
      />

      <ItemModal
        isOpen={isItemModalOpen}
        onOpenChange={onItemModalOpenChange}
        item={currentItem}
        itemSetter={setCurrentItem}
        store={settingsStore}
        onClose={async () => {
          if (!currentItem.title) {
            return;
          }

          currentItem.key = uuidv4();
          if (itemType === "task") {
            // Don't use .then() in a async function
            await taskStore.set(currentItem.key, currentItem);
            setTasks(await fetchItems(taskStore));
          } else {
            await noteStore.set(currentItem.key, currentItem);
            setNotes(await fetchItems(noteStore));
          }
        }}
      />
    </div>
  );
}
