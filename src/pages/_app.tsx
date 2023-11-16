import { AppProps } from 'next/app'
import { GlobalStyle } from '../styles/global'

import LogoImg from '../assets/logo.svg'
import Handbag from '../assets/Handbag-Bold.svg'
import { Container, Header } from '@/styles/pages/app'

import Image from 'next/image'

GlobalStyle()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={LogoImg} alt="" />
        <Image src={Handbag} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
