/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CarouselContainer,
  HomeContainer,
  Product,
  arrow,
  arrowDisabled,
  arrowLeft,
  arrowRight,
} from '../styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import 'keen-slider/keen-slider.min.css'
import { stripe } from '../lib/stripe'
import Stripe from 'stripe'
import { GetStaticProps } from 'next'
import Handbag from '../assets/Handbag-Bold.svg'
import React, { useState } from 'react'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
    sku: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    slides: {
      perView: 3,
      spacing: 48,
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer>
        <CarouselContainer ref={sliderRef} className="keen-slider">
          {products.map((product) => {
            return (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                prefetch={false}
              >
                <Product className="keen-slider__slide">
                  <Image
                    src={product.imageUrl}
                    width={520}
                    height={480}
                    alt=""
                    priority={true}
                  />
                  <footer>
                    <div>
                      <strong>{product.name}</strong>
                      <span>{product.price}</span>
                    </div>
                    <button>
                      <Image src={Handbag} alt="" />
                    </button>
                  </footer>
                </Product>
              </Link>
            )
          })}
        </CarouselContainer>
        {loaded && instanceRef && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={currentSlide === -1}
            />
          </>
        )}
      </HomeContainer>
    </>
  )
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  const disabledClass = props.disabled ? arrowDisabled : ''
  const arrowDirection = props.left ? arrowLeft : arrowRight
  return (
    <svg
      onClick={props.onClick}
      className={`${arrow} ${arrowDirection} ${disabledClass}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 33 33"
    >
      {props.left && (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.7344 26.8146C20.3418 27.2031 19.7087 27.1998 19.3202 26.8072L9.37242 16.7553C8.98393 16.3627 8.98723 15.7296 9.37978 15.3411L19.4317 5.39331C19.8243 5.00482 20.4574 5.00812 20.8459 5.40067C21.2344 5.79323 21.2311 6.42638 20.8386 6.81487L11.4974 16.0592L20.7418 25.4004C21.1302 25.793 21.1269 26.4261 20.7344 26.8146Z"
          fill="#C4C4CC"
        />
      )}
      {!props.left && (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289L22.7071 15.2929C23.0976 15.6834 23.0976 16.3166 22.7071 16.7071L12.7071 26.7071C12.3166 27.0976 11.6834 27.0976 11.2929 26.7071C10.9024 26.3166 10.9024 25.6834 11.2929 25.2929L20.5858 16L11.2929 6.70711C10.9024 6.31658 10.9024 5.68342 11.2929 5.29289Z"
          fill="#C4C4CC"
        />
      )}
    </svg>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const priceDefault = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format((priceDefault.unit_amount || 0) / 100),
      defaultPriceId: priceDefault.id,
      sku: product.metadata.SKU,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }
}
