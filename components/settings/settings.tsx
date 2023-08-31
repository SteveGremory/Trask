"use client";
import { Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
Textarea;
import React, { Dispatch, useRef } from "react";
import { Store } from "tauri-plugin-store-api";

interface ModalProps {
  store: Store;
  isOpen: any;
  onOpenChange: any;
  onClose: any;
  setter: any;
  setUsername: any;
  setBackground: any;
}

export interface SettingsInterface {
  background_path: string;
  animations: boolean;
  username: string;
}

export const fetchSettings = async (
  settingsStore: Store,
  setSettings: Dispatch<React.SetStateAction<SettingsInterface>>
) => {
  let background: string | null = await settingsStore.get("background");
  let username: string | null = await settingsStore.get("username");
  let animations: boolean | null = await settingsStore.get("animations");

  let settings: SettingsInterface = {
    background_path: "/background.png",
    username: "",
    animations: true,
  };

  if (background) {
    settings = {
      background_path: background,
      username: username ? username : "",
      animations: animations ? animations : false,
    };

    setSettings(settings);
  }

  return settings;
};

export default function Settings(props: ModalProps) {
  const inputFile = useRef<HTMLInputElement | null>(null);

  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      size="2xl"
      classNames={{
        body: "py-6",
        base: "bg-opacity-60 backdrop-blur-md text-black text-opacity-50",
        header: "",
        footer: "",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
      onClose={props.onClose}
    >
      <ModalContent>
        {(onClose) => {
          return (
            <>
              <ModalHeader>
                <h1 className="font-semibold text-5xl pt-4">Settings</h1>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col">
                  <div className="mt-4 flex flex-row justify-between">
                    <h1 className="text-3xl">Change wallpaper</h1>
                    <input
                      type="file"
                      id="file"
                      ref={inputFile}
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files !== null) {
                          const background = e.target.files[0];
                          var reader = new FileReader();

                          reader.addEventListener("load", async function () {
                            props.setBackground(reader.result);
                            await props.store.set("background", reader.result);
                          });

                          if (background) {
                            reader.readAsDataURL(background);
                          }

                          await fetchSettings(props.store, props.setter);
                        }
                      }}
                    />
                    <button
                      className="py-2 px-4 bg-white bg-opacity-20 backdrop-blur-md hover:bg-opacity-40 rounded-md"
                      onClick={(e) => {
                        inputFile.current?.click();
                      }}
                    >
                      Choose image
                    </button>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
}
