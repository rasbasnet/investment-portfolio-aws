export const fetchLoginInfo = async () =>
	await fetch("http://localhost:3001/api/loginData", { method: "GET" }).then(
		(response) => response.json()
	);

export const fetchCustomerData = async () =>
	await fetch("http://localhost:3001/api/loginData", { method: "GET" }).then(
		(response) => response.json()
	);
