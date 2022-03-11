import React, { HTMLInputTypeAttribute } from 'react'
import SuccessIcon from '../../icons/success.png'
import ErrorIcon from '../../icons/error.png'

interface InputProps {
  label?: string
  className?: string
  multiline?: boolean
  type?: HTMLInputTypeAttribute
  validation?: RegExp
  value: string
  onChangeText: (text: string) => void
}

/**
 * @name Input
 *
 * @description
 * This is a general purpose input with custom props
 * It extends the default input with validation and multiline support
 *
 * @param props
 * @returns
 */
const Input = (props: InputProps) => {
  const { label, className, multiline, type, value, onChangeText, validation } =
    props

  const _onChangeText = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) => {
    onChangeText(e.currentTarget.value)
  }

  const isValidationCorrect = validation?.test(value)

  return (
    <div className={`${className} flex flex-col space-y-2`}>
      <label className="font-MSSansSerif text-sm">{label}</label>
      <div className="flex space-x-2 items-center">
        {multiline ? (
          <textarea
            onChange={_onChangeText}
            value={value}
            className="flex-1 min-h-[100px] msBorder border-2 font-MSSansSerif outline-none"
          ></textarea>
        ) : (
          <input
            value={value}
            onChange={_onChangeText}
            type={type}
            className="flex-1 msBorder border-2 font-MSSansSerif outline-none"
          />
        )}

        {validation && (
          <img
            alt="validation-icon"
            className="w-[20px] h-[20px]"
            src={isValidationCorrect ? SuccessIcon : ErrorIcon}
          />
        )}
      </div>
    </div>
  )
}

export default Input
