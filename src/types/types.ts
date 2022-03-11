/**
 *  @name Contact
 *
 *  @description
 *  Basic contact data model
 */
export type Contact = {
  name: string
  emailAddress: string
  phoneNumber: string
  homeAddress: string
  id: string
}

/**
 *  @name WindowState
 *
 *  @description
 *  The state of each window's visibility
 */
export type WindowState = {
  login: boolean
  firstTime: boolean
  mainApp: boolean
  incorrectPassword: boolean
  newContact: boolean
  editContact: boolean
  deletePrompt: boolean
}

/**
 *  @name WindowKeys
 *
 *  @description
 *  keys to access the window state
 */
export type WindowKeys =
  | 'login'
  | 'firstTime'
  | 'mainApp'
  | 'incorrectPassword'
  | 'newContact'
  | 'deletePrompt'
  | 'editContact'
