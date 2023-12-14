import HandbagImg from '../../assets/Handbag-Bold.svg'
import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import {
  HandBagItem,
  ContainerHandBagItems,
  DetailsItems,
  ImageNotFound,
  ButtonTrigger,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogTitle,
  FooterCart,
  LineQuantity,
  LineTotal,
  ButtonBuy,
} from '../../styles/components/handBag'
import { useShoppingCart } from 'use-shopping-cart'
import { WarningCircle, X } from 'phosphor-react'
import axios from 'axios'
import { MagicMotion } from 'react-magic-motion'

export function HandBag() {
  const { cartDetails, removeItem, totalPrice, cartCount } = useShoppingCart()

  const cartTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format((totalPrice || 0) / 100)

  async function handleToCheckout() {
    if (cartCount !== undefined && cartCount > 0) {
      try {
        const response = await axios.post('/api/checkout', {
          cartDetails,
        })
        const { checkoutUrl } = response.data
        window.location.href = checkoutUrl
      } catch (error) {
        console.error(error)
      }
    } else {
      alert('Carrinho vazio, por favor adicione algum item.')
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ButtonTrigger>
          <Image src={HandbagImg} alt="" />

          {cartCount !== 0 ? <h2>{cartCount}</h2> : ''}
        </ButtonTrigger>
      </Dialog.Trigger>
      <MagicMotion>
        <Dialog.Portal>
          <DialogOverlay />
          <DialogContent>
            <DialogClose>
              <X size={20} />
            </DialogClose>

            <DialogTitle>Sacola de compras</DialogTitle>

            <ContainerHandBagItems>
              {cartDetails && Object.keys(cartDetails).length > 0 ? (
                Object.keys(cartDetails).map((sku) => {
                  const product = cartDetails[sku]

                  return (
                    <HandBagItem key={sku}>
                      {product.image ? (
                        <Image
                          src={product.image}
                          width={93}
                          height={93}
                          alt=""
                        />
                      ) : (
                        <ImageNotFound>
                          <WarningCircle size={32} />{' '}
                        </ImageNotFound>
                      )}
                      <DetailsItems>
                        <h2>{product.name}</h2>
                        <p>Preço: {product.formattedValue}</p>
                        <a onClick={() => removeItem(product.id)}>Remover</a>
                      </DetailsItems>
                    </HandBagItem>
                  )
                })
              ) : (
                <h1>Não há itens na sacola</h1>
              )}
            </ContainerHandBagItems>
            <FooterCart>
              <LineQuantity>
                <p>Quantidade</p>
                <span>{cartCount} items</span>
              </LineQuantity>
              <LineTotal>
                <p>Valor Total</p>
                <span>{cartTotal}</span>
              </LineTotal>
              <ButtonBuy disabled={totalPrice === 0} onClick={handleToCheckout}>
                Finalizar compra
              </ButtonBuy>
            </FooterCart>
          </DialogContent>
        </Dialog.Portal>
      </MagicMotion>
    </Dialog.Root>
  )
}
