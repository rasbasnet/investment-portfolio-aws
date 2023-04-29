import {
	Autocomplete,
	Button,
	Grid,
	Stack,
	TextField,
	useMediaQuery,
} from "@mui/material";
import "./SearchBarStyles.css";
import { CustomerData } from "../../JsonInterfaces/CustomerDataInterface";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";

export interface SearchBarProps {
	customerData: CustomerData[];
}
const SearchBar: React.FC<SearchBarProps> = ({ customerData }) => {
	const customerListNames = customerData.map((data) => data.customerName);
	const matches = useMediaQuery("(min-width:700px)");
	const preventSubmit = (event: any) => {
		event.preventDefault();
	};
	const handleSelect = (e: React.ChangeEvent<EventTarget>) => {
		const inputElement = e.target as HTMLLIElement;
		const innerText = inputElement.innerText;
		window.location.assign(
			`/investment-portfolios/customers/?customer=${innerText}`
		);
	};
	const logout = () => {
		window.sessionStorage.removeItem("loggedIn");
		window.location.assign("/investment-portfolios/login");
		window.location.reload();
	};

	return (
		<Grid
			container
			item
			xs={12}
			md={10}
			justifyContent="center"
			direction="row"
			alignContent="center"
			sx={{ padding: "5px" }}
			spacing={1}
		>
			<Grid item xs={12} md={8} container direction="row" spacing={1}>
				<Grid
					item
					container
					justifyContent="center"
					className="searchBar-field"
					xs={12}
					sm={10}
				>
					<Stack sx={{ width: "100%", padding: "5px" }}>
						<form onSubmit={preventSubmit}>
							<Autocomplete
								id="searchBar-bar"
								options={customerListNames}
								clearOnBlur
								clearOnEscape
								fullWidth
								onChange={handleSelect}
								renderInput={(params) => (
									<TextField
										{...params}
										label="View A Customers Profile"
										color="secondary"
										variant="outlined"
										placeholder="Search..."
									></TextField>
								)}
							/>
						</form>
					</Stack>
				</Grid>
				<Grid
					item
					container
					justifyContent="center"
					alignItems="center"
					xs={12}
					sm={2}
				>
					<Button
						variant="outlined"
						color="error"
						size="large"
						endIcon={<LogoutIcon />}
						onClick={logout}
					>
						{matches && "LOGOUT"}
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default SearchBar;
