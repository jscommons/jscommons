import Link from 'next/link'
import Image from 'next/image'

export default function BrandHeading () {
  return (
    <h1 className="text-gray-100 text-3xl">
      <Link href="/">
        <a>
          <Image
            src="/img/jscommons-logo-yellow.svg"
            height="100"
            width="262.5"
            alt="JS Commons"
          />
        </a>
      </Link>
    </h1>
  )
}
