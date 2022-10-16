import React, { useState } from 'react';

export default function App() {
	const questions = [
		{
			id: 1,
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			id: 2,
			questionText: 'What is the capital of Nigeria?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Abuja', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			id: 3,
			questionText: 'Who is CEO of Dangote Cement?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Dangote', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			id: 4,
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [showNextButton, setShowNextButton] = useState(false);
	const [instrButton, setInstrButton] = useState("Next");
	const [failedQuestionIds, setFailedQuestionIds] = useState([]);
	const [isActive, setIsActive] = useState(false);


	const failedQuestions = questions.filter(question =>
		// do a check if the filtered question.id (which is each object inside the question array) is inside the failedQuestionIds array, so if the filtered question.id is inside the failedQuestionIds array then it is a failed question then filter the failed question
		failedQuestionIds.includes(question.id)
	);


	const handleAnswerOptionClick = (isCorrect, highlightedAnwser, questionId) => {

		if (isCorrect === true) {
			setScore(score + 1);
		}
		else {
			setFailedQuestionIds((ids) => [...ids, questionId]);
		}

		setShowNextButton(true);
		setIsActive(highlightedAnwser);
	};



	function handleNextQuestion() {

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}

		if (nextQuestion === (questions.length - 1)) {
			setInstrButton("Submit");
		}

		setIsActive(false);
	}

	function restartQuestion() {
		window.location.reload(false);
	}



	return (
		<>
			<div className='apps'>
				{showScore ? (
					<div className='appz'>
						<div className='score-section'>
							You scored {score} out of {questions.length}


						</div>
						<button onClick={restartQuestion}>Restart Quiz</button>

						{failedQuestions.map(failedQues => (
							<div className='failed-ans' key={failedQues.id}>
								<span className='failed-ans'>{failedQues.id}

									&nbsp;&nbsp;&nbsp;&nbsp;<p>{failedQues.questionText}</p>
									<br />
									&nbsp;&nbsp;&nbsp;&nbsp;<p>{failedQues.answerOptions.find((failedAns) => (
										failedAns.isCorrect === true
									)).answerText}</p>

									{/* {console.log(failedQues.answerOptions.find((failedAns) => (
										failedAns.isCorrect
									)).answerText)} */}
								</span>

							</div>
						))}

					</div>
				) : (<>
					<div className='app'>
						<div className='question-section'>
							<div className='question-count'>

								<span>Question {currentQuestion + 1}</span>/{questions.length}
							</div>
							<div className='question-text'>{questions[currentQuestion].questionText}</div>
						</div>
						<div className='answer-section'>
							{questions[currentQuestion].answerOptions.map((answerOption, index) => (
								<button key={index} className={index === isActive ? 'bg-salmon' : ""} onClick={() => handleAnswerOptionClick(answerOption.isCorrect, index, questions[currentQuestion].id)}>{answerOption.answerText}</button>
							))}
						</div>
					</div>
					<br />
					<div className="instrubutton">
						{showNextButton && <button onClick={handleNextQuestion}>{instrButton}</button>}
					</div>

				</>
				)}
			</div>

		</>
	);
}
