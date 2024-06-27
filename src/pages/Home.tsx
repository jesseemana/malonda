import React from 'react'
import axios from '../api/axios'
import Checkout from '../components/Checkout'
import { useQuery } from 'react-query'
import { BeatLoader } from 'react-spinners'

type ProductType = {
  _id: string
  name: string
  image: string
  price: number
}

const Home = () => {
  async function getProducts(): Promise<ProductType[]> {
    const response = await axios.get('/api/products')
    return response.data
  }

  const { data: results, isLoading } = useQuery('getAllProducts', getProducts)  
  const products = results!
  
  return (
    <main className='py-20 px-4'>
      {isLoading ? <Loader /> : (
        <div className='flex flex-col md:grid grid-cols-3 gap-4'>
          {products.map((product) => (
            <div key={product._id} className='flex flex-col'>
              <img 
                src={product.image} 
                alt={`${product.name}'s image`} 
                className='lg:h-[260px] md:h-[180px] bg-neutral-50'
              />
              <div className='p-2 space-y-2'>
                <p className='flex text-2xl capitalize font-semibold justify-between'>
                  <span>{product.name}</span>
                  <span>MWK{(product.price).toFixed(2)}</span>
                </p>
                <Checkout amount={product.price} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export function Loader() {
  return (
    <div className='mt-[280px] flex flex-col items-center'>
      <BeatLoader color='#36d7b7' />
    </div>
  )
}

export default Home
