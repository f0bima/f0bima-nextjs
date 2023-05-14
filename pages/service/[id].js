import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function index(props) {
  let { data, id } = props;
  const name = `${data.firstName} ${data.maidenName} ${data.lastName} `;
  const company = data.company;
  return (
    <div className="min-h-screen bg-neutral-200 p-20 flex justify-center items-center">
      <div className="flex justify-between bg-white rounded-2xl overflow-hidden shadow-2xl">
        <img src={data.image} className="w-4/12 object-cover" />
        <div className="w-8/12 p-8 flex flex-col justify-between gap-2">
          <div className="">
            <h1 className="font-bold">{name}</h1>
          </div>
          <div className="border-b-2">
            <div className="">{`Umur = ${data.age}`}</div>
            <div className="">{`Domisili = ${data.address.city}`}</div>
            <div className="">{`Alumni = ${data.university}`}</div>
          </div>
          <div className="border-b-2">
            <p>Contact</p>
            <div className="">{`${data.phone} | ${data.email}`}</div>
          </div>
          <div className="">
            <p>Pekerjaan</p>
            <div className="">{`${company.title} - ${company.name}`}</div>
            {/* <div className="">{company.department}</div> */}

            <div className="">
              {`${company.address.address} ${company.address.city}`}{" "}
            </div>
            <div className="">{company.address.postalCode}</div>
          </div>
        </div>
      </div>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}

export async function getStaticPaths() {
  let paths = [];
  const url = "https://dummyjson.com/users";
  await axios.get(url).then((res) => {
    paths = res.data?.users;
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
  let data = null;
  const url = "https://dummyjson.com/users";

  await axios.get(`${url}/${id}`).then((res) => {
    const users = res?.data;
    // const users = res?.data?.users;
    const isEmpty =
      typeof users === "undefined" &&
      typeof users !== "object" &&
      Object.keys(users).length == 0;

    if (!isEmpty) {
      data = users;
    }
  });
  return {
    props: {
      data: data,
      id: id,
    },
  };
}
