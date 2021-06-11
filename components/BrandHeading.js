import Link from 'next/link'
import Image from 'next/image'
import { StyledLink } from '@generates/swag'

export default function BrandHeading () {
  return (
    <Link href="/">
      <StyledLink css={{ height: '35px' }}>
        <Image
          src="/img/jscommons-logo-yellow.svg"
          height="35"
          width="150"
          alt="JS Commons"
        />
      </StyledLink>
    </Link>
  )
}
