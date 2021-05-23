import clsx from 'clsx'
import AppLink from '../components/AppLink.js'

export default function PostList (props) {
  return (
    <ul>
      {props.posts?.map(post => (
        <li key={post.id} className="my-5">

          <div>
            <AppLink
              href={post.link || ('/posts/' + post.id)}
              className={clsx(
                'text-xl font-medium dark:text-gray-300',
                'dark:hover:text-gray-100'
              )}
            >
              {post.title}
            </AppLink>
          </div>

          <div>
            from {' '}
            <AppLink
              href={'/profiles/' + post.profiles.username}
              className="underline text-gray-400 hover:text-gray-200"
            >
              {post.profiles.username}
            </AppLink>
          </div>

        </li>
      ))}
    </ul>
  )
}
