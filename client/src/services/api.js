import axios from 'axios';


const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
// We create an 'instance' so we don't have to type the base URL every time
const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

  // Add this to your existing api.js
export const addFriend = async (friendData) => {
  try {
    const response = await API.post('/friends', friendData);
    return response.data;
  } catch (error) {
    console.error("Error adding friend:", error);
    throw error;
  }
};

export const getFriendMessage = async (name) => {
  try {
    const response = await API.get(`/friends/${name}`);
    return response.data; // This returns the friend object (name, message, etc.)
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Pass the error back to the component to handle
  }

};