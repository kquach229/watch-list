'use client';
import React, { useState, ChangeEvent } from 'react';
import { updateWatch } from '../server-actions/updateWatch';

// Define the type for the watch prop
interface Watch {
  id: string;
  brand: string;
  model: string;
  reference_number: string; // Matches the field in the database
}

interface EditWatchProps {
  watch: Watch;
}

const EditWatch: React.FC<EditWatchProps> = ({ watch }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    brand: watch.brand,
    model: watch.model,
    referenceNumber: watch.reference_number, // Aligns with reference_number field in database
  });

  // Define type for the event in handleChange
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className='bg-teal-600 text-white py-1 px-3 rounded hover:bg-teal-700 transition-colors'>
        Edit
      </button>
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-blue-950 text-white p-6 rounded-lg max-w-md w-full relative'>
            <button
              onClick={() => setShowModal(false)}
              className='absolute top-2 right-2 text-white text-xl hover:text-teal-500 transition-colors'>
              &times;
            </button>
            <h2 className='text-xl font-bold mb-4'>Edit Watch</h2>
            <form
              action={updateWatch}
              onSubmit={() => setShowModal(false)}
              className='space-y-4'>
              <input type='hidden' name='id' value={watch.id} />
              <div>
                <label htmlFor='brand' className='block text-lg font-semibold'>
                  Brand
                </label>
                <input
                  type='text'
                  id='brand'
                  name='brand'
                  value={formData.brand}
                  onChange={handleChange}
                  className='text-black w-full mt-2 p-2 border border-teal-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-700'
                />
              </div>
              <div>
                <label htmlFor='model' className='block text-lg font-semibold'>
                  Model
                </label>
                <input
                  type='text'
                  id='model'
                  name='model'
                  value={formData.model}
                  onChange={handleChange}
                  className='text-black w-full mt-2 p-2 border border-teal-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-700'
                />
              </div>
              <div>
                <label
                  htmlFor='referenceNumber'
                  className='block text-lg font-semibold'>
                  Reference Number
                </label>
                <input
                  type='text'
                  id='referenceNumber'
                  name='referenceNumber'
                  value={formData.referenceNumber}
                  onChange={handleChange}
                  className='text-black w-full mt-2 p-2 border border-teal-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-700'
                />
              </div>
              <button
                type='submit'
                className='w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition-colors'>
                Update Watch
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditWatch;
