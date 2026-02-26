import CyanBlur from "@/assets/images/background/cyan-blur.png";
import RedBlur from "@/assets/images/background/red-blur.png";
import { Icon } from "@/components/icon";
import { type SettingsType, useSettingActions, useSettings } from "@/store/settingStore";
import { themeVars } from "@/theme/theme.css";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/ui/sheet";
import { Text } from "@/ui/typography";
import { type CSSProperties } from "react";
import { ThemeMode } from "#/enum";

export default function SettingButton() {
	const settings = useSettings();
	const { themeMode } = settings;
	const { setSettings } = useSettingActions();

	const updateSettings = (partialSettings: Partial<SettingsType>) => {
		setSettings({ ...settings, ...partialSettings });
	};

	const sheetContentBgStyle: CSSProperties = {
		backdropFilter: "blur(20px)",
		backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
		backgroundRepeat: "no-repeat, no-repeat",
		backgroundPosition: "right top, left bottom",
		backgroundSize: "50%, 50%",
	};

	return (
		<Sheet modal={false}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="rounded-full animate-slow-spin">
					<Icon icon="local:ic-setting" size={24} />
				</Button>
			</SheetTrigger>
			<SheetContent style={sheetContentBgStyle} className="gap-0" onOpenAutoFocus={(e) => e.preventDefault()}>
				<SheetHeader className="flex flex-row items-center justify-between px-6 py-4 shrink-0">
					<SheetTitle>Settings</SheetTitle>
					<SheetDescription />
				</SheetHeader>
				<div className="flex flex-col gap-6 px-6 py-4">
					<div className="flex flex-col gap-2">
						<Text variant="subTitle1">Mode</Text>
						<div className="flex flex-row gap-4">
							<Card
								onClick={() => updateSettings({ themeMode: ThemeMode.Light })}
								className="flex flex-1 h-20 cursor-pointer items-center justify-center"
							>
								<Icon
									icon="local:ic-settings-mode-sun"
									size="24"
									color={themeMode === ThemeMode.Light ? themeVars.colors.palette.primary.default : ""}
								/>
							</Card>
							<Card
								onClick={() => updateSettings({ themeMode: ThemeMode.Dark })}
								className="flex flex-1 h-20 cursor-pointer items-center justify-center"
							>
								<Icon
									icon="local:ic-settings-mode-moon"
									size="24"
									color={themeMode === ThemeMode.Dark ? themeVars.colors.palette.primary.default : ""}
								/>
							</Card>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
