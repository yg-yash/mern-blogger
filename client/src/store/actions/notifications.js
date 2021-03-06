import { GET_NOTIFICATIONS } from '../types';
import axios from 'axios';

export const getNotifications = () => async (dispatch) => {
  try {
    const response = await axios.get('/notifications');

    dispatch({ type: GET_NOTIFICATIONS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
