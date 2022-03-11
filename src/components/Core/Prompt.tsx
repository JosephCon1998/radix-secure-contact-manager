import React from 'react'
import Button from '../Core/Button'
import Header from '../Core/Header'
import Window from '../Core/Window'
import InfoIcon from '../../icons/info.png'
import useStore from '../../zustand/createStore'
import { WindowKeys } from '../../types/types'

interface PromptProps {
  promptText: string
  headerText: string
  windowKey: WindowKeys
  acceptButtonText?: string
  cancelButtonText?: string
  icon?: string
  onAccept: () => void
  onCancel?: () => void
}

/**
 * @name Prompt
 *
 * @description
 * A general purpose prompt that presents the user
 * with a call to action.
 *
 * @example
 * <Prompt
 *    headerText="Delete Contact"
 *    promptText="Are you sure you want to delete?"
 * />
 *
 * @param props
 * @returns
 */
const Prompt = (props: PromptProps) => {
  const {
    headerText,
    onAccept,
    icon,
    promptText,
    acceptButtonText,
    windowKey,
    cancelButtonText,
    onCancel
  } = props

  const toggleWindow = useStore(state => state.toggleWindow)

  const _close = () => {
    toggleWindow({ window: windowKey, action: false })
  }

  const _onAcceptClicked = () => {
    onAccept()
    _close()
  }

  const _onCancelClicked = () => {
    onCancel && onCancel()
    _close()
  }

  return (
    <Window>
      <Header title={headerText} onCloseButtonClicked={_close} />

      <div className="flex p-4">
        <img
          alt="prompt-icon"
          src={icon ?? InfoIcon}
          className="w-[40px] h-[40px]"
        />
        <h1 className="ml-4 font-MSSansSerif">{promptText}</h1>
      </div>

      <div className="flex justify-center mb-2 space-x-2">
        <Button
          onClick={_onCancelClicked}
          text={cancelButtonText ?? 'Cancel'}
          className="w-[100px] border-r-black border-b-black border-l-[#E7E7E7] border-t-[#E7E7E7]  active:border-l-black active:border-t-black active:border-r-[#E7E7E7] active:border-b-[#E7E7E7]"
        />
        <Button
          onClick={_onAcceptClicked}
          text={acceptButtonText ?? 'Okay'}
          className="w-[100px] border-r-black border-b-black border-l-[#E7E7E7] border-t-[#E7E7E7]  active:border-l-black active:border-t-black active:border-r-[#E7E7E7] active:border-b-[#E7E7E7]"
        />
      </div>
    </Window>
  )
}

export default Prompt
