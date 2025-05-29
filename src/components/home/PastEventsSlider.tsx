import React from 'react';
import Slider from 'react-slick';
import { Calendar } from 'lucide-react';

interface EventSlide {
  id: number;
  year: string;
  title: string;
  description: string;
  image: string;
}

const pastEvents: EventSlide[] = [
  {
    id: 1,
    year: '2024',
    title: 'AI Innovation Showcase',
    description: 'Last year\'s event featured groundbreaking AI projects, with students demonstrating applications in healthcare, finance, and education. The keynote speaker from Google presented on the future of AI.',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg'
  },
  {
    id: 2,
    year: '2023',
    title: 'Web3 & Blockchain Summit',
    description: 'In 2023, our graduates focused on blockchain technologies, with projects ranging from decentralized finance applications to blockchain-based voting systems. Industry partners offered internships on the spot.',
    image: '/Web3 & Blockchain Summit.png'
  },
  {
    id: 3,
    year: '2022',
    title: 'Mobile Development Expo',
    description: 'The 2022 conference highlighted innovative mobile applications developed by our graduating class. Several projects were featured on app stores and gained significant traction after the event.',
    image: 'https://images.pexels.com/photos/7992460/pexels-photo-7992460.jpeg'
  }
];

const PastEventsSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true
  };

  return (
    <div className="past-events-slider">
      <Slider {...settings}>
        {pastEvents.map(event => (
          <div key={event.id} className="px-2">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="md:flex">
                <div className="md:w-2/5 relative">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-64 md:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary-600 text-white py-1 px-3 rounded-full flex items-center">
                    <Calendar size={16} className="mr-1" />
                    <span className="font-medium">{event.year}</span>
                  </div>
                </div>
                <div className="md:w-3/5 p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-primary-900 mb-4 font-display">{event.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{event.description}</p>
                  <div className="mt-6">
                    <a 
                      href={`/events/${event.year}`}
                      onClick={(e) => {
                        e.preventDefault();
                        // You can implement a modal or navigation here
                        window.alert('Event highlights will be available soon!');
                      }}
                      className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
                    >
                      View highlights
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PastEventsSlider;