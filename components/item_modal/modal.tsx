import { Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Store } from "tauri-plugin-store-api";
import { useEffect, useState } from "react";
import AutosizeInput from "react-input-autosize";

import { ItemInterface } from "@/interfaces/interfaces";

interface ModalProps {
  onOpenChange: any;
  isOpen: any;
  onClose: any;

  item: ItemInterface;
  itemSetter: any;

  store: Store;
}

export default function ItemModal(props: ModalProps) {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const tagsStorage = props.item.tags;
      if (tagsStorage) {
        setTags(tags);
      }
    };

    fetchTags();
  }, [props.item.tags, tags]);

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
                    <div className="flex flex-row justify-between">
                      <AutosizeInput
                        inputClassName="font-regular bg-transparent text-2xl placeholder-current outline-none word"
                        placeholder="Subtitle"
                        value={props.item.subtitle}
                        onChange={(e) =>
                          props.itemSetter({
                            ...props.item,
                            subtitle: e.target.value,
                          })
                        }
                      />
                      <Button
                        className="text-1xl rounded-md bg-white bg-opacity-20 px-3 py-3 text-black text-opacity-50 backdrop-blur-md hover:bg-opacity-40 sm:hidden "
                        onPress={onModalClose}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 hidden flex-row justify-between md:flex">
                    <div className="flex flex-row">
                      <ul className="overflow-inline mt-2 max-w-2xl overflow-x-scroll whitespace-nowrap">
                        {tags.map((tag, index) => {
                          return (
                            <li
                              key={index}
                              className="mr-2 inline overflow-x-auto"
                            >
                              <AutosizeInput
                                name="form-field-name"
                                value={tag}
                                inputClassName="p-1 pl-3 pr-3 outline-none  break-keep rounded-full bg-white text-xl text-black text-opacity-50"
                                onChange={(e) => {
                                  let newTags = [...tags];
                                  newTags[index] = e.target.value.trim();
                                  setTags(newTags);
                                }}
                                onBlur={(e) => {
                                  if (!e.target.value) {
                                    let newTags = [...tags];
                                    newTags.splice(index, 1);
                                    setTags(newTags);
                                  }
                                }}
                              />
                            </li>
                          );
                        })}
                      </ul>

                      <Button
                        className="mt-2 bg-transparent"
                        isIconOnly
                        onPress={() => {
                          // add to tags
                          setTags((prevtags) => [...prevtags, "Tag Name"]);
                        }}
                      >
                        <Image
                          priority
                          src="/plus.svg"
                          height={32}
                          width={32}
                          alt="Add something"
                        />
                      </Button>
                    </div>

                    <Button
                      className="rounded-md bg-white bg-opacity-20 px-6 py-6 text-2xl text-black text-opacity-50 backdrop-blur-md hover:bg-opacity-40"
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
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
}
