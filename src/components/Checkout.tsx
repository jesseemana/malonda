import React from 'react'
import axios from '../api/axios'
import Form, { SubmitData } from './Form'
import { useMutation } from 'react-query'
import { Button } from '../components/ui/button'
import { Dialog, DialogTrigger, DialogContent, } from '../components/ui/dialog'

type CheckOutData = {
  first_name: string
  last_name: string
  email: string
  amount: number
  address: string
}

const Checkout = ({ amount }: { amount: number }) => {
  async function checkoutRequest(checkOutData: CheckOutData): Promise<{ url: string }> {
    const response = await axios.post('/api/checkout', JSON.stringify(checkOutData), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }
  
  const { mutateAsync: checkout, isLoading } = useMutation(checkoutRequest, {
    onSuccess: (data) => { 
      window.location.href = data.url 
    },
    onError: (error) => console.error(`An error occured: ${error}`)
  })

  async function onCheckout (submitData: SubmitData) {
    await checkout({ ...submitData, amount })
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className='md:w-[420px] w-[380px] text-xl rounded-sm'>
          Buy now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form 
          onCheckout={onCheckout} 
          isSubmitting={isLoading} 
        />
      </DialogContent>
    </Dialog>
  )
}

export default Checkout
