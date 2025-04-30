'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import ClassNames from 'embla-carousel-class-names';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaStar, FaUmbrellaBeach, FaMountain, FaTree, FaUtensils } from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import style from './embla.module.css';
import LoadingEvent from './Loading';

type PropType = {
  options?: EmblaOptionsType;
};

type EventData = {
  id: string;
  name: string;
  hide: boolean;
  date: string;
  time: string;
  // location: string;
  imageUrl: string;
};

const SriLankaEventsCarousel: React.FC<PropType> = ({ options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames()]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [eventData, setEventData] = useState<EventData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    } else {
      emblaApi.scrollTo(0);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    autoplayRef.current = setInterval(autoplay, 5000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      emblaApi?.off('select', onSelect);
      emblaApi?.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect, autoplay]);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const data = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as EventData)
        );
        setEventData(data);
      } catch (error) {
        console.error('Error fetching events data:', error);
        setError('Failed to fetch events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventsData();
  }, []);

  if (loading) {
    return (
      <div className={style.container}>
        <LoadingEvent />
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.container}>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (eventData.length === 0) {
    return (
      <div className={style.container}>
        <p className="text-gray-500">No events available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className="embla p-4 bg-gradient-to-r rounded-xl shadow-lg">
        <div className="relative">
          <div className="embla__viewport overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {eventData.map((event) => (
                <div
                  key={event.id}
                  className="embla__slide flex-[0_0_100%] min-w-0 px-2"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105">
                    <div className={style.imageDiv}>
                      <Image
                        className="embla__slide__img w-full h-full object-cover"
                        src={event.imageUrl || '/fallback-image.jpg'}
                        alt={event.name || 'Event Image'}
                        width={500}
                        height={300}
                        layout="responsive"
                        priority
                      />
                    </div>
                    <div className="p-4 ml-2">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        {event.name}
                      </h3>
                      <div className="flex items-center mb-1">
                        <FaMapMarkerAlt className="w-4 h-4 mr-2 text-green-500" />
                        <span className="text-sm text-gray-600">
                          {/* {event.location} */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-300'
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>

     
    </div>
    
  );
};

export default SriLankaEventsCarousel;
