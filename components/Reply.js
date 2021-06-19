import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { AppContext } from '../lib/context.js'
import ReplyList from './lists/ReplyList.js'
import BallotBox from './BallotBox.js'
import ReplyForm from './ReplyForm.js'
import ReplyFooter from './footers/ReplyFooter.js'

export default function Reply (props) {
  const ctx = useContext(AppContext)
  const router = useRouter()
  const [reply, setReply] = useState(props.reply)
  const [showReplyForm, setShowReplyForm] = useState(false)

  function onReply (reply) {
    reply.replies.push(reply)
    setReply(reply)
    setShowReplyForm(false)
  }

  return (
    <>

      <div className="flex my-4">

        <BallotBox
          post={reply}
          css={{ fontSize: '1.25em', marginTop: '.1em' }}
        />

        <div className="ml-2">

          {reply.body}

          <ReplyFooter
            reply={reply}
            showReplyForm={showReplyForm}
            onShowReplyForm={() => {
              if (ctx.account.id) {
                setShowReplyForm(!showReplyForm)
              } else {
                router.push('/sign-in')
              }
            }}
          />

        </div>

      </div>

      {showReplyForm && (
        <div className="ml-7">
          <ReplyForm
            threadId={reply.threadId}
            parentId={reply.id}
            onSuccess={onReply}
          />
        </div>
      )}

      {reply.replies?.length > 0 && (
        <div className="my-8 pl-4 border-l-2 border-gray-700">
          <ReplyList replies={reply.replies.list} />
        </div>
      )}

    </>
  )
}
