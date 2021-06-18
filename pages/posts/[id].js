import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'
import { http } from '@ianwalter/http'
import { StyledDiv } from '@generates/swag'
import AppPage from '../../components/AppPage.js'
import container from '../../styles/container.js'
import Reply from '../../components/Reply.js'
import ReplyForm from '../../components/ReplyForm.js'
import PostAuthor from '../../components/PostAuthor.js'
import footerLink from '../../styles/footerLink.js'
import AppLink from '../../components/AppLink.js'
import logger from '../../lib/clientLogger.js'
import { AppContext } from '../../lib/context.js'
import BallotBox from '../../components/BallotBox.js'

export default function PostPage () {
  const ctx = useContext(AppContext)
  const router = useRouter()
  const [post, setPost] = useState()
  const [showReplyForm, setShowReplyForm] = useState(false)

  function onReply (reply) {
    post.replies.push(reply)
    setPost(post)
    setShowReplyForm(false)
  }

  useEffect(
    () => {
      if (router.query.id) {
        http
          .get(`/api/posts/${router.query.id}`)
          .then(res => {
            logger.debug('Post data', res.body)
            setPost(res.body)
          })
          .catch(err => logger.error('Get post', { query: router.query }, err))
      }
    },
    [
      router
    ]
  )

  return (
    <AppPage>
      <div className={clsx(container, 'my-8')}>

        {post && (
          <div>
            <div className="flex">

              <BallotBox post={post} css={{ marginTop: '1em' }} />

              <div className="ml-4">

                <AppLink
                  href={post.link || ('/posts/' + post.id)}
                  className={clsx(
                    'text-xl font-medium dark:text-gray-300',
                    'dark:hover:text-gray-100'
                  )}
                >
                  <h1 className="text-2xl font-medium">
                    {post.title}
                  </h1>
                </AppLink>

                <p className="text-xl dark:text-gray-400 mt-1">
                  {post.body}
                </p>

                <div className="dark:text-gray-500 mt-1">

                  <PostAuthor post={post} />

                  <span className="mx-2">•</span>

                  <a
                    className={footerLink}
                    onClick={() => {
                      if (ctx.account.id) {
                        setShowReplyForm(!showReplyForm)
                      } else {
                        router.push('/sign-in')
                      }
                    }}
                  >
                    {showReplyForm ? 'Cancel' : 'Reply'}
                  </a>

                  {post.parentId && (
                    <>

                      <span className="mx-2">•</span>

                      <Link href={'/posts/' + post.parentId}>
                        <a className={footerLink}>
                          Parent
                        </a>
                      </Link>

                    </>
                  )}

                </div>

                {showReplyForm && (
                  <StyledDiv css={{ marginTop: '1em' }}>
                    <ReplyForm
                      threadId={post.id}
                      parentId={post.id}
                      onSuccess={onReply}
                    />
                  </StyledDiv>
                )}

              </div>

            </div>

            <div className="mt-8">
              {post.replies.map(reply => (
                <Reply key={reply.id} reply={reply} />
              ))}
            </div>

          </div>
        )}

        {!post && (
          <div>
            Post not found
          </div>
        )}

      </div>
    </AppPage>
  )
}
