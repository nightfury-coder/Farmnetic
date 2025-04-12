import React, { useEffect, useState } from "react";

const AgricultureOfficer = () => {
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/officers")
      .then((res) => res.json())
      .then((data) => setOfficers(data))
      .catch((err) => console.error("Error fetching officers", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Nearby Agriculture Officers</h2>
      <ul>
        {officers.map((officer, index) => (
          <li key={index} className="mb-2">
            <strong>{officer.name}</strong> - {officer.phone} ({officer.region})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgricultureOfficer;
