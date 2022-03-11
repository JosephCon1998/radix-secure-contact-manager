import { useState } from 'react'
import Button from '../Core/Button'
import Header from '../Core/Header'
import Input from '../Core/Input'
import Window from '../Core/Window'
import Keys from '../../icons/keys.png'
import useStore from '../../zustand/createStore'
import crypto from 'crypto-js'

/**
 * @name FirstTime
 *
 * @description
 * This window is presented to the user
 * if there is no hashed password inside of
 * localStorage.
 *
 * If that is true, we assume
 * this is the first time the user is using
 * the app and ask them to create a password
 *
 * @returns
 */
const FirstTime = () => {
  const toggleWindow = useStore(state => state.toggleWindow)

  const [password, setPassword] = useState('')

  const _onCoseButtonClicked = () => {
    toggleWindow({ window: 'firstTime', action: false })
  }

  const _onSubmit = (e: any) => {
    let hash = crypto.SHA3(password)
    localStorage.setItem('hash', hash.toString())
    toggleWindow({ window: 'mainApp', action: true })
    toggleWindow({ window: 'firstTime', action: false })
  }

  const _onChangeText = (text: string) => {
    setPassword(text)
  }

  return (
    <Window className="h-auto w-[600px]">
      <Header
        onCloseButtonClicked={_onCoseButtonClicked}
        icon={{
          altText: 'Keys',
          component: Keys
        }}
        title="Secure Contact Manager - Get Started"
      />
      <div className="p-2 flex flex-col">
        <h3 className="font-MSSansSerif">Welcome to...</h3>
        <h1 className="sinAnimate font-MSSansSerif text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-purple-500 to-blue-600">
          Simple Secure Contact Manager
        </h1>

        <p className="font-MSSansSerifBold text-lg mt-8">
          It looks like this is your first time using this tool!
        </p>

        <p className="font-MSSansSerif text-lg mt-8">
          This tool uses AES-256 bit encryption, the trusted standard algorithm
          used by the United States government, to securely store your contacts
          and SHA-3 to hash your password.
        </p>

        <form onSubmit={_onSubmit}>
          <Input
            className="mt-8"
            label="Type in a password to get started! :"
            type="password"
            value={password}
            onChangeText={_onChangeText}
          />

          <Button
            type="submit"
            onClick={_onSubmit}
            text="Start"
            outline
            className="ml-auto px-4 mt-8"
          />
        </form>
      </div>
    </Window>
  )
}

export default FirstTime
