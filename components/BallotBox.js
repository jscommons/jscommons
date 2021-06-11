import { useContext } from 'react'
import { HiArrowCircleUp } from 'react-icons/hi'
import { http } from '@ianwalter/http'
import clsx from 'clsx'
import { AppContext } from '../lib/context.js'

export default function BallotBox (props) {
  const ctx = useContext(AppContext)
  const [vote] = props.post.votes || []

  let voteColor = 'text-gray-600'
  if (vote?.value === 1) {
    voteColor = 'text-green-400 hover:text-green-300'
  } else if (vote?.value === -1) {
    voteColor = 'text-red-400 hover:text-red-300'
  } else if (ctx.account.id) {
    voteColor = 'text-gray-400 hover:text-gray-300'
  }

  async function submitVote () {
    const value = vote?.value === 1 ? 0 : 1
    if (ctx.account.id) {
      // const { data, error } = await supabase
      //   .from('votes')
      //   .upsert({
      //     ...vote,
      //     post_id: post.id,
      //     profile_id: ctx.profile.id,
      //     value
      //   })

      // if (error) {
      //   console.error(error)
      // } else {
      //   console.info('Vote data', data)
      //   if (props.onVote) props.onVote(post, data)
      // }
      try {
        const body = { postId: props.post.id, value }
        const res = await http.post('/api/vote', { body })
        console.info('Vote data', res.body)
        if (props.onVote) props.onVote(props.post, res.body, value)
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div>
      <HiArrowCircleUp
        onClick={submitVote}
        className={clsx(
          'w-8 h-8 transition duration-200',
          ctx.account.id && 'cursor-pointer',
          voteColor
        )}
      />
    </div>
  )
}
