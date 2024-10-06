import { useState, useEffect } from 'react';

import { defaultProps } from '../defaultProps';
import styles from './days-table.module.scss';

const DaysTable = ({
  weekDayNames = defaultProps.weekDayNames,
  monthDate = defaultProps.monthDate,
}) => {
  const createTableHead = () =>
    weekDayNames.map(day => (
      <th className={styles.days} key={day}>
        {day}
      </th>
    ));
  const createTableRows = () =>
    monthDate.map((week, idx) => (
      <tr className={week} key={idx}>
        {week.map((day, idx) =>
          day ? <td key={idx}>{day.getDate()}</td> : <td key={idx}></td>
        )}
      </tr>
    ));

  return (
    <table className={styles.table}>
      <thead>
        <tr>{createTableHead()}</tr>
      </thead>
      <tbody>{createTableRows()}</tbody>
    </table>
  );
};
export default DaysTable;
