import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Thermometer, Droplets, Plane as Plant, AlertCircle, Bone as Drone, Camera, Phone, Store, LineChart as ChartLineUp, Calendar } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Line } from 'react-chartjs-2';
import Header from './header/header.jsx'
import { useRouter } from 'next/router';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [response, setResponse] = useState('');
  const [showDroneView, setShowDroneView] = useState(false);
  const [diseaseDetected, setDiseaseDetected] = useState(false);
  const [showStores, setShowStores] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const chartRef = useRef<ChartJS | null>(null);

  const [mockData, setMockData] = useState({
    temperature: 25.5,
    humidity: 65,
    soilMoisture: 78,
    cropStatus: 'Healthy',
    droneStatus: 'Ready',
    batteryLevel: 85,
    growthProgress: 60
  });

  const diseaseImages = [
    "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1595241175768-3e644b3c1c77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ];

  const carouselImages = [
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
  ];

  const growthData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Plant Growth (cm)',
        data: [5, 12, 20, 30],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const seasonalCrops = {
    'Spring': ['Tomatoes', 'Peppers', 'Lettuce'],
    'Summer': ['Corn', 'Cucumbers', 'Melons'],
    'Fall': ['Pumpkins', 'Broccoli', 'Carrots'],
    'Winter': ['Kale', 'Spinach', 'Brussels Sprouts']
  };

  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Fall';
    return 'Winter';
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    const interval = setInterval(() => {
      setMockData(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5),
        humidity: Math.min(100, Math.max(0, prev.humidity + (Math.random() - 0.5) * 2)),
        soilMoisture: Math.min(100, Math.max(0, prev.soilMoisture + (Math.random() - 0.5) * 2))
      }));
    }, 3000);

    return () => {
      clearInterval(interval);
      // Cleanup chart instance on unmount
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const handleVoiceAssistant = () => {
    if (!browserSupportsSpeechRecognition) {
      alert('Browser doesn\'t support speech recognition.');
      return;
    }

    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: selectedLanguage });
    }
    setIsListening(!isListening);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Simulate disease detection
      setTimeout(() => {
        setDiseaseDetected(true);
      }, 1500);
    }
  };

  const handleDroneControl = () => {
    setShowDroneView(!showDroneView);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Disease Examples Ribbon */}
      <Header/>

      {/* Carousel */}
      <div id="home" className="h-64 mb-8">
        <Slider {...sliderSettings}>
          {carouselImages.map((image, index) => (
            <div key={index} className="h-64">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
          Smart Agriculture Monitor
        </h1>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Temperature Card */}
          <div className={`bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform ${
            mockData.temperature > 30 ? 'bg-red-50' : mockData.temperature < 15 ? 'bg-blue-50' : 'bg-green-50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Temperature</h2>
              <Thermometer className="text-red-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{mockData.temperature.toFixed(1)}°C</p>
          </div>

          {/* Humidity Card */}
          <div className={`bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform ${
            mockData.humidity > 80 ? 'bg-red-50' : mockData.humidity < 40 ? 'bg-yellow-50' : 'bg-green-50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Humidity</h2>
              <Droplets className="text-blue-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{mockData.humidity.toFixed(1)}%</p>
          </div>

          {/* Soil Moisture Card */}
          <div className={`bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform ${
            mockData.soilMoisture > 90 ? 'bg-red-50' : mockData.soilMoisture < 50 ? 'bg-yellow-50' : 'bg-green-50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Soil Moisture</h2>
              <Plant className="text-green-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{mockData.soilMoisture.toFixed(1)}%</p>
          </div>

          {/* Growth Progress Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Growth Progress</h2>
              <ChartLineUp className="text-purple-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{mockData.growthProgress}%</p>
          </div>
        </div>
        

        {/* Seasonal Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Calendar className="mr-2" /> Seasonal Recommendations
          </h2>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Recommended Crops for {getCurrentSeason()}</h3>
            <ul className="list-disc list-inside">
              {seasonalCrops[getCurrentSeason() as keyof typeof seasonalCrops].map((crop, index) => (
                <li key={index} className="text-gray-700">{crop}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Analytics Section */}
        <div id="analytics" className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Growth Analytics</h2>
          <div className="h-64">
            <Line
              ref={chartRef}
              data={growthData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Drone Control Section */}
        <div id="detect" className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Drone Control</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
      onClick={() => window.open("https://drive.google.com/file/d/1lkHAJLXP-KJa5pJqK-PiHrqtq3hcxBgQ/view?usp=drivesdk", '_blank')}
      style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}
    >
              <Drone size={24} />
              <span>Start Drone Patrol</span>
            </button>
            <button
              onClick={() => {}}
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Camera size={24} />
              <span>View Live Feed</span>
            </button>
            <button
              className="flex items-center justify-center space-x-2 bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <AlertCircle size={24} />
              <span>Run Health Check</span>
            </button>
          </div>
          {showDroneView && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Drone Camera Feed</h3>
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                <p className="text-white">Live Feed Connecting...</p>
              </div>
            </div>
          )}
        </div>

        {/* Disease Detection Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Disease Detection</h2>
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Upload a photo of your crop for disease detection</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
              >
                Upload Photo
              </label>
            </div>
          </div>
          {diseaseDetected && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg">
              <h3 className="text-lg font-semibold text-red-700">⚠️ Disease Detected: Leaf Blight</h3>
              <p className="text-gray-700">Recommended Treatment: Spray Fungicide XYZ</p>
              <div className="mt-2">
                <h4 className="font-semibold">Treatment Steps:</h4>
                <ol className="list-decimal list-inside mt-2">
                  <li>Remove affected leaves</li>
                  <li>Apply fungicide in the morning</li>
                  <li>Maintain proper spacing between plants</li>
                  <li>Monitor for 7 days</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Nearby Stores Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Store className="mr-2" /> Nearby Agricultural Stores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Seed Shops</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Store className="mr-2 text-green-600" size={20} />
                  <span>Green Seeds (2.5 km)</span>
                </li>
                <li className="flex items-center">
                  <Store className="mr-2 text-green-600" size={20} />
                  <span>Farmer's Choice (3.8 km)</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Fertilizer Shops</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Store className="mr-2 text-blue-600" size={20} />
                  <span>Agro Nutrients (1.8 km)</span>
                </li>
                <li className="flex items-center">
                  <Store className="mr-2 text-blue-600" size={20} />
                  <span>Farm Solutions (4.2 km)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div id="contact" className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Approximately line 403 */}
            <button
 onClick={() => navigate("/AgricultureOfficer")}
  className="flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
>
  <Phone size={24} />
  <span>Agriculture Officer</span>
</button>
            {/* Approximately line 409 */}
            <button
  onClick={() => router.push('/plantdoctor')}
  className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
>
  <Phone size={24} />
  <span>Plant Doctor</span>
</button>
            {/* Approximately line 415 */}
            <button
  onClick={() => router.push('/support')}
  className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
>
  <Phone size={24} />
  <span>Support</span>
</button>
          </div>
        </div>

        {/* Voice Assistant */}
        <div className="fixed bottom-8 right-8 flex flex-col items-end space-y-4">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-white rounded-lg shadow-lg px-4 py-2 text-gray-800"
          >
            <option value="en-US">🇬🇧 English</option>
            <option value="ta-IN">🇮🇳 தமிழ்</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
            <option value="de-DE">German</option>
          </select>

          <button
            onClick={handleVoiceAssistant}
            className={`p-4 rounded-full shadow-lg ${
              isListening ? 'bg-red-500' : 'bg-green-600'
            } text-white hover:transform hover:scale-110 transition-all`}
          >
            {isListening ? <MicOff size={24} /> : <Mic size={24} />}
          </button>

          {(transcript || response) && (
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-md">
              {transcript && (
                <p className="text-gray-600 mb-2">
                  <strong>You:</strong> {transcript}
                </p>
              )}
              {response && (
                <p className="text-green-600">
                  <strong>Assistant:</strong> {response}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;