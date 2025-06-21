import { useState } from 'react'
import CustomerCard from './CustomerCard';
import EditCustomer from './EditCustomer';
import { sha256 } from '@/utils/hash';

interface Customer {
  name: string
  phoneNumber: string
  carModel: string
  _id: string
}

interface CustomerCardListProps {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  triggerRefresh: () => void;
  searchText: string;
}




const CustomerCardList = ({ customers, setCustomers, triggerRefresh, searchText }: CustomerCardListProps) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customer, setCustomer] = useState({ name: '', phoneNumber: '', carModel: '', _id: ''});


  const handleEditOpen = (customer: Customer) => {
    setCustomer(customer);
    setIsOpenEdit(true);
  };


  const updateCustomer = async (e: React.MouseEvent<HTMLButtonElement>, customer: Customer) => {
    e.preventDefault();
    setIsSubmitting(true);
    const value = await sha256(Math.floor(Date.now() / 5000).toString());

    try {
      const response = await fetch(`/api/customer/${customer._id.toString()}`, {
        method: 'PATCH',
        body: JSON.stringify({name: customer.name, phoneNumber: customer.phoneNumber, carModel: customer.carModel}),
        headers: { 'x-requested-from': value },
      });

      if(response.ok) setIsOpenEdit(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      triggerRefresh();
    }
  }

  const handleDelete = async (customer: Customer) => {
    const hasConfirmed = confirm("Are you sure you want to delete this customer data permanently");
    const value = await sha256(Math.floor(Date.now() / 5000).toString());

    if(hasConfirmed) {
      try {
        await fetch(`/api/customer/${customer._id.toString()}`, {method: 'DELETE', headers: { 'x-requested-from': value },});

        const filteredCustomers = customers.filter((c) => c._id !== customer._id);
        setCustomers(filteredCustomers);
      } catch (error) {
        console.log(error);
      }
    }
  };

  
  


  return (
    <div className='grid md:grid-cols-3 gap-4 max-sm:grid-cols-1 gap-y-10 md:gap-x-10'>
      {customers.filter((customer) => {
        const text = searchText.toLowerCase();
        return(
          customer.name.toLowerCase().includes(text) ||
          customer.phoneNumber.toLowerCase().includes(text) ||
          customer.carModel.toLowerCase().includes(text)
        )
      }).map((customer) => (
        <CustomerCard key={customer._id} customer={customer} handleEditOpen={handleEditOpen} handleDelete={() => handleDelete(customer)} isOpenDelete={isOpenDelete} isOpenEdit={isOpenEdit} setCustomer={setCustomer} setIsOpenDelete={setIsOpenDelete} setIsOpenEdit={setIsOpenEdit} setIsSubmitting={setIsSubmitting} isSubmitting={isSubmitting} />
      ))}
        <EditCustomer isOpen={isOpenEdit === true} onClose={() => setIsOpenEdit(false)} type='Edit' handleSubmit={(e) => updateCustomer(e, customer)} customer={customer} isSubmitting={isSubmitting} setCustomer={setCustomer} />
    </div>
  )
}


export default CustomerCardList;
