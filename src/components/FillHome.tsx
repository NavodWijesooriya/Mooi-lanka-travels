import { FaStar, FaUmbrellaBeach, FaMountain, FaUtensils } from 'react-icons/fa';

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: <FaStar className="text-yellow-400 text-3xl mx-auto mb-4" />,
      title: "Local Experts",
      description: "Our guides have lived in Sri Lanka their entire lives"
    },
    {
      icon: <FaUmbrellaBeach className="text-blue-400 text-3xl mx-auto mb-4" />,
      title: "Tailored Experiences",
      description: "Custom tours matching your interests"
    },
    {
      icon: <FaMountain className="text-green-500 text-3xl mx-auto mb-4" />,
      title: "Sustainable Tourism",
      description: "Supporting local communities"
    },
    {
      icon: <FaUtensils className="text-red-400 text-3xl mx-auto mb-4" />,
      title: "Authentic Cuisine",
      description: "Home-cooked meals with locals"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Why Choose Mooi Lanka Travels?
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;