import React from "react";
import {
	AzureMap,
	AzureMapsProvider,
	AzureMapDataSourceProvider,
	AzureMapFeature,
	IAzureMapFeature,
	AuthenticationType,
} from "react-azure-maps";

const AzureMapComponent = () => {
	const option = {
		authOptions: {
			authType: AuthenticationType.subscriptionKey,
			subscriptionKey: "zSbReOBrFyjICuOrhXSlNQHtHNg6fITIMdNSqhOl4_Y", // Replace with your Azure Maps subscription key
		},
	};

	return (
		<div style={{ height: "400px" }}>
			<AzureMapsProvider>
				<AzureMap options={option}></AzureMap>
			</AzureMapsProvider>
		</div>
	);
};

export default AzureMapComponent;
