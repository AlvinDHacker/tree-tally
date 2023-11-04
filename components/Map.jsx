"use client";
import { CloudFog } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
	AzureMap,
	AzureMapsProvider,
	AzureMapDataSourceProvider,
	AzureMapFeature,
	IAzureMapFeature,
	AuthenticationType,
} from "react-azure-maps";

const AzureMapComponent = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	var kill = document.getElementsByClassName("map-copyright");
	kill[0]?.remove();

	const option = {
		authOptions: {
			authType: AuthenticationType.subscriptionKey,
			subscriptionKey: "zSbReOBrFyjICuOrhXSlNQHtHNg6fITIMdNSqhOl4_Y",
		},
		style: "satellite",
		enableAccessibility: false,
	};

	return (
		<div style={{ height: "400px" }} className="">
			{isClient && <AzureMap options={option}></AzureMap>}
		</div>
	);
};

export default AzureMapComponent;
