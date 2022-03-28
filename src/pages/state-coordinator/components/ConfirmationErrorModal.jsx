import React from "react";

const ConfirmationErrorModal = (props) => {
	const {
		unCompletedClusterManagersLgas,
		unCompletedLogiticsCompanyLgas,
		onClose,
	} = props;
	return (
		<section className=" fixed h-screen w-screen top-0 left-0 bg-blue-100 bg-opacity-50 flex justify-center items-center">
			<div className=" w-96 bg-white px-5 py-8 rounded-xl shadow text-center">
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

				<div className=" mt-5">
					<h6 className="text-red-600 text-xl">Warning : There are no Selected companies for these Lgas</h6>
					<div className=" mt-4">
						<h4 className="">Cluster Managers :</h4>
						<p className=" text-gray-600 text-sm">
							{unCompletedClusterManagersLgas.map((l) => (
								<span key={l} className="">
									{l}, {" "}
								</span>
							))}
						</p>
					</div>

					<div className=" mt-4">
						<h4 className="">Logistics Company :</h4>
						<p className=" text-gray-600 text-sm">
							{unCompletedLogiticsCompanyLgas.map((l) => (
								<span key={l} className="">
									{l}, {" "}
								</span>
							))}
						</p>
					</div>
				</div>

				<div className=" mt-2 text-right">
					<button
						onClick={onClose}
						className="py-1 px-3 rounded bg-red-600 text-white text-sm shadow "
					>
						Close
					</button>
				</div>
			</div>
		</section>
	);
};

export default ConfirmationErrorModal;
