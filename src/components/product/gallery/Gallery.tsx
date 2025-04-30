'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import LoadingGallery from "./LoadingGallery";
import { getDocs, collection, limit, query } from "firebase/firestore";
import Title from '../../Title/Title';

type GalleryItem = {
  id: string;
  location: string;
  place: string;
  name: string;
  description: string;
  image: string;
};

interface GalleryProps {
  Gallerylimits: number;
}

const Gallery: React.FC<GalleryProps> = ({ Gallerylimits }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const itemsRef = collection(db, 'gallery');
        const itemsQuery = query(itemsRef, limit(Gallerylimits));
        const querySnapshot = await getDocs(itemsQuery);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as GalleryItem));
        setGalleryData(data);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryData();
  }, [Gallerylimits]);

  if (loading) {
    return <LoadingGallery />;
  }

  return (
    <section className="relative py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <Title title="Explore Our World" />
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <p className="text-lg text-gray-600 leading-relaxed">
            Discover breathtaking destinations curated by our global community of travelers. 
            From hidden gems to iconic landmarks, immerse yourself in stunning visual journeys 
            that will inspire your next adventure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryData.map((item, index) => (
            <div 
              key={item.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.place}
                  fill
                  className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 mb-2 text-sm font-medium text-white bg-indigo-500 rounded-full">
                    {item.location}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{item.place}</h3>
                  <p className="text-gray-200 line-clamp-3">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;