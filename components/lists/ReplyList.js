import { useState } from 'react'
import Reply from '../Reply.js'

function byScore (a, b) {
  return b.score - a.score
}

export default function ReplyList (props) {
  const [replies, setReplies] = useState(props.replies)

  function updateReplies (post, data, value) {
    const updated = replies.reduce(
      (acc, p) => {
        const isMatch = p.id === post.id
        if (isMatch && !post.deleted) {
          acc.push({
            ...post,
            votes: [data],
            score: post.score + (value || -1)
          })
        } else if (!isMatch) {
          acc.push(p)
        }
        return acc
      },
      []
    )
    setReplies(updated.sort(byScore))
  }

  return (
    <ul>
      {replies?.map(reply => (
        <li key={reply.id} className="my-5">
          <Reply reply={reply} onDeleted={updateReplies} />
        </li>
      ))}
    </ul>
  )
}
