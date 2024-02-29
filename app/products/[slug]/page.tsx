import Container from '@/components/ui/container';
import { fetcher } from '@/lib/fetch';
import { Product } from '@/types';
import Image from 'next/image';
import React from 'react';

type Props = {
  params: { slug: string };
  product: Product;
};

const ProductPage = async ({ params }: Props) => {
  const productsRes = await fetcher(
    `/wp-json/wc/v3/products?slug=${params?.slug}`,
  );

  const found = await productsRes.json();
  console.log(found[0]);
  return (
    <Container>
      <div className="hover:text-primaryPurple flex flex-col items-center justify-center p-3 transition-all duration-100 ease-in-out hover:cursor-pointer">
        <div className="transform-origin-0/0 relative h-80 w-full overflow-hidden hover:scale-110">
          <Image
            src={found[0].images[0].src}
            alt={found[0].images[0].alt}
            fill
            className="transition-visible transform-origin-0/0 h-full w-full object-cover transition-transform"
          />
        </div>
        <p className="text-primaryText pb-0.25 m-1 self-auto text-base text-purple-500 transition-all duration-100 ease-in-out">
          {found[0].name}
        </p>
        <div className={`mx-auto flex w-full items-center justify-center`}>
          {!found[0].sale_price.length ? (
            <p
              className={`text-primaryText font-bold ${
                found[0].on_sale ? 'line-through' : 'no-underline'
              } md:text-md m-0.25 text-base sm:text-sm lg:text-lg xl:text-xl ${
                found[0].on_sale ? 'opacity-50' : 'opacity-90'
              }`}
            >
              {found[0].price}
            </p>
          ) : (
            <>
              <p
                className={`text-primaryText font-bold ${
                  found[0].on_sale ? 'line-through' : 'no-underline'
                } md:text-md m-0.25 text-base sm:text-sm lg:text-lg xl:text-xl ${
                  found[0].on_sale ? 'opacity-50' : 'opacity-90'
                }`}
              >
                {found[0].price}
              </p>
              <p
                className={`text-primaryText md:text-md m-0.25 text-base font-bold opacity-90 sm:text-sm lg:text-lg xl:text-xl`}
              >
                {found[0].sale_price}
              </p>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export async function generateStaticParams() {
  const productsRes = await fetcher(`/wp-json/wc/v3/products?per_page=30`);
  const products = await productsRes.json();

  const publishedProducts = products.filter(
    (product: { [key: string]: string }) => {
      return product.status === 'publish';
    },
  );

  return publishedProducts.map((product: Product) => {
    return { slug: String(product.slug) };
  });
}

export default ProductPage;
