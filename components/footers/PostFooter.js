import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { StyledDiv, transition } from '@generates/swag'
import { AppContext } from '../../lib/context.js'
import PostAuthor from '../../components/PostAuthor.js'
import DeleteLink from '../links/DeleteLink.js'

export default function PostFooter (props) {
  const ctx = useContext(AppContext)
  const router = useRouter()

  return (
    <StyledDiv css={{
      color: '#737373',
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

      {props.post.author && <PostAuthor post={props.post} />}

      <span className="mx-2">•</span>

      <a onClick={props.onShowReplyForm}>
        {props.showReplyForm ? 'Cancel' : 'Reply'}
      </a>

      {props.post.author.id === ctx.account.id && (
        <>

          <span className="mx-2">•</span>

          <DeleteLink
            post={props.post}
            onDeleted={() => router.push('/')}
          />

        </>
      )}

      {props.post.parentId && (
        <>

          <span className="mx-2">•</span>

          <Link href={'/posts/' + props.post.parentId}>
            <a>
              Parent
            </a>
          </Link>

        </>
      )}

    </StyledDiv>
  )
}
