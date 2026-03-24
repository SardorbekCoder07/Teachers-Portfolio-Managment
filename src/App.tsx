import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MotionLazy } from "./components/animate/motion-lazy";
import { RouteLoadingProgress } from "./components/loading";
import Toast from "./components/toast";
import { AntdAdapter } from "./theme/adapter/antd.adapter";
import { ThemeProvider } from "./theme/theme-provider";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,   // 5 daqiqa — cache "fresh" hisoblanadi
			gcTime: 10 * 60 * 1000,      // 10 daqiqa — cache xotiradan o'chadi
			refetchOnWindowFocus: false,  // oynaga qaytganda qayta so'rov ketmaydi
		},
	},
});

function App({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider adapters={[AntdAdapter]}>
				<Toast />
				<RouteLoadingProgress />
				<MotionLazy>{children}</MotionLazy>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
