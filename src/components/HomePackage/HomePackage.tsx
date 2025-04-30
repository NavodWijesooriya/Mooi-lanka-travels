'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { getDocs, collection, query, where, limit } from "firebase/firestore";
import LoadingCard from "./LoadingCard";
import { useRouter } from "next/navigation";
import { StarIcon, MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";

type Package = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  hide: boolean;
  imageUrl?: string;
  duration?: string;
  rating?: number;
  highlights?: string[];
  specialOffer?: boolean;
};

const OrganizationID = 'packages';

const HomePackage = ({ limits }: { limits: number }) => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsRef = collection(db, OrganizationID);
        const itemsQuery = query(
          itemsRef,
          where("hide", "==", false),
          limit(limits)
        );
        const querySnapshot = await getDocs(itemsQuery);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || "Untitled",
          category: doc.data().category || "Uncategorized",
          price: doc.data().price || 0,
          description: doc.data().description || "No description available",
          hide: doc.data().hide || false,
          imageUrl: doc.data().imageUrl || '',
          duration: doc.data().duration || '7 Days / 6 Nights',
          rating: doc.data().rating || 4.5,
          highlights: doc.data().highlights || ['Cultural Experience', 'Guided Tours', 'Luxury Accommodation'],
          specialOffer: doc.data().specialOffer || false
        }));
        setPackages(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limits]);

  if (loading) {
    return <LoadingCard />;
  }

  return (
    <section className="bg-gradient-to-b from-sky-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold ">
            Discover Your Next Adventure
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore our curated collection of unforgettable travel experiences
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
          {packages.map((pkg) => (
            <div 
              key={pkg.id}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-xl"
            >
              {pkg.specialOffer && (
                <div className="absolute top-4 right-4 bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                  Limited Offer!
                </div>
              )}

              <div className="relative h-64">
                {pkg.imageUrl ? (
                  <Image
                    src={pkg.imageUrl}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <MapPinIcon className="h-5 w-5 text-sky-600 mr-1" />
                  <span className="text-sm font-medium text-gray-600">
                    {pkg.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {pkg.name}
                </h3>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(pkg.rating!) 
                            ? 'text-amber-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    ({pkg.rating?.toFixed(1)})
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {pkg.description}
                </p>

                <div className="space-y-2 mb-6">
                  {pkg.highlights?.map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="h-4 w-4 text-sky-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-2xl font-bold text-sky-600">
                      ${pkg.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <CalendarDaysIcon className="h-4 w-4 mr-1" />
                      {pkg.duration}
                    </p>
                  </div>

                  <div className="space-x-3">
                    <button
                      onClick={() => router.push(`/packages/${pkg.id}`)}
                      className="px-4 py-2 border border-sky-600 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => router.push('/book')}
                      className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-sky-600 to-teal-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity">
            View All Packages
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomePackage;