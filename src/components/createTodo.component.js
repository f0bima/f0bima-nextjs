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
import { IoIosWarning } from "react-icons/io";

function CreateTodoComponent(props) {
  const { data: session } = useSession();
  const [error, setError] = useState([]);
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

    props.onCreate(status, error);
    setError(error);
    // console.log(error);
    // console.log(status);
    // console.log(hasil);
  };

  const setTimeValue = (date) => {
    const isoFormat = new Date(date).toISOString();
    setDueDate(isoFormat);
    console.log(isoFormat);
  };

  return (
    <>
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

      {error?.map((err, idx) => {
        return (
          <div className="toast" key={idx}>
            <div className="alert alert-warning">
              <div>
                <IoIosWarning className="w-10 h-10" />
                <span>{err?.message}</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CreateTodoComponent;
