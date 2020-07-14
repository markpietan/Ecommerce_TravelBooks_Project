import axios from 'axios';
import {logInUser} from "./../../db/users"
export async function logIn() {
  try {
    const { data } = await axios.get('/api/users/login');
    return data;
  } catch (error) {
    throw error;
  }
}



