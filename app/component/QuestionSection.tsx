"use client";
import { useEffect, useState } from "react";

type Question = {
	id: number;
	questionText: string;
	options: string[];
	correctAnswer: string;
};

type Props = {
	currentIndex: number;
	onAnswerSelect: (index: number, answer: string) => void;
	userAnswer?: string;
	setQuestionsLength: (len: number) => void;
	showResult: boolean;
	onCalculateScore: (answers: string[]) => number;
};

function QuestionSection({
	currentIndex,
	onAnswerSelect,
	userAnswer,
	setQuestionsLength,
	showResult,
	onCalculateScore,
}: Props) {
	const [questions, setQuestions] = useState<Question[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("/data/question.json");
			const data: Question[] = await res.json();
			setQuestions(data);
			setQuestionsLength(data.length);
		};
		fetchData();
	}, []);

	const totalNumber = questions.length;

	if (!questions.length) return <p>Loading...</p>;

	if (showResult) {
		const correctAnswers = questions.map((q) => q.correctAnswer);
		const score = onCalculateScore(correctAnswers);

		return (
			<div className="text-center">
				<h2 className="text-2xl font-bold mb-4">Result</h2>
				<p className="text-lg">
					You scored <b>{score}</b> out of <b>{questions.length}</b>
				</p>
			</div>
		);
	}

	const currentQuestion = questions[currentIndex];

	return (
		<div className="mb-8">
			<h2 className="mb-6 text-center text-xl font-medium">
				{currentQuestion.questionText}
			</h2>

			<div className="grid grid-cols-2 gap-3">
				{currentQuestion.options.map((option) => (
					<button
						key={option}
						onClick={() => onAnswerSelect(currentIndex, option)}
						className={`p-2 rounded-2xl border
						${
							userAnswer === option
								? "bg-blue-500 text-white"
								: "bg-gray-200 hover:bg-gray-300"
						}`}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
}

export default QuestionSection;
