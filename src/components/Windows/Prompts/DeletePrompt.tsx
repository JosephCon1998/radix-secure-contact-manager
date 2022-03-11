import useStore from '../../../zustand/createStore'
import Prompt from '../../Core/Prompt'
import InfoIcon from '../../../icons/info.png'

/**
 * @name DeletePrompt
 *
 * @description
 * Prompt for the user to confirm they want
 * to delete their selected contact
 *
 * When deleting, a new contact hash is generated
 * and stored in localStorage
 *
 * @returns
 */
const DeletePrompt = () => {
  const selectedContact = useStore(state => state.selectedContact)
  const deleteContact = useStore(state => state.deleteContact)

  const _onDelete = () => {
    deleteContact()
  }

  return (
    <Prompt
      onAccept={_onDelete}
      headerText="Delete Contact"
      promptText={`Are you sure you want to delete ${selectedContact?.name}?`}
      windowKey="deletePrompt"
      acceptButtonText="Delete"
      icon={InfoIcon}
    />
  )
}

export default DeletePrompt
