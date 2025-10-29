import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { jsonplaceholderInstance } from '../../config/axios'

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface PostsState {
  items: Post[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PostsState = {
  items: [],
  status: 'idle',
  error: null,
}

// Thunk asíncrono
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await jsonplaceholderInstance.get<Post[]>('/posts?_limit=10')
  return res.data
})

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Aquí podríamos agregar reducers síncronos si fueran necesarios
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Error obteniendo posts'
      })
  },
})

//selectors
export const selectPosts = (state: { posts: PostsState }) => state.posts.items
export const selectPostsStatus = (state: { posts: PostsState }) => state.posts.status
export const selectPostsError = (state: { posts: PostsState }) => state.posts.error

export default postsSlice.reducer
