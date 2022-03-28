import axiosService from "./axios.service";

const login = async (payload) => {
	return axiosService
		.post(`/auth/manager-login`, payload)
		.then((res) => {
			const { token } = res.data
            localStorage.setItem("token", token)
			return res.data;
		})
		.catch((error) => {
			return(error.response.data.message)
		});
};

const register = async (payload) => {
	return axiosService
		.post(`/auth/company-register`, payload)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			return(error.response.data.message)
		});
};

export const authService = {
	login,
	register,
};
