import React from "react";
import {
	Toolbar,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Avatar,
	Grid,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

interface SideNavigationProps {
	customerName: string | undefined;
	selectedView: string;
	setSelectedView: (view: string) => void;
}

const SideNavigation: React.FC<SideNavigationProps> = ({
	customerName,
	selectedView,
	setSelectedView,
}) => {
	return (
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
							primary={customerName}
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
	);
};

export default SideNavigation;
