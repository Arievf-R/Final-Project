import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full max-w-4xl px-4 py-4 mx-auto rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 sm:px-6">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <a href="/" className="flex items-center">
          <img src={logo} alt="logo" className="w-12 sm:w-9" />
        </a>
      </div>

      {/* Mobile Menu Button (Hamburger Icon) */}
      <button className="p-2 text-white md:hidden focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Profile and Logout Button */}
      <div className="items-center hidden space-x-4 md:flex">
        {/* Profile Button */}
        <button
          onClick={() => navigate("/profilepage")}
          className="flex items-center p-2 text-white transition-all duration-300 rounded-md hover:bg-yellow-600"
        >
          {/* Profile Picture */}
          <img
            src="https://img.freepik.com/fotos-premium/memoji-emoji-homem-sorridente-bonito-em-fundo-branco_826801-7000.jpg" // Ganti dengan URL foto profil Anda
            alt="Profile"
            className="w-8 h-8 mr-2 rounded-full" // Ukuran dan bentuk foto profil
          />
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-sm font-semibold text-white transition-all duration-300 bg-yellow-500 rounded-md hover:bg-yellow-600"
        >
          {/* Logout Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
