import { postTodo } from "@app/src/helpers/api.helpers";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { useSession } from "next-auth/react";
import { useState } from "react";

function Create() {
  const { data: session } = useSession();
  const [dueDate, setDueDate] = useState(new Date().toISOString());
  const [request, setRequest] = useState({
    title: "",
    description: "",
  });

  const onFormChange = (e) => {
    console.log(e.target.value);

    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });

    console.log(request);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const emailObject = {
      email: session?.user?.email,
      dueDate: dueDate,
    };

    const newObject = { ...request, ...emailObject };
    // console.log(newObject);
    const { error, status, hasil } = await postTodo(newObject);

    console.log(error);
    console.log(status);
    console.log(hasil);
  };

  const setTimeValue = (date) => {
    const isoFormat = new Date(date).toISOString();
    setDueDate(isoFormat);
    console.log(isoFormat);
  };

  return (
    <div className="bg-neutral-200 min-h-screen flex justify-center items-center">
      {/* <h1>{dueDate}</h1> */}
      <div className="w-96">
        <form action="" onSubmit={onFormSubmit} className="flex flex-col gap-5">
          <div className="formGroup">
            <label htmlFor="title" className="myLabel">
              Title
            </label>

            <input
              type="text"
              className="myForm"
              placeholder="Title"
              name="title"
              id="title"
              onChange={onFormChange}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="description" className="myLabel">
              Description
            </label>
            <textarea
              id="description"
              className="myForm"
              name="description"
              placeholder="Description"
              onChange={onFormChange}
            ></textarea>
          </div>
          <div className="formGroup">
            <label htmlFor="" className="myLabel">
              Due Date
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
              <MobileDateTimePicker
                format="DD MMMM YYYY HH:mm"
                // value={dueDate || ""}
                value={dayjs(dueDate)}
                className="myForm"
                // onChange={(newValue) => setValue(newValue)}
                onChange={(newValue) => setTimeValue(newValue)}
              />
            </LocalizationProvider>
          </div>
          <button className="myButton bg-gray-500 text-yellow-300">
            Create Todo
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
