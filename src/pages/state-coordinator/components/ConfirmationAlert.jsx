import React from "react";

const ConfirmationAlert = (props) => {
	const { completed, onClick } = props;
	return (
		<>
			{completed ? (
				<div className=" h-12 w-96 rounded bg-green-400 flex items-center justify-between px-4">
					<div className=" w-60 space-x-2 flex items-center ">
						<div className=" h-8 w-8 flex-shrink-0 rounded-full bg-white flex justify-center items-center text-green-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<p className=" text-white text-xs ">
                            No Action Required
						</p>
					</div>
					
				</div>
			) : (
				<div className=" h-12 w-96 rounded bg-red-400 flex items-center justify-between px-4">
					<div className=" w-60 space-x-2 flex items-center ">
						<div className=" h-8 w-8 flex-shrink-0 rounded-full bg-white flex justify-center items-center text-red-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<p className=" text-white text-xs ">
							Check for Missing Entries for CMs/Logistics Company
						</p>
					</div>
					<button onClick={onClick} className=" bg-white shadow rounded-sm py-1 px-3 text-xs text-red-400">
						Fix This
					</button>
				</div>
			)}
		</>
	);
};

export default ConfirmationAlert;
