import clsx from 'clsx'
import { HiArrowCircleUp } from 'react-icons/hi'
import AppLink from '../components/AppLink.js'

export default function PostList (props) {
  return (
    <ul>
      {props.posts?.map(post => (
        <li key={post.id} className="my-5 flex items-center">

          <div>
            <HiArrowCircleUp className="text-gray-500 w-8 h-8" />
          </div>

          <div className="ml-4">

            <AppLink
              href={post.link || ('/posts/' + post.id)}
              className={clsx(
                'text-xl font-medium dark:text-gray-300',
                'dark:hover:text-gray-100'
              )}
            >
              {post.title}
            </AppLink>

            <div className="text-gray-400">
              Posted by {' '}
              <AppLink
                href={'/profiles/' + post.author.username}
                className="underline font-medium hover:text-gray-200"
              >
                {post.author.username}
              </AppLink>
            </div>

          </div>

        </li>
      ))}
    </ul>
  )
}
