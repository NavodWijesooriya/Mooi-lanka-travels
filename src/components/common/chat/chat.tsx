// 'use client'
// import { useEffect } from 'react';

// const TawkToChat: React.FC = () => {
//   useEffect(() => {
//     // Create the script element
//     const script = document.createElement('script');
//     script.src = 'https://embed.tawk.to/66e52f8f50c10f7a00a9c67d/1i7nk3j3a';
//     script.charset = 'UTF-8';
//     script.setAttribute('crossorigin', '*');
//     script.async = true;

//     // Append the script to the document body
//     document.body.appendChild(script);

//     // Cleanup function to remove the script on component unmount
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return null;
// };

// export default TawkToChat;


'use client'
import { FaWhatsapp } from 'react-icons/fa'; // Importing WhatsApp icon from react-icons

const TawkToChat: React.FC = () => {
  return (
    <a
      href="https://wa.me/94766011698?text=Hello, I would like to know more about your services."  // Replace with your WhatsApp phone number in international format
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#25D366', // WhatsApp green color
        borderRadius: '50%',
        padding: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: '1000',
      }}
    >
      <FaWhatsapp size={30} color="white" />
    </a>
  );
};

export default TawkToChat;
