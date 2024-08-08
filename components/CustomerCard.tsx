import { Dispatch, SetStateAction } from 'react';
import AddCustomerModel from './AddCustomerModel';
import { Card, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';


interface Customer {name: string, phoneNumber: string, carModel: string,}


interface CustomerCardProps {
  customer: Customer;
  updateCustomer: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleEditOpen: (customer: any) => void;
  handleDelete: () => void;
  isOpenEdit: boolean;
  setIsOpenEdit: Dispatch<SetStateAction<boolean>>
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  isOpenDelete: boolean;
  setIsOpenDelete: Dispatch<SetStateAction<boolean>>
  setCustomer:  Dispatch<SetStateAction<Customer>>;
}



const CustomerCard = ({ customer, updateCustomer, handleDelete, isOpenEdit, setIsOpenEdit, handleEditOpen, isSubmitting, setIsSubmitting, setIsOpenDelete, isOpenDelete, setCustomer }: CustomerCardProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <h1 className='text-lg flex-grow'>{customer.name}</h1>
            <CardTitle>
              <Image onClick={handleEditOpen} className='cursor-pointer' alt='Edit' src='/edit.png' width={30} height={30} />
            </CardTitle>
          </div>
          <h1 className='text-cyan-500 text-lg mt-2'>{customer.phoneNumber}</h1>
          <div className='flex items-center justify-between mt-2'>
            <h1 className='text-lg text-purple-500 flex-grow'>{customer.carModel}</h1>
            <CardTitle>
              <Image onClick={handleDelete} className='cursor-pointer' alt='Delete' src='/Trash.png' width={25} height={25} />
            </CardTitle>
          </div>
        </CardHeader>
      </Card>
      <AddCustomerModel isOpen={isOpenEdit === true} onClose={() => setIsOpenEdit(false)} type='Edit' handleSubmit={updateCustomer} customer={customer} isSubmitting={isSubmitting} setCustomer={setCustomer} />
    </div>
  )
}

export default CustomerCard
