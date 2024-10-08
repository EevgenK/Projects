import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://66b1506f1ca8ad33d4f3e458.mockapi.io',
});
export const getFeedbacks = async () => {
  const data = await instance.get('/feedbacks/3');
  console.log(data);
  return data;
};
export const putFeedbacks = async obj => {
  try {
    await instance.put('/feedbacks/3', obj);
  } catch (error) {
    console.log(error);
  }
};
