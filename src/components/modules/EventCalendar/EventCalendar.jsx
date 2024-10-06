import { useState } from 'react';
import DaysTable from './DaysTable/DaysTable';
import MonthPicker from './MonthPicker/MounthPicker';
import Button from 'components/shared/Button/Button';
import styles from './event-calendar.module.scss';

const EventCalendar = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Button>+</Button>

        <MonthPicker />
      </header>
      <DaysTable />
    </div>
  );
};

export default EventCalendar;
