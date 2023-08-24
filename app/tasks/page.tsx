import Image from "next/image";
import { poppins, raleway } from "../layout";
import { Task, TaskInterface } from "@/components/task/task";
import { Note, NoteInterface } from "@/components/notes/notes";

function getdateformatted() {
  var days = [
    "Sundaay",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = new Date();

  let day_name: string = days[date.getDay()];
  let todays_date: number = date.getDate();
  let month: string = months[date.getMonth()];

  return `${day_name}, ${todays_date} ${month}`;
}

const tasks = [
  {
    name: "Code",
    time: "10:00AM, 27th Feb, 2024",
  },
  {
    name: "Read",
    time: "11:00AM, 27th Feb, 2024",
  },
  {
    name: "Eat",
    time: "12:00PM, 27th Feb, 2024",
  },
  {
    name: "Sleep",
    time: "1:00PM, 27th Feb, 2024",
  },
  {
    name: "Repeat",
    time: "2:00PM, 27th Feb, 2024",
  },
];

const notes = [
  {
    name: "C++ Pt. 1",
    time: "10:00AM, 27th Feb, 2024",
  },
  {
    name: "C++ Pt. 2",
    time: "11:00AM, 27th Feb, 2024",
  },
  {
    name: "C++ Pt. 3",
    time: "12:00PM, 27th Feb, 2024",
  },
  {
    name: "C++ Pt. 4",
    time: "1:00PM, 27th Feb, 2024",
  },
  {
    name: "C++ Pt. 5",
    time: "2:00PM, 27th Feb, 2024",
  },
];

export default function Home() {
  return (
    <div className="h-screen relative">
      <Image
        src="/background.png"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt="Background"
      />
      {/* Outer Flexbox for the division into 20:80 */}
      <div className="flex flex-row">
        {/* Sidebar content goes here */}
        <div className="hidden md:block w-1/4 left-0 top-0 h-screen bg-white bg-opacity-20 backdrop-blur-md">
          <div className="">
            <div
              className={`mt-8 m-4 text-white font-normal text-left text-5xl ${raleway.className}`}
            >
              <h2>Good Evening,</h2>
              <h1 className={`font-semibold`}>Steve!</h1>

              <h1 className={`mt-2 text-2xl ${raleway.className} font-normal`}>
                {getdateformatted()}
              </h1>
            </div>

            <div className="absolute bottom-0 w-full p-4">
              <button className="w-full py-2 px-4 bg-white bg-opacity-20 backdrop-blur-md hover:bg-opacity-40 text-white rounded-md">
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="sm:flex pl-10 pr-10">
            <div className="h-screen p-8 sm:w-1/2 text-left ">
              <div className="bg-[#969696] bg-opacity-50 backdrop-blur-md h-full rounded-lg flex flex-col overflow-auto">
                <div className="mt-8 m-6">
                  <div
                    className={`flex justify-between text-white font-normal text-4xl ${raleway.className}`}
                  >
                    <h2 className={`font-semibold text-6xl`}>Tasks</h2>

                    <button>
                      <Image
                        priority
                        src="/plus.svg"
                        height={56}
                        width={56}
                        alt="Add a task"
                      />
                    </button>
                  </div>

                  <ul className={`${poppins.className} flex flex-col mt-8`}>
                    {tasks.map((task: TaskInterface) => (
                      <li key={task.name}>
                        <Task name={task.name} time={task.time} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="h-screen p-8 sm:w-1/2 text-left ">
              <div className="bg-[#969696] bg-opacity-50 backdrop-blur-md h-full rounded-lg flex flex-col overflow-auto">
                <div className="mt-8 m-6">
                  <div
                    className={`flex justify-between text-white font-normal text-4xl ${raleway.className}`}
                  >
                    <h2 className={`font-semibold text-6xl`}>Notes</h2>

                    <button>
                      <Image
                        priority
                        src="/plus.svg"
                        height={56}
                        width={56}
                        alt="Add a task"
                      />
                    </button>
                  </div>

                  <ul className={`${poppins.className} flex flex-col mt-8`}>
                    {notes.map((note: NoteInterface) => (
                      <li key={note.name}>
                        <Note name={note.name} time={note.time} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
