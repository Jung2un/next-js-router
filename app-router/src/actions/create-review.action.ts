'use server';

import {revalidatePath} from "next/cache";

export async function createReviewAction (_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요",
    }
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
      method: "POST",
      body: JSON.stringify({bookId, content, author})
    });
    if(!res.ok) {
      throw new Error(res.statusText);
    }

    // 태그 기준 데이터 캐시 재검증
    revalidatePath(`review-${bookId}`);

    return  {
      status: true,
      error: "",
    }
  } catch (err) {
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다: ${err}`,
    }
  }
}