import React, { createRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import CustomDropDown from "../../../assets/components/CustomDropDown";
import CustomInput from "../../../assets/components/CustomInput";
import NigerianStates from "../../../utils/nigeria-state-and-lgas.json";
import CategoryTypes from "../../../utils/categories.json";
import { authService } from "../../../services/auth.service";
import CustomModal from "../../../assets/components/CustomModal";

const RegistrationForm = (props) => {
	const navigate = useNavigate()
	const inputRef = createRef();

	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phoneNum: "",
		category: "",
		state: "",
		localGovernment: "",
		address: "",
	});

	const [errMsg, setErrMsg] = useState(null);

	//modal
	const [showCustomModal, setShowCustomModal] = useState(false);
	const [customModalDetails, setCustomModalDetails] = useState({
		success: false,
		message: "",
	});

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const onSelect = (name, value) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const onClickSubmit = async (e) => {
		e.preventDefault();
		const payload = {
			...formData,
		};
		const response = await authService.register(payload);

		if (response.success) {
			setShowCustomModal(true);
			setCustomModalDetails({
				success: response.success,
				message: response.message,
			});
		} else {
			setErrMsg(response.message);
		}
		//console.log(response);
	};
	return (
		<>
			<section className="  py-20 bg-blue-100 ">
				<div className=" mx-auto  max-w-7xl bg-white shadow px-8 pb-8 pt-10 relative rounded-xl ">
					<img
						src={require("../../../assets/logo.svg").default}
						alt=""
						className=" absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10"
					/>
					<div className="">
						<h2 className=" text-center font-medium text-2xl text-gray-800">
							Relationship Manager/ Logistics Company Registration Form
						</h2>

						<form
							action=""
							onSubmit={onClickSubmit}
							className=" mt-6 space-y-4 max-w-md mx-auto"
						>
							{errMsg && (
								<div className="h-12 px-4 py-2 text-white text-xs bg-red-400 flex justify-between items-center">
									{errMsg}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 cursor-pointer"
										viewBox="0 0 20 20"
										fill="currentColor"
										onClick={() => {
											setErrMsg(null);
										}}
									>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
							)}
							<CustomInput
								ref={inputRef}
								value={formData.fullName}
								name="fullName"
								type="text"
								placeholder="Enter full name"
								label="Full name"
								onChange={onChange}
							/>

							<CustomInput
								ref={inputRef}
								value={formData.email}
								name="email"
								type="text"
								placeholder="Enter email"
								label="Email"
								onChange={onChange}
							/>

							<CustomInput
								ref={inputRef}
								value={formData.phoneNum}
								name="phoneNum"
								type="text"
								placeholder="Enter phone Number"
								label="Phone Number"
								onChange={onChange}
							/>

							<CustomDropDown
								name="category"
								data={CategoryTypes}
								onSelect={onSelect}
								placeholder="Select Category"
								value= {formData.category}
							/>

							<CustomDropDown
								name="state"
								data={NigerianStates.sort((a, b) => {
									let nameA;
									let nameB;
										nameA = a.state.toUpperCase() // ignore upper and lowercase
										nameB = b.state.toUpperCase()// ignore upper and lowercase
									if (nameA < nameB) {
										return -1;
									}
									if (nameA > nameB) {
										return 1;
									}
									// names must be equal
									return 0;
								}).map((state) => ({
									name: state?.state,
									value: state?.state,
								}))}
								value = {formData.state}
								onSelect={onSelect}
								placeholder="Select State"
							/>

							<CustomDropDown
								name="localGovernment"
								data={
									formData.state
										? NigerianStates.filter(
												(state) =>
													state?.state ===
													formData.state
										  )[0].lgas.sort((a, b) => {
											let nameA;
											let nameB;
												nameA = a.toUpperCase() // ignore upper and lowercase
												nameB = b.toUpperCase() // ignore upper and lowercase
											if (nameA < nameB) {
												return -1;
											}
											if (nameA > nameB) {
												return 1;
											}
											// names must be equal
											return 0;
										  }).map((lga) => ({
												name: lga,
												value: lga,
										  }))
										: []
								}
								value = {formData.localGovernment}
								onSelect={onSelect}
								placeholder="Select Local Government"
							/>

							<CustomInput
								ref={inputRef}
								value={formData.address}
								name="address"
								type="text"
								placeholder="Enter address"
								label="Address"
								onChange={onChange}
							/>
							<div className=" text-right">
								<button
									className=" h-10 w-full  rounded bg-blue-600 text-white font-medium text-sm"
									type="submit"
								>
									Register
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>

			{/* Modals */}
			{showCustomModal && (
				<CustomModal
					onClose={() => {
						navigate("/")
					}}
					success={customModalDetails.success}
					message={customModalDetails.message}
				/>
			)}
		</>
	);
};

export default RegistrationForm;
