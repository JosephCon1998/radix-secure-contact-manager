import React, { useState } from 'react'

import { Contact } from '../../../types/types'

import Button from '../../Core/Button'
import Header from '../../Core/Header'
import Input from '../../Core/Input'
import Window from '../../Core/Window'
import NewContactIcon from '../../../icons/new_contact_header_icon.png'
import useStore from '../../../zustand/createStore'

import {
  AddressRegexp,
  EmailRegexp,
  NameRegexp,
  PhoneRegexp
} from '../../../configs/RegExp'

/**
 * @name NewContact
 *
 * @description
 * This window presents a form for the user
 * where they can fill out a new contact.
 *
 * There is validation on each field, but it is not
 * required for each input to conform to it.
 *
 * The only required validation is that there has to
 * be at least one input with data in it.
 *
 * When creating a new contact, a new hash is generated
 * with the new contacts info and stored in localStorage
 *
 * @returns
 */
const NewContact = () => {
  const toggleWindow = useStore(state => state.toggleWindow)

  const addContact = useStore(state => state.addContact)

  const [_name, _setName] = useState('')

  const [_homeAddress, _setHomeAddress] = useState('')

  const [_emailAddress, _setEmailAddress] = useState('')

  const [_phoneNumber, _setPhoneNumber] = useState('')

  const _onCoseButtonClicked = () => {
    toggleWindow({ window: 'newContact', action: false })
  }

  const _onAddContact = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (
      !_name.trim() &&
      !_homeAddress.trim() &&
      !_emailAddress.trim() &&
      !_phoneNumber.trim()
    ) {
      e?.preventDefault()
      return
    }

    const contact: Contact = {
      name: _name,
      emailAddress: _emailAddress,
      phoneNumber: _phoneNumber,
      homeAddress: _homeAddress,
      id: Date.now().toString()
    }
    addContact(contact)
    toggleWindow({ window: 'newContact', action: false })
  }

  const _handleKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === 'Enter' && e.ctrlKey) {
      e.preventDefault()
      _onAddContact()
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
          altText: 'New Contact Icon',
          component: NewContactIcon
        }}
        title="New Contact"
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
            validation={AddressRegexp}
            multiline
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
            type="submit"
            onClick={_onCoseButtonClicked}
            text="Cancel"
            className="w-[100px]"
            outline
          />
          <Button
            onClick={_onAddContact}
            text="Create"
            className="w-[100px]"
            outline
            decorateFirstLetter
          />
        </div>
      </form>
    </Window>
  )
}

export default NewContact
