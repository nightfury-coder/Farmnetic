import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react"; // or wherever your icon comes from

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <button
        onClick={() => navigate("/agriculture-officer")}
        className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
      >
        <Phone size={24} />
        <span>Agriculture Officer</span>
      </button>

      <button
        onClick={() => alert("Redirect to Plant Doctor page")}
        className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
      >
        <Phone size={24} />
        <span>Plant Doctor</span>
      </button>

      <button
        onClick={() => alert("Redirect to Support page")}
        className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <Phone size={24} />
        <span>Support</span>
      </button>
    </div>
  );
};

export default Home;
