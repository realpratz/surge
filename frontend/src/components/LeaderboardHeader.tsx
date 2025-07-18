import { useState } from "react";
import type { Leaderboard } from "../types/leaderboard";
import { useClickAway } from "@uidotdev/usehooks";
import { Link } from "@tanstack/react-router";

type LeaderboardHeaderProps = {
	batch: boolean;
	setBatch: React.Dispatch<React.SetStateAction<boolean>>;
	level: boolean;
	setLevel: React.Dispatch<React.SetStateAction<boolean>>;
	batches: string[];
	leaderboard: Leaderboard[];
};

export default function LeaderboardHeader({
	batch,
	setBatch,
	level,
	setLevel,
	batches,
	leaderboard,
}: LeaderboardHeaderProps) {
	const [input, setInput] = useState("");
	const [filteredNames, setFilteredNames] = useState<Leaderboard[]>([]);

	const inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInput(value);
		if (value.trim() === "") {
			setFilteredNames([]);
		} else {
			const filtered = leaderboard.filter((user) =>
				user.name.toLowerCase().startsWith(value.trim().toLowerCase())
			);
			setFilteredNames(filtered);
		}
	};
	const batchRef = useClickAway<HTMLDivElement>(() => {
		setBatch(false);
	});

	const levelRef = useClickAway<HTMLDivElement>(() => {
		setLevel(false);
	});
	return (
		<div className="border-b border-[#25293E]">
			<div className="pb-4">
				<div className="mb-7">
					<h1 className="text-3xl font-bold">
						Campus <span className="text-highlight-lighter">Leaderboard</span>
					</h1>
				</div>
				<div className="flex flex-col md:flex-row justify-between">
					<div className="flex flex-col w-full relative z-10">
						<input
							type="text"
							value={input}
							onChange={inputChanged}
							placeholder="Search by name"
							className="rounded-3xl text-sm h-12 w-full md:w-80 bg-[#25293E] pl-8 m-auto mb-4 md:m-0"
						/>
						{
							<div className="mt-2 text-sm flex flex-col justify-evenly absolute top-12 w-full">
								{filteredNames.map((user, index) => (
									<div
										key={index}
										className={`absolute z-1 top-0 animate-all duration-200 ease-out bg-[#25293E] h-8 w-80 flex justify-center items-center hover:bg-[#25294F] border-collapse border border-y-1 border-x-0 border-[#1B1E30] ${
											filteredNames.length
												? `translate-y-${index * 8} opacity-100`
												: `-translate-y-10 opacity-0`
										}`}
									>
										<Link
											to="/profile/$slug"
											params={{ slug: user.cfHandle }}
											className="hover:scale-105 transition-all duration-200"
										>
											{user.name}
										</Link>
									</div>
								))}
							</div>
						}
					</div>
					<div className="flex justify-between w-full gap-4 md:w-sm">
						<div className="flex flex-col w-full relative">
							<div
								className="rounded-3xl text-sm h-10 w-full bg-[#25293E] flex justify-center items-center cursor-pointer mt-1 hover:bg-[#25294F] z-2"
								onClick={() => setBatch(!batch)}
								ref={batchRef}
							>
								Batch
							</div>
							{
								<div className="mt-2 text-xs flex flex-col justify-evenly items-center absolute top-10 w-full">
									{batches.map((b, index) => (
										<div
											key={index}
											className={`absolute z-1 top-0 animate-all duration-200 ease-out bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F] border-collapse border border-y-1 border-x-0 border-[#1B1E30] ${
												batch
													? `translate-y-${index * 8} opacity-100`
													: `-translate-y-10 opacity-0`
											}`}
										>
											{b || "N/A"}
										</div>
									))}
								</div>
							}
						</div>
						<div className="flex flex-col w-full relative">
							<div
								className="rounded-3xl text-sm h-10 w-full bg-[#25293E] flex justify-center items-center cursor-pointer mt-1 hover:bg-[#25294F] z-2"
								onClick={() => setLevel(!level)}
								ref={levelRef}
							>
								Level
							</div>
							{
								<div className="mt-2 text-xs flex flex-col justify-evenly items-center absolute top-10 w-full">
									<div
										className={`absolute z-1 top-0 animate-all duration-250 ease-out bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F] border-collapse border border-y-1 border-x-0 border-[#1B1E30] ${
											level
												? `translate-y-0 opacity-100`
												: `-translate-y-10 opacity-0`
										}`}
									>
										Newbie
									</div>
									<div
										className={`absolute z-1 top-0 animate-all duration-250 ease-out bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F] border-collapse border border-y-1 border-x-0 border-[#1B1E30] ${
											level
												? `translate-y-8 opacity-100`
												: `-translate-y-10 opacity-0`
										}`}
									>
										Pupil
									</div>
									<div
										className={`absolute z-1 top-0 animate-all duration-250 ease-out bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F] border-collapse border border-y-1 border-x-0 border-[#1B1E30] ${
											level
												? `translate-y-16 opacity-100`
												: `-translate-y-10 opacity-0`
										}`}
									>
										Specialist
									</div>
									<div
										className={`absolute z-1 top-0 animate-all duration-250 ease-out bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F] border-collapse border border-y-1 border-x-0 border-[#1B1E30] ${
											level
												? `translate-y-24 opacity-100`
												: `-translate-y-10 opacity-0`
										}`}
									>
										Expert
									</div>
									<div
										className={`absolute z-1 top-0 animate-all duration-250 ease-out bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F] border-collapse border border-y-1 border-x-0 border-[#1B1E30] ${
											level
												? `translate-y-32 opacity-100`
												: `-translate-y-10 opacity-0`
										}`}
									>
										Candidate Master
									</div>
									<div
										className={`absolute z-1 top-0 animate-all duration-250 ease-out bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F] border-collapse border border-y-1 border-x-0 border-[#1B1E30] ${
											level
												? `translate-y-40 opacity-100`
												: `-translate-y-10 opacity-0`
										}`}
									>
										Master
									</div>
									<div
										className={`absolute z-1 top-0 animate-all duration-250 ease-out bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F] border-collapse border border-y-1 border-x-0 border-[#1B1E30] ${
											level
												? `translate-y-48 opacity-100 `
												: `-translate-y-10 opacity-0 `
										}`}
									>
										International Master
									</div>
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}