import KeysIcon from '../../icons/keys.png'

/**
 * @name Program
 *
 * @description
 * A program that is display on the Taskbar ---
 * This component is for aesthetic purposes only.
 *
 * @returns
 */
const Program = () => {
  return (
    <button className="flex border-2 pl-1 pr-6 border-r-black border-b-black border-l-[#E7E7E7] border-t-[#E7E7E7]">
      <img
        alt="program-icon"
        src={KeysIcon}
        style={{ width: '25px', height: '25px' }}
      />
      <label className="font-MSSansSerif text-sm pt-[2px] pl-1">
        Secure Contact Manager
      </label>
    </button>
  )
}

export default Program
