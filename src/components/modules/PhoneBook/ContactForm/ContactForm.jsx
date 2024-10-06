// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { Component } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import schema from '../../../../helpers/validators/yup-schema';
// import inititalState from './initialState';
import styles from './contact-form.module.scss';

const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState({ name: '', number: '' });
  const [error, setError] = useState({ name: '', number: '' });
  const { name, number } = state;

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, number } = state;
    const errors = { name: '', number: '' };
    try {
      await schema.validate({ name, number }, { abortEarly: false });
      const result = onSubmit({ ...state });
      if (result) {
        reset();
      }
    } catch (err) {
      err.inner.forEach(error => {
        if (error.path === 'name') {
          errors.name = error.message;
        } else if (error.path === 'number') {
          errors.number = error.message;
        }
      });
      setError({ ...errors });
    }
  };

  const reset = () => {
    setState({ name: '', number: '' });
    setError({ name: '', number: '' });
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
    setError(prevError => {
      return { ...prevError, [name]: '' };
    });
    console.log(error);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}> Name</label>
      <input
        placeholder="Enter name"
        className={styles.input}
        onChange={handleChange}
        type="text"
        name="name"
        value={name}
        required
      />
      {error.name && <p className={styles.error}>{error.name}</p>}
      <label className={styles.label}> Number</label>
      <input
        placeholder="Enter phone number"
        className={styles.input}
        onChange={handleChange}
        type="tel"
        name="number"
        value={number}
        required
      />
      {error.number && <p className={styles.error}>{error.number}</p>}
      <button className={styles.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

// **********************CLASES*********************************************
// class ContactForm extends Component {
//   state = { ...inititalState };
//   //   handleSubmit = async e => {
//     e.preventDefault();
//     const { name, number } = this.state;
//     const errors = { name: '', number: '' };
//     try {
//       await this.schema.validate({ name, number }, { abortEarly: false });
//       const { onSubmit } = this.props;
//       const result = onSubmit({ ...this.state });
//       if (result) {
//         this.reset();
//       }
//     } catch (err) {
//       err.inner.forEach(error => {
//         if (error.path === 'name') {
//           errors.name = error.message;
//         } else if (error.path === 'number') {
//           errors.number = error.message;
//         }
//       });
//       this.setState({ error: errors });
//     }
//   };

//   reset() {
//     this.setState({ ...inititalState });
//   }
//   handleChange = ({ target }) => {
//     const { name, value } = target;
//     this.setState({
//       [name]: value,
//       error: { ...this.state.error, [target.name]: '' },
//     });
//   };

//   render() {
//     const { name, number, error } = this.state;
//     const { handleSubmit, handleChange } = this;

//     return (
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <label className={styles.label}> Name</label>
//         <input
//           placeholder="Enter name"
//           className={styles.input}
//           onChange={handleChange}
//           type="text"
//           name="name"
//           value={name}
//           required
//         />
//         {error.name && <p className={styles.error}>{error.name}</p>}
//         <label className={styles.label}> Number</label>
//         <input
//           placeholder="Enter phone number"
//           className={styles.input}
//           onChange={handleChange}
//           type="tel"
//           name="number"
//           value={number}
//           required
//         />
//         {error.number && <p className={styles.error}>{error.number}</p>}
//         <button className={styles.btn} type="submit">
//           Add contact
//         </button>
//       </form>
//     );
//   }
// }

// ****************************Formik*********

// const validNumber = /^\d{3}-\d{3}-\d{2}-\d{2}$/;
// const schema = yup.object().shape({
//   name: yup.string().min(3, 'Name is too short.').trim().required(),
//   number: yup
//     .string()
//     .matches(
//       validNumber,
//       `The phone number must consist only of integer numbers and be in the following format: XXX-XXX-XX-XX`
//     )
//     .required(),
// });

// const ContactForm = props => {
//   const handleSubmit = (values, { resetForm }) => {
//     const { onSubmit } = props;
//     const result = onSubmit({ ...values });
//     result && resetForm();
//   };
//   return (
//     <Formik
//       validationSchema={schema}
//       initialValues={inititalState}
//       onSubmit={handleSubmit}
//     >
//       <Form className={styles.form}>
//         <label className={styles.label} htmlFor="nameInp">
//           {' '}
//           Name
//         </label>
//         <Field
//           placeholder="Enter name"
//           className={styles.input}
//           type="text"
//           name="name"
//           required
//           id="nameInp"
//         />
//         <ErrorMessage component="p" className={styles.error} name="name" />
//         <label className={styles.label} htmlFor="numberInp">
//           {' '}
//           Number
//         </label>
//         <Field
//           placeholder="Enter phone number"
//           className={styles.input}
//           type="tel"
//           name="number"
//           required
//           id="numberInp"
//         />
//         <ErrorMessage component="p" className={styles.error} name="number" />
//         <button className={styles.btn} type="submit">
//           Add contact
//         </button>
//       </Form>
//     </Formik>
//   );
// };

export default ContactForm;
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
