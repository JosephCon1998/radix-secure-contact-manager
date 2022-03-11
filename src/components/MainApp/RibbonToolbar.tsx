import Button from '../Core/Button'
import NewContactIcon from '../../icons/new_contact_button_icon.png'
import DeleteIcon from '../../icons/error.png'
import EditIcon from '../../icons/edit.png'
import useStore from '../../zustand/createStore'

/**
 * @name RibbonToolbar
 *
 * @description
 * The toolbar that houses the "New Contact", "Edit Contact", and "Delete Contact"
 * buttons at the top of the main app
 *
 * @returns
 */
const RibbonToolbar = () => {
  const toggleWindow = useStore(state => state.toggleWindow)

  const selectedContact = useStore(state => state.selectedContact)

  const _onClickNewContact = () => {
    toggleWindow({ window: 'newContact', action: true })
  }

  const _onClickEdit = () => {
    toggleWindow({ window: 'editContact', action: true })
  }

  const _onClickDelete = () => {
    toggleWindow({ window: 'deletePrompt', action: true })
  }

  const isDeleteEditDisabled = selectedContact ? false : true

  return (
    <div className="flex px-2 py-1 outline-1 outline outline-gray-600 border border-gray-200 mt-1 ">
      <Button
        onClick={_onClickNewContact}
        className="w-[100px] active:border-l-black active:border-t-black active:border-r-[#E7E7E7] active:border-b-[#E7E7E7]"
        text="New Contact"
        icon={{
          altText: 'new-contact',
          component: NewContactIcon,
          height: '22px',
          width: '22px'
        }}
      />
      <Button
        onClick={_onClickDelete}
        className="w-[100px] active:border-l-black active:border-t-black active:border-r-[#E7E7E7] active:border-b-[#E7E7E7]"
        text="Delete"
        icon={{
          altText: 'delete',
          component: DeleteIcon,
          height: '22px',
          width: '22px',
          className: isDeleteEditDisabled ? 'grayscale-1' : 'grayscale-0'
        }}
        disabled={isDeleteEditDisabled}
      />
      <Button
        onClick={_onClickEdit}
        className="w-[100px] active:border-l-black active:border-t-black active:border-r-[#E7E7E7] active:border-b-[#E7E7E7]"
        text="Edit"
        icon={{
          altText: 'edit',
          component: EditIcon,
          height: '22px',
          width: '22px',
          className: isDeleteEditDisabled ? 'grayscale-1' : 'grayscale-0'
        }}
        disabled={isDeleteEditDisabled}
      />
    </div>
  )
}

export default RibbonToolbar
