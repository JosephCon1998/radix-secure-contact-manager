import WindowsIcon from '../../icons/windows.png'

/**
 * @name StartButton
 *
 * @description
 * The start button that sits on the bottom
 * left of the taskbar --- Used for aesthetic purposes only
 *
 * @returns
 */
const StartButton = () => {
  return (
    <button className="flex border-2 px-1  border-r-black border-b-black border-l-[#E7E7E7] border-t-[#E7E7E7]">
      <img
        alt="start-button-icon"
        src={WindowsIcon}
        style={{ width: '25px', height: '25px' }}
      />
      <label className="font-MSSansSerifBold text-sm">Start</label>
    </button>
  )
}

export default StartButton
