"use client";
import { NextPage } from "next";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { poppins } from "@/app/fonts";
import { useDisclosure } from "@nextui-org/modal";
import CustomModal from "@/components/modal/modal";

export interface ItemInterface {
  title: string;
  subtitle: string;
  notes: string;
  key: number;
}

interface Props {
  items: any;
  setItems: any;
}

const Item: NextPage<Props> = (props) => {
  let items = props.items;
  let setItems = props.setItems;
  const [currentItem, setCurrentItem] = useState({
    title: "",
    subtitle: "",
    notes: "",
    key: 1,
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <motion.ul
        className={`${poppins.className} flex flex-col mt-8`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {items.map((item: ItemInterface, index: number) => {
            return (
              <motion.li
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.2 }}
                exit={{ opacity: 0, y: 10 }}
                key={item.key}
              >
                {/* Item starts */}
                <div className="mb-4 bg-white bg-opacity-[.36] backdrop-blur-md rounded-lg">
                  <div className="p-4 pl-4 flex justify-between">
                    <button
                      onClick={() => {
                        setCurrentItem(item);
                        onOpen();
                      }}
                      className="text-left"
                    >
                      <div className="text">
                        <h2
                          className={`text-black font-semibold text-2xl md:text-3xl`}
                        >
                          {item.title}
                        </h2>
                        <h2 className={`text-[#565656] text-1xl lg:text-2xl`}>
                          {item.subtitle}
                        </h2>
                      </div>
                    </button>

                    <motion.button>
                      <Image
                        src="/minus.svg"
                        height={48}
                        width={48}
                        alt="Remove a task"
                        onClick={() =>
                          setItems((prevItems: any) =>
                            prevItems.filter((_: any, i: any) => i !== index)
                          )
                        }
                      />
                    </motion.button>
                  </div>
                </div>

                {/* Item ends */}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        item={currentItem}
        itemSetter={setCurrentItem}
        onClose={() => {
          setItems((prevItems: any) => {
            return prevItems.map((item: any, _: any) => {
              if (item.key === currentItem.key) {
                return currentItem; // Update subtitle for the specific index
              }
              return item; // Keep other items unchanged
            });
          });
        }}
      />
    </>
  );
};

export default Item;
