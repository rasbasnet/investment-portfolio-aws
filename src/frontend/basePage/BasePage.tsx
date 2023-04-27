import { Grid, Typography, Paper, Box, Avatar } from "@mui/material";
import SearchBar from "../searchBar/SearchBar";
import { useEffect, useState } from "react";
import { addCustomerData, fetchCustomerData } from "../utils/fetchUtil";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CustomerData } from "../../JsonInterfaces/CustomerDataInterface";
import { Button } from "@mui/joy";
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
		<div>
			<Element
				name="section1"
				style={{
					minHeight: "110vh",
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
						backgroundColor: "#f7f7f7",
						minHeight: "100vh",
					}}
				>
					<SearchBar customerData={customerData} />
					<Grid
						item
						container
						justifyContent="center"
						alignItems="center"
					>
						<Grid item xs={12} md={10}>
							<Paper
								elevation={8}
								sx={{
									padding: "2rem",
									maxHeight: "60vh",
									overflowY: "scroll",
								}}
							>
								<Grid container>
									<Grid
										item
										xs={12}
										md={7}
										sx={{
											maxHeight: "50vh",
										}}
									>
										<Grid
											item
											container
											justifyContent="center"
											alignItems="center"
											xs={12}
											className="screenhome"
										>
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
																fontFamily="OpenSans"
																variant="h3"
																className="customerName-animation link"
															>
																{
																	currentCustomer.customerName
																}
															</Typography>
															<Button
																color="danger"
																size="lg"
																className="viewPortfolioBtn"
																onClick={() =>
																	window.location.assign(
																		`/investment-portfolios/customers/?customer=${currentCustomer.customerName}`
																	)
																}
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
									<Grid
										item
										xs={12}
										md={5}
										sx={{
											padding: "2rem",
										}}
									>
										<Box
											sx={{
												overflowY: "scroll",
												borderRight: "1px solid #ccc",
												paddingLeft: "1rem",
												maxHeight: "50vh",
											}}
										>
											<Typography
												fontFamily="OpenSans"
												variant="h6"
											>
												Customers:
											</Typography>
											<Button
												color="danger"
												onClick={handleAddCustomerModal}
											>
												+ Add a customer
											</Button>
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
														color="neutral"
														onClick={() =>
															setCurrentCustomer(
																customer
															)
														}
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
															<Typography
																fontFamily="OpenSans"
																variant="body1"
															>
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
							</Paper>
						</Grid>
					</Grid>
					<Grid item>
						<Link
							to="section2"
							spy={true}
							smooth={true}
							offset={0}
							duration={1000}
						>
							<KeyboardDoubleArrowDown />
						</Link>
					</Grid>
				</Grid>
			</Element>
			<Element
				name="section2"
				style={{
					backgroundColor: "#f7f7f7",
					minHeight: "100vh",
				}}
			>
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
							fontFamily="OpenSans"
							variant="h3"
							color="primary"
							sx={{ color: "#ffffff" }}
						>
							Investment Dashboard
						</Typography>
					</Grid>
					<Grid item>
						<Typography
							fontFamily="OpenSans"
							variant="h5"
							sx={{ color: "#ffffff" }}
						>
							Manage Customers Portfolios and Monitor Risk
							Profiles
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
							<Typography
								fontFamily="Open Sans, sans-serif"
								variant="h4"
							>
								Easy Access
							</Typography>
							<Typography
								fontFamily="Open Sans, sans-serif"
								variant="body1"
							>
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
							<Typography
								fontFamily="Open Sans, sans-serif"
								variant="h4"
							>
								Risk Management
							</Typography>
							<Typography
								fontFamily="Open Sans, sans-serif"
								variant="body1"
							>
								Monitor risk profiles of each customer and
								manage their investments accordingly.
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
							<Typography
								fontFamily="Open Sans, sans-serif"
								variant="h4"
							>
								Visual Analytics
							</Typography>
							<Typography
								fontFamily="Open Sans, sans-serif"
								variant="body1"
							>
								Gain insights through up-to-date analytics and
								make informed investment decisions.
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
							fontFamily="OpenSans"
							variant="h3"
							color="primary"
							sx={{ color: "#ffffff" }}
						>
							Take Control of Investments
						</Typography>
					</Grid>
					<Grid item>
						<Typography
							fontFamily="OpenSans"
							variant="h5"
							sx={{ color: "#ffffff" }}
						>
							We stay ahead with our cutting-edge investment
							platform
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
							<Typography
								fontFamily="Open Sans, sans-serif"
								variant="h4"
							>
								Innovative Strategies
							</Typography>
							<Typography
								fontFamily="Open Sans, sans-serif"
								variant="body1"
							>
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
							<Typography
								fontFamily="Open Sans, sans-serif"
								variant="h4"
							>
								Client-Centric Approach
							</Typography>
							<Typography
								fontFamily="Open Sans, sans-serif"
								variant="body1"
							>
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
							<Typography
								fontFamily="Open Sans, sans-serif"
								variant="h4"
							>
								Secure & Trusted
							</Typography>
							<Typography
								fontFamily="Open Sans, sans-serif"
								variant="body1"
							>
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
						<Typography
							fontFamily="OpenSans"
							variant="h5"
							color="primary"
						>
							About Asset & Wealth Services
						</Typography>
					</Grid>
					<Grid item sx={{ width: "70%" }}>
						<Typography
							fontFamily="OpenSans"
							variant="body1"
							sx={{ color: "black" }}
						>
							Located in Hawthorn, Victoria, Asset & Wealth
							Services is a leading investment management firm
							with a strong focus on providing tailored solutions
							to our clients. With years of experience in the
							industry, our team of experts works closely with
							clients to understand their needs and goals,
							offering personalized investment strategies and risk
							management.
						</Typography>
					</Grid>
					<br></br>
					<br></br>
				</Grid>
			</Element>
			<AddCustomerModal
				open={showAddCustomerModal}
				handleClose={() => setShowAddCustomerModal(false)}
				addCustomer={handleSubmitCustomer}
			/>
		</div>
	) : (
		<div>Error fetching data. Please refresh</div>
	);
};

export default BasePage;
