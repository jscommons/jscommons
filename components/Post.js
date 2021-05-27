import { useContext } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { HiArrowCircleUp } from 'react-icons/hi'
import { AppContext } from '../lib/context.js'
import { supabase } from '../lib/initSupabase.js'
import AppLink from '../components/AppLink.js'
import PostAuthor from '../components/PostAuthor.js'
import footerLink from '../styles/footerLink.js'

export default function Post (props) {
  const ctx = useContext(AppContext)

  let voteColor = 'text-gray-600'
  if (props.post.vote?.value === 1) {
    voteColor = 'text-green-400 hover:text-green-300'
  } else if (props.post.vote?.value === -1) {
    voteColor = 'text-red-400 hover:text-red-300'
  } else if (ctx.profile.id) {
    voteColor = 'text-gray-400 hover:text-gray-300'
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
        props.onVote(post, data)
      }
    }
  }

  return (
    <>

      <div>
        <HiArrowCircleUp
          onClick={() => vote(props.post)}
          className={clsx(
            'w-8 h-8 transition duration-200',
            ctx.profile.id && 'cursor-pointer',
            voteColor
          )}
        />
      </div>

      <div className="ml-4">

        <AppLink
          href={props.post.link || ('/posts/' + props.post.id)}
          className={clsx(
            'text-xl font-medium dark:text-gray-300',
            'dark:hover:text-gray-100'
          )}
        >
          {props.post.title}
        </AppLink>

        <div className="text-gray-400">

          <PostAuthor post={props.post} />

          <span className="mx-2">•</span>

          <Link href={'/posts/' + props.post.id}>
            <a className={footerLink}>
              {props.post.reply_count} Replies
            </a>
          </Link>

        </div>

      </div>

    </>
  )
}
