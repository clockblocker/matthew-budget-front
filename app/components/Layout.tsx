import React from 'react'

export const Layout = ({children}: React.PropsWithChildren<{}>)=> {
  return (
    <section className='w-full flex justify-center bg-cyan-900 h-screen'>
      <section className='w-full sm:w-4/5 md:w-4/5 lg:w-3/5 xl:w-2/5 bg-cyan-300 h-screen'>
        {children}
      </section>
    </section>  
);
};

