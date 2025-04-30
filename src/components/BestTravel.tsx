'use client';

import React from 'react';
import Image from 'next/image';

const GalleSrilanka: React.FC = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Discover Mooilanka Travels
        </h1>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2">
            <Image
              src="/images/galle.jpg"
              alt="Galle, Sri Lanka"
              width={600}
              height={400}
              className="rounded-xl shadow-md"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <p className="text-lg text-gray-700 mb-4">
              Mooilanka Travels, the best travel agency in Sri Lanka invites you to experience the timeless beauty of Galle — a historic coastal gem on the island is southern shores. Our expertly curated tours take you through the iconic Dutch Fort showcase colonial architecture and immerse you in the vibrant culture of this enchanting destination.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Whether you are exploring ancient streets discovering local art or relaxing by the turquoise waters Mooilanka Travels guarantees a seamless enriching and unforgettable journey. Trust Sri Lanka’s top-rated travel experts to deliver an experience filled with history charm and warm island hospitality.
            </p>
            <a
              href="/tours/galle"
              className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
            >
              Explore Galle Tours with Mooilanka →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleSrilanka;
