import { GLOBAL_CONFIG } from "@/global-config";
import type { SignInReq } from "@/store/userStore";
import { useUserActions } from "@/store/userStore";
import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { cn } from "@/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const { setUserToken, setUserInfo } = useUserActions();

	const form = useForm<SignInReq>({
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const handleFinish = async (_values: SignInReq) => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setUserToken({ accessToken: "fake-access-token", refreshToken: "fake-refresh-token" });
			setUserInfo({
				id: "1",
				username: "Admin",
				email: "admin@example.com",
				avatar: "",
			});
			toast.success("Login muvaffaqiyatli!");
			navigate(GLOBAL_CONFIG.defaultRoute, { replace: true });
		} catch {
			toast.error("Xatolik yuz berdi");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={cn("flex flex-col gap-8", className)}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-4xl font-bold">Kirish</h1>
				<p className="text-muted-foreground text-base">
					Kirish uchun (ID/raqam) va parolingizni kiriting
				</p>
			</div>

			<Form {...form} {...props}>
				<form onSubmit={form.handleSubmit(handleFinish)} className="space-y-6">
					<FormField
						control={form.control}
						name="username"
						rules={{ required: "Username is required" }}
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-base">ID/phone</FormLabel>
								<FormControl>
									<Input
										placeholder="Username"
										className="h-14 text-base px-4 rounded-lg"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						rules={{ required: "Password is required" }}
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-base">Parol</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Password"
										className="h-14 text-base px-4 rounded-lg"
										{...field}
										suppressHydrationWarning
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" disabled={loading} className="cursor-pointer w-full h-14 text-base rounded-lg">
						{loading && <Loader2 className="animate-spin mr-2" />}
						Sign In
					</Button>
				</form>
			</Form>
		</div>
	);
}

export default LoginForm;
