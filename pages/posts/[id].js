import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'
import { http } from '@ianwalter/http'
import AppPage from '../../components/AppPage.js'
import container from '../../styles/container.js'
import Reply from '../../components/Reply.js'
import ReplyForm from '../../components/ReplyForm.js'
import PostAuthor from '../../components/PostAuthor.js'
import footerLink from '../../styles/footerLink.js'
import AppLink from '../../components/AppLink.js'

export default function PostPage () {
  const router = useRouter()
  const [post, setPost] = useState()

  useEffect(
    () => {
      if (router.query.id) {
        http
          .get(`/api/posts/${router.query.id}`)
          .then(res => {
            console.info('Post data', res.body)
            setPost(res.body)
          })
          .catch(err => {
            console.error(err)
          })
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

            <div className="text-gray-400">

              <PostAuthor post={post} />

              {post.parent_id && (
                <>

                  <span className="mx-2">•</span>

                  <Link href={'/posts/' + post.parent_id}>
                    <a className={footerLink}>
                      Parent
                    </a>
                  </Link>

                </>
              )}

            </div>

            <p className="text-xl mt-2">
              {post.body}
            </p>

            <ReplyForm parentId={post.id} />

            <div className="mt-12">
              {post.replies.list?.map(reply => (
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
