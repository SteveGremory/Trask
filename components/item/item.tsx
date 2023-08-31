"use client";
import { NextPage } from "next";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, Dispatch, SetStateAction } from "react";
import { poppins } from "@/app/fonts";
import { useDisclosure } from "@nextui-org/modal";
import CustomModal from "@/components/modal/modal";
import { Store } from "tauri-plugin-store-api";

export interface ItemInterface {
  title: string;
  subtitle: string;
  notes: string;
  key: string;
}

interface Props {
  items: ItemInterface[];
  setItems: Dispatch<SetStateAction<ItemInterface[]>>;
  store: Store;
}

export const refetch = async (
  store: Store,
  setAllItems: Dispatch<SetStateAction<ItemInterface[]>>
) => {
  await store.entries().then((y) => {
    setAllItems(y.map((pair) => pair[1] as ItemInterface));
  });
  await store.save();
};

const Item: NextPage<Props> = (props) => {
  let items = props.items;
  let store = props.store;
  const [currentItem, setCurrentItem] = useState<ItemInterface>({
    title: "",
    subtitle: "",
    notes: "",
    key: "",
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
                        onClick={async () => {
                          console.log(
                            "DELETE: ",
                            item.key,
                            await store.delete(item.key)
                          );
                          await refetch(store, props.setItems);
                        }}
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
        onClose={async () => {
          await store.set(currentItem.key, currentItem);
          await refetch(store, props.setItems);
        }}
      />
    </>
  );
};

export default Item;
