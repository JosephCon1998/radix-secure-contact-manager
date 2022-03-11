/**
 * @name FuseConfig
 *
 * @description
 * The config used for the fuzzy search library
 *
 * This config tells the search to look for data
 * with keys of name, email, phone, and home address
 */
const FuseConfig = {
  keys: ['name', 'emailAddress', 'phoneNumber', 'homeAddress']
}

export default FuseConfig
