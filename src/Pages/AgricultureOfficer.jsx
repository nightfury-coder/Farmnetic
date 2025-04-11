import React, { useState } from "react";

const officers = [
  {
    name: "அரவிந்த் குமார்",
    location: "சேலம் மாவட்டம்",
    phone: "+91 98765 43210",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "தீபா ராஜன்",
    location: "கோயம்புத்தூர் மாவட்டம்",
    phone: "+91 99444 55667",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "ரமேஷ் ஐயர்",
    location: "திருச்சி மாவட்டம்",
    phone: "+91 90030 11223",
    image: "https://via.placeholder.com/100",
  },
];

const AgricultureOfficer = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOfficers = officers.filter(
    (officer) =>
      officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">
        அருகிலுள்ள வேளாண்மை அலுவலர்கள்
      </h1>

      {/* 🔍 Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="பெயர் அல்லது மாவட்டம் மூலம் தேடவும்..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* 🧑‍🌾 Officer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredOfficers.length > 0 ? (
          filteredOfficers.map((officer, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-4 rounded-2xl border border-green-300 flex flex-col items-center text-center"
            >
              <img
                src={officer.image}
                alt={officer.name}
                className="w-24 h-24 rounded-full mb-3"
              />
              <h2 className="text-xl font-semibold text-green-800">{officer.name}</h2>
              <p className="text-gray-600">{officer.location}</p>
              <p className="text-blue-600 mt-1">📞 {officer.phone}</p>
              <a
                href={`tel:${officer.phone}`}
                className="mt-3 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Call Now
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">மன்னிக்கவும், உங்கள் தேடலுக்கு எந்தத் தகவலும் இல்லை.</p>
        )}
      </div>
    </div>
  );
};

export default AgricultureOfficer;
