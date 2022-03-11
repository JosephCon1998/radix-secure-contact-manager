import { useEffect, useState } from 'react'
import useStore from '../../zustand/createStore'
import Input from '../Core/Input'

/**
 * @name Search
 *
 * @description
 * A fuzzy search field implemented with Fuse.js
 * that searches through the users contact list.
 * You can search for any field and get a result back.
 *
 * @returns
 */
const Search = () => {
  const [searchValue, setSearchValue] = useState('')

  const updateFilteredContacts = useStore(state => state.updateFilteredContacts)

  const onChangeText = (text: string) => {
    setSearchValue(text)
  }

  useEffect(() => {
    updateFilteredContacts(searchValue)
  }, [searchValue, updateFilteredContacts])

  return (
    <div className="flex items-center px-1">
      <label className="text-sm font-MSSansSerif mt-2 mr-2">
        Type field or select from list:{' '}
      </label>
      <Input onChangeText={onChangeText} value={searchValue} />
    </div>
  )
}

export default Search
