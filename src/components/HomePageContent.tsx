import HomePageContent from "./Content";
import { FaStar, FaUmbrellaBeach, FaMountain, FaUtensils } from "react-icons/fa";

const iconMap: { [key: string]: JSX.Element } = {
  FaStar: <FaStar className="text-yellow-400 text-3xl mx-auto mb-4" />,
  FaUmbrellaBeach: <FaUmbrellaBeach className="text-blue-400 text-3xl mx-auto mb-4" />,
  FaMountain: <FaMountain className="text-green-500 text-3xl mx-auto mb-4" />,
  FaUtensils: <FaUtensils className="text-red-400 text-3xl mx-auto mb-4" />,
};

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100 py-16 text-center">
        <h1 className="text-4xl font-bold">{HomePageContent.hero.title}</h1>
        <p className="text-lg text-gray-600 mt-2">{HomePageContent.hero.subtitle}</p>
        <button className="mt-4  bg-gradient-to-r from-sky-600 to-teal-500 text-white  px-6 py-2 rounded-lg">
          {HomePageContent.hero.buttonText}
        </button>
      </section>

    
    </div>
  );
};

export default HomePage;