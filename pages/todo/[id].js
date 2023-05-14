import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function index(props) {
  let { data, id } = props;
  return (
    <div className="min-h-screen bg-neutral-200 p-20">
      {/* <div className="flex justify-between bg-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="w-6/12">
          <Carousel className="" autoPlay={true} infiniteLoop={true}>
            {data.images?.map((image, idx) => {
              return (
                <div key={idx}>
                  <img src={image} className="" />
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="w-6/12 p-8">
          <div className="">
            <h1 className="font-bold">{data.title}</h1>
          </div>
          <div className="">{data.description}</div>
          <div className="">{data.price}</div>
          <div className="">{data.discountPercentage}</div>
          <div className="">{data.rating}</div>
          <div className="">{data.stock}</div>
          <div className="">{data.brand}</div>
          <div className="">{data.category}</div>
        </div>
      </div> */}
      <h1>{id}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export async function getStaticPaths() {
  let paths = [];
  const url = "http://localhost:3000/api/todos";
  await axios.get(url).then((res) => {
    paths = res.data?.data;
  });

  if (Array.isArray(paths) && paths.length > 0) {
    paths = paths.map((item) => ({
      params: {
        id: `${item?.id}`,
      },
    }));
  }

  return {
    paths: paths ?? [],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  let { id } = context.params;
  let data = {};
  const url = "http://localhost:3000/api/todos";

  await axios.get(`${url}/${id}`).then((res) => {
    data = res?.data?.data;
    console.log(data);
    // const users = res?.data?.users;
    const isEmpty =
      typeof data === "undefined" &&
      typeof data !== "object" &&
      Object.keys(data).length == 0;

    if (!isEmpty) {
      data = data;
    }
  });
  return {
    props: {
      data: data,
      id: id,
    },
  };
}
