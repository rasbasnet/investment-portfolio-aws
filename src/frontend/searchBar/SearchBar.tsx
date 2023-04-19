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
		window.location.assign("/investment-portfolios");
		window.location.reload();
	};

	const calculateRiskInvestmentProfile = (
		currentCustomer: CustomerData | null
	) => {
		// The risk investment profile is a measure of the overall risk exposure of a customer's investment portfolio.
		// We need to return the overall risk investment profile for the customer
		var totalWeightedRiskScore = 0
		var totalWeightedAllocation = 0

		currentCustomer?.portfolio.forEach(asset => {
			totalWeightedAllocation += asset.allocation * asset.riskScore
			totalWeightedAllocation += asset.allocation
		})

		return totalWeightedRiskScore / totalWeightedAllocation;

		// totalWeightedRiskScore = 0
		// totalWeightedAllocation = 0

		// loop through currentCustomers.portfolios
		// calculate weightedRiskScore and allocation of each one
		// weightedRiskScore = allocation * riskScore
		// weightedAllocation = allocation
		// all it accordingly to the above total variables

		// riskProfile = totalWeightedRiskScore / totalWeightedAllocation
		// return riskProfile
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
					xs={10}
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
					xs={2}
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
