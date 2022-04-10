import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import RegistrationForm from "./pages/auth/signup/RegistrationForm";
import SignUp from "./pages/auth/signup/SignUp";
import AcceptedCompanies from "./pages/state-coordinator/AcceptedCompanies";
import RegisteredCompanies from "./pages/state-coordinator/RegisteredCompanies";

import store from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import Homepage from "./pages/state-coordinator/Homepage";
import Dashboard from "./pages/Dashboard";
import CompanyLogin from "./pages/company/companyLogin";
import ViewStatus from "./pages/company/viewStatus";

let persistor = persistStore(store);

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<div className="">
					<BrowserRouter>
						<Routes>
							<Route  path = "/" element = {<Dashboard/>}/>
							<Route path="/register" element={<SignUp />} />
							<Route path="/login" element={<Login />} />
							<Route
								path="/registration-form"
								element={<RegistrationForm />}
							/>
							<Route path = "/company" >
								<Route path = "login" element = {<CompanyLogin/>} />
								<Route path = "view-status" element = {<ViewStatus/>}/>
							</Route>
							<Route path="/state-coordinator">
								<Route
									path="home"
									element={<Homepage />}
								/>
								<Route
									path="registered-companies"
									element={<RegisteredCompanies />}
								/>
								<Route
									path="accepted-companies"
									element={<AcceptedCompanies />}
								/>
							</Route>
						</Routes>
					</BrowserRouter>
				</div>
			</PersistGate>
		</Provider>
	);
}

export default App;
