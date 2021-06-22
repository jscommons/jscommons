import { http } from '@ianwalter/http'
import { Menu, Button } from '@generates/swag'
import reduceError from '../../lib/reduceError.js'
import logger from '../../lib/clientLogger.js'

export default function DeleteLink (props) {
  async function deletePost () {
    try {
      await http.delete(`/api/posts/${props.post.id}`)
      logger.debug('Delete post', props.post)
      props.onDeleted({ ...props.post, deleted: true })
    } catch (err) {
      const reduced = reduceError(err)
      if (reduced.level === 'warn') {
        logger.warn('Delete post', reduced.err)
      } else {
        logger.error('Delete post', reduced.err)
      }
    }
  }

  return (
    <Menu
      trigger={<a>Delete</a>}
      css={{
        popover: { display: 'inline' },
        button: { display: 'inline' },
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

          <Button stop onClick={deletePost}>
            Delete
          </Button>

          <Button as={Menu.Button} css={{ marginLeft: '1em' }}>
            Cancel
          </Button>

        </div>

      </div>
    </Menu>
  )
}
