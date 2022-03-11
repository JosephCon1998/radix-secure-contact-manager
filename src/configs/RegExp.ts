/**
 * @name RegExp.ts
 *
 * @description
 * Regular expressions used for validation
 *
 */

export const EmailRegexp =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export const NameRegexp = /^./

export const AddressRegexp = /^./

export const PhoneRegexp =
  /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
