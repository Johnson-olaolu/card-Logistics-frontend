import React from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {
	const navigate = useNavigate();
	return (
		<section className="  py-20 bg-blue-100 min-h-screen p-4">
			<div className=" mx-auto   max-w-7xl bg-white shadow px-8 pb-8 pt-10 relative rounded-xl ">
				<img
					src={require("../assets/logo.svg").default}
					alt=""
					className=" absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10"
				/>
				<div className="">
					<h2 className=" text-center font-medium text-4xl text-gray-800">
						Welcome
					</h2>
				</div>
			</div>

			<div className=" grid grid-cols-1 gap-y-10 lg:grid-cols-3 mx-auto   max-w-7xl mt-16 justify-items-center ">
				<div
					onClick={() => {
						navigate("/login");
					}}
					className=" w-80 h-96 bg-white rounded-xl shadow-md px-4 py-10 text-center hover:shadow-xl cursor-pointer"
				>
					<div className=" w-40 h-40 flex justify-center items-center rounded-full bg-w-400 mx-auto text-blue-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-36 w-36"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h2 className="text-2xl mt-20 px-5 text-blue-400">
						State Coordinator Login
					</h2>
				</div>

				<div
					onClick={() => {
						navigate("/registration-form");
					}}
					className=" w-80 h-96 bg-white rounded-xl shadow-md px-4 py-10 text-center hover:shadow-xl cursor-pointer"
				>
					<div className=" w-40 h-40 text-blue-400 flex justify-center items-center rounded-full  mx-auto">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-36 w-36"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
							/>
						</svg>
					</div>
					<h2 className="text-2xl mt-20 px-5 text-blue-400">
						RM/Logistics Company Registration
					</h2>
				</div>

				<div
					onClick={() => {
						navigate("/company/login");
					}}
					className=" w-80 h-96 bg-white rounded-xl shadow-md px-4 py-10 text-center hover:shadow-xl cursor-pointer"
				>
					<div className=" w-40 h-40 text-blue-400 flex justify-center items-center rounded-full  mx-auto">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-36 w-36"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h2 className="text-2xl mt-20 px-5 text-blue-400">
						RM/Logistics Company View Status
					</h2>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
