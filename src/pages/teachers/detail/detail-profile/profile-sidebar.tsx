import { UserRound } from "lucide-react";
import { Card } from "@/ui/card";
import { Separator } from "@/ui/separator";
import type { ProfileFormData } from "./profile-edit";

function InfoRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex flex-col gap-0.5">
			<span className="text-[11px] text-muted-foreground">{label}</span>
			<span className="text-[13px] font-medium">{value}</span>
		</div>
	);
}

type ProfileSidebarProps = {
	profile: ProfileFormData;
	imgUrl?: string;
};

export function ProfileSidebar({ profile, imgUrl }: ProfileSidebarProps) {
	const preview = profile.image ? URL.createObjectURL(profile.image) : (imgUrl || null);

	return (
		<div className="w-full lg:w-72 lg:shrink-0">
			<Card className="py-0 overflow-hidden gap-0">
				{/* Full width image — mobile: aspect-[16/9], desktop: aspect-square */}
				<div className="w-full aspect-[4/3] sm:aspect-[16/7] lg:aspect-square bg-muted flex items-center justify-center overflow-hidden">
					{preview ? (
						<img src={preview} alt="teacher" className="w-full h-full object-cover" />
					) : (
						<UserRound className="size-16 sm:size-20 lg:size-24 text-muted-foreground" />
					)}
				</div>

				{/* Info — always below the image */}
				<div className="px-4 py-4 flex flex-col gap-2">
					<h2 className="font-semibold text-[14px] leading-snug">{profile.fullName}</h2>
					<Separator />
					<div className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-2">
						{profile.position && <InfoRow label="Lavozimi" value={profile.position} />}
						{profile.department && <InfoRow label="Kafedrasi" value={profile.department} />}
						{profile.phone && <InfoRow label="Telefon" value={profile.phone} />}
						{profile.specialty && <InfoRow label="Mutaxassisligi" value={profile.specialty} />}
						{profile.email && <InfoRow label="Email" value={profile.email} />}
						{profile.age && <InfoRow label="Yoshi" value={`${profile.age} yosh`} />}
					</div>
					{(profile.orcId || profile.scopusId || profile.scienceId || profile.researcherId) && (
						<Separator />
					)}
					<div className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-2">
						{profile.orcId && <InfoRow label="ORC ID" value={profile.orcId} />}
						{profile.scopusId && <InfoRow label="Scopus ID" value={profile.scopusId} />}
						{profile.scienceId && <InfoRow label="Science ID" value={profile.scienceId} />}
						{profile.researcherId && <InfoRow label="Researcher ID" value={profile.researcherId} />}
					</div>
					{profile.bio && (
						<div className="flex flex-col gap-0.5 pt-1">
							<span className="text-[11px] text-muted-foreground">Biografiya</span>
							<p className="text-[12px] leading-relaxed text-muted-foreground">{profile.bio}</p>
						</div>
					)}
				</div>
			</Card>
		</div>
	);
}
