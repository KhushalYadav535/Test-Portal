import React, { useEffect, useState } from 'react';

const QuestionDisplay = ({
    question,
    currentQuestionIndex,
    totalQuestions,
    onNext,
    onPrevious,
    onAnswer,
    onSubmit,
}) => {
    const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
    const [isSubmitted, setIsSubmitted] = useState(false); // Track submission state

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    onSubmit(); // Auto-submit when time runs out
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, [onSubmit]);

    const handleOptionClick = (option) => {
        onAnswer(currentQuestionIndex, option);
    };

    const formatTimeLeft = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };

    const handleSubmit = () => {
        setIsSubmitted(true); // Set submission state to true
        onSubmit(); // Call onSubmit
    };

    if (!question) return <p>Loading...</p>; // Show loading if question is not available

    return (
        <div className="question-display">
            <h2>Question {currentQuestionIndex + 1} of {totalQuestions}</h2>
            <p>{question.statement}</p>
            <div className="options">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className={`option-button`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <div className="timer">
                <h3> {isSubmitted ? '00:00' : formatTimeLeft(timeLeft)}</h3>
            </div>
            <div className="navigation-buttons">
                <button
                    className="prev-button"
                    onClick={onPrevious}
                    disabled={currentQuestionIndex === 0}
                >
                    Previous
                </button>
                <button
                    className="next-button"
                    onClick={onNext}
                    disabled={currentQuestionIndex === totalQuestions - 1}
                >
                    Next
                </button>
                <button onClick={handleSubmit} style={{ marginLeft: '10px' }}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default QuestionDisplay;
