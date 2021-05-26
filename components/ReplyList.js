import { useState } from 'react'
import Reply from './Reply.js'

export default function ReplyList (props) {
  const [replies, setReplies] = useState(props.replies)

  return (
    <ul>
      {replies?.map(reply => (
        <li key={reply.id}>
          <Reply reply={reply} />
        </li>
      ))}
    </ul>
  )
}
