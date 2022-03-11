import DesktopIcon from './components/Core/DesktopIcon'
import DeletePrompt from './components/Windows/Prompts/DeletePrompt'
import EditContactPrompt from './components/Windows/MainApp/EditContact'
import FirstTime from './components/Windows/FirstTime'
import IncorrectPasswordAlert from './components/Windows/Alerts/IncorrectPasswordAlert'
import Login from './components/Windows/Login'
import MainApp from './components/Windows/MainApp/MainApp'
import NewContactPrompt from './components/Windows/MainApp/NewContact'
import useStore from './zustand/createStore'
import Taskbar from './components/Taskbar/Taskbar'

const App = () => {
  const windowState = useStore(state => state.windowState)

  return (
    <>
      <div className="h-screen w-screen bg-wgreen cursor-MsDefault p-4">
        <DesktopIcon />
        {windowState.firstTime && <FirstTime />}
        {windowState.login && <Login />}
        {windowState.mainApp && <MainApp />}
        {windowState.newContact && <NewContactPrompt />}
        {windowState.editContact && <EditContactPrompt />}
        {windowState.incorrectPassword && <IncorrectPasswordAlert />}
        {windowState.deletePrompt && <DeletePrompt />}
      </div>
      <Taskbar />
    </>
  )
}

export default App
