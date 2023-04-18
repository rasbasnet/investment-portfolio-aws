import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
	AssetAllocation,
	CustomerData,
} from "../../JsonInterfaces/CustomerDataInterface";
import { fetchCustomerData } from "../utils/fetchUtil";
import { Typography, Grid } from "@mui/material";

const CustomerPage: React.FC<{}> = () => {
	const [searchParams] = useSearchParams();
	const [currentCustomer, setCurrentCustomer] = useState<CustomerData | null>(
		null
	);

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

	return (
		<Grid
			container
			item
			direction="column"
			justifyContent="center"
			alignItems="center"
		>
			<Typography variant="h1">
				{currentCustomer?.customerName}
			</Typography>
			{currentCustomer?.portfolio.map((portfolio: AssetAllocation) => (
				<>
					<Typography variant="h5">{`Asset: ${portfolio.assetName}`}</Typography>
					<Typography variant="body1">{`Allocation: ${portfolio.allocation}`}</Typography>
					<Typography variant="body1">{`Risk Score: ${portfolio.riskScore}`}</Typography>
					<Typography variant="body1">{`Annual Return: ${portfolio.annualReturn}`}</Typography>
					<Typography variant="body1">{`Investment Value: ${portfolio.investmentValue}`}</Typography>
					<Typography variant="body1">{`Sector: ${portfolio.sector}`}</Typography>
					<Typography variant="body1">{`Investment Type: ${portfolio.investmentType}`}</Typography>
					<Typography variant="body1">{`Country: ${portfolio.country}`}</Typography>
					<br />
				</>
			))}
		</Grid>
	);
};
export default CustomerPage;
