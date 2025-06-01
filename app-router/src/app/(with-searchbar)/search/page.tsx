import {Suspense} from "react";
import {BookData} from "@/types";
import {delay} from "@/util/delay";
import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

async function SearchResult ({q}: {q: string}) {
  await delay(1500);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    {cache: "force-cache"}
  )
  if (!res.ok) {
    return <div>오류가 발생했습니다</div>
  }

  const books: BookData[] = await res.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export async function generateMetadata({searchParams}: { searchParams: Promise<{ q?: string } >}) {
  const { q } = await searchParams;
  return {
    title: `${q}: 도서 목록 검색`,
    description: `${q}의 검색 결과입니다`,
    openGraph: {
      title: `${q}: 도서 목록 검색`,
      description: `${q}의 검색 결과입니다`,
      images: ["/thumbnail.png"],
    }
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  return (
    <Suspense
      key={q}
      fallback={<BookListSkeleton count={3}/>}
    >
      <SearchResult q={q} />
    </Suspense>
  );
}
