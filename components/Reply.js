import { useState } from 'react'
import Link from 'next/link'
import ReplyForm from './ReplyForm.js'
import ReplyList from './ReplyList.js'

const footerLink = `
  underline font-medium text-gray-400 hover:text-gray-200 transition
  duration-200 cursor-pointer
`

export default function Reply (props) {
  const [reply, setReply] = useState(props.reply)
  const [showReplyForm, setShowReplyForm] = useState(false)

  return (
    <div>

      <div className="text-lg">
        {reply.body}
      </div>

      <div className="text-gray-400">

        <Link href={'/posts/' + reply.id}>
          <a className={footerLink}>
            Link
          </a>
        </Link>

        <span className="mx-2">•</span>

        <a
          className={footerLink}
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          Reply
        </a>

      </div>

      {showReplyForm && <ReplyForm parent={reply.id} />}

      {reply.replies.list?.length && (
        <div className="my-4 pl-4 border-l border-gray-700">
          <ReplyList replies={reply.replies.list} />
        </div>
      )}

    </div>
  )
}
