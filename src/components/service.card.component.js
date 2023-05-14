import Image from "next/image";
import Link from "next/link";

export default function ServiceCardComponent(props) {
  const { id, username, email, name, gender, job, company, image } = props;
  return (
    <Link
      href={`/service/${id}`}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 duration-200"
    >
      <Image
        className="object-cover w-full"
        width={200}
        height={400}
        src={image}
      />
      <div className="p-3">
        {/* <div>{username}</div> */}
        <h3 className="font-bold">{name}</h3>
        <div>{email}</div>
        <div>{gender}</div>
        <div>{job}</div>
        <div>{company}</div>
      </div>
    </Link>
  );
}
