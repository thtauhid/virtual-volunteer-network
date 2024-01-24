import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
  title: string;
  details?: string;
  number?: number;
  button?: {
    title: string;
    href: string;
  };
};

export default function Card(props: Props) {
  return (
    <div className="border p-4">
      <div className="flex items-center">
        <h2>{props.title}</h2>{" "}
        {props.number && (
          <div className="border rounded-full p-2">{props.number}</div>
        )}
      </div>
      <p className="p-4">{props.details}</p>
      {props.button && (
        <Link href={props.button.href} className="px-4">
          <Button>{props.button.title}</Button>
        </Link>
      )}
    </div>
  );
}
