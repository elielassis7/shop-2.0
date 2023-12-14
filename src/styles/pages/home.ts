import { css } from '@stitches/react'
import { styled } from '..'

export const HomeContainer = styled('main', {
  position: 'relative',
  marginLeft: 'auto',
})

export const CarouselContainer = styled('div', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',

  minHeight: 656,
})

export const SkeletonLoading = styled('div', {
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: 'AliceBlue',
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    div: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: 7,

      strong: {
        fontSize: '$lg',
        color: '$gray100',
      },

      span: {
        fontSize: '$xl',
        fontWeight: 'bold',
        color: '$green300',
        lineHeight: '140%',
      },
    },

    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
      borderRadius: 6,
      background: '$green500',
      cursor: 'pointer',

      '&:hover': {
        background: '$green300',
      },
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})

export const arrow = css({
  width: '30px',
  height: '30px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  // -webkit-transform: 'transformY(50%)',
  fill: '#fff',
  cursor: 'pointer',
})

export const arrowLeft = css({
  background: 'linear-gradient(90deg, black 0%, transparent 100%)',
  height: '100%',
  width: 50,
})

export const arrowRight = css({
  left: 'auto',
  right: 0,
  background: 'linear-gradient(-90deg, black 0%, transparent 100%)',
  height: '100%',
  width: 50,
})

export const arrowDisabled = css({
  opacity: 0,
})
