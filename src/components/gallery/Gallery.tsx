'use client';

import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Title from '../../components/Title/Title';
import { EyeIcon } from "@heroicons/react/24/outline";
import Image from "next/image"; 

type GalleryItem = {
    id: string;
    imageUrl: string;
};

const Gallery = () => {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [visibleCount, setVisibleCount] = useState(8);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "jagath-gallery"));
                const imageList = querySnapshot.docs
                    .map((doc) => ({
                        id: doc.id,
                        imageUrl: doc.data().imageUrl,
                    }))
                    .filter((item) => item.imageUrl);

                setImages(imageList);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="px-4 py-12 sm:px-8 lg:px-16 xl:px-24 p-10 m-10">
            {/* Title Section */}
            <div className="mb-16 text-center">
                <div className="mb-8">
                    <Title title="Mooi Lanka Travels Gallery" />
                </div>

                {/* Vision Section */}
                <div className="max-w-4xl mx-auto mb-16 p-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl transform transition-all hover:scale-[1.01]">
                    <div className="flex flex-col items-center space-y-4 text-white">
                        <EyeIcon className="h-12 w-12 text-white mb-4" />
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            Mooi Lanka Travels
                        </h2>
                        <p className="text-sm sm:text-lg leading-relaxed">
                            To be Sri Lanka s most inspiring travel curator, creating transformative journeys 
                            that connect travelers with the soul of our island. We envision a world where every 
                            trip becomes a chapter in life s greatest adventure story.
                        </p>
                    </div>
                </div>

                {/* Gallery Description */}
                <p className="mx-auto max-w-3xl text-gray-600 text-sm sm:text-lg mb-12 leading-relaxed">
                    Immerse yourself in visual stories of wanderlust. From golden sunrises over ancient ruins 
                    to vibrant cultural encounters, discover why every journey with us becomes unforgettable.
                </p>
            </div>

            {/* Loading spinner */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                </div>
            ) : (
                <>
                    {/* Image Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
    {images.slice(0, visibleCount).map((item) => (
        <div
            key={item.id}
            className="group relative overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl"
        >
            <div className="relative w-full aspect-square">
                <Image
                    src={item.imageUrl}
                    layout="fill"
                    objectFit="cover"
                    className="transform transition-all duration-500 group-hover:scale-105"
                    alt="Travel moment"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </div>
    ))}
</div>
                    {/* View More Button */}
                    {visibleCount < images.length && (
                        <div className="text-center">
                            <button
                                onClick={() => setVisibleCount((prev) => prev + 8)}
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg 
                                          transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95
                                          text-sm sm:text-base font-semibold"
                            >
                                Load More Journeys
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Gallery;