import {
	Button,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	FormHelperText,
} from "@mui/material";
import "./LoginPage.css";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { logIn } from "../utils/fetchUtil";

const LoginPage: React.FC<{}> = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const errorMessage = "Login info did not match, please try again";
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};
	const login = async () => {
		const loggedIn = await logIn(userName, password);
		if (loggedIn) {
			setError(false);
			window.sessionStorage.setItem("loggedIn", "true");
			window.location.assign("/investment-portfolios");
			window.location.reload();
		} else {
			setError(true);
			setPassword("");
		}
	};

	return (
		<Grid
			container
			alignItems="center"
			justifyContent="center"
			className="login-container"
		>
			<Grid
				item
				container
				justifyContent="center"
				alignItems="center"
				xs={12}
				md={6}
				className="screen"
			>
				<div className="screen-image"></div>
				<div className="screen-overlay"></div>
				<div className="screen-content">
					<i className="screen-icon fa-brands fa-codepen"></i>
					<div className="screen-user">
						<span className="name">Asset & Wealth Services</span>
						<p className="link">Where your dreams come true</p>
					</div>
				</div>
			</Grid>
			<Grid
				item
				container
				justifyContent="center"
				alignItems="center"
				direction="column"
				xs={12}
				md={6}
				className="login-form-container"
			>
				{error && (
					<FormHelperText
						id="outlined-adornment-password"
						sx={{ color: "#e57373" }}
					>
						{errorMessage}
					</FormHelperText>
				)}
				<Grid
					item
					container
					justifyContent="center"
					alignItems="center"
				>
					<FormControl
						sx={{ m: 1, width: "25ch" }}
						variant="outlined"
					>
						<TextField
							id="outlined-basic"
							label="Username"
							variant="outlined"
							value={userName}
							onChange={(e) => {
								setUserName(e.target.value);
							}}
							error={error}
						/>
					</FormControl>

					<FormControl
						sx={{ m: 1, width: "25ch" }}
						variant="outlined"
					>
						<InputLabel
							htmlFor="outlined-adornment-password"
							color={error ? "error" : "primary"}
						>
							Password
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={showPassword ? "text" : "password"}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
										color={error ? "error" : "primary"}
									>
										{showPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							color={error ? "error" : "primary"}
							error={error}
						/>
					</FormControl>
				</Grid>
				<Grid
					item
					container
					justifyContent="center"
					alignItems="center"
				>
					<Button
						variant="outlined"
						color={error ? "error" : "primary"}
						size="large"
						endIcon={<LoginIcon />}
						onClick={login}
					>
						Login
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default LoginPage;
