import React from 'react';
import { Link, Text } from '@chakra-ui/react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-600" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h2 className="text-gray text-lg font-semibold mb-4">Mooi Lanka Travels</h2>
            {/* <p className="mb-4">Elevate your style with our curated collection of trendsetting fashion.</p> */}
            <p>Office 1: No, 87 / A - 1 Damana, Dewahuwa, Galewela</p>
            <br></br>

            <p>Phone: +94 776424145</p>
            <p>Phone: +94 766011698</p>
            <p>Email: </p>

            <br></br>
            <p> Office 2: No, 128 / 2, Serasinghe, P/Madampella, Katana </p>
  

          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-gray text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              {/* <li><Link href="/" className="hover:text-white transition-colors">About</Link></li> */}
              <li><Link href="/places" className="">Places</Link></li>
              <li><Link href="/packages" className="">Packages</Link></li>
              <li><Link href="/about" className="">About Us</Link></li>
              <li><Link href="/contact" className="">Contact Us</Link></li>
              <li><Link href="/gallery" className="">Gallery</Link></li>
              <li><Link href="/superAdmin" className="text-white">Admin Panel </Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h2 className="text-gray text-lg font-semibold mb-4">Customer Service</h2>
            <ul className="space-y-2">
              <li><Link href="/book" className="">Tour Book</Link></li>
              <li><Link href="/contact" className="">Contact</Link></li>
              <li><Link href="/review" className="">Reviews</Link></li>


            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h2 className="text-gray text-lg font-semibold mb-4">Stay Connected</h2>
            <p className="mb-4">Subscribe to our newsletter for exclusive travel deals, insider tips, and wanderlust inspiration.</p>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 sm:mb-0"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md h"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="https://www.facebook.com/profile.php?id=61573658082246" target="_blank" className="text-white hover:bg-[#166FE5] bg-[#1877F2] px-4 py-2 rounded">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>

            <a href="https://www.instagram.com/mooi_lanka?igsh=MXVmZnY4YW9ta2xydA==" target="_blank" className="text-white bg-gradient-to-r from-[#833AB4] via-[#E4405F] to-[#F77737] hover:opacity-80 px-4 py-2 rounded">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>

            <a href="https://www.tiktok.com/@user113481748194?_t=ZS-8uZEtg4Rl5w&_r=1" target="_blank" className="text-white bg-black px-4 py-2 rounded relative inline-block transition-all duration-300 
      before:content-[''] before:absolute before:-z-10 before:top-1 before:left-1 before:w-full before:h-full before:bg-[#69C9D0] 
      after:content-[''] after:absolute after:-z-10 after:top-2 after:left-2 after:w-full after:h-full after:bg-[#EE1D52] 
      hover:before:top-0 hover:before:left-0 hover:after:top-0 hover:after:left-0">
              <span className="sr-only">TikTok</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.527V6.79a4.831 4.831 0 0 1-1.003-.104z" />
              </svg>
            </a>

            {/* <a href="https://t.me/Jagathtoursandtravels" target="_blank" className="text-white bg-[#0088CC] hover:bg-[#0077B5] px-4 py-2 rounded transition-all duration-300">
              <span className="sr-only">Telegram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21.59 2.73a1.5 1.5 0 0 0-1.6-.2L2.57 9.54a1.5 1.5 0 0 0 .13 2.83l4.7 1.57 2.16 6.73a1.5 1.5 0 0 0 2.38.67l3.04-2.78 4.04 2.48a1.5 1.5 0 0 0 2.26-1.1l1.7-14.13a1.5 1.5 0 0 0-.59-1.39zm-5.8 13.76-2.67-1.64-3.43 3.14 1.03-4.93 6.9-6.21-9.43 5.48-3.5-1.16z" />
              </svg>
            </a> */}

            <a href="http://www.youtube.com/@MooiLankaTravels-c4s" target="_blank" className="text-white bg-[#FF0000] hover:bg-[#CC0000] px-4 py-2 rounded transition-all duration-300">
              <span className="sr-only">YouTube</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.5 6.2a2.85 2.85 0 0 0-2-2C19.15 4 12 4 12 4s-7.15 0-9.5.2a2.85 2.85 0 0 0-2 2A29.89 29.89 0 0 0 0 12a29.89 29.89 0 0 0 .5 5.8 2.85 2.85 0 0 0 2 2c2.35.2 9.5.2 9.5.2s7.15 0 9.5-.2a2.85 2.85 0 0 0 2-2A29.89 29.89 0 0 0 24 12a29.89 29.89 0 0 0-.5-5.8zM9.75 15.27V8.73L15.5 12z" />
              </svg>
            </a>

            {/* <a href="https://maps.app.goo.gl/Q8pcZqCF9ZK2y2nT9" target="_blank" className="text-white bg-[#4285F4] hover:bg-[#3367D6] px-4 py-2 rounded transition-all duration-300">
              <span className="sr-only">Location</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 12.75 7 12.75s7-7.5 7-12.75c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </a> */}


            {/* <a href="https://www.threads.net/@jagath_tours_and_travels_" target="_blank" className="text-white bg-[#000] hover:bg-[#333] px-4 py-2 rounded transition-all duration-300">
              <span className="sr-only">Threads</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.5 2h-11A4.5 4.5 0 002 6.5v11A4.5 4.5 0 006.5 22h11a4.5 4.5 0 004.5-4.5v-11A4.5 4.5 0 0017.5 2zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6c0 .79-.15 1.55-.42 2.25-.26.67-.58 1.25-.92 1.75-.33.48-.69.91-1.08 1.25-.38.33-.76.55-1.16.75-.38.19-.74.29-1.09.34-.35.04-.69.06-1.03.06zm.5-9.5c-.55 0-1 .45-1 1 0 .28.11.53.29.71.19.18.43.29.71.29s.53-.11.71-.29c.18-.19.29-.43.29-.71 0-.55-.45-1-1-1zm0 3.5c-1.1 0-2 .9-2 2 0 .55.45 1 1 1 .28 0 .53-.11.71-.29.18-.19.29-.43.29-.71 0-.55-.45-1-1-1z" />
              </svg>
            </a> */}

            {/* <a href="https://x.com/ToursJagath?t=XHIDXS735NhBGYzKdpfyIA&s=09" target="_blank" className="text-white bg-[#000] hover:bg-[#333] px-4 py-2 rounded transition-all duration-300">
              <span className="sr-only">X (Twitter)</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.5 0h-4.75L13 9.5 7.25 0H.5L9 12.5 0 24h4.75l5.75-9.5L17.75 24h6l-9.75-12z" />
              </svg>
            </a> */}

            {/* <a href="https://www.linkedin.com/in/jagath-de-silva-02b32252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" className="text-white bg-[#0077b5] hover:bg-[#005582] px-4 py-2 rounded transition-all duration-300">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.48H3.56V9h3.56v11.48zM5.34 7.44a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM20.48 20.48h-3.56v-5.59c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.94v5.68H9.38V9h3.42v1.57h.05c.48-.91 1.67-1.85 3.44-1.85 3.68 0 4.37 2.42 4.37 5.57v6.19z" />
              </svg>
            </a> */}

          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p>&copy; {currentYear} Mooi Lanka Travels. All rights reserved.</p>
          {/* <Text fontSize="xx-small">
            <Link href='/superAdmin'>Admin Panel</Link>
          </Text> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;