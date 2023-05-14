import Image from "next/image";
import Link from "next/link";

function ProductCardComponents(props) {
  const { id, title, description, thumbnail, price, rating } = props;
  return (
    <Link
      href={"/product/" + id}
      className="rounded-2xl bg-white aspect-square shadow-lg hover:shadow-2xl overflow-hidden hover:scale-105 duration-300"
    >
      <Image
        className="aspect-square object-cover w-full"
        src={thumbnail}
        width={200}
        height={200}
      />
      {/* <div className="">{title}</div> */}
      {/* <div className="">{description}</div> */}
      <div className="">{price}</div>
      <div className="">{rating}</div>
    </Link>
  );
}

export default ProductCardComponents;
