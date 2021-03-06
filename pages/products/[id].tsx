import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Product, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { buttonCLS } from "@libs/client/utils";
import Image from "next/image";
import client from "@libs/server/client";

interface ProductWithUser extends Product {
    user: User;
}

interface ItemDetailResponse {
    ok: boolean;
    product: ProductWithUser;
    relatedProducts: Product[];
    isLiked: boolean;
}

const ItemDetail: NextPage<ItemDetailResponse> = ({product, relatedProducts, isLiked}) => {
    const router = useRouter();
    const { mutate } = useSWRConfig();
    const { data, mutate:boundMutate } = useSWR<ItemDetailResponse>(router.query.id ? `/api/products/${router.query.id}` : null);
    const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
    const onFavoriteClick = () => {
        if(!data) return;
        boundMutate({...data, isLiked:!data.isLiked},false);
        //첫번째 인자에 있는 data로 덮어씀 / true면 덮어쓰고 바로 재검증 , false면 추가 동작이 있기전까지 덮어쓴 상태 유지
        //mutate("/api/users/me", (prev: any) => ({ ok: !prev.ok }), false);
        //mutate("/api/users/me") --> refetch
        toggleFav({});
    };
    return (
        <Layout canGoBack>
            <div className="px-4 py-10">
                <div className="mb-8">
                    <div className="relative pb-80">
                        <Image 
                            className="bg-slate-300 object-cover" 
                            src={`https://imagedelivery.net/PKS1sEm5sdAMOXOi2yIXuA/${product?.image}/public`}
                            alt={`${product?.name}`}
                            layout="fill"
                        />
                    </div>
                    <div className="flex cursor-pointer py-3 boreder-t border-b items-center space-x-3">
                        <Image
                            src={`https://imagedelivery.net/PKS1sEm5sdAMOXOi2yIXuA/${product?.user?.avatar}/avatar`}
                            alt="avatar"
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-full bg-slate-300" 
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-700 ">{product?.user?.name || <Skeleton/>}</p>
                            <Link href={`/users/profiles/${product?.user?.id}`}>
                                <a className="text-xs font-medium text-gray-500 ">View profile &rarr;</a>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h1 className="text-3xl font-bold text-gray-900">{product?.name || <Skeleton/>}</h1>
                        <span className="text-2xl block mt-4 text-gray-900">${product?.price || <Skeleton/>}</span>
                        <p className="text-base my-6 text-gray-700">{product?.description || <Skeleton/>}</p>
                        <div className="flex items-center justify-between space-x-2">
                            <Button large text="Talk to seller" />
                            <button 
                                onClick={onFavoriteClick} 
                                className={buttonCLS(
                                    "p-3 flex items-center justify-center rounded-md hover:bg-gray-100",
                                    isLiked ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-gray-500"
                                )}
                            >
                                {isLiked ? 
                                    < svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-6 w-6" 
                                        viewBox="0 0 20 20" 
                                        fill="currentColor"
                                        >
                                        < path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                :
                                    <svg
                                        className="h-6 w-6 "
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
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        {relatedProducts?.map((product) => (
                            <div key={product.id}>
                                <Link href={`/products/${product.id}`}>
                                    <a>
                                        <div className="h-56 w-full mb-4 bg-slate-300" />
                                        <h3 className="-mb-1 text-gray-700">{product.name}</h3>
                                        <span className="text-sm font-medium text-gray-900 ">${product.price}</span>
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = () => {
    return {
      paths: [],
      fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    if (!ctx?.params?.id) {
      return {
        props: {},
      };
    }
    const product = await client.product.findUnique({
        where: {
            id: ctx.params.id.toString(),
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                },
            },
        },
    });
    const terms = product?.name.split(" ").map((word) => ({
        name: {
            contains: word,
        },
    }));
    const relatedProducts = await client.product.findMany({
        where: {
            OR: terms,
            AND: {
                id: {
                    not: product?.id,
                },
            },
        },
    });
    const isLiked = false;
    await new Promise((resolve) => setTimeout(resolve, 10000));
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
            isLiked,
        },
    };
};

export default ItemDetail;