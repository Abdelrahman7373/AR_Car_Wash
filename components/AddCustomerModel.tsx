import React, { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface Customer {name: string, phoneNumber: string, carModel: string,}


interface AddCustomerModelProps {
    isOpen: boolean;
    onClose: () => void;
    type: string;
    isSubmitting: boolean;
    customer: Customer;
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
    setCustomer:  Dispatch<SetStateAction<Customer>>;
}




const AddCustomerModel = ({isOpen, onClose, type, isSubmitting, customer, handleSubmit , setCustomer}: AddCustomerModelProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-2xl'>Customer's Information</DialogTitle>
                    <br />
                    <div className='flex flex-col space-y-5'>
                        <h1 className='text-lg text-gray-800'>Name</h1>
                        <Input name='name' onChange={(e) => setCustomer({...customer, name: e.target.value})} disabled={isSubmitting} className='md:w-[28rem] outline-none focus-visible:ring-0 focus-visible:ring-offset-0 max-sm:w-[22rem]' />
                    </div>
                    <br />
                    <div className='flex flex-col space-y-5'>
                        <h1 className='text-lg text-gray-800'>Phone Number</h1>
                        <Input name='phoneNumber' onChange={(e) => setCustomer({...customer, phoneNumber: e.target.value})} disabled={isSubmitting} className='md:w-[28rem] outline-none focus-visible:ring-0 focus-visible:ring-offset-0 max-sm:w-[22rem]' />
                    </div>
                    <br />
                    <div className='flex flex-col space-y-5'>
                        <h1 className='text-lg text-gray-800'>Car Model</h1>
                        <Input name='carModel' onChange={(e) => setCustomer({...customer, carModel: e.target.value})} disabled={isSubmitting} className='md:w-[28rem] outline-none focus-visible:ring-0 focus-visible:ring-offset-0 max-sm:w-[22rem]' />
                    </div>
                    <br />
                    <Button type='submit' onClick={handleSubmit} disabled={isSubmitting} className='bg-cyan-400 hover:bg-cyan-300 text-lg'>
                        {isSubmitting ? `${type}ing...` : `${type}`}
                    </Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddCustomerModel
