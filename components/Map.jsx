"use client";
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
    setIsClient(true); // once the component is rendered, setIsClient will be set to true
  }, []);

  const option = {
    authOptions: {
      authType: AuthenticationType.subscriptionKey,
      subscriptionKey: "zSbReOBrFyjICuOrhXSlNQHtHNg6fITIMdNSqhOl4_Y",
    },
    style: "satellite", // Set the map style to 'satellite'
  };

  return (
    <div style={{ height: "400px" }} className="">
      {isClient && (
        <AzureMapsProvider>
          <AzureMap options={option}></AzureMap>
        </AzureMapsProvider>
      )}
    </div>
  );
};

export default AzureMapComponent;
