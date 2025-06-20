import React, { Dispatch, SetStateAction, } from 'react'
import { Input } from './ui/input';

interface SearchProps {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}


const Search = ({searchText, setSearchText}: SearchProps) => {
  return (
    <div className='mb-10'>
      <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search...' type='search' className='md:w-[96rem] outline-none focus-visible:ring-0 focus-visible:ring-offset-0 max-sm:w-[23rem]' />
    </div>
  )
}

export default Search
