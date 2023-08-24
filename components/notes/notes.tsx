import { NextPage } from "next";
import Image from "next/image";

export interface NoteInterface {
  name: string;
  time: string;
  key: number;
}
interface Props {
  note: NoteInterface;
  index: number;
  setter: any;
}

export const Note: NextPage<Props> = (props) => {
  return (
    <>
      {/* Item starts */}
      <div className="mb-4 bg-white bg-opacity-[.36] backdrop-blur-md rounded-lg">
        <div className="p-4 pl-4 flex justify-between">
          <div className="text">
            <h2 className={`text-black font-semibold text-3xl`}>
              {props.note.name}
            </h2>
            <h2 className={`text-[#565656] text-2xl`}>{props.note.time}</h2>
          </div>
          <button>
            <Image
              priority
              src="/minus.svg"
              height={48}
              width={48}
              alt="Add a Note"
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
          </button>
        </div>
      </div>
      {/* Item ends */}
    </>
  );
};
