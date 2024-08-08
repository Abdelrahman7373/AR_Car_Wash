'use client';

import React, { ChangeEvent, useEffect, useState } from 'react'
import { Input } from './ui/input'

interface Customer {name: string, phoneNumber: string, carModel: string,}

const Search = () => {
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [searchedResults, setSearchedResults] = useState<Customer[]>([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllCustomers(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i");
    return allCustomers.filter(
      (item) =>
        regex.test(item.name) ||
        regex.test(item.phoneNumber) ||
        regex.test(item.carModel)
    );
  };


  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout as NodeJS.Timeout);
    }
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };


  return (
    <div className='mb-10'>
      <Input value={searchText} onChange={handleSearchChange} placeholder='Search...' type='search' className='md:w-[96rem] outline-none focus-visible:ring-0 focus-visible:ring-offset-0 max-sm:w-[23rem]' />
    </div>
  )
}

export default Search
