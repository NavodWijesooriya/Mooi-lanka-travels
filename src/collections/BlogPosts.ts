import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  access: {
    read: () => true, // Make posts publicly accessible
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor(), // ✅ Correct usage
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },

    {
      name: 'metaTitle',
      type: 'text',
      label: 'SEO Title',
      required: false,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'SEO Description',
      required: false,
    },
    {
      name: 'keywords',
      type: 'text',
      label: 'SEO Keywords',
      required: false,
    },
  ],
}
