import ProductCardComponents from "@app/src/components/product.card.components";
import { ApiStatus } from "@app/src/enum/enum";
import axios from "axios";
import React, { useEffect, useState } from "react";

function index() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(ApiStatus.isEmpty);
  const [params, setParams] = useState({
    skip: 1,
    limit: 12,
  });
  const url = "https://dummyjson.com/products";

  const getData = async () => {
    setStatus(ApiStatus.isLoading);
    await axios
      .get(url, {
        params: {
          ...params,
        },
      })
      .then((res) => {
        console.log(res.data);
        const product = res.data?.products;
        setData(product);
        if (data) {
          setStatus(ApiStatus.isLoaded);
        } else {
          setStatus(ApiStatus.isEmpty);
        }
      })
      .catch((err) => {
        console.error(err);
        setStatus(ApiStatus.isError);
      });
  };

  useEffect(() => {
    getData();
  }, [params]);

  const nextPage = () => {
    setParams({ ...params, skip: params.skip + params.limit });
  };

  const prevPage = () => {
    setParams({ ...params, skip: params.skip - params.limit });
  };
  return (
    <div className=" px-36 py-32 min-h-screen" data-theme="cupcake">
      <div
        className={`${
          status === ApiStatus.isEmpty ? "block" : "hidden"
        } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        <div className="text-4xl font-bold">Loading Data ...</div>
      </div>
      <div className={`${status === ApiStatus.isLoaded ? "block" : "hidden"}`}>
        <div className="grid grid-cols-4 gap-10">
          {data.map((dt, idx) => {
            return (
              <ProductCardComponents
                id={dt.id}
                title={dt.title}
                description={dt.description}
                thumbnail={dt.thumbnail}
                price={dt.price}
                rating={dt.rating}
                key={idx}
              />
            );
          })}
        </div>
        <div className="flex justify-center mt-8 gap-4">
          <button
            className="bg-lime-400 rounded-full py-2 px-3 text-gray-600"
            onClick={prevPage}
          >
            {" "}
            Previous Page{" "}
          </button>
          <button
            className="bg-gray-400 rounded-full py-2 px-3"
            onClick={nextPage}
          >
            {" "}
            Next Page{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default index;
