'use client'

import Link from "next/link";
import SortingDropdown from "@/app/components/feeds/sorting-utils/SortingDropdown";
import { IoMdArrowDropdown } from "react-icons/io";

import { useSearchParams } from 'next/navigation'

interface SublockerFeedBarProps {
    params: {
        ticker: string
    }
}
export default function SublockerFeedBar({ params }: SublockerFeedBarProps) {

    const searchParams = useSearchParams()

    const activeSub = params.ticker;

    const activeTab = searchParams.get('tab') || "trending";

    const activeSort = searchParams.get("sort") || "year";

    const activeFilter = searchParams.get("filter") || 0;


    let notActiveClassName =
        "inline-block px-3 py-1 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 border-b-2 border-transparent";
    let activeClassName =
        "inline-block px-3 py-1 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:text-white text-orange-400 border-b-2 border-orange-400";

    // Add responsive classes for mobile, tablet, and desktop to both class names
    notActiveClassName +=
        " sm:inline-block sm:px-3 sm:py-1 sm:text-sm sm:border-b-2 sm:hover:border-gray-300";
    activeClassName +=
        " sm:inline-block sm:px-3 sm:py-1 sm:text-sm sm:border-b-2 sm:hover:border-gray-300";


    return (
        <ul className="flex flex-wrap -mb-px justify-evenly">

            <li className="flex pt-1 pr-2 inline-block relative items-center justify-center rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 border-b-2 border-transparent">
              <SortingDropdown sub={activeSub} tab={activeTab} sort={activeSort} filter={activeFilter ? parseFloat(activeFilter) : 0} />
            </li>

            <Link href={`/h/${activeSub}/?tab=subs&sort=${activeSort}&filter=${activeFilter}`}>
              <li
                className={
                  activeTab == "subs" ? activeClassName : notActiveClassName
                }
              >
                <div className="flex">
                  <p className="text-md dark:text-white">h/{activeSub}</p>
                  <IoMdArrowDropdown className="mt-1" />
                </div>
              </li>
            </Link>               

            <Link href={`/h/${activeSub}/?tab=top&sort=${activeSort}&filter=${activeFilter}`}>
              <li
                className={
                  activeTab == "top" ? activeClassName : notActiveClassName
                }
              >
                <div>
                  <p className="text-md dark:text-white">top</p>
                </div>
              </li>
            </Link>

            <Link
              href={`/h/${activeSub}/?tab=latest&sort=${activeSort}&filter=${activeFilter}`}
            >
              <li
                className={
                  activeTab == "latest" ? activeClassName : notActiveClassName
                }
              >
                <div>
                  <p className="text-md dark:text-white">latest</p>
                </div>
              </li>
            </Link>

            <Link
              href={`/h/${activeSub}/?tab=trending&sort=${activeSort}&filter=${activeFilter}`}
            >
              <li
                className={
                  activeTab == "trending" ? activeClassName : notActiveClassName
                }
              >
                <div>
                  <p className="text-md dark:text-white">trending</p>
                </div>
              </li>
            </Link>            

            
          </ul>
    )
}