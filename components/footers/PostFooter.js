import { useContext } from 'react'
import Link from 'next/link'
import { AppContext } from '../../lib/context.js'
import PostAuthor from '../../components/PostAuthor.js'
import postFooterLink from '../../styles/postFooterLink.js'

export default function PostFooter (props) {
  const ctx = useContext(AppContext)

  async function deletePost () {
    console.log('TODO:')
  }

  return (
    <div className="text-gray-500">

      {props.post.author && <PostAuthor post={props.post} />}

      <span className="mx-2">•</span>

      <a
        className={postFooterLink}
        onClick={props.onShowReplyForm}
      >
        {props.showReplyForm ? 'Cancel' : 'Reply'}
      </a>

      {props.post.author.id === ctx.account.id && (
        <>

          <span className="mx-2">•</span>

          <a className={postFooterLink} onClick={deletePost}>
            Delete
          </a>

        </>
      )}

      {props.post.parentId && (
        <>

          <span className="mx-2">•</span>

          <Link href={'/posts/' + props.post.parentId}>
            <a className={postFooterLink}>
              Parent
            </a>
          </Link>

        </>
      )}

    </div>
  )
}
