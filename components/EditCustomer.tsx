import React, { Dispatch, SetStateAction, } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface Customer {name: string, phoneNumber: string, carModel: string, _id: string}


interface EditCustomerModelProps {
    isOpen: boolean;
    onClose: () => void;
    type: string;
    isSubmitting: boolean;
    customer: Customer;
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>, customer: Customer) => void;
    setCustomer:  Dispatch<SetStateAction<Customer>>;
}




const EditCustomer = ({isOpen, onClose, type, isSubmitting, handleSubmit, customer, setCustomer }: EditCustomerModelProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-2xl'>Customer's Information</DialogTitle>
                    <br />
                    <div className='flex flex-col space-y-5'>
                        <h1 className='text-lg text-gray-800'>Name</h1>
                        <Input value={customer.name} name='name' onChange={(e) => setCustomer({...customer, name: e.target.value})} disabled={isSubmitting} className='md:w-[28rem] outline-none focus-visible:ring-0 focus-visible:ring-offset-0 max-sm:w-[22rem]' />
                    </div>
                    <br />
                    <div className='flex flex-col space-y-5'>
                        <h1 className='text-lg text-gray-800'>Phone Number</h1>
                        <Input value={customer.phoneNumber} name='phoneNumber' onChange={(e) => setCustomer({...customer, phoneNumber: e.target.value})} disabled={isSubmitting} className='md:w-[28rem] outline-none focus-visible:ring-0 focus-visible:ring-offset-0 max-sm:w-[22rem]' />
                    </div>
                    <br />
                    <div className='flex flex-col space-y-5'>
                        <h1 className='text-lg text-gray-800'>Car Model</h1>
                        <Input value={customer.carModel} name='carModel' onChange={(e) => setCustomer({...customer, carModel: e.target.value})} disabled={isSubmitting} className='md:w-[28rem] outline-none focus-visible:ring-0 focus-visible:ring-offset-0 max-sm:w-[22rem]' />
                    </div>
                    <br />
                    <Button type='submit' onClick={(e) => handleSubmit(e ,customer)} disabled={isSubmitting} className='bg-cyan-400 hover:bg-cyan-300 text-lg'>
                        {isSubmitting ? `${type}ing...` : `${type}`}
                    </Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default EditCustomer;
