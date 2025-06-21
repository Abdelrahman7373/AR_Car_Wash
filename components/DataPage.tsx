import {  useEffect, useState } from 'react';
import CustomerCardList from './CustomerCardList';
import Navbar from './Navbar';
import Search from './Search';
import { sha256 } from '@/utils/hash';

interface Customer {name: string, phoneNumber: string, carModel: string, _id: string}



const DataPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const fetchCustomers = async () => {
    if (typeof window === 'undefined') return;

    try {
      const value = await sha256(Math.floor(Date.now() / 7000).toString());
      const response = await fetch(`${window.location.origin}/api/customer?_=${Date.now()}`,{cache: 'no-store',headers: { 'x-requested-from': value, },});

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
      setCustomers([]);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const callFetch = async () => {
      if (!isMounted) return;
      await fetchCustomers();
    };

    callFetch();

    return () => {
      isMounted = false;
    };
  }, []);



  return (
    <div>
      <Navbar refetchCustomers={fetchCustomers} />
      <Search searchText={searchText} setSearchText={setSearchText} />
      <CustomerCardList setCustomers={setCustomers} customers={customers} triggerRefresh={fetchCustomers} searchText={searchText} />
    </div>
  )
}

export default DataPage
