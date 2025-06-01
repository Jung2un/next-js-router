import "./globals.css";
import Link from "next/link";
import {BookData} from "@/types";
import style from "./layout.module.css";
import {ReactNode} from "react";

async function Footer() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {cache: "force-cache"}
  );
  if (!res.ok) {
    return <footer>제작 @jungeun</footer>
  }

  const books: BookData[] = await res.json();
  const bookCount = books.length;

  return (
    <footer>
      <div>제작 @jungeun</div>
      <div>{bookCount}개의 도서가 등록되어 있습니다.</div>
    </footer>
  )
}

export default function RootLayout({
                                     children,
                                     modal
                                   }: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="ko">
    <body>
    <div className={style.container}>
      <header>
        <Link href={"/"}>📚</Link>
      </header>
      <main>{children}</main>
      <Footer/>
    </div>
    {modal}
    <div id="modal-root"></div>
    </body>
    </html>
  );
}
