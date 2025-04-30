import { FC } from "react";
import { getBlogPost } from "@/lib/api"; // Update import path if necessary
import { extractContent } from "@/lib/extractContent";
import Image from "next/image";
import Navbar from "@/components/common/header/Navbar";
import { Media } from "@/payload-types";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Helper function to get image URL from various possible image types
const getImageUrl = (image: number | Media | null | undefined): string | null => {
  if (!image) return null;
  
  // If image is a Media object with url property
  if (typeof image === 'object' && 'url' in image && image.url) {
    return image.url;
  }
  
  // For now, return null for other cases (like when image is just an ID)
  return null;
};

const BlogPostPage: FC<BlogPostPageProps> = async ({ params }) => {
  const { slug } = await params; // ✅ Await params before destructuring

  const post = await getBlogPost(slug); // ✅ Fetch post safely

  if (!post) {
    return <div className="text-center text-xl font-semibold p-12">Post not found</div>;
  }

  const contentElements = extractContent(post.content);
  const imageUrl = getImageUrl(post.image);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-lg p-12 m-12">
      <Navbar />
      
      {/* Cover Image */}
      {imageUrl && (
        <div className="w-full h-80 relative mb-6">
          <Image
            src={imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}

      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

      {/* Metadata - Author & Date */}
      <div className="text-gray-600 text-sm flex items-center gap-4 mb-6">
        <span className="font-medium">By {typeof post.author === 'object' ? post.author.email : 'Unknown'}</span>
        <span className="text-gray-400">•</span>
        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
      </div>

      {/* Blog Content */}
      <div className="prose prose-lg max-w-full text-gray-800">
        {contentElements}
      </div>
    </div>
  );
};

export default BlogPostPage;