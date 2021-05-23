import Link from 'next/link'

export default function BrandHeading () {
  return (
    <h1 className="text-gray-100 text-3xl">
      <Link href="/">
        <a>JS Commons</a>
      </Link>
    </h1>
  )
}
