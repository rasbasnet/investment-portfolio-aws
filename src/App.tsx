import React, { useContext } from "react";
import "./App.css";
import BasePage from "./frontend/basePage/BasePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./frontend/loginPage/LoginPage";
import { AuthContext } from "./frontend/AuthenticatorProvider";
import CustomerPage from "./frontend/customerPage/CustomerPage";
import ErrorBoundary from "./frontend/ErrorBoundary/ErrorBoundary";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#6a50a1", // A purple color (60%)
		},
		secondary: {
			main: "#927fbf", // A lighter purple color (30%)
		},
		background: {
			default: "#f1eeff", // A very light purple color (10%)
			paper: "#f1eeff",
		},
		text: {
			primary: "#000", // A dark text color for better contrast
		},
	},
	typography: {
		fontFamily: "Open Sans",
	},
});

const PrivateRoute = ({ component: Component, authenticated }: any) =>
	authenticated === true ? (
		Component
	) : (
		<Navigate to="/investment-portfolios/login" replace={true} />
	);

const PublicRoute = ({ component: Component, authenticated }: any) =>
	authenticated === false ? (
		Component
	) : (
		<Navigate to="/investment-portfolios/homepage" replace={true} />
	);
const App = () => {
	const { authenticated } = useContext(AuthContext);

	if (authenticated !== true && authenticated !== false) {
		return <div>Error Please Refresh</div>;
	}

	return (
		<BrowserRouter>
			<ErrorBoundary>
				<ThemeProvider theme={theme}>
					<Routes>
						<Route
							path="/investment-portfolios/customers/*"
							element={
								<PrivateRoute
									authenticated={authenticated}
									path="/investment-portfolios/customers/"
									component={<CustomerPage />}
								/>
							}
						></Route>
						<Route
							path="/investment-portfolios/homepage/*"
							element={
								<PrivateRoute
									authenticated={authenticated}
									path="/investment-portfolios/homepage"
									component={<BasePage />}
								/>
							}
						></Route>
						<Route
							path="/investment-portfolios/login/*"
							element={
								<PublicRoute
									authenticated={authenticated}
									path="/investment-portfolios/login"
									component={<LoginPage />}
								/>
							}
						></Route>
					</Routes>
				</ThemeProvider>
			</ErrorBoundary>
		</BrowserRouter>
	);
};

export default App;
