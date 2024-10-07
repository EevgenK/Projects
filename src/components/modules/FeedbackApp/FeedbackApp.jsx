import { useCallback, useEffect, useRef, useState } from 'react';

import { FeedbackOptions } from './Feedback/Feedback';
import { Statistics } from './Statistics/Statistics';
import { TitleSection } from './TitleSection/TitleSection';
import { Notification } from '../../shared/Notification/Notification';
import { getFeedbacks, putFeedbacks } from 'helpers/api/mockapi/getFeedbacks';
import { Notify } from 'notiflix';
import Button from 'components/shared/Button/Button';

const FeedbackApp = () => {
  const [feedbacks, setFeedbacks] = useState({ good: 0, neutral: 0, bad: 0 });
  const [isVoted, setIsVoted] = useState(() => {
    const voted = JSON.parse(localStorage.getItem('is-voted'));
    return voted ?? false;
  });
  const [error, setError] = useState(null);

  const { good, neutral, bad } = feedbacks;
  const total = good + neutral + bad;

  const dataFetchedRef = useRef(false);
  const prevFeedbacksRef = useRef();

  const getFeedbackData = useCallback(async () => {
    if (dataFetchedRef.current) return;
    try {
      const result = await getFeedbacks();
      if (result.statusText !== 'OK') {
        throw new Error('Something go wrong...');
      }

      setFeedbacks(result.data);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    getFeedbackData();
    dataFetchedRef.current = true;
  }, [getFeedbackData]);

  const options = Object.keys({ good, neutral, bad });
  const handleFeedback = useCallback(
    e => {
      if (isVoted) {
        return Notify.info(
          'You have already voted. But if you want to make an extra vote, use the button "MAKE AN EXTRA VOTE"'
        );
      }
      const button = e.target.textContent.toLowerCase();
      setFeedbacks(prevState => ({
        ...prevState,
        [button]: prevState[button] + 1,
      }));
      Notify.success('Thank you for your vote. It`s very important for me!');
      setIsVoted(true);
    },
    [isVoted]
  );
  useEffect(() => {
    localStorage.setItem('is-voted', JSON.stringify(isVoted));
  }, [isVoted]);

  useEffect(() => {
    const putFeedbacksData = async () => {
      if (
        prevFeedbacksRef.current &&
        JSON.stringify(prevFeedbacksRef.current) !== JSON.stringify(feedbacks)
      ) {
        await putFeedbacks(feedbacks);
      }
      prevFeedbacksRef.current = feedbacks;
    };
    putFeedbacksData();
  }, [feedbacks]);

  const countPositiveFeedbackPercentage = () => {
    return `${total ? Math.floor((100 * good) / total) : 0} %`;
  };

  return (
    <div>
      <TitleSection title="Please leave Feedback">
        <FeedbackOptions
          isVoted={isVoted}
          onLeaveFeedback={handleFeedback}
          options={options}
        />
      </TitleSection>
      <TitleSection title="Statistics">
        {error ? (
          <h3>error</h3>
        ) : !total ? (
          <Notification message="There is no feedback yet. Your feedback can be the first!" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positiveFeedback={countPositiveFeedbackPercentage()}
          />
        )}
        {isVoted && (
          <Button onClick={() => setIsVoted(false)} isVoted={isVoted}>
            make an extra vote
          </Button>
        )}
      </TitleSection>
    </div>
  );
};

// import { Component } from 'react';
// class FeedbackApp extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   handleFeedback  = e => {
//     const button = e.target.textContent.toLowerCase();
//     Object.keys(this.state).map(
//       el =>
//         el === button &&
//         this.setState(prevState => {
//           return { [el]: prevState[el] + 1 };
//         })
//     );
//   };
//   countTotalFeedback = () => {
//     const { good, neutral, bad } = this.state;

//     return good + neutral + bad;
//   };
//   countPositiveFeedbackPercentage = () => {
//     const total = this.countTotalFeedback();
//     return `${total > 0 ? Math.floor((100 * this.state.good) / total) : 0} %`;
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const options = Object.keys(this.state);
//     return (
//       <div className={commonCss.container}>
//         <TitleSection title="Please leave Feedback">
//           <FeedbackOptions
//             onLeaveFeedback={this.handleFeedback }
//             options={options}
//           />
//         </TitleSection>
//         <TitleSection title="Statistics">
//           {!this.countTotalFeedback() ? (
//             <Notification message="There is no feedback yet. Your feedback can be the first!" />
//           ) : (
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={this.countTotalFeedback()}
//               positiveFeedback={this.countPositiveFeedbackPercentage()}
//             />
//           )}
//         </TitleSection>
//       </div>
//     );
//   }
// }
export default FeedbackApp;

// HOOKS
// import { useState, useEffect } from 'react';

// const useLocalStorage = (key, initialValue) => {
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.error(error);
//       return initialValue;
//     }
//   });

//   useEffect(() => {
//     try {
//       window.localStorage.setItem(key, JSON.stringify(storedValue));
//     } catch (error) {
//       console.error(error);
//     }
//   }, [key, storedValue]);

//   return [storedValue, setStoredValue];
// };

// import { useEffect, useRef } from 'react';

// const usePutFeedbacks = (feedbacks, putFunction) => {
//   const prevFeedbacksRef = useRef();

//   useEffect(() => {
//     const putFeedbacksData = async () => {
//       if (
//         prevFeedbacksRef.current &&
//         JSON.stringify(prevFeedbacksRef.current) !== JSON.stringify(feedbacks)
//       ) {
//         await putFunction(feedbacks);
//       }
//       prevFeedbacksRef.current = feedbacks;
//     };
//     putFeedbacksData();
//   }, [feedbacks, putFunction]);
// };

// import { useState, useEffect } from 'react';

// const useFetchFeedbacks = fetchFunction => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [isFetched, setIsFetched] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (isFetched) return;
//       try {
//         const result = await fetchFunction();
//         if (result.statusText !== 'OK') {
//           throw new Error('Something went wrong...');
//         }
//         setData(result.data);
//         setIsFetched(true);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, [fetchFunction, isFetched]);

//   return { data, error };
// };

// final?
// const FeedbackApp = () => {
//   const [feedbacks, setFeedbacks] = useState({ good: 0, neutral: 0, bad: 0 });
//   const [isVoted, setIsVoted] = useLocalStorage('is-voted', false);
//   const { data: fetchedFeedbacks, error } = useFetchFeedbacks(getFeedbacks);

//   useEffect(() => {
//     if (fetchedFeedbacks) {
//       setFeedbacks(fetchedFeedbacks);
//     }
//   }, [fetchedFeedbacks]);

//   usePutFeedbacks(feedbacks, putFeedbacks);
// .....rest logic
// };
