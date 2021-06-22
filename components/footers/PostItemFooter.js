import { useContext } from 'react'
import Link from 'next/link'
import { Menu, Button } from '@generates/swag'
import footerLink from '../../styles/footerLink.js'
import { AppContext } from '../../lib/context.js'

export default function PostItemFooter (props) {
  const ctx = useContext(AppContext)

  return (
    <div className="text-gray-400">

      {props.post.author && (
        <>

          Posted by {' '}

          <Link href={'/profiles/' + props.post.author.username}>
            <a className={footerLink}>
              {props.post.author.username}
            </a>
          </Link>

        </>
      )}

      <span className="mx-2">•</span>

      <Link href={'/posts/' + props.post.id}>
        <a className={footerLink}>
          {props.post.replyCount} Replies
        </a>
      </Link>

      {props.post.author.id === ctx.account.id && (
        <>

          <span className="mx-2">•</span>

          <Menu
            button
            trigger={
              <a className={footerLink}>
                Delete?
              </a>
            }
            css={{
              panel: { width: '250px' }
            }}
          >
            <div className="p-4">

              <div
                className="text-trueGray-900 text-center text-lg font-medium"
              >
                Are you sure you want to delete this post?
              </div>

              <div className="flex justify-center mt-4">

                <Button stop>
                  Delete
                </Button>

                <Button css={{ marginLeft: '1em' }} >
                  Cancel
                </Button>

              </div>

            </div>
          </Menu>

        </>
      )}

    </div>
  )
}
