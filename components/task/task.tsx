import { NextPage } from "next";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface TaskInterface {
  name: string;
  time: string;
  key: number;
}

interface Props {
  task: TaskInterface;
  setter: any;
  index: number;
}

export const Task: NextPage<Props> = (props) => {
  return (
    <>
      {/* Item starts */}
      <div className="mb-4 bg-white bg-opacity-[.36] backdrop-blur-md rounded-lg">
        <div className="p-4 pl-4 flex justify-between">
          <div className="text">
            <h2 className={`text-black font-semibold text-3xl`}>
              {props.task.name}
            </h2>
            <h2 className={`text-[#565656] text-2xl`}>{props.task.time}</h2>
          </div>
          <motion.button>
            <Image
              priority
              src="/minus.svg"
              height={48}
              width={48}
              alt="Remove a task"
              onClick={() => {
                props.setter((prevItems: any) => {
                  let arr = [...prevItems];
                  if (props.index > -1) {
                    arr.splice(props.index, 1);
                  }
                  return arr;
                });
              }}
            />
          </motion.button>
        </div>
      </div>
      {/* Item ends */}
    </>
  );
};
