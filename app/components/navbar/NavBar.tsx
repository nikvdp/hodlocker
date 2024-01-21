
import { Alumni_Sans } from 'next/font/google'

import React, { Suspense } from 'react';
import Link from 'next/link'

import BitcoinLocked from './BitcoinLocked'
import UserBalance from './UserBalance';
import Loading from '@/app/(home)/loading';


const inter = Alumni_Sans({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'


export default async function NavBar() {  

  return (
    <>
      <nav className="bg-gray border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <Link href="/?tab=latest&sort=day" className="flex-1 flex justify-start lg:justify-start items-center lg:px-16">
            <h1 className={inter.className}><span className="pl-4 text-4xl font-bold dark:text-white">HL</span></h1>
          </Link>

          
            <div className="flex flex-col justify-center">
              <div>
                <Suspense fallback={<p className="font-mono">loading total locked...</p>} >
                <BitcoinLocked />
                </Suspense>                
              </div>
            </div>
       

          <div className="flex-1 flex justify-end items-center md:order-2 md:pt-2 lg:mr-36">
            <UserBalance />
          </div>
        </div>
      </nav>


    </>
  );
}

