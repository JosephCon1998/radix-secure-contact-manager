import React from 'react'

interface ButtonProps {
  icon?: {
    component: string | React.ReactElement
    altText?: string
    width?: string
    height?: string
    className?: string
  }
  text?: string
  className?: string
  outline?: boolean
  decorateFirstLetter?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  disabled?: boolean
  type?: 'submit' | 'reset' | 'button'
}

/**
 * @name Button
 *
 * @description
 * A general purpose button to with custom props
 *
 * @param props
 * @returns
 */
const Button = (props: ButtonProps) => {
  const {
    type,
    onClick,
    className,
    text,
    icon,
    outline,
    decorateFirstLetter = false,
    disabled = false
  } = props

  const _onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick && onClick(e)
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={_onClick}
      className={`flex flex-col items-center justify-center hover:cursor-MsPointer border ${
        outline
          ? 'border-r-black border-b-black border-l-[#E7E7E7] border-t-[#E7E7E7]'
          : 'border-transparent'
      } hover:border-r-black hover:border-b-black hover:border-l-[#E7E7E7] hover:border-t-[#E7E7E7] p-[2px] active:border-l-black active:border-t-black active:border-r-[#E7E7E7] active:border-b-[#E7E7E7] ${className}`}
    >
      {icon && typeof icon.component === 'string' && (
        <img
          src={icon.component}
          alt="new-contact"
          className={`grayscale ${icon.className}`}
          style={{ width: icon.width, height: icon.height }}
        />
      )}
      {icon && typeof icon.component !== 'string' && icon.component}
      {text && (
        <p
          className={`select-none font-MSSansSerif text-black text-sm ${
            decorateFirstLetter ? 'first-letter:underline decoration-solid' : ''
          }`}
        >
          {text}
        </p>
      )}
    </button>
  )
}

export default Button
