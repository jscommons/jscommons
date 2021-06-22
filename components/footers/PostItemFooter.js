import { useContext } from 'react'
import Link from 'next/link'
import { StyledDiv, transition } from '@generates/swag'
import DeleteLink from '../links/DeleteLink.js'
import { AppContext } from '../../lib/context.js'

export default function PostItemFooter (props) {
  const ctx = useContext(AppContext)

  return (
    <StyledDiv css={{
      color: '#A3A3A3',
      a: {
        cursor: 'pointer',
        textDecoration: 'underline',
        fontWeight: '500',
        ...transition,
        '&:hover': {
          color: '#E5E5E5'
        }
      }
    }}>

      {props.post.author && (
        <>

          Posted by {' '}

          <Link href={'/profiles/' + props.post.author.username}>
            <a>
              {props.post.author.username}
            </a>
          </Link>

        </>
      )}

      <span className="mx-2">•</span>

      <Link href={'/posts/' + props.post.id}>
        <a>
          {props.post.replyCount} Replies
        </a>
      </Link>

      {props.post.author.id === ctx.account.id && (
        <>

          <span className="mx-2">•</span>

          <DeleteLink post={props.post} onDeleted={props.onDeleted} />

        </>
      )}

    </StyledDiv>
  )
}
