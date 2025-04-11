import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  const translations = {
    en: {
      title: 'Smart Agriculture Login',
      username: 'Username',
      password: 'Password',
      login: 'Login',
      welcomeMessage: 'Welcome to Smart Agriculture Monitor'
    },
    ta: {
      title: 'திறன்மிகு வேளாண்மை உள்நுழைவு',
      username: 'பயனர்பெயர்',
      password: 'கடவுச்சொல்',
      login: 'உள்நுழைக',
      welcomeMessage: 'திறன்மிகு வேளாண்மை கண்காணிப்பிற்கு வரவேற்கிறோம்'
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)'
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50">
        {/* Language Selector */}
        <div className="absolute top-4 right-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white rounded-lg px-4 py-2 text-gray-800"
          >
            <option value="en">🇬🇧 English</option>
            <option value="ta">🇮🇳 தமிழ்</option>
          </select>
        </div>

        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
          <h1 className="text-3xl font-bold text-center text-green-800 mb-8">
            {translations[language as keyof typeof translations].title}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {translations[language as keyof typeof translations].username}
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {translations[language as keyof typeof translations].password}
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-bold"
            >
              {translations[language as keyof typeof translations].login}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;