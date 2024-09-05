import React from 'react';
import WatchForm from '../components/WatchForm';
import EditWatch from '../components/EditWatch';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { deleteWatch } from '../server-actions/deleteWatch';

// Define the type for a watch
interface Watch {
  id: string;
  brand: string;
  model: string;
  reference_number: string;
}

const WatchList = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (!user) {
    console.error('User not authenticated');
    return <div className='text-red-500'>Error: User not authenticated.</div>;
  }

  const { data: watches, error } = await supabase
    .from('watches')
    .select('*')
    .eq('user_id', user.id)
    .order('brand', { ascending: true });

  if (error) {
    console.error('Error fetching watches:', error);
    return <div className='text-red-500'>Error fetching watches</div>;
  }

  return (
    <div className='min-h-screen bg-navy text-white p-6'>
      <div className='max-w-4xl mx-auto space-y-8'>
        <div className='flex justify-between items-center bg-teal-500 p-4 rounded-lg shadow-lg'>
          <h1 className='text-2xl font-bold'>My Watch List</h1>
          <form action='/auth/signout' method='post'>
            <button
              type='submit'
              className='bg-teal-700 text-white py-2 px-4 rounded hover:bg-teal-800 transition-colors'>
              Sign Out
            </button>
          </form>
        </div>
        <WatchForm />
        <div className='space-y-6'>
          {watches?.map((watch: Watch) => (
            <div
              key={watch.id}
              className='bg-teal-600 p-4 rounded-lg shadow-md'>
              <h2 className='text-xl font-semibold'>
                {watch.brand} - {watch.model}
              </h2>
              <div className='flex justify-between items-center mt-4'>
                <form action={deleteWatch} className='inline-block'>
                  <input type='hidden' name='id' value={watch.id} />
                  <button
                    type='submit'
                    className='bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition-colors'>
                    Delete
                  </button>
                </form>
                <EditWatch watch={watch} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchList;
