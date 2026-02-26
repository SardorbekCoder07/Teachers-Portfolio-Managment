import { GLOBAL_CONFIG } from "@/global-config";
import { useUserToken } from "@/store/userStore";
import { Navigate } from "react-router";
import LoginForm from "./login-form";

function LoginPage() {
	const token = useUserToken();

	if (token.accessToken) {
		return <Navigate to={GLOBAL_CONFIG.defaultRoute} replace />;
	}

	return (
		<div className="min-h-svh flex items-center justify-center bg-background">
			<div className="w-full max-w-lg px-6">
				<LoginForm />
			</div>
		</div>
	);
}
export default LoginPage;
