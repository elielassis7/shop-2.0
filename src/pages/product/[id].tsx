import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'
import React, { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useShoppingCart } from 'use-shopping-cart'

interface ProductProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
    sku: string
  }
}

export default function Product({ products }: ProductProps) {
  const { isFallback } = useRouter()
  const { addItem } = useShoppingCart()
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)

  if (isFallback) {
    return <p>Loading...</p>
  }

  const product = {
    name: products.name,
    id: products.defaultPriceId,
    price: Number(products.price.replace(/[^0-9.-]+/g, '')),
    image: products.imageUrl,
    currency: 'BRL',
    description: products.description,
    sku: products.sku,
    quantity: 1,
    value: Number(products.price.replace(/[^0-9.-]+/g, '')) * 1,
    formattedValue: products.price,
    formattedPrice: products.price,
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckout(true)

      addItem(product)
    } catch (error) {
      setIsCreatingCheckout(false)
      alert(`Falha ao adicionar item a sacola`)
    }
  }

  return (
    <>
      <Head>
        <title>{products.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={products.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{products.name}</h1>
          <span>{products.price}</span>
          <p>{products.description}</p>

          <button disabled={isCreatingCheckout} onClick={handleBuyProduct}>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_Ow5f8IFyd9d807' } }],
    fallback: true,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id ? params.id : ''

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const priceDefault = product.default_price as Stripe.Price

  return {
    props: {
      products: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format((priceDefault.unit_amount || 0) / 100),
        description: product.description,
        defaultPriceId: priceDefault.id,
        sku: product.metadata.SKU,
      },
    },
    revalidate: 60 * 60 * 1, // 1hour
  }
}
