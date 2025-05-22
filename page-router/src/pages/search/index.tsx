import { ReactNode } from "react";
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
    <div>
      {books.map((item) => (
        <BookItem key={item.id} {...item} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>
}