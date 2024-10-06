import axios from 'axios';
// axios.defaults.baseURL = 'https://pixabay.com/api/';
// export const getGallery2 = (request, page) => {
//   return axios.get('', {
//     params: {
//       key: '45547752-43a0cb06c467be16aeef39c83',
//       q: request,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: 'true',
//       per_page: 12,
//       page: page,
//     },
//   });
// };
const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '45547752-43a0cb06c467be16aeef39c83',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
  },
});

export const getGallery = async (q, page) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  const perPage = instance.defaults.params.per_page;
  const totalPages = Math.round(data.totalHits / perPage);
  return { data, totalPages };
};
