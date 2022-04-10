import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CustomDropDown from "../../assets/components/CustomDropDown";
import CustomModal from "../../assets/components/CustomModal";
import { stateCoordinatorSevice } from "../../services/stateCoordinator.service";
import NigerianStates from "../../utils/nigeria-state-and-lgas.json";
import ConfirmationAlert from "./components/ConfirmationAlert";
import ConfirmationErrorModal from "./components/ConfirmationErrorModal";
// import CategoryTypes from '../../../utils/categories.json'

const RegisteredCompanies = () => {
	const navigate = useNavigate();
	const [selectedLga, setSelectedLga] = useState("");
	const [logisticCompanies, setLogisticCompanies] = useState([]);
	const [clusterManagers, setClusterManagers] = useState([]);

	//view by localGovernment
	const [viewLogisticsCompany, setViewLogisticsCompany] = useState([]);
	const [viewClusterManager, setViewClusterManager] = useState([]);

	const { user } = useSelector((state) => state.user);

	//completed Lga
	const [unCompletedClusterManagersLgas, setUnCompletedClusterManagersLgas] =
		useState([]);
	const [unCompletedLogiticsCompanyLgas, setUnCompletedLogiticsCompanyLgas] =
		useState([]);
	const [showConfirmationErrorModal, setShowConfirmationErrorModal] =
		useState(false);

	//  Modal
	const [showCustomModal, setShowCustomModal] = useState(false);
	const [customModalDetails, setCustomModalDetails] = useState({
		success: false,
		message: "",
	});

	async function getCompanies(query) {
		const response = await stateCoordinatorSevice.getAllCompaniesByState(
			query
		);
		if (response.success) {
			setLogisticCompanies(response?.data?.logisticCompanies);
			setClusterManagers(response.data.clusterManagers);

			setUnCompletedClusterManagersLgas(
				NigerianStates.filter(
					(state) => state.state == query
				)[0].lgas.filter(
					(lga) =>
						response?.data?.clusterManagers.filter(
							(m) => m.localGovernment == lga && m.isAccepted
						).length == 0
				)
			);

			setUnCompletedLogiticsCompanyLgas(
				NigerianStates.filter(
					(state) => state.state == query
				)[0].lgas.filter(
					(lga) =>
						response?.data?.logisticCompanies.filter(
							(m) => m.localGovernment == lga && m.isAccepted
						).length == 0
				)
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
		getCompanies(user?.state);
	}, [user]);

	useEffect(() => {
		setViewClusterManager(clusterManagers);
		setViewLogisticsCompany(logisticCompanies);
	}, []);

	const onSelect = (name, value) => {
		setSelectedLga(value);
		if (value !== "") {
			setViewClusterManager(
				clusterManagers.filter((m) => m.localGovernment == value)
			);
			setViewLogisticsCompany(
				logisticCompanies.filter((l) => l.localGovernment == value)
			);
		} else {
			setViewClusterManager(clusterManagers);
			setViewLogisticsCompany(logisticCompanies);
		}
	};

	const onClickAcceptClusterManager = async (company) => {
		const response = await stateCoordinatorSevice.acceptClusterManager(
			company._id
		);
		console.log(response);
		//show custom modal
		setShowCustomModal(true);
		setCustomModalDetails({
			success: response.success,
			message: response.message,
		});
		getCompanies(user?.state);
	};

	const onClickAcceptLogisticsCompanies = async (company) => {
		const response = await stateCoordinatorSevice.acceptLogisticCompany(
			company._id
		);
		//show custom modal
		setShowCustomModal(true);
		setCustomModalDetails({
			success: response.success,
			message: response.message,
		});
		getCompanies(user?.state);
	};

	return (
		<>
			<section className="  py-20 bg-blue-100 min-h-screen p-4">
				<div className=" mx-auto  max-w-7xl bg-white shadow px-8 pb-8  pt-10 relative rounded-xl ">
					<div
						onClick={() => navigate("/state-coordinator/home")}
						className=" absolute left-8 top-8 text-gray-500 cursor-pointer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-8 w-8 transform rotate-180"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							/>
						</svg>
					</div>
					<img
						src={require("../../assets/logo.svg").default}
						alt=""
						className=" absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10"
					/>
					<div className="">
						<h2 className=" text-center font-medium text-4xl text-gray-800">
							{user.state} : Registered Companies
						</h2>

						<div className=" flex flex-col md:flex-row space-y-2 justify-between items-center mt-8">
							<div className=" w-full md:w-80 space-y-2">
								<span className="">Select Lga</span>
								<CustomDropDown
									name="localGovernment"
									data={NigerianStates.filter(
										(s) => s.state === user.state
									)[0]
										.lgas.sort((a, b) => {
											let nameA;
											let nameB;
											nameA = a.toUpperCase(); // ignore upper and lowercase
											nameB = b.toUpperCase(); // ignore upper and lowercase
											if (nameA < nameB) {
												return -1;
											}
											if (nameA > nameB) {
												return 1;
											}
											// names must be equal
											return 0;
										})
										.map((lga) => ({
											name: lga,
											value: lga,
										}))}
									value={selectedLga}
									onSelect={onSelect}
									placeholder="Select Local Government"
								/>
							</div>
							<ConfirmationAlert
								completed={
									unCompletedClusterManagersLgas.length ===
										0 &&
									unCompletedLogiticsCompanyLgas.length === 0
								}
								onClick={() => {
									setShowConfirmationErrorModal(true);
								}}
							/>
						</div>
					</div>
				</div>

				{/* cluster manager */}
				<div className=" mx-auto  max-w-7xl bg-white shadow p-8 mt-10 relative rounded-xl ">
					<div className="">
						<h2 className=" font-medium text-2xl text-gray-800">
							Relationship Managers
						</h2>
						<div className="mt-10 pb-1 overflow-x-auto">
							<table
								style={{ minWidth: "1024px" }}
								className="  min-w-full text rounded  shadow-md"
							>
								<thead className="border-b-1 border-blue-600 bg-blue-400 text-left ">
									<tr className="">
										<th
											scope="col"
											className="text-sm font-medium text-white px-6 py-2 capitalize w-2/12"
										>
											full Name
										</th>
										<th
											scope="col"
											className="text-sm font-medium text-white px-6 py-2 capitalize w-2/12"
										>
											email
										</th>
										<th
											scope="col"
											className="text-sm font-medium text-white px-6 py-2  capitalize w-1/12"
										>
											number
										</th>
										<th
											scope="col"
											className="text-sm font-medium text-white px-6 py-2  capitalize w-1/12"
										>
											lga
										</th>
										<th
											scope="col"
											className="text-sm font-medium text-white px-6 py-2  capitalize w-3/12"
										>
											address
										</th>
										<th
											scope="col"
											className="text-sm font-medium text-white px-6 py-2  capitalize w-1/12"
										></th>
									</tr>
								</thead>
								<tbody className=" text-gray-700 text-sm">
									{viewClusterManager
										.filter(
											(manager) =>
												manager.isAccepted === false
										)
										.map((m, index) => (
											<tr
												key={index}
												className=" align-middle "
											>
												<td className="px-6 py-3">
													{m.fullName}
												</td>
												<td className="px-6 py-3">
													{m.email}
												</td>
												<td className="px-6 py-3">
													{m.phoneNum}
												</td>
												<td className="px-6 py-3">
													{m.localGovernment}
												</td>
												<td className="px-6 py-3">
													{m.address}
												</td>
												<td className="px-6 py-3 text-center">
													<button
														onClick={() => {
															onClickAcceptClusterManager(
																m
															);
														}}
														className=" px-3 py-1 text-sm rounded bg-green-600 shadow-sm text-white"
													>
														Accept
													</button>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* logisticCompanies */}
				<div className=" mx-auto  max-w-7xl bg-white shadow p-8 mt-10 relative rounded-xl ">
					<div className="">
						<h2 className=" font-medium text-2xl text-gray-800">
							Logistics Companies
						</h2>

						<div className="mt-10 pb-1 overflow-x-auto">
							<table
								style={{ minWidth: "1024px" }}
								className=" min-w-full text rounded  shadow-md"
							>
								<thead className="border-b-1 border-blue-600 bg-blue-400 text-left ">
									<tr className="">
										<th
											scope="col"
											className="text-sm font-medium text-white px-6 py-2 capitalize w-2/12"
										>
											full Name
										</th>
										<th
											scope="col"
											className="text-sm font-medium text-white px-6 py-2 capitalize w-2/12"
										>
											email
										</th>
										<th
											scope="col"
											className="text-sm font-medium text-white px-6 py-2  capitalize w-1/12"
										>
											number
										</th>
										<th
											scope="col"
											className="text-sm font-medium text-white px-6 py-2  capitalize w-1/12"
										>
											lga
										</th>
										<th
											scope="col"
											className="text-sm font-medium text-white px-6 py-2  capitalize w-3/12"
										>
											address
										</th>
										<th
											scope="col"
											className="text-sm font-medium text-white px-6 py-2  capitalize w-1/12"
										></th>
									</tr>
								</thead>
								<tbody className=" text-gray-700 text-sm">
									{viewLogisticsCompany
										.filter(
											(company) =>
												company.isAccepted === false
										)
										.map((l, index) => (
											<tr
												key={index}
												className=" align-middle "
											>
												<td className="px-6 py-3">
													{l.fullName}
												</td>
												<td className="px-6 py-3">
													{l.email}
												</td>
												<td className="px-6 py-3">
													{l.phoneNum}
												</td>
												<td className="px-6 py-3">
													{l.localGovernment}
												</td>
												<td className="px-6 py-3">
													{l.address}
												</td>
												<td className="px-6 py-3 text-center">
													<button
														onClick={() => {
															onClickAcceptLogisticsCompanies(
																l
															);
														}}
														className=" px-3 py-1 text-sm rounded bg-green-600 shadow-sm text-white"
													>
														Accept
													</button>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>

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

			{showConfirmationErrorModal && (
				<ConfirmationErrorModal
					unCompletedClusterManagersLgas={
						unCompletedClusterManagersLgas
					}
					unCompletedLogiticsCompanyLgas={
						unCompletedLogiticsCompanyLgas
					}
					onClose={() => {
						setShowConfirmationErrorModal(false);
					}}
				/>
			)}
		</>
	);
};

export default RegisteredCompanies;
