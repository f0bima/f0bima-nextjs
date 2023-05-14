import CreateTodoComponent from "@app/src/components/createTodo.component";
import TodoComponent from "@app/src/components/todo.component";
import { ApiStatus } from "@app/src/enum/enum";
import { getTodos } from "@app/src/helpers/api.helpers";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function index(props) {
  const { data: session, status: sessionStatus } = useSession();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(ApiStatus.isGetdata);

  useEffect(() => {
    if (status === ApiStatus.isGetdata && sessionStatus === "authenticated") {
      getData();
    }
  }, [status, sessionStatus]);

  const getData = async () => {
    setStatus(ApiStatus.isLoading);
    const { error, status, data } = await getTodos(session?.user?.email);
    console.log(status);
    setData(data?.data);
    setStatus(status);
    // return status;
  };

  const onUpdate = (status, error) => {
    if (status !== ApiStatus.isError || status !== ApiStatus.isUnAuthenticate) {
      setStatus(ApiStatus.isGetdata);
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center bg-neutral-200 px-20 py-20"
      data-theme="cupcake"
    >
      <div className="flex justify-center items-center gap-5 h-full mt-12 w-full">
        <div className="myCard w-4/12 h-full flex flex-col justify-around">
          <h2 className="font-black text-center text-3xl">Create Todo</h2>
          <CreateTodoComponent
            className="h-full"
            onCreate={(status, error) => {
              onUpdate(status, error);
            }}
          />
        </div>
        <div className="myCard w-8/12 h-full p-0 overflow-hidden flex justify-center items-center">
          <div
            className={`${status === ApiStatus.isEmpty ? "block" : "hidden"}`}
          >
            Data Kosong, silahkan buat todo
          </div>
          <div
            className={`${status === ApiStatus.isLoading ? "block" : "hidden"}`}
          >
            IsLoading
          </div>
          <ul
            className={`${
              status === ApiStatus.isLoaded ? "block" : "hidden"
            } overflow-y-auto h-full scrollbar p-10 w-full`}
          >
            {data?.map((dt) => {
              return (
                <TodoComponent
                  key={dt.id}
                  id={dt.id}
                  title={dt.title}
                  description={dt.description}
                  dueDate={dt.dueDate}
                  finished={dt.finished}
                  onDelete={(status, error) => {
                    onUpdate(status, error);
                  }}
                />
              );
            })}
          </ul>
        </div>
      </div>

      {/* <div className="toast">
        <div className="alert alert-info">
          <div>
            <span>New message arrived.</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
