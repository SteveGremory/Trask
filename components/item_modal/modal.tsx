"use client";
import { Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import Image from "next/image";
import { ItemInterface } from "@/interfaces/interfaces";

import { Button } from "@nextui-org/button";

interface ModalProps {
  onOpenChange: any;
  isOpen: any;
  item: ItemInterface;
  itemSetter: any;
  onClose: any;
}

export default function CustomModal(props: ModalProps) {
  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      size="5xl"
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
        {(onModalClose) => {
          return (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <div className="">
                  <form name="Modal Form">
                    <div className="title flex flex-col">
                      <input
                        className="bg-transparent text-6xl font-semibold placeholder-current outline-none"
                        placeholder="Title"
                        value={props.item.title}
                        onChange={(e) =>
                          props.itemSetter({
                            ...props.item,
                            title: e.target.value,
                          })
                        }
                      />

                      <input
                        className="font-regular bg-transparent text-2xl placeholder-current outline-none"
                        placeholder="Subtitle"
                        value={props.item.subtitle}
                        onChange={(e) =>
                          props.itemSetter({
                            ...props.item,
                            subtitle: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mt-8 flex flex-row justify-between">
                      <div className="tags flex flex-row">
                        <button className="rounded-full bg-white p-2 pl-4 pr-4 text-2xl text-black">
                          tags
                        </button>
                        <button className="ml-2">
                          <Image
                            priority
                            src="/plus.svg"
                            height={32}
                            width={32}
                            alt="Add something"
                          />
                        </button>
                      </div>

                      <Button
                        className="rounded-md bg-white bg-opacity-20 px-4 py-2 text-2xl text-white backdrop-blur-md hover:bg-opacity-40"
                        onPress={onModalClose}
                      >
                        Submit
                      </Button>
                    </div>

                    <div className="mt-8"></div>
                    <Textarea
                      label="Notes"
                      id="md-text-area"
                      labelPlacement="inside"
                      size="lg"
                      minRows={8}
                      placeholder="Add some notes!"
                      className="max-w"
                      classNames={{
                        label: "text-3xl md:text-6xl font-semibold",
                        input: "text-1xl md-text-area bg-transparent",
                      }}
                      value={props.item.notes}
                      onChange={(e) =>
                        props.itemSetter({
                          ...props.item,
                          notes: e.target.value,
                        })
                      }
                    />
                  </form>
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
