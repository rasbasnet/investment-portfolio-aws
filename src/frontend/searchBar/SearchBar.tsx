import {
	Autocomplete,
	Button,
	Grid,
	Stack,
	TextField,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import "./SearchBarStyles.css";
import { ModalClose, ModalDialog, Modal } from "@mui/joy";
import {
	AssetAllocation,
	CustomerData,
} from "../../JsonInterfaces/CustomerDataInterface";
import LogoutIcon from "@mui/icons-material/Logout";

export interface SearchBarProps {
	customerData: CustomerData[];
}
const SearchBar: React.FC<SearchBarProps> = ({ customerData }) => {
	const [showModal, setShowModal] = useState(true);
	const [currentCustomer, setCurrentCustomer] = useState<CustomerData | null>(
		null
	);

	const customerListNames = customerData.map((data) => data.customerName);
	const matches = useMediaQuery("(min-width:700px)");
	const preventSubmit = (event: any) => {
		event.preventDefault();
		setShowModal(true);
	};
	const openModal = (e: React.ChangeEvent<EventTarget>) => {
		const inputElement = e.target as HTMLLIElement;
		const innerText = inputElement.innerText;
		innerText &&
			setCurrentCustomer(
				customerData.filter(
					(data) => data.customerName === innerText
				)[0]
			);
		setShowModal(!!innerText);
	};
	const closeModal = (event: any, reason: any) => {
		setCurrentCustomer(null);
		setShowModal(false);
	};
	const logout = () => {
		window.sessionStorage.removeItem("loggedIn");
		window.location.assign("/investment-portfolios");
		window.location.reload();
	};
	return (
		<>
			<Grid
				container
				item
				justifyContent="center"
				direction="row"
				alignContent="center"
				sx={{ padding: "5px" }}
				spacing={1}
			>
				{currentCustomer && (
					<Modal
						open={showModal}
						onClose={closeModal}
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<ModalDialog layout="fullscreen">
							<ModalClose color="danger" />
							<Typography variant="h1">
								{currentCustomer.customerName}
							</Typography>
							{currentCustomer.portfolio.map(
								(portfolio: AssetAllocation) => (
									<>
										<Typography variant="h5">{`Asset: ${portfolio.assetName}`}</Typography>
										<Typography variant="body1">{`Allocation: ${portfolio.allocation}`}</Typography>
										<Typography variant="body1">{`Risk Score: ${portfolio.riskScore}`}</Typography>
										<br />
									</>
								)
							)}
						</ModalDialog>
					</Modal>
				)}

				<Grid
					item
					container
					justifyContent="center"
					className="searchBar-field"
					xs={10}
					md={10}
				>
					<Stack spacing={3} sx={{ width: "100%", padding: "5px" }}>
						<form onSubmit={preventSubmit}>
							<Autocomplete
								id="searchBar-bar"
								options={customerListNames}
								clearOnBlur
								clearOnEscape
								fullWidth
								onChange={openModal}
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
					md={2}
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
		</>
	);
};

export default SearchBar;
