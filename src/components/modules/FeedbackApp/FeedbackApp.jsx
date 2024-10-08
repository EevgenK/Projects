import { useCallback, useEffect, useRef, useState } from 'react';

import { FeedbackOptions } from './Feedback/Feedback';
import { Statistics } from './Statistics/Statistics';
import { TitleSection } from './TitleSection/TitleSection';
import { Notification } from '../../shared/Notification/Notification';
import { getFeedbacks, putFeedbacks } from 'helpers/api/mockapi/getFeedbacks';
import { Notify } from 'notiflix';
import Button from 'components/shared/Button/Button';
import { useLocalStorage } from 'helpers/hooks/useLocalStorage';

const FeedbackApp = () => {
  const [feedbacks, setFeedbacks] = useState({ good: 0, neutral: 0, bad: 0 });
  const [isVoted, setIsVoted] = useLocalStorage('is-voted', false);
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
    [isVoted, setIsVoted]
  );

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
