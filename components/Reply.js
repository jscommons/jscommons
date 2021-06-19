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
  const [showReplyForm, setShowReplyForm] = useState(false)

  return (
    <>

      <div className="flex my-4">

        <BallotBox
          post={props.reply}
          css={{ fontSize: '1.25em', marginTop: '.1em' }}
        />

        <div className="ml-2">

          {props.reply.body}

          <ReplyFooter
            reply={props.reply}
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
            threadId={props.reply.threadId}
            parentId={props.reply.id}
          />
        </div>
      )}

      {props.reply.replies?.length && (
        <div className="my-8 pl-4 border-l-2 border-gray-700">
          <ReplyList replies={props.reply.replies.list} />
        </div>
      )}

    </>
  )
}
