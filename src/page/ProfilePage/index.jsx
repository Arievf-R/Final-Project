import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProfileUser } from "../../hooks/useProfileUser";
import usePostsUser from "../../hooks/usePostsUser";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import UserPostList from "../../components/UserPostList";
import { userID } from "../../api/api";
import Popup from "../../components/Popup";
import useMyFollowingFollowers from "../../hooks/useMyFollowingFollowers.jsx";

const ProfilePage = () => {
  // state user
  const { profileData, loading, error } = useProfileUser(); // data user login
  const { posts, postCount } = usePostsUser(userID); // data post user login
  // state popup following/followes
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupItems, setPopupItems] = useState([]);
  // state jumlah & user following/followers
  const {
    followers,
    following,
    loading: followersLoading,
    error: followersError,
  } = useMyFollowingFollowers();

  const handleShowPopup = (type) => {
    if (type === "followers") {
      setPopupTitle("Followers");
      setPopupItems(followers || []);
    } else if (type === "following") {
      setPopupTitle("Following");
      setPopupItems(following || []);
    }
    setIsPopupOpen(true); //open poppup following/followes
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // close popup following/followers
  };

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  // console.log("isi profile data", profileData); //data salah malah org lain coba check
  return (
    <main
      className="min-h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url('https://www.urlaubinbangkok.de/wp-content/uploads/2024/07/kreditkarte-innerhalb-24h-erhalten_-Wie-schnell-erhalte-ich-eine-Kreditkarte_-2763441271.jpg')",
      }}
    >
      <Navbar />
      <div className="max-w-2xl px-4 pt-20 pb-32 mx-auto bg-white rounded-lg shadow-md sm:pt-24">
        {/* Profile Section */}
        <div className="flex flex-col p-6 sm:flex-row">
          {/* Profile Image */}
          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-8">
            <img
              src={profileData.profilePictureUrl || "default-avatar.png"}
              alt="Profile"
              className="object-cover w-24 h-24 border-4 border-red-700 rounded-full shadow-md sm:w-32 sm:h-32"
            />
            {/* Username and Bio below Profile Image */}
            <div className="mt-4 text-center sm:text-left">
              <p className="text-lg font-semibold text-gray-800">
                @{profileData.username || "No Username"}
              </p>
              <p className="text-sm text-gray-500">
                {profileData.bio || "No Bio"}
              </p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex flex-col flex-grow">
            {/* Name and Edit Profile Button */}
            <div className="flex flex-col items-center mb-4 sm:flex-row">
              <p className="mr-4 text-2xl font-semibold text-gray-800">
                {profileData.name || "No Name"}
              </p>
              <div className="flex mt-2 sm:mt-0">
                <Link
                  to="/editprofile"
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Edit Profile
                </Link>
                {/* View Archive Button */}
                <Link
                  to="/explore"
                  className="px-4 py-2 ml-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Explore
                </Link>
                {/* Settings Icon */}
                <button
                  className="p-2 ml-2 text-gray-800 hover:text-gray-600 focus:outline-none"
                  onClick={() => console.log("Settings clicked")}
                >
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Post, Followers, Following */}
            <div className="flex justify-center mb-4 space-x-8 sm:justify-start">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-800">
                  {postCount || 0}
                </p>
                <p className="text-sm text-gray-600">Posts</p>
              </div>
              <div
                className="text-center cursor-pointer"
                onClick={() => handleShowPopup("followers")}
              >
                <p className="text-lg font-bold text-gray-800">
                  {followers.length || 0}
                </p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
              <div
                className="text-center cursor-pointer"
                onClick={() => handleShowPopup("following")}
              >
                <p className="text-lg font-bold text-gray-800">
                  {following.length || 0}
                </p>
                <p className="text-sm text-gray-600">Following</p>
              </div>
            </div>

            {/* Website */}
            {profileData.website && profileData.website !== "No Website" && (
              <a
                href={profileData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-sm text-blue-500 hover:underline"
              >
                {profileData.website}
              </a>
            )}
          </div>
        </div>

        <UserPostList />
      </div>

      {isPopupOpen && (
        <Popup
          title={popupTitle}
          items={popupItems}
          onClose={handleClosePopup}
        />
      )}

      <Footer />
    </main>
  );
};

export default ProfilePage;
