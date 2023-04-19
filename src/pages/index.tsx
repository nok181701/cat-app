import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { GetServerSideProps } from "next";

const inter = Inter({ subsets: ["latin"] });

interface SerchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

const fetchCatImage = async (): Promise<SerchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json();
  return result[0];
};
interface IndexPageProps {
  initialCatImageUrl: string;
}

export default function Home({ initialCatImageUrl }: IndexPageProps) {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);

  const hundleClick = async () => {
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
  };
  return (
    <div className={styles.container}>
      <h1>猫画像アプリ</h1>
      <img src={catImageUrl} width={500} height="auto" />
      <button onClick={hundleClick}>今日の猫さん</button>
    </div>
  );
}
//SSR
export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};
