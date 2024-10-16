import React from 'react';

const QuestionLegend = ({ questions, currentQuestionIndex, onQuestionClick }) => {
  return (
    <div className="question-legend">
      {questions.map((_, index) => (
        <button
          key={index}
          className={currentQuestionIndex === index ? 'active' : ''}
          onClick={() => onQuestionClick(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default QuestionLegend;
