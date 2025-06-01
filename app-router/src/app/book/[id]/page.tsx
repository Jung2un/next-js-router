import {BookData, ReviewData} from "@/types";
import style from "./page.module.css";
import {notFound} from "next/navigation";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";
import Image from "next/image";

// ssg
export function generateStaticParams () {
  return [{id: "1"}, {id: "2"}, {id: "3"}];
}

async function BookDetail({bookId}: {bookId: string}) {
  // dynamic
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  )
  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다</div>
  }
  const book = await res.json();
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image
          src={coverImgUrl}
          width={240}
          height={300}
          alt={`도서 ${title}의 표지`}
        />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );

}

async function ReviewList({bookId}: {bookId: string}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    {next: {tags: [`review-${bookId}`]}}
  );

  if(!res.ok) {
    throw new Error(`Review fetch failed: ${res.statusText}`);
  }
  const reviews: ReviewData[] = await res.json();

  return (
    <section>
      {reviews.map((item) => (
        <ReviewItem key={`review-item-${item.id}`} {...item} />
      ))}
    </section>
  );
}

export async function generateMetadata({params}: { params: Promise<{ id: string }>}) {
  const {id} = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  )

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const book: BookData = await res.json();
  
  return {
    title: `${book.title} -  도서목록`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} -  도서목록`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    }
  }
}

export default async function Page({
   params,
 }: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}