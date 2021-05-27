import Link from 'next/link'
import footerLink from '../styles/footerLink.js'

export default function PostAuthor (props) {
  return (
    <>

      Posted by {' '}

      <Link href={'/profiles/' + props.post.author.username}>
        <a className={footerLink}>
          {props.post.author.username}
        </a>
      </Link>

    </>
  )
}
