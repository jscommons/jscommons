import { useContext } from 'react'
import Link from 'next/link'
import { StyledDiv, transition } from '@generates/swag'
import PostAuthor from '../../components/PostAuthor.js'
import { AppContext } from '../../lib/context.js'
import DeleteLink from '../links/DeleteLink.js'

export default function ReplyFooter (props) {
  const ctx = useContext(AppContext)

  return (
    <StyledDiv css={{
      color: '#737373',
      fontSize: '.875em',
      a: {
        cursor: 'pointer',
        textDecoration: 'underline',
        fontWeight: '500',
        ...transition,
        '&:hover': {
          color: '#D4D4D4'
        }
      }
    }}>

      {props.reply.author && <PostAuthor post={props.reply} />}

      <span className="mx-1">•</span>

      <a onClick={props.onShowReplyForm}>
        {props.showReplyForm ? 'Cancel' : 'Reply'}
      </a>

      {props.reply.author.id === ctx.account.id && (
        <>

          <span className="mx-1">•</span>

          <DeleteLink post={props.reply} onDeleted={props.onDeleted} />

        </>
      )}

      <span className="mx-1">•</span>

      <Link href={'/posts/' + props.reply.id}>
        <a>
          Link
        </a>
      </Link>

    </StyledDiv>
  )
}
