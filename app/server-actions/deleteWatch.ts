'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function deleteWatch(
  formData: FormData
): Promise<{ message: string } | void> {
  const id = formData.get('id') as string; // Cast to string since FormData.get returns FormDataEntryValue | null

  if (!id) {
    console.error('ID is required for deleting watch');
    return;
  }

  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (!user) {
    console.error('User is not authenticated within deleteWatch server action');
    return;
  }

  const { data, error } = await supabase
    .from('watches')
    .delete()
    .match({ id, user_id: user.id });

  if (error) {
    console.error('Error deleting data:', error);
    return;
  }

  revalidatePath('/watch-list');

  return { message: 'success' };
}
