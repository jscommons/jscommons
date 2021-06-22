import { useEffect, useState } from 'react'
import PostItem from '../PostItem.js'

function byScore (a, b) {
  return b.score - a.score
}

export default function PostList (props) {
  const [posts, setPosts] = useState(props.posts)

  useEffect(
    () => setPosts(props.posts),
    [props.posts]
  )

  function updatePosts (post, data, value) {
    const updated = posts.reduce(
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
    setPosts(updated.sort(byScore))
  }

  return (
    <ul>
      {posts?.map(post => (
        <li key={post.id} className="my-5 flex items-center">
          <PostItem
            post={post}
            onVote={updatePosts}
            onDeleted={updatePosts}
          />
        </li>
      ))}
    </ul>
  )
}
