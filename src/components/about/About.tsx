import { FaCompass, FaUsers, FaLeaf, FaGlobe } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'; 

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto h-full flex items-center justify-center text-center px-4">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in-down">Journey Beyond Horizons</h1>
            <p className="text-xl">Discover the world through our expert-curated travel experiences</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Travel With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover:transform hover:scale-105 transition-all">
              <FaCompass className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Curated Experiences</h3>
              <p className="text-gray-600">Our team of travel experts meticulously crafts each itinerary for authentic local experiences.</p>
            </div>
            <div className="text-center p-6 hover:transform hover:scale-105 transition-all">
              <FaUsers className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Local Connections</h3>
              <p className="text-gray-600">We partner with trusted local guides to bring you deeper cultural immersion.</p>
            </div>
            <div className="text-center p-6 hover:transform hover:scale-105 transition-all">
              <FaLeaf className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Sustainable Travel</h3>
              <p className="text-gray-600">Committed to eco-friendly practices that protect our planet s natural beauty.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">

            <div className="md:w-1/2">
              <Image
                src="/path/to/travel-team.jpg"
                alt="Our Team"
                width={500} // specify the width
                height={500} // specify the height
                className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-8 text-gray-800">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2015 by a group of passionate globetrotters, Wanderlust Adventures began
                as a small blog sharing off-the-beaten-path destinations. Today, we were grown into
                a trusted travel partner for thousands of adventurers worldwide.
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Authenticity', 'Sustainability', 'Community', 'Innovation'].map((value, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{value}</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Ready for Your Next Adventure?</h2>
          <p className="text-xl text-white mb-8">Join our community of explorers and start your journey today</p>
          <Link href="/packages">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
              View Packages
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;