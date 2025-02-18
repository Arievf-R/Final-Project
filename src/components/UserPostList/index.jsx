import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import usePostsUser from "../../hooks/usePostsUser";
import { userID } from "../../api/api";

const UserPostList = () => {
  const { posts, loading, error } = usePostsUser(userID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Urutkan posts berdasarkan createdAt, terbaru ke terlama
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="grid grid-cols-2 gap-5 mx-3 mb-40 mt-15 sm:gap-5 md:grid-cols-3 drop-shadow-lg">
      {/* Tambahkan story di atas grid */}
      <div className="col-span-2 mb-6 md:col-span-3">
        <div className="flex space-x-4 overflow-x-auto">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex-shrink-0 w-16 h-16 text-center">
              <div className="relative cursor-pointer">
                <div className="p-0.5 rounded-full bg-gradient-to-tr from-red-600 to-white">
                  <img
                    src="https://th.bing.com/th/id/OIP.0aJU35P5hnpxHl-Iwc12ZwAAAA?w=450&h=450&rs=1&pid=ImgDetMain" // Ganti dengan URL gambar story
                    alt="Story"
                    className="object-cover w-full h-full border-2 border-white rounded-full"
                    onError={(e) =>
                      (e.target.src =
                        "https://th.bing.com/th/id/OIP.0aJU35P5hnpxHl-Iwc12ZwAAAA?w=450&h=450&rs=1&pid=ImgDetMain")
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid untuk posts */}
      {sortedPosts.length > 0 ? (
        sortedPosts.map((post) => (
          <div
            key={post.id}
            className="relative overflow-hidden bg-gray-200 group aspect-square"
          >
            {/* Make the post image clickable */}
            <Link to={`/post/${post.id}`}>
              {/* Menampilkan gambar jika ada */}
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={post.caption || "Post image"}
                  className="object-cover w-full h-full transition-transform duration-300 transform scale-105 rounded-lg hover:scale-110"
                  onError={(e) => (e.target.src = "/fallback-image.png")}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-100 rounded-lg">
                  No Image
                </div>
              )}
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No posts available.</p>
      )}
    </div>
  );
};

export default UserPostList;
