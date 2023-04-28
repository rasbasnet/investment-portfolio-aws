import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
	AssetAllocation,
	CustomerData,
} from "../../JsonInterfaces/CustomerDataInterface";
import { fetchCustomerData } from "../utils/fetchUtil";
import { Typography, Grid, CardContent, CardHeader, Card } from "@mui/material";
import Chart from "chart.js/auto";
import { Bar, Doughnut, Line, PolarArea } from "react-chartjs-2";
import SideNavigation from "./Components/SideNavigation";
import { keyframes, useTheme } from "@mui/material/styles";

Chart.register();
const CustomerPage: React.FC<{}> = () => {
	const [searchParams] = useSearchParams();
	const [currentCustomer, setCurrentCustomer] = useState<CustomerData | null>(
		null
	);
	const [selectedView, setSelectedView] = useState("portfolio");
	const createPieChartData = (
		portfolio: AssetAllocation[] | undefined,
		key: keyof AssetAllocation
	) => {
		if (!portfolio) return [];

		const dataMap = new Map<string, number>();

		portfolio.forEach((item) => {
			const value = item[key];
			if (typeof value === "string") {
				dataMap.set(value, (dataMap.get(value) || 0) + 1);
			}
		});

		return Array.from(dataMap).map(([name, value]) => ({ name, value }));
	};

	const investmentTypeData = useMemo(() => {
		return createPieChartData(currentCustomer?.portfolio, "investmentType");
	}, [currentCustomer]);

	const sectorData = useMemo(() => {
		return createPieChartData(currentCustomer?.portfolio, "sector");
	}, [currentCustomer]);

	const investmentValueData = currentCustomer?.portfolio.map((portfolio) => ({
		name: portfolio.assetName,
		value: portfolio.investmentValue,
	}));

	const allocationData = currentCustomer?.portfolio.map((portfolio) => ({
		name: portfolio.assetName,
		value: portfolio.allocation,
	}));

	const annualReturnData = currentCustomer?.portfolio.map((portfolio) => ({
		name: portfolio.assetName,
		value: portfolio.annualReturn,
	}));

	const riskProfileData = currentCustomer?.portfolio.map((portfolio) => ({
		name: portfolio.assetName,
		value: portfolio.riskScore,
	}));

	const backgroundColor = [
		"rgba(106, 80, 161, 0.2)",
		"rgba(172, 97, 207, 0.2)",
		"rgba(240, 137, 255, 0.2)",
		"rgba(54, 162, 235, 0.2)",
		"rgba(255, 159, 64, 0.2)",
		"rgba(255, 99, 132, 0.2)",
		"rgba(75, 192, 192, 0.2)",
	];

	const borderColor = [
		"rgb(106, 80, 161)",
		"rgb(172, 97, 207)",
		"rgb(240, 137, 255)",
		"rgb(54, 162, 235)",
		"rgb(255, 159, 64)",
		"rgb(255, 99, 132)",
		"rgb(75, 192, 192)",
	];

	const renderPieChart = (data: { name: string; value: number }[]) => {
		const chartData = {
			labels: data.map((d) => `${d.name} (%)`),
			datasets: [
				{
					data: data.map((d) => d.value),
					backgroundColor,
					borderColor,
					borderWidth: 1,
				},
			],
		};

		return <Doughnut data={chartData} />;
	};

	const renderPolarChart = (data: { name: string; value: number }[]) => {
		const chartData = {
			labels: data.map((d) => d.name),
			datasets: [
				{
					data: data.map((d) => d.value),
					backgroundColor,
					borderColor,
					borderWidth: 1,
				},
			],
		};

		return <PolarArea data={chartData} />;
	};

	const renderBarChart = (
		data: { name: string; value: number }[],
		chartName: string
	) => {
		const chartData = {
			labels: data.map((d) => d.name),
			datasets: [
				{
					data: data.map((d) => d.value),
					label: chartName,
					backgroundColor,
					borderColor,
					borderWidth: 1,
				},
			],
		};
		const options = {
			plugins: {
				legend: {
					display: false,
				},
			},
		};
		return <Bar data={chartData} options={options} />;
	};

	const renderLineChart = (data: { name: string; value: number }[]) => {
		const chartData = {
			labels: data.map((d) => d.name),
			datasets: [
				{
					label: "Investment Value ($)",
					data: data.map((d) => d.value),
					fill: false,
					borderColor: "#8884d8",
					borderWidth: 1,
				},
			],
		};
		const options = {
			plugins: {
				legend: {
					display: false,
				},
			},
		};
		return <Line data={chartData} options={options} />;
	};

	const renderRiskProfileChart = (
		data: { name: string; value: number }[],
		data2: { name: string; value: number }[]
	) => {
		const chartData = {
			labels: data.map((d) => d.name),
			datasets: [
				{
					label: "Risk Score (%)",
					data: data.map((d) => d.value),
					borderColor,
					backgroundColor,
					fill: false,
					borderWidth: 1,
				},
				{
					label: "Allocation (%)",
					data: data2.map((d) => d.value),
					borderColor,
					backgroundColor,
					fill: false,
					borderWidth: 1,
				},
			],
		};
		return <Bar data={chartData} />;
	};
	useEffect(() => {
		async function getCustomerData() {
			const data = await fetchCustomerData();
			const customer = data.filter((data: CustomerData) => {
				return data.customerName === searchParams.get("customer");
			})[0];
			setCurrentCustomer(customer);
		}
		searchParams && getCustomerData();
	}, [searchParams]);

	const calculateRiskInvestmentProfile = (
		currentCustomer: CustomerData | null
	) => {
		var totalWeightedRiskScore = 0;
		var totalWeightedAllocation = 0;

		currentCustomer?.portfolio.forEach((asset) => {
			totalWeightedRiskScore += asset.allocation * asset.riskScore;
			totalWeightedAllocation += asset.allocation;
		});
		return totalWeightedRiskScore / totalWeightedAllocation;
	};
	const theme = useTheme();

	const fadeIn = keyframes`
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	`;

	return (
		<>
			<Grid container justifyContent="start" alignItems="start">
				<SideNavigation
					customerName={currentCustomer?.customerName}
					selectedView={selectedView}
					setSelectedView={setSelectedView}
				/>

				<Grid
					item
					xs={12}
					md={10}
					container
					justifyContent="center"
					alignItems="center"
					sx={{ padding: "2em 0" }}
				>
					{selectedView === "portfolio" ? (
						<Grid
							item
							container
							xs={12}
							md={11}
							spacing={3}
							justifyContent="center"
							alignItems="center"
						>
							<Grid
								item
								container
								xs={12}
								sx={{ overflow: "scroll", padding: "1em" }}
								spacing={2}
							>
								{currentCustomer?.portfolio.map(
									(portfolio, index) => (
										<>
											<Grid
												item
												xs={12}
												sm={6}
												md={4}
												key={index}
											>
												<Card
													sx={{
														borderRadius: "5%",
													}}
												>
													<CardHeader
														title={
															portfolio.assetName
														}
													/>
													<CardContent>
														<Typography>{`Allocation: ${portfolio.allocation}%`}</Typography>
														<Typography>{`Risk Score: ${portfolio.riskScore}%`}</Typography>
														<Typography>{`Annual Return: $${portfolio.annualReturn}`}</Typography>
														<Typography>{`Investment Value: $${portfolio.investmentValue}`}</Typography>
														<Typography>{`Sector: ${portfolio.sector}`}</Typography>
														<Typography>{`Investment Type: ${portfolio.investmentType}`}</Typography>
														<Typography>{`Country: ${portfolio.country}`}</Typography>
													</CardContent>
												</Card>
											</Grid>
										</>
									)
								)}
							</Grid>

							<Grid item xs={12} md={6} lg={4}>
								<Card
									sx={{
										borderRadius: "4%",
										height: "400px",
										justifyContent: "center",
										alignItems: "center",
										display: "flex",
										flexDirection: "column",
									}}
								>
									<CardHeader title="Portfolio Allocation" />
									<CardContent
										sx={{
											width: "80%",
											height: "80%",
											justifyContent: "center",
											alignItems: "center",
											display: "flex",
										}}
									>
										{allocationData &&
											renderPieChart(allocationData)}
									</CardContent>
								</Card>
							</Grid>
							<Grid item xs={12} md={6} lg={8}>
								<Card
									sx={{
										borderRadius: "4%",
										height: "400px",
										justifyContent: "center",
										alignItems: "center",
										display: "flex",
										flexDirection: "column",
									}}
								>
									<CardHeader title="Annual Return" />
									<CardContent
										sx={{
											width: "80%",
											height: "80%",
											justifyContent: "center",
											alignItems: "center",
											display: "flex",
										}}
									>
										{annualReturnData &&
											renderBarChart(
												annualReturnData,
												"Annual Return ($)"
											)}
									</CardContent>
								</Card>
							</Grid>
							<Grid item xs={12}>
								<Card
									sx={{
										borderRadius: "4%",
										height: "600px",
										justifyContent: "center",
										alignItems: "center",
										display: "flex",
										flexDirection: "column",
									}}
								>
									<CardHeader title="Investment Value" />

									<CardContent
										sx={{
											width: "80%",
											height: "80%",
											justifyContent: "center",
											alignItems: "center",
											display: "flex",
										}}
									>
										{investmentValueData &&
											(investmentValueData.length > 1
												? renderLineChart(
														investmentValueData
												  )
												: renderBarChart(
														investmentValueData,
														"Investment Value ($)"
												  ))}
									</CardContent>
								</Card>
							</Grid>

							<Grid item xs={12} md={6}>
								<Card
									sx={{
										borderRadius: "4%",
										height: "400px",
										justifyContent: "center",
										alignItems: "center",
										display: "flex",
										flexDirection: "column",
									}}
								>
									<CardHeader title="Investment Type" />
									<CardContent
										sx={{
											width: "80%",
											height: "80%",
											justifyContent: "center",
											alignItems: "center",
											display: "flex",
										}}
									>
										{investmentTypeData &&
											renderPolarChart(
												investmentTypeData
											)}
									</CardContent>
								</Card>
							</Grid>
							<Grid item xs={12} md={6}>
								<Card
									sx={{
										borderRadius: "4%",
										height: "400px",
										justifyContent: "center",
										alignItems: "center",
										display: "flex",
										flexDirection: "column",
									}}
								>
									<CardHeader title="Sector" />
									<CardContent
										sx={{
											width: "80%",
											height: "80%",
											justifyContent: "center",
											alignItems: "center",
											display: "flex",
										}}
									>
										{sectorData &&
											renderPolarChart(sectorData)}
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					) : (
						<Grid
							item
							container
							justifyContent="center"
							alignItems="center"
							xs={12}
							md={11}
							spacing={3}
						>
							<Grid item xs={12} container>
								<Grid item xs={12} md={6}>
									<Card
										sx={{
											padding: "1em",
										}}
									>
										<CardHeader
											title="Customer Risk Profile"
											titleTypographyProps={{
												variant: "h3",
											}}
										/>
										<CardContent
											sx={{
												margin: "1em",
											}}
										>
											<Typography>
												<strong>Customer Name:</strong>{" "}
												{currentCustomer?.customerName}
											</Typography>
											<Typography>
												<strong>
													Risk Scores by Asset:
												</strong>
											</Typography>
											{currentCustomer?.portfolio.map(
												(asset) => (
													<Card
														sx={{
															my: 1,
														}}
														key={asset.assetName}
													>
														<CardContent
															sx={{
																backgroundColor:
																	"#9c7ac8",
																color: "white",
															}}
														>
															<Typography>
																<strong>
																	Asset Name:
																</strong>{" "}
																{
																	asset.assetName
																}
															</Typography>
															<Typography>
																<strong>
																	Risk Score:
																</strong>{" "}
																{
																	asset.riskScore
																}
																%
															</Typography>
															<Typography>
																<strong>
																	Allocation:
																</strong>{" "}
																{
																	asset.allocation
																}
																%
															</Typography>
														</CardContent>
													</Card>
												)
											)}
										</CardContent>
									</Card>
								</Grid>
								<Grid item xs={12} md={6}>
									<Card
										sx={{
											padding: "1em",
											height: "100%",
											background: `linear-gradient(135deg, #6a50a1 0%, #927fbf 50%, #f1eeff 100%)`,
											boxShadow: theme.shadows[4],
											transition: "0.3s",
											"&:hover": {
												transform: "scale(1.05)",
											},
											animation: `${fadeIn} 1s ease-in`,
										}}
									>
										<CardContent
											sx={{
												margin: "1em",
												display: "flex",
												flexDirection: "column",
												justifyContent: "center",
												alignItems: "center",
												height: "100%",
											}}
										>
											<Typography
												variant="h4"
												component="div"
												sx={{
													fontWeight: "bold",
													textAlign: "center",
													color: theme.palette.primary
														.contrastText,
												}}
											>
												Investment Risk Score:
											</Typography>
											<Typography
												variant="h1"
												component="div"
												sx={{
													fontWeight: "bold",
													textAlign: "center",
													color: "white",
													textShadow:
														"2px 2px 4px rgba(0, 0, 0, 0.5)",
												}}
											>
												{calculateRiskInvestmentProfile(
													currentCustomer
												)}
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Card
									sx={{
										borderRadius: "4%",
										height: "600px",
										justifyContent: "center",
										alignItems: "center",
										display: "flex",
										flexDirection: "column",
									}}
								>
									<CardHeader title="Risk Score and Allocation" />

									<CardContent
										sx={{
											width: "80%",
											height: "80%",
											justifyContent: "center",
											alignItems: "center",
											display: "flex",
										}}
									>
										{riskProfileData &&
											allocationData &&
											renderRiskProfileChart(
												riskProfileData,
												allocationData
											)}
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					)}
				</Grid>
			</Grid>
		</>
	);
};
export default CustomerPage;
