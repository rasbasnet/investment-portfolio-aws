const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors()); // Add this line to allow CORS requests
app.use(express.json());

app.post("/api/login", (req, res) => {
	// Retrieve the username and password from the request body
	const { userName, password } = req.body;

	// Check if the username and password match any records in the loginData array
	const loginData = JSON.parse(
		fs.readFileSync("../../public/src/data/loginData.json", "utf8")
	);

	const match = loginData.find(
		(data) => data.userName === userName && data.password === password
	);

	// Send a response based on the result of the validation
	if (match) {
		res.status(200).send("Login successful");
	} else {
		res.status(401).send("Invalid username or password");
	}
});

app.get("/api/customers", (req, res) => {
	fs.readFile("../../public/src/data/customerData.json", (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send("Error getting data");
		} else {
			res.setHeader("Content-Type", "application/json");
			res.send(data);
		}
	});
});

app.post("/api/customers", (req, res) => {
	const customerData = req.body;

	fs.readFile("../../public/src/data/customerData.json", (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send("Error getting data");
		} else {
			const jsonData = JSON.parse(data);
			jsonData.push(customerData);

			fs.writeFile(
				"../../public/src/data/customerData.json",
				JSON.stringify(jsonData, null, 2),
				(err) => {
					if (err) {
						console.error(err);
						res.status(500).send("Error saving data");
					} else {
						res.status(200).send("Customer data saved");
					}
				}
			);
		}
	});
});

app.listen(3005, () => {
	console.log("Server started on port 3005");
});
