import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaEllipsisH,
  FaCheckCircle,
} from "react-icons/fa";
import usePostManagement from "../../hooks/usePostManagement";
import { Link } from "react-router-dom";
import StoryList from "../../components/StoryList";
import UserStoryList from "../../components/UserStoryList";

const HomePage = () => {
  const { allPosts, loading, error, setAllPosts } = usePostManagement();

  const handleToggleLike = async (postId) => {
    try {
      const updatedPosts = allPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLike: !post.isLike,
            totalLikes: post.isLike ? post.totalLikes - 1 : post.totalLikes + 1,
          };
        }
        return post;
      });
      setAllPosts(updatedPosts);
    } catch (error) {
      console.error("Failed to toggle like", error);
    }
  };

  if (loading && allPosts.length === 0)
    return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  console.log("ini allpost", allPosts);

  return (
    <main className="min-h-screen bg-gray-800 back">
      <Navbar />
      <div className="max-w-4xl pt-20 mx-auto md:px-5">
        {/* story */}
        <div className="flex flex-row gap-3 mb-1 overflow-hidden bg-white md:mx-20 md:rounded-lg md:gap-2">
          <UserStoryList />
          <StoryList />
        </div>

        {/* Jika allPosts kosong setelah loading selesai */}
        {!loading && allPosts.length === 0 && (
          <p className="mt-10 text-center text-white ">
            Akun anda belum mengikuti siapapun <br /> temukan teman anda{" "}
            <span />
            <Link to="/explore" className="text-green-500 hover:underline">
              Explore
            </Link>
          </p>
        )}

        {/* mapping post */}
        {allPosts.map((post, index) => (
          <div
            key={`${post.id || post.username}-${index}`}
            className="max-w-3xl mx-auto mb-6 transition-transform bg-white rounded-lg"
          >
            {/* user data */}
            <div className="flex items-center justify-between p-3 md:px-6 md:pt-5">
              <div className="flex items-center">
                <img
                  src={post.user?.profilePictureUrl || "/default-avatar.png"}
                  alt={`${post.user?.username || "Unknown"}'s profile`}
                  className="w-12 h-12 mr-4 border-2 border-red-600 rounded-full sm:w-16 sm:h-16"
                  onError={(e) => (e.target.src = "/fallback-avatar.png")}
                />
                <div>
                  <Link
                    to={`/profilepage/${post.user?.id || ""}`}
                    className="text-sm font-semibold text-black sm:text-md hover:underline md:text-base"
                  >
                    {post.user?.username || "Unknown"}
                  </Link>
                  <h3 className="text-xs text-gray-500 sm:text-sm">
                    {post.createdAt}
                  </h3>
                </div>
              </div>

              {/* Ikon titik tiga */}
              <button className="text-gray-500 hover:text-gray-700">
                <FaEllipsisH className="text-xl sm:text-2xl" />
              </button>
            </div>

            {/* Post Image */}
            <div className="flex items-center justify-center w-full h-full overflow-hidden bg-white border border-white rounded-lg">
              {post.imageUrl ? (
                <img
                  className="object-cover w-full h-full max-w-[94%] max-h-[94%] transition-transform duration-300 transform rounded-lg hover:scale-90"
                  src={post.imageUrl}
                  alt={post.caption || "Post image"}
                  onError={(e) => (e.target.src = "/fallback-image.png")}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-600 rounded-lg">
                  <p className="text-gray-300">No Image Available</p>
                </div>
              )}
            </div>

            {/* caption */}
            <p className="px-3 mt-3 text-xs text-black sm:text-sm md:text-base md:px-6">
              <Link
                to={`/profilepage/${post.user?.id || ""}`}
                className="font-semibold text-black hover:underline"
              >
                {post.user?.username}
              </Link>{" "}
              {post.caption}
            </p>

            {/* like and comment */}
            <div className="flex items-center justify-between px-3 mt-3 md:px-6">
              <div className="flex items-center space-x-4">
                {/* Like Button */}
                <button
                  onClick={() => handleToggleLike(post.id)}
                  className="flex items-center text-black"
                >
                  {post.isLike ? (
                    <FaHeart className="text-xl text-red-500 sm:text-2xl" />
                  ) : (
                    <FaRegHeart className="text-xl sm:text-2xl" />
                  )}
                  <span className="ml-2 text-xs sm:text-sm md:text-base">
                    {post.totalLikes} {post.totalLikes === 1 ? "like" : "likes"}
                  </span>
                </button>

                {/* Comment Button */}
                <button className="flex items-center text-gray-600">
                  <FaComment className="text-xl sm:text-2xl" />
                  <span className="ml-2 text-xs text-black sm:text-sm md:text-base">
                    Comment
                  </span>
                </button>
              </div>
            </div>

            {/* comment */}
            <div className="px-3 pb-3 mt-1 md:px-6 md:pb-6">
              <Link
                to={`/post/${post.id}`}
                className="text-xs text-black sm:text-sm hover:underline md:text-base hover:text-wihte"
              >
                Lihat semua Komentar
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
};

export default HomePage;
