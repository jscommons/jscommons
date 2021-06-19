import { useContext } from 'react'
import Link from 'next/link'
import PostAuthor from '../../components/PostAuthor.js'
import postFooterLink from '../../styles/postFooterLink.js'
import { AppContext } from '../../lib/context.js'

export default function ReplyFooter (props) {
  const ctx = useContext(AppContext)

  async function deleteReply () {
    console.log('TODO:')
  }

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

      {props.reply.author.id === ctx.account.id && (
        <>

          <span className="mx-2">•</span>

          <a className={postFooterLink} onClick={deleteReply}>
            Delete
          </a>

        </>
      )}

      <span className="mx-1">•</span>

      <Link href={'/posts/' + props.reply.id}>
        <a className={postFooterLink}>
          Link
        </a>
      </Link>

    </div>
  )
}
