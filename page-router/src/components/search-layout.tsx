import {useRouter} from "next/router";
import {ReactNode, useEffect, useState} from "react";
import style from './search-layout.module.css';

export default function SearchLayout({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const id = router.query.q as string;

  const onSubmit = () => {
    if (!search || id === search) return;
    router.push(`/search?q=${search}`);
  }

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      onSubmit();
    }
  }

  useEffect(() => {
    setSearch(id || "");
  }, [id]);

  return (
    <>
      <div className={style.container}>
        <input
          value={search}
          onChange={onChangeValue}
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력하세요..."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </>
  )
}