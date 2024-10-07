import { useState } from 'react';

import { FeedbackOptions } from './Feedback/Feedback';
import { Statistics } from './Statistics/Statistics';
import { TitleSection } from './TitleSection/TitleSection';
import { Notification } from '../../shared/Notification/Notification';

const FeedbackApp = () => {
  // const [good, setGood] = useState(0);
  // const [neutral, setNeutral] = useState(0);
  // const [bad, setBad] = useState(0);
  const [feedbacks, setFeedbacks] = useState({ good: 0, neutral: 0, bad: 0 });
  const { good, neutral, bad } = feedbacks;
  const options = Object.keys({ good, neutral, bad });
  const gettigFeedback = e => {
    const button = e.target.textContent.toLowerCase();
    setFeedbacks(prevState => {
      const value = prevState[button];
      return { ...prevState, [button]: value + 1 };
    });
    // switch (button) {
    //   case 'good':
    //     setGood(prev => prev + 1);
    //     break;
    //   case 'neutral':
    //     setNeutral(prev => prev + 1);
    //     break;
    //   case 'bad':
    //     setBad(prev => prev + 1);
    //     break;
    //   default:
    // throw  new Error('Something went wrong!')
    // }
  };
  const total = good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    return `${total ? Math.floor((100 * good) / total) : 0} %`;
  };

  return (
    <div>
      <TitleSection title="Please leave Feedback">
        <FeedbackOptions onLeaveFeedback={gettigFeedback} options={options} />
      </TitleSection>
      <TitleSection title="Statistics">
        {!total ? (
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

//   gettigFeedback = e => {
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
//             onLeaveFeedback={this.gettigFeedback}
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
