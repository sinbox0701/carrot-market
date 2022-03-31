import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className='flex flex-col space-y-2 p-5'>
      <input type='file' className='file:transition-colors file:cursor-pointer file:hover:text-red-300 file:hover:border-red-500 file:hover:bg-white file:border-0 file:rounded-xl file:px-2 file:bg-red-300 file:text-white ' />
    </div>
  ); 
}

export default Home