import Link from 'next/link'
import postFooterLink from '../styles/postFooterLink.js'

export default function PostAuthor (props) {
  return (
    <>

      Posted by {' '}

      <Link href={'/profiles/' + props.post.author.username}>
        <a className={postFooterLink}>
          {props.post.author.username}
        </a>
      </Link>

    </>
  )
}
