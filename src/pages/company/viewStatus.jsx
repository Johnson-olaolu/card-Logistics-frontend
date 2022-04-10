import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CustomDropDown from "../../assets/components/CustomDropDown";
import CustomModal from "../../assets/components/CustomModal";
import { stateCoordinatorSevice } from "../../services/stateCoordinator.service";

const ViewStatus = () => {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.user);

	const [logisticCompanies, setLogisticCompanies] = useState([]);
	const [clusterManager, setClusterManager] = useState({});

	async function getCompanies(query) {
		const response = await stateCoordinatorSevice.getAllCompaniesByState(
			query
		);
		if (response.success) {
			setLogisticCompanies(response?.data?.logisticCompanies);
			setClusterManager(
				response?.data?.clusterManagers.filter(
					(m) => m._id == user._id
				)[0]
			);
		} else {
			//show custom modal
			setShowCustomModal(true);
			setCustomModalDetails({
				success: response.success,
				message: response.message,
			});
		}
	}

	useEffect(() => {
		if (
			user.category == "Cluster Manager" ||
			user.category == "Relationship Manager" ||
			user.category == "Logistics (RM's) Company" ||
			user.category == "Logistics (CM's) Company"
		) {
			getCompanies(user?.state);
		}
	}, [user]);

	const onSelectMapClusterManager = async (name, value) => {
		const payload = {
			logisticCompanyId: value,
			clusterManagerId: name,
		};

		const response = await stateCoordinatorSevice.mapClusterManager(
			payload
		);

		getCompanies(user?.state);
		//show custom modal
		setShowCustomModal(true);
		setCustomModalDetails({
			success: response.success,
			message: response.message,
		});
	};

	//  Modal
	const [showCustomModal, setShowCustomModal] = useState(false);
	const [customModalDetails, setCustomModalDetails] = useState({
		success: false,
		message: "",
	});
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
						<p>
							<p className="">
								{" "}
								State : {user.state} ( LGA :{" "}
								{user.localGovernment})
							</p>
							<p className="">Address : {user.address}</p>
						</p>
						<p className=""> Phone Number : {user.phoneNum}</p>
						<p className="">
							<p className="">Email : {user.email}</p>
							<p className="">Category : {user.category}</p>
						</p>
					</div>
				</div>
			</div>

			<div className=" grid grid-cols-1 gap-y-10 mx-auto   max-w-7xl mt-16 justify-items-center ">
				{user.isAccepted ? (
					<>
						<div className=" w-80 h-96 bg-white rounded-xl shadow-md px-4 py-10 text-center hover:shadow-xl ">
							<div className=" w-40 h-40 flex justify-center items-center rounded-full bg-green-400 mx-auto text-white">
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
							<h2 className="text-2xl mt-20 text-green-400">
								Your application has been accepted{" "}
							</h2>
						</div>

						{(user.category == "Cluster Manager" ||
							user.category == "Relationship Manager" ||
							user.category == "Logistics (RM's) Company" ||
							user.category == "Logistics (CM's) Company") === true && (
								<>
									<div className=" max-w-xl  bg-white rounded-xl shadow-md p-4">
										<h2 className=" text-gray-600 mb-2 ">
											Please Select Preffered Logistics
											company{" "}
										</h2>
										<CustomDropDown
											name={user._id}
											data={logisticCompanies
												?.filter(
													(company) =>
														company.localGovernment ===
														clusterManager?.localGovernment
												)
												.map((l) => ({
													name: `${l.fullName} : ${l.address}`,
													value: l._id,
												}))}
											placeholder="Select"
											onSelect={onSelectMapClusterManager}
											value={
												logisticCompanies.filter(
													(l) =>
														l._id ==
														clusterManager.logisticsCompany
												)[0]?.fullName
											}
										/>
									</div>
									{/* Modals */}
									{showCustomModal && (
										<CustomModal
											onClose={() => {
												setShowCustomModal(false);
											}}
											success={customModalDetails.success}
											message={customModalDetails.message}
										/>
									)}
								</>
							)}
					</>
				) : (
					<>
					<div className=" w-80 h-96 bg-white rounded-xl shadow-md px-4 py-10 text-center hover:shadow-xl ">
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
							Your Application is pending{" "}
						</h2>
					</div>
					{(user.category == "Cluster Manager" ||
							user.category == "Relationship Manager" ||
							user.category == "Logistics (RM's) Company" ||
							user.category == "Logistics (CM's) Company") === true && (
								<>
									<div className=" max-w-xl  bg-white rounded-xl shadow-md p-4">
										<h2 className=" text-gray-600 mb-2 ">
											Please Select Preffered Logistics
											company{" "}
										</h2>
										<CustomDropDown
											name={user._id}
											data={logisticCompanies
												?.filter(
													(company) =>
														company.localGovernment ===
														clusterManager?.localGovernment
												)
												.map((l) => ({
													name: `${l.fullName} : ${l.address}`,
													value: l._id,
												}))}
											placeholder="Select"
											onSelect={onSelectMapClusterManager}
											value={
												logisticCompanies.filter(
													(l) =>
														l._id ==
														clusterManager.logisticsCompany
												)[0]?.fullName
											}
										/>
									</div>
									{/* Modals */}
									{showCustomModal && (
										<CustomModal
											onClose={() => {
												setShowCustomModal(false);
											}}
											success={customModalDetails.success}
											message={customModalDetails.message}
										/>
									)}
								</>
							)}
					</>
				)}
			</div>
		</section>
	);
};

export default ViewStatus;
