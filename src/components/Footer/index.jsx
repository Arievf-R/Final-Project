import { BiHome, BiImageAdd, BiCamera, BiUser } from "react-icons/bi";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCompass, FaUser } from "react-icons/fa";
import { AiOutlinePlusCircle, AiOutlineCamera } from "react-icons/ai";
const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-around w-full max-w-4xl px-5 py-2 mx-auto text-white rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600">
      {/* Profile Button */}

      {/* Create Post Button */}
      <button
        onClick={() => navigate("/createpost")}
        className="flex flex-col items-center justify-center p-2 space-y-1 rounded-lg hover:bg-opacity-20 hover:bg-white"
      >
        <AiOutlinePlusCircle className="text-2xl" />
        <span className="text-xs">Post</span>
      </button>

      {/* Home Button */}
      <button
        onClick={() => navigate("/homepage")}
        className="flex flex-col items-center justify-center p-2 space-y-1 rounded-lg hover:bg-opacity-20 hover:bg-white"
      >
        <BiHome className="text-2xl" />
        <span className="text-xs">Home</span>
      </button>

      {/* Create Story Button */}
      <button
        onClick={() => navigate("/createstory")}
        className="flex flex-col items-center justify-center p-2 space-y-1 rounded-lg hover:bg-opacity-20 hover:bg-white"
      >
        <AiOutlineCamera className="text-2xl" />
        <span className="text-xs">Story</span>
      </button>

      {/* Explore Button */}
    </footer>
  );
};

export default Footer;
