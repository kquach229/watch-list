'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// Define the expected type for formData
interface AddWatchFormData extends FormData {
  get(name: 'model' | 'brand' | 'referenceNumber'): string | null;
}

export async function addWatch(
  formData: AddWatchFormData
): Promise<{ message: string } | void> {
  const model = formData.get('model');
  const brand = formData.get('brand');
  const referenceNumber = formData.get('referenceNumber');

  // Ensure that all necessary fields are provided
  if (!model || !brand || !referenceNumber) {
    console.error('Missing form data fields');
    return;
  }

  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (!user) {
    console.error('User is not authenticated within addWatch server action');
    return;
  }

  const { data, error } = await supabase.from('watches').insert({
    model,
    brand,
    reference_number: referenceNumber,
    user_id: user.id,
  });

  if (error) {
    console.error('Error inserting data:', error);
    return;
  }

  // Revalidate the cache for the /watch-list route
  revalidatePath('/watch-list');

  return { message: 'success' };
}
