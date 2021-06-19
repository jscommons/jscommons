import Link from 'next/link'
import footerLink from '../../styles/footerLink.js'

export default function PostItemFooter (props) {
  return (
    <div className="text-gray-400">

      {props.post.author && (
        <>

          Posted by {' '}

          <Link href={'/profiles/' + props.post.author.username}>
            <a className={footerLink}>
              {props.post.author.username}
            </a>
          </Link>

        </>
      )}

      <span className="mx-2">•</span>

      <Link href={'/posts/' + props.post.id}>
        <a className={footerLink}>
          {props.post.replyCount} Replies
        </a>
      </Link>

    </div>
  )
}
