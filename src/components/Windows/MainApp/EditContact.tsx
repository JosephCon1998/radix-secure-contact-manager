import React, { useState } from 'react'

import {
  AddressRegexp,
  EmailRegexp,
  NameRegexp,
  PhoneRegexp
} from '../../../configs/RegExp'

import { Contact } from '../../../types/types'

import Button from '../../Core/Button'
import Header from '../../Core/Header'
import Input from '../../Core/Input'
import Window from '../../Core/Window'
import NewContactIcon from '../../../icons/new_contact_header_icon.png'
import useStore from '../../../zustand/createStore'

/**
 * @name EditContact
 *
 * @description
 * The edit contact window that displays the information
 * of the contact the user selected. It allows the user
 * to edit each field and update the contacts list.
 *
 * When the user clicks update, a new hash is generated with
 * the update contacts information included and the hash is saved
 * to localStorage
 *
 * @returns
 */
const EditContact = () => {
  const toggleWindow = useStore(state => state.toggleWindow)

  const selected = useStore(state => state.selectedContact)

  const updateContact = useStore(state => state.updateContact)

  const [_name, _setName] = useState(selected?.name ?? '')

  const [_homeAddress, _setHomeAddress] = useState(selected?.homeAddress ?? '')

  const [_phoneNumber, _setPhoneNumber] = useState(selected?.phoneNumber ?? '')

  const [_emailAddress, _setEmailAddress] = useState(
    selected?.emailAddress ?? ''
  )

  const _onCoseButtonClicked = () => {
    toggleWindow({ window: 'editContact', action: false })
  }

  const _onUpdateContact = () => {
    if (selected) {
      const contact: Contact = {
        name: _name,
        emailAddress: _emailAddress,
        phoneNumber: _phoneNumber,
        homeAddress: _homeAddress,
        id: selected.id
      }
      updateContact(contact)
      toggleWindow({ window: 'editContact', action: false })
    }
  }

  const _handleKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault()
      _onUpdateContact()
    }
  }

  const _onChangeName = (text: string) => _setName(text)

  const _onChangeHomeAddress = (text: string) => _setHomeAddress(text)

  const _onChangeEmail = (text: string) => _setEmailAddress(text)

  const _onChangePhone = (text: string) => _setPhoneNumber(text)

  return (
    <Window className="h-auto w-[400px]">
      <Header
        onCloseButtonClicked={_onCoseButtonClicked}
        icon={{
          altText: 'Edit Contact Icon',
          component: NewContactIcon
        }}
        title="Edit Contact"
      />

      <form onKeyPress={_handleKeyPress}>
        <div className="p-2 space-y-4">
          <Input
            onChangeText={_onChangeName}
            value={_name}
            label="Name:"
            validation={NameRegexp}
          />
          <Input
            onChangeText={_onChangeHomeAddress}
            value={_homeAddress}
            label="Home Address:"
            multiline
            validation={AddressRegexp}
          />
          <Input
            onChangeText={_onChangeEmail}
            value={_emailAddress}
            label="E-Mail Address:"
            validation={EmailRegexp}
          />
          <Input
            onChangeText={_onChangePhone}
            value={_phoneNumber}
            label="Phone Number:"
            validation={PhoneRegexp}
          />
        </div>

        <div className="flex justify-end p-2 space-x-2">
          <Button
            onClick={_onCoseButtonClicked}
            text="Cancel"
            className="w-[100px]"
            outline
          />
          <Button
            onClick={_onUpdateContact}
            text="Update"
            className="w-[100px]"
            outline
            decorateFirstLetter
          />
        </div>
      </form>
    </Window>
  )
}

export default EditContact
