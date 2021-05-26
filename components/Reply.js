import { useState } from 'react'
import AppLink from './AppLink.js'
import ReplyForm from './ReplyForm.js'
import ReplyList from './ReplyList.js'

export default function Reply (props) {
  const [reply, setReply] = useState(props.reply)
  const [showReplyForm, setShowReplyForm] = useState(false)

  return (
    <div>

      <div className="text-lg">
        {reply.body}
      </div>

      <div>

        <AppLink href={'/posts/' + reply.id}>
          Link
        </AppLink>

        <a
          className="underline"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          Reply
        </a>

      </div>

      {showReplyForm && <ReplyForm parent={reply.id} />}

      {reply.replies.list?.length && (
        <div className="mt-4 pl-4 border-l border-gray-700">
          <ReplyList replies={reply.replies.list} />
        </div>
      )}

    </div>
  )
}
