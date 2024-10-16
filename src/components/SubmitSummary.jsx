import React from 'react';

const SubmitSummary = ({ questions, onBack }) => {
  return (
    <div className="submit-summary">
      <h2>Summary of Your Answers</h2>
      {questions.map((question, index) => (
        <div key={index} className="summary-item">
          <p>{question.statement}</p>
          <p>Your Answer: {question.selectedAnswer || "Not Answered"}</p>
        </div>
      ))}
      <button onClick={onBack}>Back to Test</button>
    </div>
  );
};

export default SubmitSummary;
