import React, { createContext, useState, useEffect } from "react";

interface AuthContextType {
	authenticated: boolean | null;
	setAuthenticated: (authenticated: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
	authenticated: null,
	setAuthenticated: () => {},
});

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [authenticated, setAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {
		const authenticated = sessionStorage.getItem("loggedIn");
		if (authenticated) {
			setAuthenticated(!!authenticated);
		}
	}, []);

	const handleSetAuthenticated = (value: boolean) => {
		setAuthenticated(value);
		sessionStorage.setItem("authenticated", value.toString());
	};

	return (
		<AuthContext.Provider
			value={{ authenticated, setAuthenticated: handleSetAuthenticated }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
