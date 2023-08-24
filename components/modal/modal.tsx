import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";

export default function CustomModal(props: any) {
  const [title, setTitle] = React.useState("");
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
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>
            <ModalBody>
              <div className="flex flex-col">
                <div className="title">
                  <h1 className="text-6xl font-semibold">Title</h1>
                  <h1 className="text-2xl font-regular mt-2">
                    Date, Start time - End time
                  </h1>
                </div>

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
                      alt="Add a task"
                    />
                  </button>
                </div>

                <div className="mt-8"></div>

                <div className="notes">
                  <Textarea
                    label="Notes"
                    labelPlacement="inside"
                    size="lg"
                    minRows={8}
                    placeholder="Add some notes!"
                    className="max-w"
                    classNames={{
                      label: "text-6xl text-black font-semibold",
                      input: "text-1xl",
                    }}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
