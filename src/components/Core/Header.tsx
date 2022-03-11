import Button from './Button'

interface HeaderProps {
  title: string
  icon?: {
    component: string
    altText: string
  }
  onCloseButtonClicked?: () => void
}

/**
 * @name Header
 *
 * @description
 * This header is used at the top of
 * each window to display the name of the program
 * and the exit button
 *
 * @param props
 */
const Header = (props: HeaderProps) => {
  const { title, icon, onCloseButtonClicked } = props

  const _onCloseButtonClicked = () => {
    onCloseButtonClicked && onCloseButtonClicked()
  }

  return (
    <div className="handle hover:cursor-MsDrag flex px-1 py-[2px] items-center justify-between bg-gradient-to-r from-wblue-200 to-wblue-100">
      <div className="flex items-center">
        {icon && (
          <img
            src={icon.component}
            alt={icon.altText}
            style={{ width: '20px', height: '20px' }}
          />
        )}
        <p className="text-white ml-[4px] font-MSSansSerifBold text-sm">
          {title}
        </p>
      </div>

      <Button
        onClick={_onCloseButtonClicked}
        className="bg-wgray border border-transparent border-r-black border-b-black border-l-[#E7E7E7] border-t-[#E7E7E7] active:border-l-black active:border-t-black active:border-r-[#E7E7E7] active:border-b-[#E7E7E7] p-[0px]"
        icon={{
          component: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ),
          altText: 'close-button'
        }}
      />
    </div>
  )
}

export default Header
