import axiosService from "./axios.service";

const companyLogin = async (payload) => {
	return axiosService
		.post("/company/login", payload)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			return error.response.data.message;
		});
};

export const companyService = {
    companyLogin
}
