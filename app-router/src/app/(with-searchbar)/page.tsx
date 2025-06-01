import {Metadata} from "next";
import {Suspense} from "react";
import {BookData} from "@/types";
import {delay} from "@/util/delay";
import style from "./page.module.css";
import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

async function AllBooks() {
  await delay(1500);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    {cache: "force-cache"}
  );
  if (!res.ok) {
    return <div>오류가 발생했습니다</div>
  }
  const allBooks: BookData[] = await res.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RandomBooks() {
  await delay(3000);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    {next: {revalidate: 3}}
  );
  if (!res.ok) {
    return <div>오류가 발생했습니다</div>
  }
  const randomBooks: BookData[] = await res.json();

  return (
    <div>
      {randomBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "도서 목록",
  description: "등록된 도서를 조회해보세요",
  openGraph: {
    title: "도서 목록",
    description: "등록된 도서를 조회해보세요",
    images: ['/thumbnail.png'],
  }
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3}/>}>
          <RandomBooks/>
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={5}/>}>
          <AllBooks/>
        </Suspense>
      </section>
    </div>
  );
}
