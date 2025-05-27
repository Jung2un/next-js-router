import {ReactNode} from "react";
import {InferGetStaticPropsType} from "next";
import style from "./index.module.css";
import Head from "next/head";
import fetchBooks from "@/lib/fetch-books";
import BookItem from "@/components/book-item";
import SearchLayout from "@/components/search-layout";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getStaticProps = async () => {
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

export default function Home({allBooks, randomBooks}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>목록</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="목록" />
        <meta property="og:description" content="등록된 도서를 만나보세요" />
      </Head>
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
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>
};