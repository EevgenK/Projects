import { useState, useRef } from 'react';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { defaultProps } from '../defaultProps';
import Button from 'components/shared/Button/Button';
// import styles from './month-picker.module.scss';

// const MonthPicker = () => {
//   const [startDate, setStartDate] = useState(Date.now());
//   return (
//     <DatePicker
//       className={styles.input}
//       selected={startDate}
//       onChange={date => setStartDate(date)}
//     />
//   );
// };

const MonthPicker = ({
  years = defaultProps.years,
  monthNames = defaultProps.monthNames,
  // weekDayNames = defaultProps.weekDayNames,
}) => {
  const [startIdxMonth, setstartIdxMonth] = useState(new Date().getMonth());
  const [startYear, setstartYear] = useState(new Date().getFullYear());
  const monthSelect = useRef();
  const yearSelect = useRef();
  const createSelectOptions = arr =>
    arr.map((name, idx) => {
      return (
        <option key={name} value={idx}>
          {name}
        </option>
      );
    });
  const handleMonthClick = num => {
    const date = new Date(startYear, startIdxMonth + num);
    setstartIdxMonth(date.getMonth());
    setstartYear(date.getFullYear());
  };

  const handleSelectChange = () => {
    const month = Number(monthSelect.current.value);
    const yearIdx = yearSelect.current.value; /*PROBLEM HERE*/
    const year = Number(
      yearSelect.current.children[yearIdx].innerText
    ); /*PROBLEM HERE*/
    const date = new Date(year, month);
    console.log('year', year);
    console.log('year', year);
    setstartIdxMonth(date.getMonth());
    setstartYear(date.getFullYear());
  };

  return (
    <>
      <Button onClick={() => handleMonthClick(-1)}>{'<'}</Button>
      <select
        ref={monthSelect}
        // defaultValue={startIdxMonth}
        onChange={handleSelectChange}
      >
        <option>{monthNames[startIdxMonth]}</option>
        {createSelectOptions(monthNames)}
      </select>
      <select
        ref={yearSelect}
        // defaultValue={startYear}
        onChange={handleSelectChange}
      >
        <option value="">{startYear}</option>
        {createSelectOptions(years)}
      </select>
      <Button onClick={() => handleMonthClick(1)}>{'>'}</Button>
    </>
  );
};
export default MonthPicker;
