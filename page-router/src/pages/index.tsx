import { ReactNode } from "react";
import style from "./index.module.css";
import fetchBooks from "@/lib/fetch-books";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";
import SearchLayout from "@/components/search-layout";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getServerSideProps = async () => {
  const [allBooks, randomBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ])

  return {
    props: {
      allBooks,
      randomBooks,
    },
  };
}

export default function Home({allBooks, randomBooks}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <section className={style.title}>
        <h3>지금 추천하는 도서</h3>
        {randomBooks.map((item) => (
          <BookItem key={item.id} {...item} />
        ))}
      </section>
      <section className={style.title}>
        <h3>등록된 모든 도서</h3>
        <div>
          {allBooks.map((item) => (
            <BookItem key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>
};