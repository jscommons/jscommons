import Link from 'next/link'
import PostAuthor from '../../components/PostAuthor.js'
import postFooterLink from '../../styles/postFooterLink.js'

export default function PostFooter (props) {
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
