import React from 'react';
import AuthForm from './components/AuthForm';
const WatchList = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-navy'>
      <div className='text-center p-6 bg-teal-500 rounded-lg shadow-lg max-w-lg w-full mx-4'>
        <h1 className='text-3xl md:text-4xl font-bold text-white mb-4'>
          Welcome to Watch List
        </h1>
        <p className='text-lg md:text-xl text-teal-100 mb-6'>
          Your personal space for your favorite watches. Sign in to create,
          view, edit, and delete your watches.
        </p>
        <div>
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default WatchList;
