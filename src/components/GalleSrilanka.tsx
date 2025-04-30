'use client';

import React from 'react';
import Image from 'next/image';

const GalleSrilanka: React.FC = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Explore Galle, Sri Lanka
        </h1>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2">
            <Image
              src="/images/galle.jpg" // Ensure this image exists in public/images/
              alt="Galle, Sri Lanka"
              width={600}
              height={400}
              className="rounded-xl shadow-md"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <p className="text-lg text-gray-700 mb-4">
              Galle is a charming coastal city in the southwest of Sri Lanka, known for its stunning Dutch fort, colonial architecture, and vibrant cultural heritage. The city is surrounded by a fortified wall built by the Portuguese and later enhanced by the Dutch during their rule in the 17th century.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Visitors can stroll through cobblestone streets, visit historic landmarks, explore art galleries, and enjoy beautiful beaches. Galle offers a mix of history, art, and relaxation, making it a must-visit destination for travelers.
            </p>
            <a
              href="#"
              className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
            >
              Discover more about Galle →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleSrilanka;
