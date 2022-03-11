import useStore from '../../zustand/createStore'
import Program from './Program'
import StartButton from './StartButton'

/**
 * @name Taskbar
 *
 * @description
 * The taskbar that sits at the bottom of the screen. It shows
 * the "Secure Contact Manager" program running when one of the
 * window states are set to true for that program
 *
 * --- Used for aesthetic purposes only
 *
 * @returns
 */
const Taskbar = () => {
  const windowState = useStore(state => state.windowState)

  return (
    <div className="absolute bottom-0 bg-wgray w-screen border-t-2 border-gray-100 flex items-center py-1 px-2 space-x-2">
      <StartButton />
      {(windowState.firstTime || windowState.login || windowState.mainApp) && (
        <Program />
      )}
    </div>
  )
}

export default Taskbar
