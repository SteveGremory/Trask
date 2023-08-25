"use client";
import { poppins } from "@/app/fonts";
import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

export interface NoteInterface {
  name: string;
  time: string;
  key: number;
}
interface Props {
  notes_array: NoteInterface[];
}

const Note: NextPage<Props> = (props) => {
  const [notes, setNotes] = useState(props.notes_array);
  return (
    <>
      <motion.ul
        className={`${poppins.className} flex flex-col mt-8`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence>
          {notes.map((note: NoteInterface, index: number) => (
            <motion.li
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.2 }}
              exit={{ opacity: 0, y: 10 }}
              key={note.key}
            >
              {/* Item starts */}
              <div className="mb-4 bg-white bg-opacity-[.36] backdrop-blur-md rounded-lg">
                <div className="p-4 pl-4 flex justify-between">
                  <div className="text">
                    <h2 className={`text-black font-semibold text-3xl`}>
                      {note.name}
                    </h2>
                    <h2 className={`text-[#565656] text-2xl`}>{note.time}</h2>
                  </div>
                  <motion.button>
                    <Image
                      priority
                      src="/minus.svg"
                      height={48}
                      width={48}
                      alt="Remove a note"
                      onClick={() =>
                        setNotes((prevNotes) =>
                          prevNotes.filter((_, i) => i !== index)
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

export default Note;
