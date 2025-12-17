type ButtonProps = {
	backButton: string;
	nextButton: string;
	nextClick: () => void;
	backClick: () => void;
	disableBack?: boolean;
};

function Button({
	backButton,
	nextButton,
	nextClick,
	backClick,
	disableBack,
}: ButtonProps) {
	return (
		<div className="flex justify-between mt-6">
			<button
				disabled={disableBack}
				onClick={backClick}
				className="py-1 px-4 bg-blue-500 rounded-2xl text-white disabled:bg-gray-300"
			>
				{backButton}
			</button>

			<button
				onClick={nextClick}
				className="py-1 px-4 bg-blue-500 rounded-2xl text-white"
			>
				{nextButton}
			</button>
		</div>
	);
}

export default Button;
