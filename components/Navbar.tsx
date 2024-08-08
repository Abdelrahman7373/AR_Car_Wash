'use client';

import React, { useState } from 'react'
import { Button } from './ui/button';
import Image from 'next/image';
import AddCustomerModel from './AddCustomerModel';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customer, setCustomer] = useState({ name: '', phoneNumber: '', carModel: ''});

  const createCustomer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/customer/new', {
        method: 'POST',
        body: JSON.stringify({name: customer.name, phoneNumber: customer.phoneNumber, carModel: customer.carModel})
      });

      if(response.ok) setIsOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);    
      window.location.reload();
    }
  };


  return (
    <nav className='z-50 w-full px-6 py-3 lg:px-10'>
      <Button onClick={() => setIsOpen(true)} className='relative left-[48%] bg-cyan-400 hover:bg-cyan-300 max-sm:left-[40%]'>
        <Image alt='Add' src='/add.png' width={35} height={35} />
      </Button>
      <AddCustomerModel isOpen={isOpen === true} onClose={() => setIsOpen(false)} type='Create' handleSubmit={createCustomer} customer={customer} isSubmitting={isSubmitting} setCustomer={setCustomer} />
    </nav>
  )
}

export default Navbar;
