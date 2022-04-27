import type { NextPage } from 'next'
import Layout from "@components/layout"
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import useUser from '@libs/client/useUser';
import Head from "next/head";
import useSWR from 'swr';
import { Product } from '@prisma/client';
import Image from 'next/image';
import boo from "../public/boo.png";

export interface ProductWithCount extends Product {
  _count:{
    favs:number;
  }
}

interface ProductResponse {
  ok:boolean;
  products: ProductWithCount[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductResponse>("/api/products");
  return (
    <Layout title='홈' hasTabBar>
      <Head>
        <title>HOME</title>
      </Head>
      <div className='flex flex-col space-y-5 py-10'>
        {data?.products?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price}
            hearts={product._count.favs}
          />
        ))}
        <FloatingButton href='/products/upload'>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
      <Image src={boo} alt="boo" width={500} height={500} placeholder="blur" quality={5} />
    </Layout>
  ); 
}

export default Home