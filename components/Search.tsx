'use client';

import React, { ChangeEvent, useEffect, useState } from 'react'
import { Input } from './ui/input'


const Search = () => {
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchChange = () => {};


  return (
    <div className='mb-10'>
      <Input value={searchText} onChange={handleSearchChange} placeholder='Search...' type='search' className='md:w-[96rem] outline-none focus-visible:ring-0 focus-visible:ring-offset-0 max-sm:w-[23rem]' />
    </div>
  )
}

export default Search
