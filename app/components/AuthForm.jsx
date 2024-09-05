'use client';
import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const AuthForm = () => {
  const supabase = createClientComponentClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  // update
  return (
    <Auth
      supabaseClient={supabase}
      view='magic_link'
      showLinks={false}
      providers={[]}
      redirectTo={process.env.NEXT_PUBLIC_SUPABASE_REDIRECT}
      appearance={{
        theme: 'dark',
        button: {
          className: 'bg-white-400 text-gray-900 hover:bg-gray-600',
        },
        input: {
          className: 'bg-gray-700 border-gray-600 text-white',
        },
      }}
    />
  );
};

export default AuthForm;
