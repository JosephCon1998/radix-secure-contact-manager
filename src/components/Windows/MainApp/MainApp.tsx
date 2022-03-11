import { useEffect } from 'react'
import { Contact } from '../../../types/types'

import crypto from 'crypto-js'
import Header from '../../Core/Header'
import RibbonToolbar from '../../MainApp/RibbonToolbar'
import Window from '../../Core/Window'
import Keys from '../../../icons/keys.png'
import useStore from '../../../zustand/createStore'
import Search from '../../MainApp/Search'

/**
 * @name MainApp
 *
 * @description
 * The main window of the "Secure Contact Manager" application
 *
 * When this component mounts, it decrypts the contact hash
 * and rehydrates the data store.
 *
 * This components is what displays the contacts table and the contacts
 * details pane.
 *
 * @returns
 */
const MainApp = () => {
  const toggleWindow = useStore(state => state.toggleWindow)

  const rehydrateContacts = useStore(state => state.rehydrateContacts)

  const contacts = useStore(state => state.contacts)

  const updateSelected = useStore(state => state.updateSelected)

  const filteredContacts = useStore(state => state.filteredContacts)

  const selected = useStore(state => state.selectedContact)

  const resetContacts = useStore(state => state.resetContacts)

  /**
   * Decrypt hash on mount
   */
  useEffect(() => {
    let hash = localStorage.getItem('hash')
    let contactsHash = localStorage.getItem('contacts')

    if (hash && contactsHash) {
      let decrpyted = crypto.AES.decrypt(contactsHash, hash)
      let formattedContacts = JSON.parse(decrpyted.toString(crypto.enc.Utf8))
      rehydrateContacts(formattedContacts)
    }
  }, [rehydrateContacts])

  const _onCoseButtonClicked = () => {
    resetContacts()
    toggleWindow({ window: 'mainApp', action: false })
  }

  const _onContactSelect = (contact: Contact) => {
    if (selected?.id !== contact.id) {
      updateSelected(contact)
      return
    }
    if (selected) {
      updateSelected(null)
      return
    }
    updateSelected(contact)
  }

  return (
    <Window className="resize overflow-auto min-w-[1000px] min-h-[600px] flex flex-col">
      <Header
        onCloseButtonClicked={_onCoseButtonClicked}
        icon={{
          altText: 'Keys',
          component: Keys
        }}
        title="Secure Contact Manager"
      />
      <RibbonToolbar />
      <Search />
      <div className="flex flex-1 min-h-[370px] mt-2">
        <div className="flex-1 msBorder border-2 bg-white overflow-y-scroll">
          <table className="w-full">
            <tbody>
              <tr className="bg-wgray">
                <th className="truncate resize-x overflow-auto bg-msgray text-sm font-MSSansSerif w-48 text-left border-[1.5px] py-0 px-2 border-gray-700">
                  Name
                </th>
                <th className="truncate resize-x overflow-auto text-sm font-MSSansSerif w-48 text-left border-[1.5px] py-0 px-2 border-gray-700">
                  E-mail Address
                </th>
                <th className="truncate resize-x overflow-auto text-sm font-MSSansSerif w-48 text-left border-[1.5px] py-0 px-2 border-gray-700">
                  Phone Number
                </th>
                <th className="truncate resize-x overflow-auto text-sm font-MSSansSerif w-48 text-left border-[1.5px] py-0 px-2 border-gray-700">
                  Home Address
                </th>
              </tr>
              {filteredContacts.length > 0 &&
                filteredContacts.map(filteredContact => (
                  <tr
                    key={filteredContact.item.id}
                    className={`bg-white border-y ${
                      selected?.id === filteredContact.item.id
                        ? 'bg-blue-100'
                        : ''
                    }`}
                    tabIndex={0}
                    onClick={() => _onContactSelect(filteredContact.item)}
                  >
                    <td className="font-MSSansSerif py-0 px-2 truncate">
                      {filteredContact.item.name}
                    </td>
                    <td className="font-MSSansSerif py-0 px-2 truncate">
                      {filteredContact.item.emailAddress}
                    </td>
                    <td className="font-MSSansSerif py-0 px-2 truncate">
                      {filteredContact.item.phoneNumber}
                    </td>
                    <td className="font-MSSansSerif py-0 px-2 truncate">
                      {filteredContact.item.homeAddress}
                    </td>
                  </tr>
                ))}
              {filteredContacts.length === 0 &&
                contacts.map(contact => (
                  <tr
                    key={contact.id}
                    className={`bg-white border-y ${
                      selected?.id === contact.id ? 'bg-blue-100' : ''
                    }`}
                    tabIndex={0}
                    onClick={() => _onContactSelect(contact)}
                  >
                    <td className="font-MSSansSerif py-0 px-2 truncate">
                      {contact.name}
                    </td>
                    <td className="font-MSSansSerif py-0 px-2 truncate">
                      {contact.emailAddress}
                    </td>
                    <td className="font-MSSansSerif py-0 px-2 truncate">
                      {contact.phoneNumber}
                    </td>
                    <td className="font-MSSansSerif py-0 px-2 truncate">
                      {contact.homeAddress}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="bg-white flex-[0.5] msBorder border-2 flex flex-col items-center justify-evenly p-4">
            <h1 className="sinAnimate font-MSSansSerifBold text-2xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-purple-500 to-blue-600">
              {selected.name}
            </h1>
            <span className="flex flex-col w-full mt-8 text-center">
              <label className="font-MSSansSerif text-sm underline decoration-solid">
                Home Address:
              </label>
              <a
                rel="noreferrer"
                target="_blank"
                href={`http://maps.google.com/?q=${selected.homeAddress}`}
                className="font-MSSansSerifBold hover:text-wblue-200"
              >
                {selected.homeAddress}
              </a>
            </span>

            <span className="flex flex-col w-full mt-4 text-center">
              <label className="font-MSSansSerif text-sm underline decoration-solid">
                Phone Number:
              </label>
              <a
                rel="noreferrer"
                target="_blank"
                href={`tel:${selected.phoneNumber}`}
                className="font-MSSansSerifBold hover:text-wblue-200"
              >
                {selected.phoneNumber}
              </a>
            </span>

            <span className="flex flex-col w-full mt-4 text-center">
              <label className="font-MSSansSerif text-sm underline decoration-solid">
                E-Mail Address:
              </label>
              <a
                rel="noreferrer"
                target="_blank"
                href={`mailto:${selected.emailAddress}`}
                className="font-MSSansSerifBold text-center hover:text-wblue-200"
              >
                {selected.emailAddress}
              </a>
            </span>
          </div>
        )}
      </div>
      <div className="msBorder mt-[2px] px-[2px]">
        <span className="font-MSSansSerif text-sm">
          {contacts.length} item(s)
        </span>
      </div>
    </Window>
  )
}

export default MainApp
