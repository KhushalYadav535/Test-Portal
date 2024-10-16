import React, { useEffect, useState } from 'react';
import QuestionDisplay from './components/QuestionDisplay';
import QuestionLegend from './components/QuestionLegend';
import SubmitSummary from './components/SubmitSummary';
import ThankYouModal from './components/ThankYouModal';
import ThemeToggle from './components/ThemeToggle';
import questionsData from './data';

const App = () => {
    const [questions, setQuestions] = useState(questionsData);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
    const [showSummary, setShowSummary] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [theme, setTheme] = useState('light');
    const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    handleSubmit(); // Auto-submit when time runs out
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    const handleAnswer = (index, answer) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[currentQuestionIndex] = answer;
        setSelectedAnswers(updatedAnswers);
    };

    const handleNext = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    };

    const handleQuestionClick = (index) => {
        setCurrentQuestionIndex(index);
    };

    const handleSubmit = () => {
        setShowSummary(true);
        setShowModal(true);
    };

    const handleBackToTest = () => {
        setShowSummary(false);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const formatTimeLeft = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };

    return (
        <div className={`test-portal ${theme}`}>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <div className="app-content">
                <div className="timer">
                    <h3> {formatTimeLeft(timeLeft)}</h3>
                </div>
                {!showSummary ? (
                    <div className="main-container">
                        <QuestionLegend
                            questions={questions}
                            currentQuestionIndex={currentQuestionIndex}
                            onQuestionClick={handleQuestionClick}
                        />
                        <QuestionDisplay
                            question={questions[currentQuestionIndex]}
                            currentQuestionIndex={currentQuestionIndex}
                            totalQuestions={questions.length}
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                            onAnswer={handleAnswer}
                            onSubmit={handleSubmit}
                        />
                    </div>
                ) : (
                    <SubmitSummary questions={questions} selectedAnswers={selectedAnswers} onBack={handleBackToTest} />
                )}
                <ThankYouModal showModal={showModal} closeModal={closeModal} />
            </div>
        </div>
    );
};

export default App;
