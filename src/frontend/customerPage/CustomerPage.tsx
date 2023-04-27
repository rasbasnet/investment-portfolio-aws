import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
	AssetAllocation,
	CustomerData,
} from "../../JsonInterfaces/CustomerDataInterface";
import { fetchCustomerData } from "../utils/fetchUtil";
import { Typography, Grid, CardContent, CardHeader, Card } from "@mui/material";
import {
	Toolbar,
	Avatar,
	IconButton,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import Chart from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
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

	const backgroundColor = [
		"rgba(255, 99, 132, 0.2)",
		"rgba(255, 159, 64, 0.2)",
		"rgba(255, 205, 86, 0.2)",
		"rgba(75, 192, 192, 0.2)",
		"rgba(54, 162, 235, 0.2)",
		"rgba(153, 102, 255, 0.2)",
		"rgba(201, 203, 207, 0.2)",
	];

	const borderColor = [
		"rgb(255, 99, 132)",
		"rgb(255, 159, 64)",
		"rgb(255, 205, 86)",
		"rgb(75, 192, 192)",
		"rgb(54, 162, 235)",
		"rgb(153, 102, 255)",
		"rgb(201, 203, 207)",
	];

	const renderPieChart = (data: { name: string; value: number }[]) => {
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

		return <Doughnut data={chartData} />;
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
					label: "Investment Value",
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

		currentCustomer?.portfolio.map((asset) => {
			totalWeightedRiskScore += asset.allocation * asset.riskScore;
			totalWeightedAllocation += asset.allocation;
		});
		return totalWeightedRiskScore / totalWeightedAllocation;
	};

	return (
		<>
			<Grid container justifyContent="start" alignItems="start">
				<Grid
					container
					item
					xs={12}
					md={2}
					justifyContent="center"
					alignItems="center"
					direction="column"
				>
					<Grid
						item
						xs={2}
						container
						justifyContent="center"
						alignItems="center"
					>
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="homepage"
								edge="start"
								onClick={() =>
									window.location.assign(
										"/investment-portfolios/homepage"
									)
								}
							>
								<HomeIcon />
							</IconButton>
						</Toolbar>
					</Grid>
					<Grid
						item
						xs={10}
						container
						justifyContent="center"
						alignItems="center"
					>
						<List
							sx={{
								display: "flex",
								flexDirection: "column",
							}}
						>
							<ListItem
								sx={{
									justifyContent: "center",
									flexDirection: "column",
									pb: 4,
								}}
							>
								<Avatar />
								<ListItemText
									primary={currentCustomer?.customerName}
									primaryTypographyProps={{
										align: "center",
									}}
								/>
							</ListItem>
							<ListItem
								button
								selected={selectedView === "portfolio"}
								onClick={() => setSelectedView("portfolio")}
							>
								<ListItemText primary="Portfolio" />
							</ListItem>
							<ListItem
								button
								selected={selectedView === "riskProfile"}
								onClick={() => setSelectedView("riskProfile")}
							>
								<ListItemText primary="Risk Profile" />
							</ListItem>
						</List>
					</Grid>
				</Grid>

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
											<Card sx={{ borderRadius: "5%" }}>
												<CardHeader
													title={portfolio.assetName}
												/>
												<CardContent>
													<Typography fontFamily="Open Sans, sans-serif">{`Allocation: ${portfolio.allocation}%`}</Typography>
													<Typography fontFamily="Open Sans, sans-serif">{`Risk Score: ${portfolio.riskScore}`}</Typography>
													<Typography fontFamily="Open Sans, sans-serif">{`Annual Return: ${portfolio.annualReturn}%`}</Typography>
													<Typography fontFamily="Open Sans, sans-serif">{`Investment Value: $${portfolio.investmentValue}`}</Typography>
													<Typography fontFamily="Open Sans, sans-serif">{`Sector: ${portfolio.sector}`}</Typography>
													<Typography fontFamily="Open Sans, sans-serif">{`Investment Type: ${portfolio.investmentType}`}</Typography>
													<Typography fontFamily="Open Sans, sans-serif">{`Country: ${portfolio.country}`}</Typography>
												</CardContent>
											</Card>
										</Grid>
									</>
								)
							)}

							<Grid item xs={12} md={6} lg={4}>
								<Card sx={{ borderRadius: "4%" }}>
									<CardHeader title="Portfolio Allocation" />
									<CardContent>
										{allocationData &&
											renderPieChart(allocationData)}
									</CardContent>
								</Card>
							</Grid>
							<Grid item xs={12} md={6} lg={8}>
								<Card sx={{ borderRadius: "4%" }}>
									<CardHeader title="Annual Return" />
									<CardContent>
										{annualReturnData &&
											renderBarChart(
												annualReturnData,
												"Annual Return"
											)}
									</CardContent>
								</Card>
							</Grid>
							<Grid item xs={12}>
								<Card sx={{ borderRadius: "4%" }}>
									<CardHeader title="Investment Value" />

									<CardContent>
										{investmentValueData &&
											(investmentValueData.length > 1
												? renderLineChart(
														investmentValueData
												  )
												: renderBarChart(
														investmentValueData,
														"Investment Value"
												  ))}
									</CardContent>
								</Card>
							</Grid>

							<Grid item xs={12} md={6}>
								<Card sx={{ borderRadius: "4%" }}>
									<CardHeader title="Investment Type" />
									<CardContent>
										{investmentTypeData &&
											renderPieChart(investmentTypeData)}
									</CardContent>
								</Card>
							</Grid>
							<Grid item xs={12} md={6}>
								<Card sx={{ borderRadius: "4%" }}>
									<CardHeader title="Sector" />
									<CardContent>
										{sectorData &&
											renderPieChart(sectorData)}
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					) : (
						<Grid
							item
							container
							direction="column"
							justifyContent="center"
							alignItems="center"
							xs={12}
							md={11}
						>
							<Grid item xs={12}>
								<Card sx={{ padding: "1em" }}>
									<CardHeader title="Risk Profile" />
									<CardContent sx={{ margin: "1em" }}>
										<Typography fontFamily="Open Sans, sans-serif">
											<strong>Customer Name:</strong>{" "}
											{currentCustomer?.customerName}
										</Typography>
										<Typography fontFamily="Open Sans, sans-serif">
											<strong>
												Total Portfolio Allocation:
											</strong>{" "}
											{currentCustomer?.portfolio.reduce(
												(total, asset) =>
													total + asset.allocation,
												0
											)}
											%
										</Typography>
										<Typography fontFamily="Open Sans, sans-serif">
											<strong>
												Investment Risk Score:
											</strong>{" "}
											{calculateRiskInvestmentProfile(
												currentCustomer
											)}
										</Typography>
										<Typography fontFamily="Open Sans, sans-serif">
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
													<CardContent>
														<Typography fontFamily="Open Sans, sans-serif">
															<strong>
																Asset Name:
															</strong>{" "}
															{asset.assetName}
														</Typography>
														<Typography fontFamily="Open Sans, sans-serif">
															<strong>
																Risk Score:
															</strong>{" "}
															{asset.riskScore}
														</Typography>
														<Typography fontFamily="Open Sans, sans-serif">
															<strong>
																Allocation:
															</strong>{" "}
															{asset.allocation}%
														</Typography>
													</CardContent>
												</Card>
											)
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
