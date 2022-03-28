import React, { createRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import CustomInput from "../../../assets/components/CustomInput";
import { authService } from "../../../services/auth.service";
import { loginSuccess } from "../../../store/user";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const inputRef = createRef();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [errMsg, setErrMsg] = useState(null);

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const onClickSubmit = async (e) => {
		e.preventDefault();
		const response = await authService.login(formData);
		if (response.success) {
			dispatch(loginSuccess(response?.user));
			navigate("/state-coordinator/home");
		} else {
			console.log(response.message);
			setErrMsg(response?.message);
		}
	};
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
						Login
					</h2>

					<form
						action=""
						onSubmit={onClickSubmit}
						className=" mt-6 space-y-4"
					>
						{errMsg && (
							<div className="h-12 px-4 py-2 text-white text-xs bg-red-400 flex justify-between items-center">
								{errMsg}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
									onClick={()=> {setErrMsg(null)}}
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
							value={formData.email}
							name="email"
							placeholder="Enter email"
							onChange={onChange}
							label="Email"
							type="email"
						/>
						<CustomInput
							ref={inputRef}
							value={formData.password}
							name="password"
							placeholder="Enter password"
							onChange={onChange}
							label="Password"
							type="password"
						/>
						<div className=" text-right">
							<button
								className=" h-10 w-36 rounded bg-blue-600 text-white font-medium text-sm"
								type="submit"
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;
