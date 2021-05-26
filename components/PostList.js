import { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { HiArrowCircleUp } from 'react-icons/hi'
import { AppContext } from '../lib/context.js'
import { supabase } from '../lib/initSupabase.js'
import AppLink from '../components/AppLink.js'

function byScore (a, b) {
  return b.score - a.score
}

export default function PostList (props) {
  const ctx = useContext(AppContext)
  const [posts, setPosts] = useState(props.posts)

  useEffect(
    () => setPosts(props.posts),
    [props.posts]
  )

  function getVoteColor (post) {
    const [vote] = post.votes || []
    if (vote?.value === 1) {
      return 'text-green-400 hover:text-green-300'
    } else if (vote?.value === -1) {
      return 'text-red-400 hover:text-red-300'
    } else if (ctx.profile.id) {
      return 'text-gray-400 hover:text-gray-300'
    }
    return 'text-gray-600'
  }

  async function vote (post) {
    const [vote] = post.votes || []
    const value = vote?.value === 1 ? 0 : 1
    if (ctx.profile.id) {
      const { data, error } = await supabase
        .from('votes')
        .upsert({
          ...vote,
          postId: post.id,
          profileId: ctx.profile.id,
          value
        })

      if (error) {
        console.error(error)
      } else {
        console.info('Vote data', data)
        const withUpdatedVote = p => {
          if (p.id === post.id) {
            return { ...post, votes: data, score: post.score + (value || -1) }
          }
          return p
        }
        setPosts(posts.map(withUpdatedVote).sort(byScore))
      }
    }
  }

  return (
    <ul>
      {posts?.map(post => (
        <li key={post.id} className="my-5 flex items-center">

          <div>
            <HiArrowCircleUp
              onClick={() => vote(post)}
              className={clsx(
                'w-8 h-8 transition duration-200',
                ctx.profile.id && 'cursor-pointer',
                getVoteColor(post)
              )}
            />
          </div>

          <div className="ml-4">

            <AppLink
              href={post.link || ('/posts/' + post.id)}
              className={clsx(
                'text-xl font-medium dark:text-gray-300',
                'dark:hover:text-gray-100'
              )}
            >
              {post.title}
            </AppLink>

            <div className="text-gray-400">
              <Link href={'/posts/' + post.id}>
                <a>
                  Comments
                </a>
              </Link>

              Posted by {' '}
              <AppLink
                href={'/profiles/' + post.author.username}
                className="underline font-medium hover:text-gray-200"
              >
                {post.author.username}
              </AppLink>
            </div>

          </div>

        </li>
      ))}
    </ul>
  )
}
