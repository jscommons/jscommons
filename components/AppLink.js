import Link from 'next/link'

export default function AppLink ({ children, href, ...props }) {
  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    )
  } else {
    return (
      <Link href={href}>
        <a {...props}>
          {children}
        </a>
      </Link>
    )
  }
}
