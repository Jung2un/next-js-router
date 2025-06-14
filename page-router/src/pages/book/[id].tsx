import Head from "next/head";
import { useRouter } from "next/router";
import fetchOneBook from "@/lib/fetch-one-book";
import style from './[id].module.css';
import {GetStaticPropsContext, InferGetStaticPropsType} from "next";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1"} },
      { params: { id: "2"} },
      { params: { id: "3"} },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  return {
    props: {
      book,
    }
  }
}

export default function Page({book}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>목록</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="목록" />
          <meta property="og:description" content="등록된 도서를 만나보세요" />
        </Head>
        <div>로딩중입니다</div>
      </>
    );
  }
  if (!book) return "문제가 발생했습니다 다시 시도하세요";

  const {
    id,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl
  } = book;

  return (
    <>
      <Head>
        <title>{title} 상세결과</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div className={style.img_container} style={{backgroundImage: `url('${coverImgUrl}')`}}>
          <img src={coverImgUrl}/>
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          <div>{author} | {publisher}</div>
        </div>
        <div className={style.description}>{description}</div>

      </div>
    </>
  );
}