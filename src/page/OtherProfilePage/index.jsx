import React, { useState, useEffect } from "react";
import { useOtherProfileUser } from "../../hooks/useOtherProfileUser";
import usePosts from "../../hooks/usePosts";
import useFollowingAndFollowers from "../../hooks/useGetFollowingFollowers";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PostList from "../../components/PostList";
import FollowButton from "../../components/Common/FollowButton";
import Popup from "../../components/Popup";
import useMyFollowingAndFollowers from "../../hooks/useMyFollowingFollowers";
import BackButton from "../../components/BackButton";

const OtherProfilePage = () => {
  // profile data
  const { profileData, loading, error } = useOtherProfileUser(); //data user
  const id = profileData?.id;
  const { posts, postCount } = usePosts(id); //data post user
  // following/followers
  const {
    followers,
    following,
    loading: followersLoading,
    error: followersError,
  } = useFollowingAndFollowers();
  const { followers: myFollowers, following: myFollowing } =
    useMyFollowingAndFollowers();
  const [isFollowing, setIsFollowing] = useState(false);
  // popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupItems, setPopupItems] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    if (myFollowing && id) {
      setIsFollowing(myFollowing.some((user) => user.id === id));
    }
  }, [myFollowing, id]);

  useEffect(() => {
    setFollowersCount(followers?.length || 0);
  }, [followers]);

  useEffect(() => {
    setFollowingCount(following?.length || 0);
  }, [following]);

  const handleFollowChange = (newFollowStatus) => {
    setIsFollowing(newFollowStatus);
    setFollowersCount((prev) =>
      newFollowStatus ? prev + 1 : prev > 0 ? prev - 1 : 0
    );
  };

  const handleShowPopup = (type) => {
    setPopupTitle(type === "followers" ? "Followers" : "Following");
    setPopupItems(type === "followers" ? followers : following);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => setIsPopupOpen(false);

  if (loading || followersLoading)
    return <p className="text-center text-white">Loading...</p>;
  if (error || followersError)
    return (
      <p className="text-center text-red-500">
        Error loading profile or followers data.
      </p>
    );

  return (
    <main
      className="min-h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/lofi-girl-style-featuring-boy-studying-listening-music_940839-107.jpg')",
      }}
    >
      <Navbar />
      <div className="max-w-2xl px-4 pt-20 pb-32 mx-auto bg-white rounded-lg shadow-md sm:pt-24">
        {/* Profile Section */}
        <div className="flex flex-col p-6 sm:flex-row">
          {/* Profile Image */}
          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-8">
            <img
              src={profileData?.profilePictureUrl || "default-avatar.png"}
              alt="Profile"
              onError={(e) => (e.target.src = "/fallback-avatar.png")}
              className="object-cover w-24 h-24 border-4 border-red-700 rounded-full shadow-md sm:w-32 sm:h-32"
            />
            {/* Username and Bio below Profile Image */}
            <div className="mt-4 text-center sm:text-left">
              <p className="text-lg font-semibold text-gray-800">
                @{profileData?.username || "No Username"}
              </p>
              <p className="text-sm text-gray-500">
                {profileData?.bio || "No Bio"}
              </p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex flex-col flex-grow">
            {/* Name and Follow Button */}
            <div className="flex flex-col items-center mb-4 sm:flex-row">
              <p className="mr-4 text-2xl font-semibold text-gray-800">
                {profileData?.name || "No Name"}
              </p>
              <div className="flex mt-2 sm:mt-0">
                <FollowButton
                  userId={profileData?.id}
                  isFollowing={isFollowing}
                  onFollowChange={handleFollowChange}
                />
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
                  {followersCount}
                </p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
              <div
                className="text-center cursor-pointer"
                onClick={() => handleShowPopup("following")}
              >
                <p className="text-lg font-bold text-gray-800">
                  {followingCount}
                </p>
                <p className="text-sm text-gray-600">Following</p>
              </div>
            </div>

            {/* Website */}
            {profileData?.website && profileData.website !== "No Website" && (
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

        {/* Post List Component */}
        <PostList userId={id} />
      </div>

      {/* Popup for Followers/Following */}
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

export default OtherProfilePage;
