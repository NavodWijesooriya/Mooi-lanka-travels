// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from '@/app/providers';
import FloatingButton from "@/components/common/FloatingButton/FloatButton";
import TawkToChat from "@/components/common/chat/chat";
import SessionWrapper from "@/app/wrappers/SessionWrapper";
// import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mooi Lanka Travels - Your Adventure Partner",
  description: "Explore breathtaking destinations with Mooi Lanka Travels. Book your dream adventure today!",
  keywords: "Best Travel Agency in Sri Lanka, Sri Lanka Tour Packages, Affordable Sri Lanka Tours, Luxury Travel in Sri Lanka, Budget Tour Packages Sri Lanka, Sri Lanka Travel Deals 2024, Sri Lanka Vacation Packages, Best Tour Operators in Sri Lanka, Customizable Sri Lanka Tours, Top-Rated Travel Agency in Sri Lanka, Colombo City Tour, Sigiriya Rock Fortress Tour, Kandy & Temple of the Tooth Tour, Galle Fort & Southern Coast Tours, Ella & Nine Arches Bridge Tour, Nuwara Eliya Tea Plantation Tour, Yala National Park Safari, Mirissa Whale Watching Tour, Trincomalee & Pigeon Island Tour, Jaffna Cultural Tour, Best Wildlife Safaris in Sri Lanka, Udawalawe Elephant Safari, Sinharaja Rainforest Tours, White Water Rafting in Kitulgala, Best Hiking Trails in Sri Lanka, Adam’s Peak Pilgrimage Trek, Sri Lanka Scuba Diving & Snorkeling, Best Surfing Beaches in Sri Lanka, Camping & Glamping in Sri Lanka, Hot Air Balloon Rides in Sri Lanka, Best Honeymoon Destinations in Sri Lanka, Romantic Beach Resorts in Sri Lanka, Maldives & Sri Lanka Honeymoon Combo, Ella Honeymoon Retreats, Bentota & Unawatuna Couples Resorts, Luxury Honeymoon Packages Sri Lanka, Private Island Getaways in Sri Lanka, Best Boutique Hotels for Honeymooners, Romantic Train Journeys in Sri Lanka, Exclusive Sri Lanka Honeymoon Tours, Best Family-Friendly Hotels in Sri Lanka, Kid-Friendly Attractions in Sri Lanka, Family Wildlife Safaris Sri Lanka, Cultural Tours for Families in Sri Lanka, Amusement Parks in Sri Lanka, Educational Tours for Kids in Sri Lanka, Best Beaches for Families in Sri Lanka, Family Holiday Packages in Sri Lanka, Multi-Generational Travel in Sri Lanka, Group Tour Packages in Sri Lanka, Corporate Travel Services Sri Lanka, Business Hotels in Colombo, MICE (Meetings, Incentives, Conferences, Exhibitions) Tourism Sri Lanka, Luxury Business Travel Packages, Corporate Team Outings in Sri Lanka, Exclusive Golf Resorts in Sri Lanka, Colombo Conference & Event Venues, Business Trip Assistance in Sri Lanka, Private Jet & VIP Travel in Sri Lanka, Best Hotels for Business Travelers in Sri Lanka, Best Travel Agency in Colombo, Tour Packages from Colombo, Sightseeing Tours in Sri Lanka, Day Tours from Colombo, Weekend Getaways in Sri Lanka, Best Places to Visit in Sri Lanka, Top-Rated Tourist Attractions in Sri Lanka, Sri Lanka Holiday Packages from India, Travel Agents Near Me in Sri Lanka, Affordable Tour Operators in Sri Lanka, Best Time to Visit Sri Lanka, Sri Lanka Christmas & New Year Packages, Sinhala & Tamil New Year Travel Packages, Vesak Festival & Cultural Tours, Kandy Esala Perahera Festival Tour, Best Monsoon Travel Destinations in Sri Lanka, Summer Vacation Packages in Sri Lanka, Sri Lanka Winter Travel Packages, Off-Season Travel Discounts Sri Lanka, Sri Lanka Festival & Event Travel, Sri Lanka Car Rental Services, Private Chauffeur in Sri Lanka, Airport Transfers in Sri Lanka, Sri Lanka Train Travel Packages, Sri Lanka Tuk-Tuk Rental for Tourists, Best Road Trips in Sri Lanka, Domestic Flights & Seaplane Tours Sri Lanka, Private Boat Tours in Sri Lanka, Best Cruise Trips Around Sri Lanka, Sri Lanka Transport & Travel Services, Sustainable Travel in Sri Lanka, Digital Nomad-Friendly Destinations in Sri Lanka, Remote Work & Stay in Sri Lanka, Wellness & Spa Retreats in Sri Lanka, Sri Lanka Ayurveda & Yoga Retreats, Sri Lanka Culinary & Food Tours, Sri Lanka’s Most Instagrammable Spots, Hidden Gems & Underrated Places in Sri Lanka, Budget Backpacking Routes in Sri Lanka, Bucket List Experiences in Sri Lanka Mooi Lanka Travels Mooi Lanka Travels. Sri Lanka Travel Agency, Sri Lanka Tour Packages, Adventure Tours in Sri Lanka, Wildlife Safaris, Beach Holidays, Cultural Tours, Honeymoon Packages, Family Tours, Group Tours, Corporate Travel, MICE Tourism, Luxury Travel, Budget Travel, Eco-Friendly Tours, Customizable Itineraries, Mooi lanka Travels, Mooi lanka",
  authors: [{ name: "Mooi Lanka Travels" }],
  openGraph: {
    title: "Mooi Lanka Travels",
    description: "Plan your next adventure with Mooi Lanka Travels.",
    url: "https://mooilankatravels.com",
    siteName: "Mooi Lanka Travels",
    images: [
      {
        url: "https://mooilankatravels.com/assets/mooiLanka-logo.png",
        width: 800,
        height: 600,
        alt: "Mooi Lanka Travels",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper> {/* Use SessionWrapper here */}
          <Providers>{children} <FloatingButton /><TawkToChat /></Providers>
        </SessionWrapper>
      </body>
    </html>
  );
}
