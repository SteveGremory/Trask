import { NextPage } from "next";
import Image from "next/image";

export interface TaskInterface {
  name: string;
  time: string;
}

interface Props {
  task: TaskInterface;
  tasksArray: TaskInterface[];
  setter: any;
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
          <button>
            <Image
              priority
              src="/minus.svg"
              height={48}
              width={48}
              alt="Remove a task"
              onClick={() => {
                let arr = [...props.tasksArray];
                const index = arr.indexOf(props.task, 0);
                if (index > -1) {
                  arr.splice(index, 1);
                }
                props.setter(arr);
              }}
            />
          </button>
        </div>
      </div>
      {/* Item ends */}
    </>
  );
};
