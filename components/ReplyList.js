import { useState } from 'react'
import Reply from './Reply.js'

export default function ReplyList (props) {
  const [replies] = useState(props.replies)

  return (
    <ul>
      {replies?.map(reply => (
        <li key={reply.id} className="my-5">
          <Reply reply={reply} />
        </li>
      ))}
    </ul>
  )
}
