import React from 'react'
import axios from '../api/axios'
import Form, { SubmitData } from './Form'
import { useMutation } from 'react-query'

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
    <>
      <Form 
        onCheckout={onCheckout} 
        isSubmitting={isLoading} 
      />
    </>
  )
}

export default Checkout
