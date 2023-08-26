"use client";
import { NextPage } from "next";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { poppins } from "@/app/fonts";

export interface ItemInterface {
  name: string;
  subtitle: string;
  key: number;
}

interface Props {
  items: ItemInterface[];
}

const Item: NextPage<Props> = (props) => {
  const [items, setItems] = useState(props.items);

  return (
    <>
      <motion.ul
        className={`${poppins.className} flex flex-col mt-8`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {items.map((item: ItemInterface, index: number) => (
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
                  <div className="text">
                    <h2
                      className={`text-black font-semibold text-2xl md:text-3xl`}
                    >
                      {item.name}
                    </h2>
                    <h2 className={`text-[#565656] text-1xl lg:text-2xl`}>
                      {item.subtitle}
                    </h2>
                  </div>
                  <motion.button>
                    <Image
                      src="/minus.svg"
                      height={48}
                      width={48}
                      alt="Remove a task"
                      onClick={() =>
                        setItems((prevItems) =>
                          prevItems.filter((_, i) => i !== index)
                        )
                      }
                    />
                  </motion.button>
                </div>
              </div>
              {/* Item ends */}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
};

export default Item;
