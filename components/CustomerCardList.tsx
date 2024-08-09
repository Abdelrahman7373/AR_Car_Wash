'use client';


import { useEffect, useState } from 'react'
import CustomerCard from './CustomerCard';
import { useRouter, useSearchParams } from 'next/navigation';




const CustomerCardList = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [customer, setCustomer] = useState({ name: '', phoneNumber: '', carModel: '',});


  const handleEditOpen = (customer: any) => {
    setIsOpenEdit(true);
    router.push(`?id=${customer._id}`);
  };

  const customerId = useSearchParams().get('id');

  const updateCustomer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/customer/${customerId}`, {
        method: 'PATCH',
        body: JSON.stringify({name: customer.name, phoneNumber: customer.phoneNumber, carModel: customer.carModel})
      });

      if(response.ok) setIsOpenEdit(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);    
      window.location.reload();
    }
  }

  const handleDelete = async () => {
  };


  useEffect(() => {
    let isMounted = true; // Track whether the component is still mounted
  
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/customer', { method: 'GET' });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (isMounted) {
          setCustomers(data);
        }
      } catch (error) {
        console.error('Failed to fetch customers:', error);
        if (isMounted) {
          setCustomers([]); // Optionally, set to an empty array or show an error state
        }
      }
    };
  
    fetchCustomers();
  
    return () => {
      isMounted = false;
    };
  }, []);


  return (
    <div className='grid md:grid-cols-3 gap-4 max-sm:grid-cols-1 gap-y-10 md:gap-x-10'>
        {customers.map((customer) => (
            <CustomerCard key={customer._id} customer={customer} updateCustomer={updateCustomer} handleEditOpen={handleEditOpen} handleDelete={handleDelete} isOpenDelete={isOpenDelete} isOpenEdit={isOpenEdit} setCustomer={setCustomer} setIsOpenDelete={setIsOpenDelete} setIsOpenEdit={setIsOpenEdit} setIsSubmitting={setIsSubmitting} isSubmitting={isSubmitting} />
        ))}
    </div>
  )
}


export default CustomerCardList;
