import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCreatePost } from "../../hooks/useCreatePost";

const CreatePostPage = () => {
  const {
    postData,
    loading,
    uploading,
    error,
    success,
    handleChange,
    handleFileChange,
    handleCreatePost,
  } = useCreatePost();
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileInputChange = (event) => {
    handleFileChange(event);
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleCreatePost();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <main
      className="min-h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/lofi-girl-style-featuring-boy-studying-listening-music_940839-85.jpg')",
      }}
    >
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-5 py-12">
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl bg-opacity-90 md:mx-15">
          <h1 className="mb-6 text-3xl text-center text-black drop-shadow-md">
            Create Post
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-4 py-2 mt-1 text-gray-800 transition duration-200 bg-gray-200 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                onChange={handleFileInputChange}
                required
              />
            </div>
            {imagePreview && (
              <div className="flex justify-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 border-2 border-gray-300 rounded-lg shadow-lg max-h-60"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-black">
                Caption
              </label>
              <textarea
                name="caption"
                className="w-full px-4 py-2 mt-1 text-gray-800 transition duration-200 bg-white border border-white rounded-lg focus:ring-2 focus:ring-white focus:border-white"
                rows="3"
                value={postData.caption || ""}
                onChange={handleChange}
                placeholder="Add caption..."
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full px-6 py-2 text-lg font-semibold text-white rounded-lg transition duration-300 ${
                loading || uploading
                  ? "bg-white cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-blue-600 shadow-lg hover:shadow-xl"
              }`}
              disabled={loading || uploading}
            >
              {loading || uploading ? "Processing..." : "Create Post"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CreatePostPage;
