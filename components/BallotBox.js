import { useContext } from 'react'
import { HiArrowCircleUp } from 'react-icons/hi'
import clsx from 'clsx'
import { AppContext } from '../lib/context.js'
import { supabase } from '../lib/initSupabase.js'

export default function BallotBox (props) {
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
  )
}
