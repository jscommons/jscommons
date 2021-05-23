import Link from 'next/link'

export default function PostLink ({ children, post, ...props }) {
  if (post.link) {
    return (
    <a href={post.link}>
      {children}
    </a>
    )
  } else {
    return (
      <Link href={`/posts/${post.id}`}>
        <a>
          {children}
        </a>
      </Link>
    )
  }
}
