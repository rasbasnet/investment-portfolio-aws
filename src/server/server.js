const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors()); // Add this line to allow CORS requests
app.use(express.json());

app.get("/api/loginData", (req, res) => {
	fs.readFile("../../public/src/data/loginData.json", (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send("Error getting data");
		} else {
			res.setHeader("Content-Type", "application/json");
			res.send(data);
		}
	});
});

app.get("/api/customerData", (req, res) => {
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

app.listen(3005, () => {
	console.log("Server started on port 3005");
});
