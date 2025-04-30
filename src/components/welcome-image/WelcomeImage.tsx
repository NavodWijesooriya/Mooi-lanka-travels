import React from 'react';
import Link from 'next/link';

const PowerPointEmbed = () => {
  return (
    <div className="flex justify-center items-center p-4 sm:p-12">
      <div className="w-full max-w-4xl bg-white border border-gray-300 p-4 sm:p-12 rounded-lg shadow-lg text-center">
        <Link href="/presentation">
          {/* <img src="/assets/sigiriya/edited_image_black.jpg" alt="PowerPoint Embed" className="w-full" /> */}
        </Link>
      </div>
    </div>
  );
};

export default PowerPointEmbed;
