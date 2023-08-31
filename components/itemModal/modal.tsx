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
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ItemInterface } from "../item/item";
import { SimpleMdeReact, SimpleMDEReactProps } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

interface ModalProps {
  onOpenChange: any;
  isOpen: any;
  item: ItemInterface;
  itemSetter: any;
  onClose: any;
}

export default function CustomModal(props: ModalProps) {
  const [value, setValue] = useState("Initial value");

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

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
        {(onClose) => {
          return (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <div className="">
                  <form name="Modal Form">
                    <div className="title flex flex-col">
                      <input
                        className="text-6xl font-semibold bg-transparent outline-none placeholder-current"
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
                        className="text-2xl font-regular bg-transparent outline-none placeholder-current"
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

                    {/*
                    <div className="mt-8"></div>
                    <div className="tags flex flex-row">
                      <button className="bg-white rounded-full text-2xl p-2 pl-4 pr-4 text-black">
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
                      */}

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
