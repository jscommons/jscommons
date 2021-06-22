import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { http } from '@ianwalter/http'
import AppPage from '../../components/AppPage.js'
import container from '../../styles/container.js'
import ReplyList from '../../components/lists/ReplyList.js'
import ReplyForm from '../../components/ReplyForm.js'
import PostFooter from '../../components/footers/PostFooter.js'
import AppLink from '../../components/links/AppLink.js'
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

            const replies = {}
            const post = {
              ...res.body,
              replies: res.body.replies.reduce(
                (acc, reply) => {
                  reply.replies = []
                  replies[reply.id] = reply

                  if (reply.parentId === res.body.id) {
                    acc.push(reply)
                  } else if (replies[reply.parentId]) {
                    replies[reply.parentId].replies.push(reply)
                  }

                  return acc
                },
                []
              )
            }

            logger.debug('Post with replies', { post, replies })

            setPost(post)
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

              <BallotBox
                post={post}
                css={{ fontSize: '2em', marginTop: '.1em' }}
              />

              <div className="ml-3">

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

                <p className="text-xl dark:text-gray-400 my-1">
                  {post.body}
                </p>

                <PostFooter
                  post={post}
                  showReplyForm={showReplyForm}
                  onShowReplyForm={() => {
                    if (ctx.account.id) {
                      setShowReplyForm(!showReplyForm)
                    } else {
                      router.push('/sign-in')
                    }
                  }}
                />

                {showReplyForm && (
                  <div className="mt-4">
                    <ReplyForm
                      threadId={post.id}
                      parentId={post.id}
                      onSuccess={onReply}
                    />
                  </div>
                )}

              </div>

            </div>

            <div className="mt-8 ml-10">
              <ReplyList replies={post.replies} />
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
