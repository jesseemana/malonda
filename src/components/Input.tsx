import React from 'react'

type InputProps = {
  label: string 
  type: string 
  error: string 
  htmlFor: string 
  placeholder: string
  inputProps: unknown
}

const Input = ({ label, type, htmlFor, placeholder, inputProps, error }: InputProps) => {
  return (
    <div className='grid'>
      <label htmlFor={htmlFor}>{label}:</label>
      <input 
        id={htmlFor} 
        type={type} 
        placeholder={placeholder} 
        className='border p-2 outline-none rounded-md' 
        {...(inputProps ?? {})}
      />
      {error && <span className='text-red-600 text-[12px]'>{error}</span>}
    </div>
  )
}

export default Input
