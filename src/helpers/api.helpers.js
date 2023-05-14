import axios from "axios";
import { ApiStatus } from "../enum/enum";
import moment from "moment";

export const getApi = async (url, params = null) => {
  var data = [];
  var error = null;
  var status = ApiStatus.isLoading;
  try {
    await axios
      .get(url, params)
      .then((res) => {
        const isEmpty =
          typeof res?.data?.data === "undefined" ||
          typeof res?.data?.data !== "object" ||
          Object.keys(res?.data?.data).length == 0;

        console.log(isEmpty);
        // if (res.data.data.length > 0 || res.data) status = ApiStatus.isLoaded;
        if (isEmpty) status = ApiStatus.isEmpty;
        else status = ApiStatus.isLoaded;
        data = res.data;
      })
      .catch((err) => {
        status = ApiStatus.isError;
        error = err.message;
      });
  } catch (err) {
    status = ApiStatus.isError;
    if (err.response) {
      error = err.response;
    } else {
      console.log(`Error : ${err.message}`);
      error = err.message;
    }
  }
  return { error, status, data };
};

export const postApi = async (url, data, header = {}) => {
  var hasil = [];
  var error = null;
  var status = ApiStatus.isLoading;
  try {
    await axios
      .post(url, data, header)
      .then((res) => {
        console.log(res);
        status = res.status;
        hasil = res.data.data;
        status = ApiStatus.isCreated;
      })
      .catch((err) => {
        // console.error(err.response.data.details);
        status = ApiStatus.isError;
        error = err.response.data.details;
      });
  } catch (err) {
    status = ApiStatus.isError;
    error = err.message;
  }
  return { error, status, hasil };
};

export const deleteApi = async (url) => {
  var hasil = [];
  var error = null;
  var status = ApiStatus.isLoading;
  try {
    await axios
      .delete(url)
      .then((res) => {
        console.log(res);
        status = res.status;
        hasil = res.data.data;
        status = ApiStatus.isDeleted;
      })
      .catch((err) => {
        // console.error(err.response.data.details);
        status = ApiStatus.isError;
        error = err.response.data.details;
      });
  } catch (err) {
    status = ApiStatus.isError;
    error = err.message;
  }
  return { error, status, hasil };
};

export async function getTodos(email) {
  //   const filteredEmail = email;
  const { error, status, data } = await getApi(
    "http://localhost:3000/api/todos",
    {
      params: {
        limit: "",
        orderBy: "dueDate",
        orderMethod: "asc",
        whereKey: "email",
        whereValue: email,
      },
    }
  );
  //   const { error, status, data } = await getApi(
  //     "http://localhost:3000/api/todos?limit=&orderBy=dueDate&orderMethod=asc&whereKey=email&whereValue=f000bima@gmail.com",
  //     {param}
  //   );

  //   console.log(error);
  //   console.log(status);
  console.log(data);

  return { error, status, data };
}

export async function getTodo(id, email) {
  let { error, status, data } = await getApi(
    `http://localhost:3000/api/todos/${id}`
  );

  //   console.log(data?.data.email);
  if (data?.data?.email !== email) {
    error = [ApiStatus.isUnAuthenticate];
    status = ApiStatus.isUnAuthenticate;
    data = null;
  }

  return { error, status, data };
}
export async function postTodo(body) {
  var { error, status, hasil } = await postApi(
    "http://localhost:3000/api/todos",
    { todo: body }
  );
  console.log("isCreated", status);
  //   const isLoaded = status;
  return { error, status, hasil };

  // return { error, isLoaded, data };
}

export async function deleteTodo(id, email) {
  var { error, status, hasil } = await getTodo(id, email);

  if (status === ApiStatus.isUnAuthenticate) {
    var error = [ApiStatus.isUnAuthenticate];
    var status = ApiStatus.isUnAuthenticate;
    var hasil = null;
    return { error, status, hasil };
  }
  var { error, status, hasil } = await deleteApi(
    `http://localhost:3000/api/todos/${id}`
  );
  return { error, status, hasil };
}

export const formatDate = (date, format) => {
  //   const rawdate = new Date(date);
  const rawdate = new Date(date).toISOString();
  const formatedDate = moment(rawdate).format(format);
  return formatedDate;
};
