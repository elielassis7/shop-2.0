import { keyframes, styled } from '@stitches/react'
import * as Dialog from '@radix-ui/react-dialog'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

export const DialogOverlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  background: 'rgba(0,0,0,0.75)',
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

export const ButtonTrigger = styled('button', {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  '&:focus': { outline: 'none' },
  h2: {
    fontSize: 12,
    backgroundColor: 'Red',
    position: 'relative',
    top: 0,
    right: 12,
    borderRadius: '50%',
    padding: '3px 6px',
  },
})

export const DialogTitle = styled(Dialog.Title, {
  display: 'flex',
  alignItems: 'center',
  margin: '72px 0 32px 50px',
  fontSize: '$xl',
  fontWeight: 700,
  lineHeight: '160%',
  color: '$gray100',
})

export const DialogContent = styled(Dialog.Content, {
  position: 'fixed',
  overflowY: 'scroll',
  top: 0,
  right: 0,
  height: '100vh',
  width: 'calc(100vw / 3)',
  background: '$gray800',
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },
})

export const DialogClose = styled(Dialog.Close, {
  all: 'unset',
  position: 'absolute',
  top: 20,
  right: 20,
  width: 25,
  height: 25,
  background: 'transparent',
  border: 'none',
  color: '$gray300',
  '&:hover': { color: '$gray100' },
  '&:focus': { outline: 'none' },
})

export const ContainerHandBagItems = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '55vh',
  padding: '0 4px',
  margin: '32px 20px',
  gap: 24,
  overflow: 'hidden',
})

export const HandBagItem = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: 93,
  marginLeft: '50px',
  gap: 20,

  img: {
    objectFit: 'cover',
    borderRadius: 6,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  },
})

export const DetailsItems = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  h2: {
    color: `$gray300`,
    fontSize: '$md',
    lineHeight: '160%',
    fontWeight: 400,
  },
  p: {
    color: '$gray100',
    fontWeight: 700,
    fontSize: '$md',
    lineHeight: '160%',
  },
  a: {
    color: '$gray500',
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '160%',
    cursor: 'pointer',
    '&:hover': {
      color: '$gray300',
    },
  },
})

export const ImageNotFound = styled('div', {
  background: 'Black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 93,
  height: 93,
})

export const FooterCart = styled('footer', {
  display: 'flex',
  flexDirection: 'column',
  height: '28vh',
  position: 'relative',
  bottom: 0,
  margin: '0 48px',
  gap: 10,
})

export const LineQuantity = styled('div', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',

  p: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '160%',
    color: '$gray100',
  },
  span: {
    fontSize: '$md',
    fontWeight: 400,
    lineHeight: '160%',
    color: '$gray300',
  },
})

export const LineTotal = styled('div', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',

  p: {
    fontSize: '$md',
    fontWeight: 700,
    lineHeight: '160%',
    color: '$gray100',
  },
  span: {
    fontSize: '$xl',
    fontWeight: 700,
    lineHeight: '140%',
    color: '$gray300',
  },
})

export const ButtonBuy = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',

  padding: '20px 32px',
  borderRadius: 8,
  background: '$green500',

  fontSize: '$md',
  fontWeight: 700,
  lineHeight: '160%',
  color: '$white',

  cursor: 'pointer',
})
