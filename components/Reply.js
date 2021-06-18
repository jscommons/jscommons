import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ReplyForm from './ReplyForm.js'
import ReplyList from './ReplyList.js'
import BallotBox from './BallotBox.js'
import { AppContext } from '../lib/context.js'

const footerLink = `
  underline font-medium text-gray-400 hover:text-gray-200 transition
  duration-200 cursor-pointer
`

export default function Reply (props) {
  const ctx = useContext(AppContext)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const router = useRouter()

  return (
    <>

      <div className="flex items-center">

        <BallotBox post={props.reply} />

        <div className="ml-4">

          <div className="text-lg">
            {props.reply.body}
          </div>

          <div className="text-gray-400">

            <Link href={'/posts/' + props.reply.id}>
              <a className={footerLink}>
                Link
              </a>
            </Link>

            <span className="mx-2">•</span>

            <a
              className={footerLink}
              onClick={() => {
                if (ctx.account.id) {
                  setShowReplyForm(!showReplyForm)
                } else {
                  router.push('/sign-in')
                }
              }}
            >
              {showReplyForm ? 'Cancel' : 'Reply'}
            </a>

          </div>

        </div>

      </div>

      {showReplyForm && (
        <ReplyForm threadId={props.reply.threadId} parentId={props.reply.id} />
      )}

      {props.reply.replies?.length && (
        <div className="my-8 pl-4 border-l-2 border-gray-700">
          <ReplyList replies={props.reply.replies.list} />
        </div>
      )}

    </>
  )
}
