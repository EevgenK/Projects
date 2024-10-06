import * as yup from 'yup';
const validNumber = /^\d{3}-\d{3}-\d{2}-\d{2}$/;
const schema = yup.object().shape({
  name: yup.string().min(3, 'Name is too short.').trim().required(),
  number: yup
    .string()
    .matches(
      validNumber,
      `The phone number must consist only of integer numbers and be in the following format: XXX-XXX-XX-XX`
    )
    .required(),
});
export default schema;
