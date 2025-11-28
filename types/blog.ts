export interface BlogPost {
  id: number
  title: string
  description: string
  tags: string
  namak: string
  cover: string
  view: number
  rating: number
  created_at: string
}

export interface BlogDetails {
  details: {
    id: number
    namak: string
    category_id: number
    cover: string
    banner: string
    images: string[]
    video: string
    video_cover: string
    view: number
    rating: number
    status: number
    created_at: string
    updated_at: string
  }
  descriptions: {
    id: number
    title: string
    description: string
    tags: string
    title_tag: string
    meta_tag_keys: string | null
    meta_tag_description: string | null
    canonical: string | null
    location: string
  }
  comments: any[]
  popular_post: BlogPost[]
}

export interface BlogListResponse {
  data: BlogPost[]
}

export interface BlogDetailsResponse {
  data: BlogDetails
}