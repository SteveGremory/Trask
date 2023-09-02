import { Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
Textarea;
import React, { useRef } from "react";
import { Store } from "tauri-plugin-store-api";

interface ModalProps {
  store: Store;
  isOpen: any;
  onOpenChange: any;
  onClose: any;
  setUsername: any;
  setBackground: any;
}

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
                <h1 className="pt-4 text-5xl font-semibold">Settings</h1>
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

                          reader.addEventListener("load", async () => {
                            props.setBackground(reader.result);
                            await props.store.set("background", reader.result);
                          });

                          if (background) {
                            reader.readAsDataURL(background);
                          }
                        }
                      }}
                    />
                    <button
                      className="rounded-md bg-white bg-opacity-20 px-4 py-2 backdrop-blur-md hover:bg-opacity-40"
                      onClick={() => {
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
