export const logIn = async (userName: string, password: string) => {
	const response = await fetch("http://localhost:3005/api/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ userName, password }),
	});

	if (response.ok) {
		// If the response status is OK (i.e., 200), return true
		return true;
	} else {
		// If the response status is not OK (i.e., anything other than 200), return false
		return false;
	}
};

export const fetchCustomerData = async () =>
	await fetch("http://localhost:3005/api/customers", {
		method: "GET",
	}).then((response) => response.json());
