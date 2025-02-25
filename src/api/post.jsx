import { apiClient } from "./api";
import axios from "axios";
import { baseUrl, jwtToken, apiKey } from "./api";
import { userID } from "./api";
import { useRouteError } from "react-router-dom";

// Create Post
export const createPost = async (imageUrl) => {
  let jwtToken = localStorage.getItem("jwtToken");
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      apiKey: `${apiKey}`,
    },
  };

  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/create-post`,
      imageUrl,
      config
    );
    // console.log("api create post:", response);
    return response.data;
  } catch (error) {
    console.error("Error di api:", error);
    throw error;
  }
};

// Get Posts by User ID, isi post user tersebut
export const getPostByUserId = async (userID) => {
  let jwtToken = localStorage.getItem("jwtToken");
  // let userID = localStorage.getItem("userId");
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      apiKey: `${apiKey}`,
    },
  };

  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/users-post/${userID}?size=10&page=1`,
      config
    );
    console.log("userid", userID);
    // console.log("Data get post by user id:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("check userId", userID);
    console.error(
      "Error fetching posts:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update Post
export const updatePost = async (postId, updatedData) => {
  let jwtToken = localStorage.getItem("jwtToken");
  const config = {
    headers: {
      apiKey: `${apiKey}`,
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/update-post/${postId}`,
      updatedData,
      config
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error in API:", error.response?.data || error.message);
    throw error;
  }
};

// Delete Post
export const deletePost = async (postId) => {
  let jwtToken = localStorage.getItem("jwtToken");
  const config = {
    headers: {
      apiKey: `${apiKey}`,
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  try {
    const response = await apiClient.delete(
      `/api/v1/delete-post/${postId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting post:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get Explore Posts
export const getExplorePosts = async (page = 1, size = 10) => {
  let jwtToken = localStorage.getItem("jwtToken");
  try {
    const response = await apiClient({
      url: `api/v1/explore-post?size=${size}&page=${page}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    // console.log("result in api:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    // console.error('Error fetching explore posts:', error.response?.data || error.message);
    throw error;
  }
};

// get post by id, photo & comments
export const getPostById = async (id) => {
  let jwtToken = localStorage.getItem("jwtToken");
  const config = {
    headers: {
      apiKey: `${apiKey}`,
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  try {
    const response = await apiClient.get(`/api/v1/post/${id}`, config);
    return response.data.data;
    // console.log( "Data get post by id:", response.data.data);
  } catch (error) {
    console.error(
      "Error fetching post by ID:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get My Following Posts
export const getMyFollowingPosts = async (page = 1, size = 10) => {
  let jwtToken = localStorage.getItem("jwtToken");
  console.log("jwttoken", jwtToken);
  const config = {
    headers: {
      apiKey: `${apiKey}`,
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/following-post?size=${size}&page=${page}`,
      config
    );
    console.log(
      "result get my following post in api:",
      response.data.data.posts
    );
    return response.data.data.posts;
  } catch (error) {
    console.error(
      "Error fetching following posts:",
      error.response?.data || error.message
    );
    throw error;
  }
};
