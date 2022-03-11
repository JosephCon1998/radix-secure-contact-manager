import Button from '../../Core/Button'
import Header from '../../Core/Header'
import Window from '../../Core/Window'
import ErrorIcon from '../../../icons/error.png'
import useStore from '../../../zustand/createStore'

/**
 * @name IncorrectPasswordAlert
 *
 * @description
 * Alert used to tell the user their
 * password is incorrect when trying to
 * login to the program
 *
 * @returns
 */
const IncorrectPasswordAlert = () => {
  const toggleWindow = useStore(state => state.toggleWindow)

  const _onCoseButtonClicked = () => {
    toggleWindow({ window: 'incorrectPassword', action: false })
  }

  return (
    <Window>
      <Header
        title="Password Incorrect!"
        onCloseButtonClicked={_onCoseButtonClicked}
      />

      <div className="flex p-4">
        <img
          alt="error-icon"
          src={ErrorIcon}
          style={{ width: '40px', height: '40px' }}
        />
        <h1 className="ml-4 font-MSSansSerif">
          Password is Incorrect! Please try again.
        </h1>
      </div>

      <div className="flex justify-center mb-2">
        <Button
          onClick={_onCoseButtonClicked}
          text="Okay"
          className="w-[100px] border-r-black border-b-black border-l-[#E7E7E7] border-t-[#E7E7E7]  active:border-l-black active:border-t-black active:border-r-[#E7E7E7] active:border-b-[#E7E7E7]"
        />
      </div>
    </Window>
  )
}

export default IncorrectPasswordAlert
