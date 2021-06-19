import clsx from 'clsx'
import AppLink from '../components/AppLink.js'
import PostItemFooter from '../components/footers/PostItemFooter.js'
import BallotBox from '../components/BallotBox.js'

export default function PostItem (props) {
  return (
    <>

      <BallotBox
        post={props.post}
        onVote={props.onVote}
        css={{ fontSize: '2em', marginTop: '.1em' }}
      />

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

        <PostItemFooter post={props.post} />

      </div>

    </>
  )
}
