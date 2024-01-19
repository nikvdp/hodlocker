
import { Alumni_Sans } from 'next/font/google'

import React from 'react';
import Link from 'next/link'

import { SiBitcoinsv } from 'react-icons/si';
import UserBalance from './UserBalance';
import { getAllBitcoinLocked } from '@/app/utils/get-all-bitcoin-locked';

const inter = Alumni_Sans({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'


export default async function NavBar() {  
  const bitcoinLocked = await getAllBitcoinLocked()

  console.log(bitcoinLocked.toFixed(2) + " total bitcoin locked")

  return (
    <>
      <nav className="bg-gray border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <Link href="/?tab=latest&sort=day" className="flex-1 flex justify-start lg:justify-start items-center lg:px-16">
            <h1 className={inter.className}><span className="pl-4 text-4xl font-bold dark:text-white">HL</span></h1>
          </Link>

          
            <div className="flex flex-col justify-center">
              <div>
                <span id="badge-dismiss-dark" className="inline-flex items-center px-2 py-1 text-sm font-medium text-black bg-gray-100 rounded dark:bg-gray-700 dark:text-white">
                  <span className="text-md font-mono">total locked - {Number(bitcoinLocked).toFixed(0)}</span>
                  <SiBitcoinsv className="text-orange-400 ml-1 mr-1" />
                </span>
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

