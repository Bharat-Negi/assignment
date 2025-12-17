"use client";
import { useState } from "react";
import Button from "./component/Button";
import QuestionSection from "./component/QuestionSection";

export default function Home() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [answers, setAnswers] = useState<Record<number, string>>({});
	const [questionsLength, setQuestionsLength] = useState(0);
	const [showResult, setShowResult] = useState(false);

	const handleNextClick = () => {
		if (currentIndex === questionsLength - 1) {
			setShowResult(true);
			return;
		}
		setCurrentIndex((prev) => prev + 1);
	};

	const handleBackClick = () => {
		if (currentIndex === 0) return;
		setCurrentIndex((prev) => prev - 1);
	};

	const handleAnswerSelect = (index: number, answer: string) => {
		setAnswers((prev) => ({
			...prev,
			[index]: answer,
		}));
	};

	const calculateScore = (correctAnswers: string[]) => {
		let score = 0;
		correctAnswers.forEach((ans, i) => {
			if (answers[i] === ans) score++;
		});
		return score;
	};

	return (
		<div className="w-full max-w-xl m-auto py-12 bg-gray-100 px-5 mt-10 rounded-xl relative">
			<h1 className="text-center text-xl mb-5 font-semibold">Question File</h1>
			<h2 className="absolute top-5 left-5">
				Question: {currentIndex + 1} / {questionsLength}
			</h2>
			<QuestionSection
				currentIndex={currentIndex}
				onAnswerSelect={handleAnswerSelect}
				userAnswer={answers[currentIndex]}
				setQuestionsLength={setQuestionsLength}
				showResult={showResult}
				onCalculateScore={calculateScore}
			/>

			{!showResult && (
				<Button
					backButton="Prev Question"
					nextButton={
						currentIndex === questionsLength - 1 ? "Finish" : "Next Question"
					}
					nextClick={handleNextClick}
					backClick={handleBackClick}
					disableBack={currentIndex === 0}
				/>
			)}
		</div>
	);
}
