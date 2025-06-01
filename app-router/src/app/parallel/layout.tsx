import {ReactNode} from "react";
import Link from "next/link";

export default function Layout({children, sidebar}: { children: ReactNode, sidebar: ReactNode }) {
  return (
    <div>
      <div>
        <Link href={"/parallel"}>parallel</Link>
        <br />

      </div>
      {sidebar}
      {children}
    </div>
  );
}