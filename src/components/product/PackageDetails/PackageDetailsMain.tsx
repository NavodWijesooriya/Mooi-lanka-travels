'use client';

import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from "@/lib/firebase";
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import Link from 'next/link';
import Title from "@/components/Title/Title";
import { PackageDetailsType } from "src/types";
import Image from 'next/image';


type PackageDetailsProps = {
  ID: string;
};

const PackageDetailsMain = ({ ID }: PackageDetailsProps) => {
  const [packageDetails, setPackageDetails] = useState<PackageDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState<string>(''); // For the map URL input
  const [isSaving, setIsSaving] = useState(false); // To show loading state when saving

  useEffect(() => {
    const getPackageDetail = async () => {
      try {
        const docRef = doc(db, 'packages', ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPackageDetails(docSnap.data() as PackageDetailsType);
          if (docSnap.data()?.map) {
            setMap(docSnap.data()?.map || ''); // Initialize mapUrl if it exists in the document
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      } finally {
        setLoading(false);
      }
    };

    getPackageDetail();
  }, [ID]);

  // Handle map URL change
  const handleMapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMap(e.target.value);
  };

  // Save the map URL to Firestore
  const handleSaveMap = async () => {
    if (!packageDetails) return;

    try {
      setIsSaving(true);
      const docRef = doc(db, 'packages', ID);
      await updateDoc(docRef, { map: map }); // Update the mapUrl field in Firestore
      setPackageDetails({ ...packageDetails, map: map }); // Update the state with the new map URL
    } catch (error) {
      console.error("Error saving map URL:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }
  

  if (!packageDetails) {
    return <div>No package details found.</div>;
  }

  return (
    <div className="bg-white-100 py-2">
      <div className="container mx-auto px-5 py-4">
        <Link href="/packages" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
          <FaArrowLeft className="mr-2" />
          Back to Packages
        </Link>
      </div>

      <Title title="Package Details" />

      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-5 md:flex-row flex-col items-start">
          {/* Image Section */}
          <div className="lg:w-1/2 w-full mb-10 rounded-lg overflow-hidden shadow-lg bg-white">
  <Image
    alt="Package Image"
    className="object-cover object-top h-full w-full transition-transform duration-300 transform hover:scale-105"
    src={packageDetails.imageUrl}
    width={600}
    height={400}
  />
</div>

          {/* Content Section */}
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
              {packageDetails.name}
            </h1>
            <p className="mb-8 leading-relaxed text-lg">{packageDetails.description}</p>

            <p className="title-font sm:text-2xl text-xl mb-4 font-bold text-gray-900">
              {packageDetails.season}
            </p>

            <div className="flex flex-wrap mb-8 w-full">
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-200 rounded flex p-4 h-full items-center">
                  <FaCalendarAlt className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" />
                  <span className="title-font font-medium">{packageDetails.days} Days</span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-200 rounded flex p-4 h-full items-center">
                  <FaUserFriends className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" />
                  <span className="title-font font-medium"> 2 Min {packageDetails.people} People</span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-200 rounded flex p-4 h-full items-center">
                  <FaMapMarkerAlt className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" />
                  <span className="title-font font-medium">{packageDetails.name}</span>
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-200 rounded flex p-4 h-full items-center">
                  <FaStar className="text-yellow-400 w-6 h-6 flex-shrink-0 mr-4" />
                  <span className="title-font font-medium">{packageDetails.starRating} Star Rating</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center w-full mb-3">
              <div className="w-full md:w-auto mb-4 md:mb-0">
                <span className="text-2xl font-bold text-indigo-600 pl-3">
                  {packageDetails.price} USD
                </span>
                <span className="text-gray-500 block md:inline-block md:ml-2">
                  /per person
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Details Section */}
      <Title title="Sub-Details" />
      <div className="container mx-auto px-5">
        {packageDetails.subDetails && packageDetails.subDetails.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packageDetails.subDetails.map((subDetail, idx) => (
              <div
                key={idx}
                className="bg-gray-100 rounded-lg p-4 shadow-md border border-gray-200"
              >
                {subDetail.imageUrl && (
                  <img
                    src={subDetail.imageUrl}
                    alt={subDetail.title}
                    className="mb-4 rounded-lg w-20 h-10 object-cover"
                  />
                )}
                <h3 className="text-xl font-bold underline text-indigo-700 mb-2">
                  {subDetail.title}
                </h3>
                <p className="text-gray-700 text-sm">{subDetail.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No sub-details available.</p>
        )}
      </div>


{/* Destination Section */}
{/* <Title title="Destination" />
<div className="container mx-auto px-5 py-6">
  <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg bg-gray-200 border border-gray-300">
    {packageDetails.map ? (
      // Embed Google Map dynamically using iframe
      <iframe
        src={packageDetails.map} // Map Embed URL
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    ) : (
      <p>No map URL available</p>
    )}
  </div>
</div> */}

    </div>
  );
};

export default PackageDetailsMain;
