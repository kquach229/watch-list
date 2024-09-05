'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// We don't need to extend FormData anymore, just check the types directly
export async function updateWatch(
  formData: FormData
): Promise<{ message: string } | void> {
  const id = formData.get('id');
  const model = formData.get('model');
  const brand = formData.get('brand');
  const referenceNumber = formData.get('referenceNumber');

  // Ensure that all necessary fields are provided and are of type 'string'
  if (
    typeof id !== 'string' ||
    typeof model !== 'string' ||
    typeof brand !== 'string' ||
    typeof referenceNumber !== 'string'
  ) {
    console.error('Invalid or missing form data fields');
    return;
  }

  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (!user) {
    console.error('User is not authenticated within updateWatch server action');
    return;
  }

  // Update the watch data based on the watch ID and user ID
  const { data, error } = await supabase
    .from('watches')
    .update({
      model,
      brand,
      reference_number: referenceNumber,
    })
    .match({ id, user_id: user.id });

  if (error) {
    console.error('Error updating data:', error);
    return;
  }

  // Revalidate the cache for the /watch-list route
  revalidatePath('/watch-list');

  return { message: 'success' };
}
