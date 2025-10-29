import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchPosts, selectPosts, selectPostsError, selectPostsStatus } from './postsSlice'

export const PostsList = () => {
  const dispatch = useAppDispatch()

  const posts = useAppSelector(selectPosts)
  const status = useAppSelector(selectPostsStatus)
  const error = useAppSelector(selectPostsError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts())
    }
  }, [status, dispatch])

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">📡 Posts (Async Thunk)</h2>

      {status === 'loading' && (
        <p className="text-center text-gray-500">Cargando posts...</p>
      )}

      {status === 'failed' && (
        <p className="text-center text-red-600">Error: {error}</p>
      )}

      {status === 'succeeded' && (
        <ul className="space-y-3">
          {posts.map((post) => (
            <li key={post.id} className="p-3 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800">{post.title}</h3>
              <p className="text-gray-600 text-sm">{post.body}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-center gap-2 pt-2 border-t">
        <button
          onClick={() => dispatch(fetchPosts())}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Refrescar
        </button>
      </div>
    </div>
  )
}
