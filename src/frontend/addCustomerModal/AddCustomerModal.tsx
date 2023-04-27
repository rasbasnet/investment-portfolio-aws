import { useState } from "react";
import {
	Modal,
	Backdrop,
	Fade,
	Box,
	TextField,
	Typography,
	Button,
	IconButton,
	Grid,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import { AddCircleOutline, ExpandMore } from "@mui/icons-material";
import {
	AssetAllocation,
	CustomerData,
} from "../../JsonInterfaces/CustomerDataInterface";
import DeleteIcon from "@mui/icons-material/Delete";

interface AddCustomerModalProps {
	open: boolean;
	handleClose: () => void;
	addCustomer: (customerData: CustomerData) => boolean | Promise<boolean>;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
	open,
	handleClose,
	addCustomer,
}) => {
	const [customerName, setCustomerName] = useState("");
	const defaultAllocation = [
		{
			assetName: "",
			allocation: 0,
			riskScore: 0,
			annualReturn: 0,
			investmentValue: 0,
			sector: "",
			investmentType: "",
			country: "",
		},
	];

	const [assetAllocations, setAssetAllocations] =
		useState<AssetAllocation[]>(defaultAllocation);

	const [showErrors, setShowErrors] = useState(false);
	const [errorAddingCustomer, setErrorAddingCustomer] = useState(false);

	const handleAddAssetAllocation = () => {
		setAssetAllocations([...assetAllocations, defaultAllocation[0]]);
	};

	const handleChange = (
		index: number,
		field: keyof AssetAllocation,
		value: string
	) => {
		const updatedAssetAllocations = [...assetAllocations];
		const parsedValue =
			[
				"allocation",
				"riskScore",
				"annualReturn",
				"investmentValue",
			].includes(field) && !isNaN(Number(value))
				? Number(value)
				: value;

		updatedAssetAllocations[index] = {
			...updatedAssetAllocations[index],
			[field]: parsedValue,
		};
		setAssetAllocations(updatedAssetAllocations);
	};

	const getErrorMessage = (value: string, field: keyof AssetAllocation) => {
		let errorMessage = "";
		const stringValue = value && value.toString().trim();
		const numberValue = isNaN(Number(value)) ? null : Number(value);
		if (stringValue === "") {
			errorMessage = "This field is required.";
		} else {
			switch (field) {
				case "assetName":
					if (!isValidAssetName(stringValue)) {
						errorMessage = "Invalid asset name.";
					}
					break;
				case "allocation":
					if (!isValidAllocation(numberValue!)) {
						errorMessage = "Invalid allocation.";
					}
					break;
				case "riskScore":
					if (!isValidRiskScore(numberValue!)) {
						errorMessage = "Invalid risk score.";
					}
					break;
				case "annualReturn":
					if (!isValidAnnualReturn(numberValue!)) {
						errorMessage = "Invalid annual return.";
					}
					break;
				case "investmentValue":
					if (!isValidInvestmentValue(numberValue!)) {
						errorMessage = "Invalid investment value.";
					}
					break;
				case "sector":
					if (!isValidSector(stringValue)) {
						errorMessage = "Invalid sector.";
					}
					break;
				case "investmentType":
					if (!isValidInvestmentType(stringValue)) {
						errorMessage = "Invalid investment type.";
					}
					break;
				case "country":
					if (!isValidCountry(stringValue)) {
						errorMessage = "Invalid country.";
					}
					break;
			}
		}
		return errorMessage;
	};

	const assetAllocationKeys: (keyof AssetAllocation)[] = [
		"assetName",
		"allocation",
		"riskScore",
		"annualReturn",
		"investmentValue",
		"sector",
		"investmentType",
		"country",
	];

	const handleSubmit = async () => {
		if (isValidForm() && customerName) {
			setShowErrors(false);
			const customerAdded: boolean = await addCustomer({
				customerName,
				portfolio: assetAllocations,
			});
			if (customerAdded) {
				setErrorAddingCustomer(false);
				handleClose();
				setAssetAllocations(defaultAllocation);
				setCustomerName("");
			} else {
				setErrorAddingCustomer(true);
			}
		} else {
			setShowErrors(true);
			alert(
				"There are errors in the form. Please correct them before submitting."
			);
		}
	};

	const isValidForm = () => {
		let valid = true;
		// Check for errors in all fields
		assetAllocations.forEach((assetAllocation, index) => {
			assetAllocationKeys.forEach((field) => {
				const value = assetAllocation[field] as string;
				const errorMessage = getErrorMessage(value, field);
				if (
					!value ||
					value.toString().trim() === "" ||
					errorMessage !== ""
				) {
					valid = false;
				}
			});
		});
		return valid;
	};

	const deleteAssetAllocation = (index: number) => {
		setAssetAllocations((prevAssetAllocations) => {
			const updatedAssetAllocations = [...prevAssetAllocations];
			updatedAssetAllocations.splice(index, 1);
			return updatedAssetAllocations;
		});
	};

	const isValidAssetName = (name: string) => name.trim() !== "";
	const isValidAllocation = (allocation: number) => allocation > 0;
	const isValidRiskScore = (riskScore: number) => riskScore >= 0;
	const isValidAnnualReturn = (annualReturn: number) => annualReturn >= 0;
	const isValidInvestmentValue = (investmentValue: number) =>
		investmentValue >= 0;
	const isValidSector = (sector: string) => sector.trim() !== "";
	const isValidInvestmentType = (investmentType: string) =>
		investmentType.trim() !== "";
	const isValidCountry = (country: string) => country.trim() !== "";

	return (
		<Modal
			open={open}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
			sx={{ overflow: "scroll" }}
		>
			<Fade in={open}>
				<Box
					sx={{
						width: "80%",
						maxWidth: "800px",
						bgcolor: "background.paper",
						border: "2px solid #000",
						boxShadow: 24,
						p: 4,
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						borderRadius: "1rem",
						overflow: "scroll",
					}}
				>
					<Typography variant="h5" mb={2}>
						Add a Customer
					</Typography>
					<TextField
						label="Customer Name"
						value={customerName}
						onChange={(e) => setCustomerName(e.target.value)}
						error={!customerName}
						helperText={
							!customerName && "Please enter customer name"
						}
						fullWidth
						margin="dense"
					/>
					{assetAllocations.map((assetAllocation, index) => (
						<Accordion key={index}>
							<AccordionSummary
								expandIcon={<ExpandMore />}
								aria-controls={`asset-allocation-content-${index}`}
								id={`asset-allocation-header-${index}`}
							>
								<Typography variant="h6">
									Asset Allocation {index + 1}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Grid container spacing={2}>
									{assetAllocationKeys.map((field, i) => (
										<Grid
											item
											xs={12}
											sm={6}
											md={4}
											key={i}
										>
											<TextField
												label={
													field
														.charAt(0)
														.toUpperCase() +
													field.slice(1)
												}
												value={
													assetAllocation[
														field
													] as unknown as string
												}
												onChange={(
													e: React.ChangeEvent<HTMLInputElement>
												) =>
													handleChange(
														index,
														field,
														e.target.value
													)
												}
												fullWidth
												margin="dense"
												error={
													Boolean(
														getErrorMessage(
															assetAllocation[
																field
															] as unknown as string,
															field
														)
													) && showErrors
												}
												helperText={
													Boolean(
														getErrorMessage(
															assetAllocation[
																field
															] as unknown as string,
															field
														)
													) &&
													showErrors &&
													getErrorMessage(
														assetAllocation[
															field
														] as unknown as string,
														field
													)
												}
											/>
										</Grid>
									))}
									<Grid
										item
										xs={12}
										sm={6}
										md={4}
										container
										justifyContent="center"
										alignItems="center"
									>
										<Button>
											<DeleteIcon
												fontSize="large"
												color="action"
												onClick={() =>
													deleteAssetAllocation(index)
												}
											/>
										</Button>
									</Grid>
								</Grid>
							</AccordionDetails>
						</Accordion>
					))}

					<Box mt={2}>
						<IconButton
							onClick={handleAddAssetAllocation}
							color="primary"
							aria-label="add asset allocation"
						>
							<AddCircleOutline />
						</IconButton>
						<Typography variant="body1" display="inline">
							Add New Asset
						</Typography>
					</Box>
					<Box mt={2} display="flex" justifyContent="flex-end">
						<Button
							color="error"
							variant="outlined"
							onClick={handleClose}
						>
							Cancel
						</Button>
						<Button
							color="primary"
							variant="contained"
							onClick={handleSubmit}
							sx={{ ml: 1 }}
						>
							Add Customer
						</Button>
					</Box>
					{errorAddingCustomer && (
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<Typography color="error">
								Error adding customer please try again
							</Typography>
						</Box>
					)}
				</Box>
			</Fade>
		</Modal>
	);
};

export default AddCustomerModal;
