import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(cors()); // Add this line to allow CORS requests
app.use(express.json());

app.get("/api/loginInfo", (req, res: express.Response) => {
	fs.readFile("./public/src/data/loginData.json", (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send("Error getting data");
		} else {
			res.setHeader("Content-Type", "application/json");
			res.send(data);
		}
	});
});

app.get("/api/customerData", (req, res: express.Response) => {
	fs.readFile("./public/src/data/customerData.json", (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send("Error getting data");
		} else {
			res.setHeader("Content-Type", "application/json");
			res.send(data);
		}
	});
});

app.listen(3001, () => {
	console.log("Server started on port 3001");
});
