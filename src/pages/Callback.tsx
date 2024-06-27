import React from 'react'
import axios from '../api/axios'
import { toast } from 'sonner'
import { useQuery } from 'react-query'
import { FadeLoader } from 'react-spinners'
import { useNavigate } from 'react-router'

const Callback = () => {
  const navigate = useNavigate()

  // solution 1 for getting tx_rf from returned url
  // let tx_rf: string
  // if (window.location.href.split('?')[1].startsWith('status')) {
  //   tx_rf = (window.location.href.split('?')[1].split('status=failed&tx_ref=')[1])
  // } else {
  //   tx_rf = (window.location.href.split('?tx_ref=')[1])
  // }
  
  const tx_rf = JSON.parse(sessionStorage.getItem('tx_ref') as string)

  const verifyPaymentRequest = async () => await axios.get(`/api/verify/${tx_rf}`)

  useQuery('verify', verifyPaymentRequest, {
    onSuccess: () => toast.success('Payment complete'),
    onError: () => toast.error('Payment failed'),
    onSettled: ()  => navigate('/')
  })

  return (
    <div className='grid place-items-center'>
      <div className='mt-[300px] flex flex-col items-center'>
        <FadeLoader color='#36d7b7' />
        <p className='text text-neutral-600'>Verifying payment</p>
      </div>
    </div>
  )
}

export default Callback
