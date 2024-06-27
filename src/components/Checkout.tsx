import React from 'react'
import axios from '../api/axios'
import Form, { SubmitData } from './Form'
import { useMutation } from 'react-query'
import { Dialog, DialogTrigger, DialogContent, } from '../components/ui/dialog'

const Checkout = ({ amount }: { amount: number }) => {
  async function checkoutRequest(checkOutData: CheckOutData): Promise<CheckOutResponse> {
    const response = await axios.post('/api/checkout', JSON.stringify(checkOutData), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }
  
  const { mutateAsync: checkout, isLoading } = useMutation(checkoutRequest, {
    onSuccess: (data) => {
      sessionStorage.setItem('tx_ref', JSON.stringify(data.tx_ref))
      window.location.href = data.url 
    },
    onError: (error) => console.error(`An error occured: ${error}`)
  })

  const onCheckout = async (submitData: SubmitData) => await checkout({ ...submitData, amount })

  return (
    <Dialog>
      <DialogTrigger>
        <div className='w-auto text-xl px-8 py-2 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90'>
          Buy now
        </div>
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

export type CheckOutData = {
  first_name: string
  last_name: string
  email: string
  amount: number
  address: string
}

export type CheckOutResponse = { 
  url: string 
  tx_ref: string 
}

export default Checkout
