import { Grid, Typography, Paper } from "@mui/material";
import SearchBar from "../searchBar/SearchBar";
import { useEffect, useState } from "react";
import {
	CallMade,
	Security,
	ShowChart,
	Assessment,
	People,
} from "@mui/icons-material";
import { fetchCustomerData } from "../utils/fetchUtil";

const BasePage: React.FC<{}> = () => {
	const [customerData, setCustomerData] = useState(null);

	useEffect(() => {
		async function getCustomerData() {
			const data = await fetchCustomerData();
			setCustomerData(data);
		}
		getCustomerData();
	}, []);

	return customerData ? (
		<Grid
			container
			spacing={4}
			direction="column"
			alignItems="center"
			justifyContent="center"
			className="basePage-container"
			sx={{ backgroundColor: "#f7f7f7" }}
		>
			<Grid item container justifyContent="center" alignItems="center">
				<SearchBar customerData={customerData} />
			</Grid>
			<br></br>
			<br></br>
			<Grid
				item
				container
				direction="column"
				alignItems="center"
				spacing={3}
				className="info-section"
				sx={{
					textAlign: "center",
					padding: "2rem",
					backgroundColor: "#00b7ff",
				}}
			>
				<Grid item>
					<Typography
						variant="h3"
						color="primary"
						sx={{ color: "#ffffff" }}
					>
						Investment Dashboard
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h5" sx={{ color: "#ffffff" }}>
						Manage Customers Portfolios and Monitor Risk Profiles
					</Typography>
				</Grid>
			</Grid>

			<Grid item container justifyContent="center">
				<Grid
					item
					md={4}
					sm={6}
					xs={12}
					sx={{ padding: "2rem", textAlign: "center" }}
				>
					<Paper elevation={4} sx={{ padding: "2rem" }}>
						<CallMade fontSize="large" color="primary" />
						<Typography variant="h4">Easy Access</Typography>
						<Typography variant="body1">
							Quickly access customer profiles and their
							respective investment portfolios.
						</Typography>
					</Paper>
				</Grid>
				<Grid
					item
					md={4}
					sm={6}
					xs={12}
					sx={{ padding: "2rem", textAlign: "center" }}
				>
					<Paper elevation={4} sx={{ padding: "2rem" }}>
						<Security fontSize="large" color="primary" />
						<Typography variant="h4">Risk Management</Typography>
						<Typography variant="body1">
							Monitor risk profiles of each customer and manage
							their investments accordingly.
						</Typography>
					</Paper>
				</Grid>
				<Grid
					item
					md={4}
					sm={6}
					xs={12}
					sx={{ padding: "2rem", textAlign: "center" }}
				>
					<Paper elevation={4} sx={{ padding: "2rem" }}>
						<ShowChart fontSize="large" color="primary" />
						<Typography variant="h4">Visual Analytics</Typography>
						<Typography variant="body1">
							Gain insights through up-to-date analytics and make
							informed investment decisions.
						</Typography>
					</Paper>
				</Grid>
			</Grid>
			<br></br>
			<br></br>
			<Grid
				item
				container
				direction="column"
				alignItems="center"
				spacing={3}
				className="info-section"
				sx={{
					textAlign: "center",
					padding: "2rem",
					backgroundColor: "#00b7ff",
				}}
			>
				<Grid item>
					<Typography
						variant="h3"
						color="primary"
						sx={{ color: "#ffffff" }}
					>
						Take Control of Investments
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h5" sx={{ color: "#ffffff" }}>
						We stay ahead with our cutting-edge investment platform
					</Typography>
				</Grid>
			</Grid>

			<Grid item container justifyContent="center">
				<Grid
					item
					md={4}
					sm={6}
					xs={12}
					sx={{ padding: "2rem", textAlign: "center" }}
				>
					<Paper elevation={4} sx={{ padding: "2rem" }}>
						<Assessment fontSize="large" color="primary" />
						<Typography variant="h4">
							Innovative Strategies
						</Typography>
						<Typography variant="body1">
							We employ cutting-edge investment strategies to
							maximize returns while managing risk.
						</Typography>
					</Paper>
				</Grid>
				<Grid
					item
					md={4}
					sm={6}
					xs={12}
					sx={{ padding: "2rem", textAlign: "center" }}
				>
					<Paper elevation={4} sx={{ padding: "2rem" }}>
						<People fontSize="large" color="primary" />
						<Typography variant="h4">
							Client-Centric Approach
						</Typography>
						<Typography variant="body1">
							Our clients always come first. We focus on
							understanding your unique goals and objectives.
						</Typography>
					</Paper>
				</Grid>
				<Grid
					item
					md={4}
					sm={6}
					xs={12}
					sx={{ padding: "2rem", textAlign: "center" }}
				>
					<Paper elevation={4} sx={{ padding: "2rem" }}>
						<Security fontSize="large" color="primary" />
						<Typography variant="h4">Secure & Trusted</Typography>
						<Typography variant="body1">
							We prioritize the security of our clients'
							information and assets, earning their trust.
						</Typography>
					</Paper>
				</Grid>
			</Grid>
			<Grid
				item
				container
				direction="column"
				alignItems="center"
				spacing={3}
				sx={{
					textAlign: "center",
				}}
			>
				<Grid item>
					<Typography variant="h5" color="primary">
						About Asset & Wealth Services
					</Typography>
				</Grid>
				<Grid item sx={{ width: "70%" }}>
					<Typography variant="body1" sx={{ color: "black" }}>
						Located in Hawthorn, Victoria, Asset & Wealth Services
						is a leading investment management firm with a strong
						focus on providing tailored solutions to our clients.
						With years of experience in the industry, our team of
						experts works closely with clients to understand their
						needs and goals, offering personalized investment
						strategies and risk management.
					</Typography>
				</Grid>
			</Grid>
			<br></br>
			<br></br>
		</Grid>
	) : (
		<div></div>
	);
};

export default BasePage;
