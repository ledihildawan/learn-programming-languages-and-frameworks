import Link from "next/link";
import Image from "next/image";

function Card(props: { href: string; name: string; imgUrl: string }) {
  return (
    <Link href={props.href} className="border-gray-200 rounded-xl">
      <div className="glass rounded-xl pt-1 px-4 pb-5">
        <div className="my-3">
          <h2 className="overflow-ellipsis whitespace-nowrap text-xl font-extrabold overflow-hidden text-purple-950">
            {props.name}
          </h2>
        </div>
        <div>
          <img
            className="rounded-xl max-w-full object-cover"
            src={props.imgUrl}
            alt={props.name}
          />
        </div>
      </div>
    </Link>
  );
}

export default Card;
