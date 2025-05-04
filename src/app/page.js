// 'use client'
import { useSession } from "next-auth/react";
import CategorySlider from "./component/categorySlider/CategorySlider";
import VideoList from "./component/Home/VideoList";
import styles from "./page.module.css";

export default function Home() {
  // const data= useSession();
  // console.log(data);
  return (
    <div className="mx-3">
    <CategorySlider/>
    <VideoList/>
    </div>
  );
}
