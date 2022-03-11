import { useState } from 'react'
import Button from '../Core/Button'
import Header from '../Core/Header'
import Input from '../Core/Input'
import Window from '../Core/Window'
import Keys from '../../icons/keys.png'
import useStore from '../../zustand/createStore'
import crypto from 'crypto-js'

/**
 * @name Login
 *
 * @description
 * The login window to show the user
 *
 * This window is shown only if there is
 * hash data inside localStorage
 *
 * @returns
 */
const Login = () => {
  const toggleWindow = useStore(state => state.toggleWindow)

  const [password, setPassword] = useState('')

  const _onCoseButtonClicked = () => {
    toggleWindow({ window: 'login', action: false })
  }

  const _onSubmit = (e: any) => {
    let oldHash = localStorage.getItem('hash')
    let newHash = crypto.SHA3(password).toString()

    if (oldHash && oldHash === newHash) {
      toggleWindow({ window: 'mainApp', action: true })
      toggleWindow({ window: 'login', action: false })
    } else {
      e.preventDefault()
      toggleWindow({ window: 'incorrectPassword', action: true })
    }
  }

  const _onChangeText = (text: string) => {
    setPassword(text)
  }

  return (
    <Window className="h-auto">
      <Header
        onCloseButtonClicked={_onCoseButtonClicked}
        icon={{
          altText: 'Keys',
          component: Keys
        }}
        title="Secure Contact Manager - Login"
      />
      <div className="p-2 flex flex-col">
        <h3 className="font-MSSansSerif">Welcome to...</h3>
        <h1 className="sinAnimate font-MSSansSerif text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-purple-500 to-blue-600">
          Simple Secure Contact Manager
        </h1>

        <form onSubmit={_onSubmit}>
          <Input
            type="password"
            value={password}
            onChangeText={_onChangeText}
            className="mt-8"
            label="Please enter the password for your contact data file:"
          />

          <Button
            onClick={_onSubmit}
            text="Login"
            className="ml-auto px-4 mt-8"
            outline
          />
        </form>
      </div>
    </Window>
  )
}

export default Login
