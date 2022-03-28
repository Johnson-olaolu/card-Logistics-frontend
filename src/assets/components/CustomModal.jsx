import React from "react";

const CustomModal = (props) => {
	const { success, message , onClose} = props;
	return (
		<section className=" fixed h-screen w-screen top-0 left-0 bg-blue-100 bg-opacity-50 flex justify-center  z-20 items-center">
			<div className=" w-72 bg-white px-5 py-8 rounded-xl shadow text-center">
				{success ? (
					<div className="h-12 w-12 rounded-full bg-green-600 mx-auto text-white flex justify-center items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-8 w-8"
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
				) : (
					<div className="h-12 w-12 rounded-full bg-red-600 mx-auto text-white flex justify-center items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-8 w-8"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
				)}

				<div className=" space-y-4 mt-6">
					{success ? (
						<h6 className="text-green-600 text-xl ">Success</h6>
					) : (
						<h6 className="text-red-600 text-xl ">Error</h6>
					)}

					<p className=" text-sm text-gray-600">
						{message}
					</p>
				</div>

				<div className=" mt-2 text-right">
					<button onClick={onClose} className="py-1 px-3 rounded bg-red-600 text-white text-sm shadow ">
						Close
					</button>
				</div>
			</div>
		</section>
	);
};

export default CustomModal;
