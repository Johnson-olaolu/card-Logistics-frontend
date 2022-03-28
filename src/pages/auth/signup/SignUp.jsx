import React, { createRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import CustomInput from "../../../assets/components/CustomInput";

const SignUp = () => {
	let navigate = useNavigate();
	const inputRef = createRef();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault()
		if (formData.password !== formData.confirmPassword) {
			return
		}
		navigate("/registration-form" , {
			state : formData
		})
	}
	return (
		<section className=" h-screen w-screen flex justify-center items-center bg-blue-100 ">
			<div className=" w-96 bg-white shadow px-8 pb-8 pt-10 relative rounded-xl ">
				<img
					src={require("../../../assets/logo.svg").default}
					alt=""
					className=" absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10"
				/>
				<div className="">
					<h2 className=" font-medium text-2xl text-gray-800">
						Sign Up
					</h2>

					<form onSubmit={ onSubmit} className=" mt-6 space-y-4">
						<CustomInput
							ref={inputRef}
							value = {formData.email}
							name="email"
							type="text"
							placeholder="Enter email"
							label="Email"
							onChange={onChange}
						/>
						
						<CustomInput
							ref={inputRef}
							value = {formData.password}
							name="password"
							type="password"
							placeholder="Enter password"
							label="Password"
							onChange={onChange}
						/>

						<CustomInput
							ref={inputRef}
							value = {formData.confirmPassword}
							name="confirmPassword"
							type="password"
							placeholder="Enter password"
							label="Confirm Password"
							onChange={onChange}
						/>
						<div className=" text-right">
							<button
								className=" h-10 w-36 rounded bg-blue-600 text-white font-medium text-sm"
								type="submit"
							>
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default SignUp;
