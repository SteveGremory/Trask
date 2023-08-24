import { NextPage } from "next";
import Image from "next/image";

export interface NoteInterface {
  name: string;
  time: string;
}
interface Props {
  note: NoteInterface;
  noteArray: NoteInterface[];
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
                let arr = [...props.noteArray];
                const index = arr.indexOf(props.note, 0);
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
