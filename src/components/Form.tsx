import React from 'react'
import Input from './Input'
import { z } from 'zod'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const userDetailsSchema = z.object({
  first_name: z.string()
    .min(3, 'name must be at least 3 characters')
    .trim(),
  last_name: z.string()
    .min(3, 'name must be at least 3 characters')
    .trim(),
  email: z.string()
    .email('enter a valid email')
    .trim(),
  address: z.string()
    .min(5, 'address must be at least 5 characters')
    .trim()
})

export type SubmitData = z.infer<typeof userDetailsSchema>

const Form = ({ onCheckout, isSubmitting }: { 
  onCheckout: (submitData: SubmitData) => void, 
  isSubmitting: boolean 
}) => {
  const form = useForm<SubmitData>({
    resolver: zodResolver(userDetailsSchema)
  });

  return (
    <form onSubmit={form.handleSubmit(onCheckout)} className='space-y-2'>
      <h1 className='text text-center font-medium'>
        Submit your details
      </h1>

      <Input 
        htmlFor='email' 
        label='Email' 
        type='email' 
        placeholder='email' 
        inputProps={form.register('email')}
        error={form.formState.errors.email?.message as string}
      />

      <Input 
        htmlFor='firstname' 
        label='First name' 
        type='text' 
        placeholder='first name' 
        inputProps={form.register('first_name')}
        error={form.formState.errors.first_name?.message as string}
      />

      <Input 
        htmlFor='lastname' 
        label='Last name' 
        type='text' 
        placeholder='last name' 
        inputProps={form.register('last_name')}
        error={form.formState.errors.last_name?.message as string}
      />

      <Input 
        htmlFor='address' 
        label='Address' 
        type='text' 
        placeholder='address' 
        inputProps={form.register('address')}
        error={form.formState.errors.address?.message as string}
      />

      {isSubmitting ? 
        <Button 
          disabled
          type='button' 
          className={`rounded-sm cursor-not-allowed`}
        >
          <Loading />
        </Button> : (
        <Button type='submit' className='rounded-sm'>
          Checkout
        </Button>
      )}
    </form>
  )
}

export function Loading() {
  return (
    <span className='flex items-center'>
      <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
      submitting
    </span>
  )
}

export default Form
