import React from 'react';

const CommonDiseasesPage = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Common Plant Diseases</h1>
      <ul className="text-lg text-gray-700 space-y-3">
        <li>🍃 Leaf Spot – Treat with Neem Oil Spray</li>
        <li>🌿 Powdery Mildew – Use Sulfur-based Fungicides</li>
        <li>🌾 Root Rot – Improve Soil Drainage & Reduce Watering</li>
      </ul>
    </div>
  );
};

export default CommonDiseasesPage;
