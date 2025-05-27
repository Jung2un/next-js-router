import { ReactNode } from "react";
import Head from "next/head";
import fetchBooks from "@/lib/fetch-books";
import BookItem from "@/components/book-item";
import SearchLayout from "@/components/search-layout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q;
  const books = await fetchBooks(q as string);

  return {
    props: {
      books,
    }
  }
}

export default function Page({books}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>목록 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="목록 - 검색결과" />
        <meta property="og:description" content="등록된 도서를 만나보세요" />
      </Head>
      <div>
        {books.map((item) => (
          <BookItem key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>
}