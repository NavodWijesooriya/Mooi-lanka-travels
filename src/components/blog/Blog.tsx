'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Use relative URLs for API calls - no need for hardcoded values
// This ensures URLs will work in both development and production

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  featuredImage?: string;
  publishedAt: string;
}

export default function BlogListPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // This function fetches blog posts asynchronously
    const fetchBlogPosts = async () => {
      try {
        // Use relative URL for better portability between environments
        const res = await fetch(`/api/blog-posts`, { 
          cache: "no-store",
          // Include credentials to ensure cookies are sent
          credentials: 'same-origin'
        });  
        if (res.ok) {
          const data = await res.json();
          setBlogPosts(data?.docs || []); // Set the fetched posts into state
        } else {
          console.error(`Failed to fetch blog posts: ${res.status} ${res.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return <div className="p-12 m-12 text-center">Loading blog posts...</div>;
  }

  return (
    <div className="p-12 m-12 max-w-6xl mx-auto">
      <div className="mt-10">
        <h2 className="text-4xl font-bold text-center mb-6">Latest Travel Stories & Guides</h2>

        {blogPosts.length === 0 && <p className="text-center text-gray-500">No blog posts found.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg shadow-lg hover:shadow-2xl transition">
              <Image
                src={post.featuredImage || "/assets/mooiLanka-logo.png"}
                alt={post.title}
                width={400}
                height={160}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold">
                <Link href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-500 text-sm mb-2">{new Date(post.publishedAt).toDateString()}</p>
              <p className="text-gray-700">{post.excerpt || "A fascinating travel story awaits you..."}</p>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}




// 'use client';

// import React from 'react';
// import Image from 'next/image';


// const blogPosts = [
//   {
//     title: 'Galle Srilanka',
//     date: 'Thu Apr 03 2025',
//     description: 'A fascinating travel story awaits you...',
//     link: 'galle',
//   },
//   {
//     title: 'Srilanka Best Travel Agency',
//     date: 'Tue Apr 01 2025',
//     description: 'A fascinating travel story awaits you...',
//     link: 'best-travel',
//   },
//   {
//     title: 'mooilankatravels',
//     date: 'Mon Mar 31 2025',
//     description: 'A fascinating travel story awaits you...',
//     link: 'mooi',
//   },
// ];

// const TravelBlog: React.FC = () => {
//   return (
//     <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
//           Latest Travel Stories &amp; Guides
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
//           {blogPosts.map((post, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm transition hover:shadow-xl"
//             >
//               <div className="flex justify-center mb-4">
//                 <Image
//                   src="/assets/Coloured-brandmark-png.png" // update this path if needed
//                   alt="Blog Logo"
//                   width={200}
//                   height={100}
//                 />
//               </div>
//               <h3 className="text-xl font-semibold text-blue-600 mb-1">
//                 {post.title}
//               </h3>
//               <p className="text-sm text-gray-500">{post.date}</p>
//               <p className="mt-2 text-gray-700">{post.description}</p>
//               <a
//                 href={post.link}
//                 className="inline-block mt-4 text-blue-600 hover:underline"
//               >
//                 Read More →
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
  
//     </div>
//   );
// };

// export default TravelBlog;
