import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { BlogPosts } from './collections/BlogPosts' // Import BlogPosts collection

const filename = __filename
const dirname = __dirname

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, BlogPosts],

  // Add BlogPosts collection
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'f8dffbd6e18a8e8b34585758',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {

      url: process.env.DATABASE_URI || 'file:data/database/travel-agency-main.db',

    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
  ],
})