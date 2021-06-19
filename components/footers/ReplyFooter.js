import Link from 'next/link'
import PostAuthor from '../../components/PostAuthor.js'
import postFooterLink from '../../styles/postFooterLink.js'

export default function ReplyFooter (props) {
  return (
    <div className="text-sm text-gray-500">

      {props.reply.author && <PostAuthor post={props.reply} />}

      <span className="mx-1">•</span>

      <a
        className={postFooterLink}
        onClick={props.onShowReplyForm}
      >
        {props.showReplyForm ? 'Cancel' : 'Reply'}
      </a>

      <span className="mx-1">•</span>

      <Link href={'/posts/' + props.reply.id}>
        <a className={postFooterLink}>
          Link
        </a>
      </Link>

    </div>
  )
}
