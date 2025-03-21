'use client'

import React, { useEffect, useRef } from "react";
import ReplyComponent from "./ReplyComponent";
import { LockLikes } from "@prisma/client";
import ReplyInteraction from "../actions/ReplyInteraction";

interface RepliesDrawerProps {
    transaction: any,
    replies: any
    replyDrawerVisible: any,
    setReplyDrawerVisible: any,
    postLockLike: (
        txid: string,
        amount: number,
        nLockTime: number,
        handle: string,
        postTxid?: string,
        replyTxid?: string
      ) => Promise<LockLikes>;
}

const RepliesDrawer = ({
  transaction,
  replies,
  replyDrawerVisible,
  setReplyDrawerVisible,
  postLockLike
}: RepliesDrawerProps) => {

  const drawerRef = useRef(null);

  useEffect(() => {
    // Function to handle outside clicks
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setReplyDrawerVisible(false);
      }
    }

    // Add event listener when the component is mounted
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener and class on cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

    };
  }, [setReplyDrawerVisible, replyDrawerVisible]);


  return (
    <>
      <div
          key={transaction.txid}
          id="comments-drawer"
          ref={drawerRef}
          className={`h-auto max-h-screen fixed z-10 rounded-lg fixed bottom-0 right-0 w-full lg:w-1/3 p-4 shadow-lg overflow-y-auto items-center transition-transform bg-white dark:bg-black ${
            replyDrawerVisible ? "transform-none" : "translate-y-full"
          }`}
          tabIndex={-1}
        >
          <div className="flex py-2 justify-center items-center">
            <h5
            id="drawer-bottom-label"
            className="inline-flex items-center mb-1 text-lg font-semibold text-black dark:text-white"
          >
            Comments
          </h5>
          <button
            onClick={() => setReplyDrawerVisible(!replyDrawerVisible)}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          </div>

          {replies.map((reply, index) => (
            <div key={index}>
              <ReplyComponent reply={reply} postLockLike={postLockLike} />
            </div>            
          ))}          

          <div className="py-4 pb-24 lg:pb-6">
            <ReplyInteraction transaction={transaction} />
          </div>         
          
      </div>
    </>
  );
};

export default RepliesDrawer;
