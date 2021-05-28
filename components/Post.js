import Link from 'next/link'
import clsx from 'clsx'
import AppLink from '../components/AppLink.js'
import PostAuthor from '../components/PostAuthor.js'
import footerLink from '../styles/footerLink.js'
import BallotBox from '../components/BallotBox.js'

export default function Post (props) {
  return (
    <>

      <BallotBox post={props.post} />

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
