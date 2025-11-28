import { defineStore } from 'pinia'
import type { BlogPost, BlogDetails} from '~/types/blog'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [] as BlogPost[],
    currentPost: null as BlogDetails | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchPosts() {
      this.loading = true
      this.error = null
      
      try {
        const { fetchWithError } = useApi()
        const response = await fetchWithError('/blog')
        this.posts = response.data.data
        
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch blog posts'
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchPostByNamak(namak: string) {
      this.loading = true
      this.error = null
      
      try {
        const { fetchWithError } = useApi()
        const response = await fetchWithError(`/blogs/${namak}/get`)
        this.currentPost = response.data
        return response.data
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch blog post'
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})