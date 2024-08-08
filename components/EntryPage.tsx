'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';


const EntryPage = ({ setIsComplete }: {setIsComplete: (value: boolean) => void}) => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const teleportToDataPage = async () => {
    try {
      const response = await fetch('/api/validate-password', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ password }),
      });
      
      const data = await response.json();

      if (data.success) {
        setIsComplete(true);
      } else {
        alert('Incorrect Password');
      }
    } catch (error) {
      console.log('An error occurred');
    }
  };


  return (
    <div className='flex items-center justify-center min-h-screen flex-col'>
      <h1 className='text-2xl text-cyan-400 relative bottom-12'>Enter Password </h1>
      <Input type='password' value={password} onChange={handlePasswordChange} className='md:w-96 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 max-sm:w-80 relative bottom-7' />
      <Button onClick={teleportToDataPage} className='bg-cyan-400 hover:bg-cyan-300 text-lg p-5'>
        Enter
      </Button>
    </div>
  )
}

export default EntryPage;
