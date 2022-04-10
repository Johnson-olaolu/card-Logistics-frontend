import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Homepage = () => {
    const navigate = useNavigate()
	const { user } = useSelector((state) => state.user);
	return (
		<section className="  py-20 bg-blue-100 min-h-screen p-4">
			<div className=" mx-auto   max-w-7xl bg-white shadow px-8 pb-8 pt-10 relative rounded-xl ">
				<img
					src={require("../../assets/logo.svg").default}
					alt=""
					className=" absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10"
				/>
				<div className="">
					<h2 className=" text-center font-medium text-4xl text-gray-800">
						{`${user.fullName} : ${user.state}`}
					</h2>

                    <div className=" mt-4 flex flex-col  md:flex-row justify-between text-lg text-gray-600">
                        <p className=""> Phone Number : {user.phoneNum}</p>   
                        <p className="">Email : {user.email}</p>
                    </div>
				</div>
			</div>

			<div  className=" grid grid-cols-1 gap-y-10 md:grid-cols-2 mx-auto   max-w-7xl mt-16 justify-items-center ">
				<div onClick={ () => {navigate("/state-coordinator/registered-companies")}} className=" w-80 h-96 bg-white rounded-xl shadow-md px-4 py-10 text-center hover:shadow-xl cursor-pointer">
					<div className=" w-40 h-40 flex justify-center items-center rounded-full bg-blue-400 mx-auto text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-32 w-32"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={1}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
							/>
						</svg>
					</div>
					<h2 className="text-2xl mt-20 text-blue-400">
						View RM's and Logistics Companies{" "}
					</h2>
				</div>

				<div onClick={ () => {navigate("/state-coordinator/accepted-companies")}} className=" w-80 h-96 bg-white rounded-xl shadow-md px-4 py-10 text-center hover:shadow-xl cursor-pointer">
					<div className=" w-40 h-40 text-white flex justify-center items-center rounded-full bg-blue-400 mx-auto">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-32 w-32"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<h2 className="text-2xl mt-20 text-blue-400">
						View Accepted RM's and Logistics Companies{" "}
					</h2>
				</div>
			</div>
		</section>
	);
};

export default Homepage;
