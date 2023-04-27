export interface CustomerData {
	customerName: string;
	portfolio: AssetAllocation[];
	customerNumber?: number;
}

export interface AssetAllocation {
	assetName: string;
	allocation: number;
	riskScore: number;
	annualReturn: number;
	investmentValue: number;
	sector: string;
	investmentType: string;
	country: string;
}
