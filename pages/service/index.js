import ServiceCardComponent from "@app/src/components/service.card.component";
import axios from "axios";

export default function index(props) {
  const { data, pagination } = props;
  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-200 ">
      <div className="py-32">
        <div className="grid grid-cols-4 gap-5">
          {data.map((dt) => {
            const name = `${dt.firstName} ${dt.maidenName} ${dt.lastName} `;
            const job = dt?.company?.title;
            const company = dt?.company?.name;
            return (
              <ServiceCardComponent
                key={dt.id}
                id={dt.id}
                username={dt.username}
                email={dt.email}
                name={name}
                gender={dt.gender}
                job={job}
                company={company}
                image={dt.image}
              />
            );
          })}
        </div>
      </div>

      {/* <pre>{JSON.stringify(props.data, null, 2)}</pre> */}
    </div>
  );
}

export async function getServerSideProps() {
  const response = await axios
    .get("https://dummyjson.com/users")
    .then((result) => {
      console.log(result.data.users);
      const data = result.data;
      const users = data?.users;
      //   const pagination = result.data.pagination;
      return {
        pagination: {
          limit: data?.limit ?? 10,
          skip: data?.skip ?? 0,
          total: data?.total ?? 0,
        },
        data: users ?? [],
      };
    })
    .catch({
      pagination: {
        limit: 10,
        skip: 0,
        total: 0,
      },
      data: [],
    });
  return {
    props: {
      ...response,
    },
  };
}
