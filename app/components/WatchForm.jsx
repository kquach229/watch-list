import React from 'react';
import { addWatch } from '../server-actions/addWatch';

const WatchForm = () => {
  return (
    <form
      action={addWatch}
      method='post'
      className='w-full max-w-lg mx-auto bg-teal-500 p-6 rounded-lg shadow-md'>
      <h2 className='text-2xl font-semibold text-white mb-4'>
        Add a New Watch
      </h2>

      <div className='mb-4'>
        <label
          htmlFor='brand'
          className='block text-white text-sm font-medium mb-2'>
          Brand
        </label>
        <input
          type='text'
          id='brand'
          name='brand'
          required
          className='text-black w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400'
          placeholder='e.g., Rolex'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='model'
          className='block text-white text-sm font-medium mb-2'>
          Model
        </label>
        <input
          type='text'
          id='model'
          name='model'
          required
          className='text-black w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400'
          placeholder='e.g., Submariner'
        />
      </div>

      <div className='mb-6'>
        <label
          htmlFor='referenceNumber'
          className='block text-white text-sm font-medium mb-2'>
          Reference Number
        </label>
        <input
          type='text'
          id='referenceNumber'
          name='referenceNumber'
          required
          className='text-black w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400'
          placeholder='e.g., 116610LN'
        />
      </div>

      <button
        type='submit'
        className='w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-navy-700 transition-colors'>
        Add Watch
      </button>
    </form>
  );
};

export default WatchForm;
