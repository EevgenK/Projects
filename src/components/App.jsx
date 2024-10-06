import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import FeedbackApp from './modules/FeedbackApp/FeedbackApp';
import PhoneBook from './modules/PhoneBook/PhoneBook';
import SerchImages from './modules/SearchImages/SearchImages';

// import Timer from './modules/Timer/Timer';
// import EventCalendar from './modules/EventCalendar/EventCalendar';
import commonCss from '../common-styles/common.module.scss';

export const App = () => {
  const [isFetched, setIsFetched] = useState(false);
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    const { pathname } = location;
    pathname !== '/serchImages' && setIsFetched(false);
  }, [location]);
  const checkFetch = useCallback(
    (str = false) => setIsFetched(Boolean(str)),
    []
  );
  return (
    <div
      className={commonCss.container}
      style={{ height: isFetched && '100%' }}
    >
      <nav className={commonCss.navigationt}>
        <NavLink
          className={({ isActive }) =>
            [`${commonCss.link} ${isActive ? commonCss.active : ''}`].join(' ')
          }
          to="/serchImages"
        >
          Serch Images
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            [`${commonCss.link} ${isActive ? commonCss.active : ''}`].join(' ')
          }
          to="/phonebook"
        >
          Phonebook
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            [`${commonCss.link} ${isActive ? commonCss.active : ''}`].join(' ')
          }
          to="/feedback"
        >
          Feedback
        </NavLink>
      </nav>
      <Routes>
        <Route
          path="/serchImages"
          element={<SerchImages isFetched={checkFetch} />}
        />
        <Route path="/phonebook" element={<PhoneBook />} />
        <Route path="/feedback" element={<FeedbackApp />} />

        {/* <EventCalendar /> */}
        {/* <Timer /> */}
      </Routes>
    </div>
  );
};
