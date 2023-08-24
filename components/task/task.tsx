import Image from "next/image";

export interface TaskInterface {
  name: string;
  time: string;
}

export function Task(task: TaskInterface) {
  return (
    <>
      {/* Item starts */}
      <div className="mb-4 bg-white bg-opacity-[.36] backdrop-blur-md rounded-lg">
        <div className="p-4 pl-4 flex justify-between">
          <div className="text">
            <h2 className={`text-black font-semibold text-3xl`}>{task.name}</h2>
            <h2 className={`text-[#565656] text-2xl`}>{task.time}</h2>
          </div>
          <button>
            <Image
              priority
              src="/minus.svg"
              height={48}
              width={48}
              alt="Add a task"
            />
          </button>
        </div>
      </div>
      {/* Item ends */}
    </>
  );
}
