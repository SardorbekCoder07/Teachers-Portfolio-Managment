import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { MotionLazy } from "./components/animate/motion-lazy";
import { RouteLoadingProgress } from "./components/loading";
import Toast from "./components/toast";
import { AntdAdapter } from "./theme/adapter/antd.adapter";
import { ThemeProvider } from "./theme/theme-provider";

function App({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<ThemeProvider adapters={[AntdAdapter]}>
				<Toast />
				<RouteLoadingProgress />
				<MotionLazy>{children}</MotionLazy>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
