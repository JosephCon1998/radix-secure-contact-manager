import create from 'zustand'
import crypto from 'crypto-js'
import Fuse from 'fuse.js'
import FuseConfig from '../configs/FuseConfig'

import { Contact, WindowKeys, WindowState } from '../types/types'
import { devtools } from 'zustand/middleware'

interface RootState {
  /**
   * State vars
   */
  contacts: Contact[]
  windowState: WindowState
  selectedContact: Contact | null
  filteredContacts: Fuse.FuseResult<Contact>[]

  /**
   * Action Creators
   */
  updateFilteredContacts: (searchText: string) => void
  addContact: (contact: Contact) => void
  deleteContact: () => void
  updateSelected: (contact: Contact | null) => void
  updateContact: (contact: Contact) => void
  rehydrateContacts: (contacts: Contact[]) => void
  resetContacts: () => void
  toggleWindow: ({
    window,
    action
  }: {
    window: WindowKeys
    action: boolean
  }) => void
}

const initalContactState: Contact[] = []

const initialWindowState: WindowState = {
  firstTime: false,
  incorrectPassword: false,
  login: false,
  mainApp: false,
  newContact: false,
  deletePrompt: false,
  editContact: false
}

/**
 * @name useStore
 *
 * @description
 * This method creates a store to store data in.
 *
 * The store's "contact" array is populated when
 * the users contact hash is decrypted on the main app's
 * initial mount
 *
 * More info: https://github.com/pmndrs/zustand#first-create-a-store
 */
const useStore = create<RootState>(
  devtools(set => ({
    // ==============================
    // State
    // ==============================
    filteredContacts: [],
    contacts: initalContactState,
    selectedContact: null,
    windowState: initialWindowState,
    // ==============================
    // Contact CRUD Actions
    // ==============================
    addContact: contact =>
      set(state => {
        /**
         * Encrypt the current state of contacts
         */
        let hash = localStorage.getItem('hash')
        let updatedContacts = [...state.contacts, contact]

        if (hash) {
          let contactString = JSON.stringify(updatedContacts)
          let encrypted = crypto.AES.encrypt(contactString, hash).toString()
          localStorage.setItem('contacts', encrypted)
        }

        return { contacts: updatedContacts, filteredContacts: [] }
      }),
    updateContact: contact =>
      set(state => {
        let mutatableState = [...state.contacts]
        let index = mutatableState.findIndex(item => item.id === contact.id)
        mutatableState.splice(index, 1, contact)

        /**
         * Encrypt the current state of contacts
         */
        let hash = localStorage.getItem('hash')

        if (hash) {
          let contactString = JSON.stringify(mutatableState)
          let encrypted = crypto.AES.encrypt(contactString, hash).toString()
          localStorage.setItem('contacts', encrypted)
        }

        return {
          contacts: mutatableState,
          filteredContacts: [],
          selectedContact: contact
        }
      }),
    deleteContact: () =>
      set(state => {
        /**
         * Encrypt the current state of contacts
         */
        let hash = localStorage.getItem('hash')
        let updatedContacts = state.contacts.filter(
          contact => contact.id !== state.selectedContact?.id
        )

        if (hash) {
          let contactString = JSON.stringify(updatedContacts)
          let encrypted = crypto.AES.encrypt(contactString, hash).toString()
          localStorage.setItem('contacts', encrypted)
        }

        return {
          contacts: updatedContacts,
          selectedContact: null,
          filteredContacts: []
        }
      }),
    // ==============================
    // Misc Actions
    // ==============================
    updateSelected: contact => set(state => ({ selectedContact: contact })),
    rehydrateContacts: contacts => set(state => ({ contacts: contacts })),
    resetContacts: () => set(() => ({ contacts: [] })),
    updateFilteredContacts: searchText =>
      set(state => {
        const fuse = new Fuse(state.contacts, FuseConfig)
        const result = fuse.search(searchText)
        return { filteredContacts: result }
      }),
    toggleWindow: ({ window, action }) =>
      set(state => ({
        windowState: { ...state.windowState, [window]: action }
      }))
    // ==============================
  }))
)

export default useStore
