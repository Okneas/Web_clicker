import {PlayerStatJSON} from "./Player";
import axios from "axios";

export const addUser = async (user:  PlayerStatJSON) => {
    try {
      const response = await axios.post('https://localhost:7011/Post', user);
      console.log(response.data); // Ответ от сервера
    } catch (error) {
      console.error('Error:', error);
    }
  };