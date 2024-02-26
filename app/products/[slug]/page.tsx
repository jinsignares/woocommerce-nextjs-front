import Container from '@/components/ui/container';
import { fetcher } from '@/lib/fetch';
import { Product } from '@/types';
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

  return (
    <Container>
      <div className="">ProductPage {found[0].name}</div>
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
