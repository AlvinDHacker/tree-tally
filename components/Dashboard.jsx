"use client";
import { Leaf, Scan, TreeDeciduous, Upload, Wind } from "lucide-react";
import Image from "next/image";
import Map from "./Map";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import MyMap from "./Map2";
import { useState } from "react";

const Dashboard = () => {
	const [data, setData] = useState([
		{
			num: "-",
			type: "Tree Count",
			icon: <TreeDeciduous />,
		},
		{
			num: "Pine",
			type: "Tree Type",
			icon: <Leaf />,
		},
		{
			num: "79.3%",
			type: "AQI Index",
			icon: <Wind />,
		},
	]);

	const handleFileChange = async (e) => {
		const file = e.target.files[0];

		if (!file) {
			console.error("No file selected.");
			return;
		}

		const formData = new FormData();
		formData.append("image", file);

		try {
			const response = await fetch("/api/upload", {
				mode: "no-cors",
				method: "POST",
				body: formData,
			});

			console.log(response);

			if (response.ok) {
				const res = await response.json();
				console.log("File upload response:", data);
				const newData = data.map((obj, i) => {
					if (i === 0) {
						// Create a new object with the spread operator
						return { ...obj, num: res.count.toString() };
					}
					return obj;
				});

				setData(newData);
			} else {
				console.error("Error uploading file:", response.statusText);
			}
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};

	return (
		<div className="h-[90vh] w-[90%] mx-auto">
			<div className="p-2 grid md:grid-cols-3 h-full">
				<div className="col-span-2">
					<div className="relative h-[75vh] bg-slate-800 rounded-lg w-full">
						{/* <div className="grid md:grid-cols-2">
            <Image src='/img/canopy.jpeg' className="my-1 rounded-lg" width={440} height={100}/>
            <Image src='/img/treescan.jpeg' className="my-1 rounded-lg" width={440} height={100}/>
            </div> */}
						<Map />
						{/* <MyMap position={[51.505, -0.09]} zoom={13} /> */}
						<div className="absolute w-[65%] top-3 left-3">
							<form>
								<label
									for="default-search"
									className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
								>
									Search
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<svg
											className="w-4 h-4 text-gray-500 dark:text-gray-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 20 20"
										>
											<path
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
											/>
										</svg>
									</div>
									<input
										type="search"
										id="default-search"
										className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Search Area, Locations..."
										required
									/>
									<button
										type="submit"
										className="text-white absolute right-1.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										Search
									</button>
								</div>
							</form>
						</div>
						<div className="absolute flex flex-col bottom-3 right-3">
							<input
								onChange={handleFileChange}
								id="mapTile"
								type="file"
								hidden
							/>
							<button
								onClick={() => {
									document.getElementById("mapTile").click();
								}}
								type="button"
								className="rounded-full my-2 p-2 bg-white"
							>
								<Upload />
							</button>
							<button
								type="button"
								className="rounded-full p-2 bg-white"
							>
								<Scan />
							</button>
						</div>
					</div>
					<div className="grid md:grid-cols-3 gap-2 ">
						{data.map((values, index) => (
							<a
								key={index}
								href="#"
								className="block max-w-sm p-6 my-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
							>
								<h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
									{values.num}
								</h5>
								<div className="flex gap-3">
									{values.icon}
									<p className="font-normal text-gray-700 dark:text-gray-400">
										{values.type}
									</p>
								</div>
							</a>
						))}
					</div>
				</div>
				<div className="bg-slate-800 ml-2 my-1 rounded-lg"></div>
			</div>
		</div>
	);
};

export async function getServerSideProps() {
	return {
		props: {
			ssr: false, // Disable SSR for this component
		},
	};
}

export default Dashboard;
