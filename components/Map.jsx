import React from "react";
import {
	AzureMap,
	AzureMapsProvider,
	AzureMapDataSourceProvider,
	AzureMapFeature,
	IAzureMapFeature,
} from "react-azure-maps";
import { AuthenticationType, AzureMapFeatureType } from "azure-maps-control";

const AzureMapComponent = () => {
	const option = {
		authOptions: {
			authType: AuthenticationType.subscriptionKey,
			subscriptionKey: "zSbReOBrFyjICuOrhXSlNQHtHNg6fITIMdNSqhOl4_Y", // Replace with your Azure Maps subscription key
		},
	};

	const data = {
		type: AzureMapFeatureType.Point,
		properties: {
			icon: "pin-round-darkblue",
		},
		geometry: {
			coordinates: [-122.335167, 47.608013], // Example coordinates for the map center
		},
	};

	return (
		<div style={{ height: "400px" }}>
			<AzureMapsProvider>
				<AzureMap options={option}>
					<AzureMapDataSourceProvider id="dataSource">
						<AzureMapFeature
							id="feature"
							type={AzureMapFeatureType.Point}
							properties={data.properties}
							geometry={data.geometry}
						/>
					</AzureMapDataSourceProvider>
				</AzureMap>
			</AzureMapsProvider>
		</div>
	);
};

export default AzureMapComponent;
