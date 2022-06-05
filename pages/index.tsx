import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "./../components/header/Header";
import ProductList from "./../components/List/ProductList";
import Featured from "./../components/featured/Featured";

const Home: NextPage = () => {
  return (
    <div className="2xl:px-24 lg:px-6 px-4 ">
      <Head>
        <title>Bejamas_Task</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Featured />
      <ProductList />
    </div>
  );
};

export default Home;
