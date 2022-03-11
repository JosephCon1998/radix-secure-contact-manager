import Keys from '../../icons/keys.png'
import useStore from '../../zustand/createStore'

/**
 * @name DesktopIcon
 *
 * @description
 * The icon displayed on the desktop
 * It's in charge of launching the
 * "Simple Secure Contact Manager" program
 *
 * Double click the icon to launch the program
 *
 * @returns
 */
const DesktopIcon = () => {
  const toggleWindow = useStore(state => state.toggleWindow)
  const windowState = useStore(state => state.windowState)

  const onDoubleClick = () => {
    let hash = localStorage.getItem('hash')

    if (!windowState.mainApp) {
      if (hash) {
        toggleWindow({ window: 'login', action: true })
      } else {
        toggleWindow({ window: 'firstTime', action: true })
      }
    }
  }

  return (
    <div
      tabIndex={0}
      onDoubleClick={onDoubleClick}
      className="absolute flex cursor-MsPointer flex-col justify-center items-center w-32 h-32 hue-rotate focus:border border-dashed"
    >
      <img
        src={Keys}
        alt={'Secure Contact Manager - Start App'}
        style={{ width: '50px', height: '50px' }}
      />
      <h1 className="select-none font-MSSansSerif text-white text-center mt-2">
        Simple Secure Contact Manager
      </h1>
    </div>
  )
}

export default DesktopIcon
