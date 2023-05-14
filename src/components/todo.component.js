import React from "react";
import { deleteTodo, formatDate, getTodo } from "../helpers/api.helpers";
import { ApiStatus } from "../enum/enum";
import { useSession } from "next-auth/react";

function TodoComponent(props) {
  const { data: session } = useSession();
  const { id, title, description, dueDate, finished, onDelete } = props;

  const onDeleteClicked = async (id) => {
    console.log(id);
    const { error, status, hasil } = await deleteTodo(id, session.user?.email);
    onDelete(status, error);
  };

  return (
    <div className="myCard my-4 w-full text-justify flex flex-col gap-3">
      <div className="flex  border-b-2 w-full py-1 items-center">
        <p className="text-left font-mono w-full">{title}</p>
        <button
          className="bg-red-600 rounded-full px-2 text-white"
          onClick={() => onDeleteClicked(id)}
        >
          Delete
        </button>
      </div>
      <p className="font-light">{description}</p>
      <div className=" flex justify-between w-full">
        <div className="text-sm bg-amber-300 rounded-full px-3">
          <p>{`Due Date : ${formatDate(dueDate, "DD MMMM YYYY HH:mm")}`}</p>
        </div>
        {finished && (
          <div className="text-sm bg-blue-800 rounded-full px-3 text-lime-300">
            <p>{`Finished : ${formatDate(finished, "DD MMMM YYYY HH:mm")}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoComponent;
