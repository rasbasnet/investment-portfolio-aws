import { Grid, Typography, Paper, Box, Avatar, Button, Card, Divider } from "@mui/material";
import SearchBar from "../searchBar/SearchBar";
import { useEffect, useState } from "react";
import { addCustomerData, fetchCustomerData } from "../utils/fetchUtil";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CustomerData } from "../../JsonInterfaces/CustomerDataInterface";
import "./BasePageStyles.css";
import { Element, Link } from "react-scroll";
import {
	Assessment,
	CallMade,
	People,
	Security,
	ShowChart,
	KeyboardDoubleArrowDown,
} from "@mui/icons-material";
import AddCustomerModal from "../addCustomerModal/AddCustomerModal";
import React from "react";
//import { Divider } from "@mui/joy";
const BasePage: React.FC<{}> = () => {
	const [customerData, setCustomerData] = useState<CustomerData[] | null>(
		null
	);
	const [currentCustomer, setCurrentCustomer] = useState<CustomerData | null>(
		null
	);

	const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);

	const handleAddCustomerModal = () => {
		setShowAddCustomerModal(!showAddCustomerModal);
	};

	const handleSubmitCustomer = async (customer: CustomerData) => {
		const addCustomer = await addCustomerData(customer);
		return addCustomer?.status === 200 || false;
	};

	useEffect(() => {
		async function getCustomerData() {
			const data = await fetchCustomerData();
			setCustomerData(data);
		}
		getCustomerData();
	}, []);
	return customerData ? (
		<Grid
			style={{
				backgroundColor: "#f0eaf7",
			}}
		>
			<Element
				name="section1"
				style={{
					minHeight: "105vh",
				}}
			>
				<Grid
					container
					spacing={4}
					direction="column"
					alignItems="center"
					justifyContent="center"
					className="basePage-container"
					sx={{
						backgroundColor: "#f0eaf7",
						minHeight: "100vh",
					}}
				>
					<SearchBar customerData={customerData} />
					<Grid item>
						<Grid container
							alignItems="center"
							justifyContent="center">
							<Grid item
								xs={12} md={10}>
								<Paper
									elevation={8}
									sx={{
										padding: "2rem",
										maxHeight: "80vh",
										//overflowY: "scroll",
									}}>
									<Grid container>
										<Grid item xs={12} md={7} maxHeight='65vh'>
											<Grid
												container
												justifyContent="center"
												alignItems="center"
												className="screenhome"
												xs={12}>
												<div className="screenhome-image"></div>
												<div className="screenhome-overlay"></div>
												<div className="screenhome-content">
													<i className="screenhome-icon fa-brands fa-codepen"></i>
													<div className="screenhome-user">
														{currentCustomer && (
															<>
																<Avatar
																	className="avatar-animation"
																	sx={{
																		width: "200px",
																		height: "200px",
																		backgroundColor:
																			"black",
																	}}
																>
																	<AccountCircleIcon
																		sx={{
																			fontSize:
																				"130px",
																		}}
																	/>
																</Avatar>
																<Typography
																	variant="h3"
																	className="customerName-animation link"
																>
																	{
																		currentCustomer.customerName
																	}
																</Typography>
																<Button
																	className="viewPortfolioBtn"
																	onClick={() =>
																		window.location.assign(
																			`/investment-portfolios/customers/?customer=${currentCustomer.customerName}`
																		)
																	}
																	color="primary"
																	variant="contained"
																>
																	View Customer
																	Portfolio
																</Button>
															</>
														)}
													</div>
												</div>
											</Grid>
										</Grid>
										<Grid item xs={12} md={5} height='65vh'>
											<Box height='100%'>
												<Grid container height='100%'>
													<Grid item xs={12}>
														<Grid container alignItems="center" paddingX="20px" xs={12}>
															<Grid item display="flex" xs={6} >
																<Typography variant="h6">
																	Customers:
																</Typography>
															</Grid>
															<Grid item display="flex" justifyContent="flex-end" xs={6}>
																<Button
																	onClick={handleAddCustomerModal}
																	color="primary"
																	variant="outlined">
																	+ Add a customer
																</Button>
															</Grid>
														</Grid>
													</Grid>
													<Grid item>
														<Box
															sx={{
																textAlign: "center",
																overflowY: "scroll",
															}}>
															{customerData.map(
																(
																	customer: CustomerData,
																	index
																) => (
																	<Button
																		className="customer-button"
																		sx={{
																			width: "90%",
																			padding: "20px",
																			margin: "10px 0",
																		}}
																		key={index}
																		color="primary"
																		onClick={() =>
																			setCurrentCustomer(
																				customer
																			)
																		}
																		variant="contained"
																	>
																		<Box
																			sx={{
																				display: "flex",
																				alignItems:
																					"center",
																			}}
																		>
																			<AccountCircleIcon
																				sx={{
																					marginRight:
																						"0.5rem",
																				}}
																			/>
																			<Typography variant="body1">
																				{
																					customer.customerName
																				}
																			</Typography>
																		</Box>
																	</Button>
																)
															)}
														</Box>
													</Grid>
												</Grid>
											</Box>
										</Grid>
									</Grid>
								</Paper>
							</Grid>
						</Grid>
					</Grid>
				</Grid >
				<Grid item>
					<Link
						to="section2"
						spy={true}
						smooth={true}
						offset={0}
						duration={350}
					>
						<KeyboardDoubleArrowDown fontSize="large" />
					</Link>
				</Grid >
			</Element >
			<Element name="section2">
				<Box minHeight="100vh">

					<Grid
						container
						direction="column"
						alignItems="center"
						//spacing={3}
						className="info-section"
						sx={{
							margin: 0,
							textAlign: "center",
							padding: "2rem",
							backgroundColor: "#7d4db8", // 30% - Darker purple
						}}
					>
						<Grid item width="100%">
							<Divider variant="middle" sx={{ "&::before, &::after": { borderColor: "#ffffff" } }}>
								<Typography
									variant="h3"
									color="primary"
									sx={{ color: "#ffffff" }}
								>
									Investment Dashboard
								</Typography>
							</Divider>
						</Grid>
						<Grid item>
							<Typography variant="h5" sx={{ color: "#ffffff" }}>
								Manage Customer Portfolios and Monitor Risk
								Profiles
							</Typography>
						</Grid>
					</Grid>

					<Grid item container alignItems="stretch" justifyContent="center">
						<Grid
							item
							md={4}
							sm={6}
							xs={12}
							sx={{ padding: "2rem", textAlign: "center" }}
						>
							<Card elevation={4} sx={{ padding: "2rem", height: "100%" }}>
								<CallMade fontSize="large" color="primary" />
								<Typography variant="h4">
									Easy Access
								</Typography>
								<Typography variant="body1">
									Quickly access customer profiles and their
									respective investment portfolios.
								</Typography>
							</Card>
						</Grid>
						<Grid
							item
							md={4}
							sm={6}
							xs={12}
							sx={{ padding: "2rem", textAlign: "center" }}
						>
							<Card elevation={4} sx={{ padding: "2rem", height: "100%" }}>
								<Security fontSize="large" color="primary" />
								<Typography variant="h4">
									Risk Management
								</Typography>
								<Typography variant="body1">
									Monitor risk profiles of each customer and
									manage their investments accordingly.
								</Typography>
							</Card>
						</Grid>
						<Grid
							item
							md={4}
							sm={6}
							xs={12}
							sx={{ padding: "2rem", textAlign: "center" }}
						>
							<Card elevation={4} sx={{ padding: "2rem", height: "100%" }}>
								<ShowChart fontSize="large" color="primary" />
								<Typography variant="h4">
									Visual Analytics
								</Typography>
								<Typography variant="body1">
									Gain insights through up-to-date analytics
									and make informed investment decisions.
								</Typography>
							</Card>
						</Grid>
					</Grid>
					<Grid
						item
						container
						direction="column"
						alignItems="center"
						className="info-section"
						sx={{
							textAlign: "center",
							padding: "2rem",
							backgroundColor: "#7d4db8",
						}}
					>
						<Grid item width="100%">
							<Divider variant="middle" sx={{ "&::before, &::after": { borderColor: "#ffffff" } }}>
								<Typography
									variant="h3"
									color="primary"
									sx={{ color: "#ffffff" }}
								>
									Take Control of Investments
								</Typography>
							</Divider>
						</Grid>
						<Grid item>
							<Typography variant="h5" sx={{ color: "#ffffff" }}>
								We stay ahead with our cutting-edge investment
								platform
							</Typography>
						</Grid>
					</Grid>

					<Grid item container alignItems="stretch" justifyContent="center">
						<Grid
							item
							md={4}
							sm={6}
							xs={12}
							sx={{ padding: "2rem", textAlign: "center" }}
						>
							<Card elevation={4} sx={{ padding: "2rem", height: "100%" }}>
								<Assessment fontSize="large" color="primary" />
								<Typography variant="h4">
									Innovative Strategies
								</Typography>
								<Typography variant="body1">
									We employ cutting-edge investment strategies
									to maximize returns while managing risk.
								</Typography>
							</Card>
						</Grid>
						<Grid
							item
							md={4}
							sm={6}
							xs={12}
							sx={{ padding: "2rem", textAlign: "center" }}
						>
							<Card elevation={4} sx={{ padding: "2rem", height: "100%" }}>
								<People fontSize="large" color="primary" />
								<Typography variant="h4">
									Client-Centric Approach
								</Typography>
								<Typography variant="body1">
									Our clients always come first. We focus on
									understanding your unique goals and
									objectives.
								</Typography>
							</Card>
						</Grid>
						<Grid
							item
							md={4}
							sm={6}
							xs={12}
							sx={{ padding: "2rem", textAlign: "center" }}
						>
							<Card elevation={4} sx={{ padding: "2rem", height: "100%" }}>
								<Security fontSize="large" color="primary" />
								<Typography variant="h4">
									Secure & Trusted
								</Typography>
								<Typography variant="body1">
									We prioritize the security of our clients'
									information and assets, earning their trust.
								</Typography>
							</Card>
						</Grid>
					</Grid>
					<Divider variant="middle">
						<Typography variant="h5" sx={{ color: "#4c2f7a" }}>
							About Asset & Wealth Services
						</Typography>
					</Divider>
					<Typography variant="body1" width="80%" margin="auto" paddingBottom={2} textAlign="center" sx={{ color: "black" }}>
						Located in Hawthorn, Victoria, Asset & Wealth
						Services is a leading investment management firm
						with a strong focus on providing tailored
						solutions to our clients. With years of
						experience in the industry, our team of experts
						works closely with clients to understand their
						needs and goals, offering personalized
						investment strategies and risk management.
					</Typography>
				</Box>
			</Element>
			<AddCustomerModal
				open={showAddCustomerModal}
				handleClose={() => setShowAddCustomerModal(false)}
				addCustomer={handleSubmitCustomer}
			/>
		</Grid >
	) : (
		<div>Error fetching data. Please refresh</div>
	);
};

export default BasePage;
