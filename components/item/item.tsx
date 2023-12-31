import { useState, Dispatch, SetStateAction } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useDisclosure } from "@nextui-org/modal";
import { Store } from "tauri-plugin-store-api";
import { ItemInterface } from "@/interfaces/interfaces";
import { fetchItems } from "@/helpers/fetchers";
import { poppins } from "@/app/fonts";
import ItemModal from "@/components/item_modal/modal";

interface Props {
  items: ItemInterface[];
  setItems: Dispatch<SetStateAction<ItemInterface[]>>;
  store: Store;
  settingsStore: Store;
}

const Item: NextPage<Props> = (props) => {
  let items = props.items;
  let store = props.store;
  const [currentItem, setCurrentItem] = useState<ItemInterface>({
    title: "",
    subtitle: "",
    notes: "",
    key: "",
    tags: [],
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <motion.ul
        className={`${poppins.className} no-scrollbar mt-8 flex flex-col`}
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
                <div className="mb-4 rounded-lg bg-white bg-opacity-[.36] backdrop-blur-md">
                  <div className="flex justify-between p-4 pl-4">
                    <button
                      onClick={() => {
                        setCurrentItem(item);
                        onOpen();
                      }}
                      className="text-left"
                    >
                      <div className="text">
                        <h2
                          className={`text-2xl ${
                            item.title ? "text-opacity-100" : "text-opacity-50"
                          } font-semibold text-black md:text-3xl`}
                        >
                          {item.title ? item.title : "No title"}
                        </h2>
                        <h2 className={`text-1xl text-[#565656] lg:text-2xl`}>
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
                          await store.delete(item.key);
                          props.setItems(await fetchItems(store));
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

      <ItemModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        item={currentItem}
        itemSetter={setCurrentItem}
        store={props.settingsStore}
        onClose={async () => {
          await store.set(currentItem.key, currentItem);
          props.setItems(await fetchItems(store));
        }}
      />
    </>
  );
};

export default Item;
