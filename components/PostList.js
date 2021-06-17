import { useEffect, useState } from 'react'
import Post from './Post.js'

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
    const withUpdatedVote = p => {
      if (p.id === post.id) {
        return { ...post, votes: [data], score: post.score + (value || -1) }
      }
      return p
    }
    setPosts(posts.map(withUpdatedVote).sort(byScore))
  }

  return (
    <ul>
      {posts?.map(post => (
        <li key={post.id} className="my-5 flex items-center">
          <Post post={post} onVote={updatePosts} />
        </li>
      ))}
    </ul>
  )
}
