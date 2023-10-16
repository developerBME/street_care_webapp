import React from "react";
import mapImage from "../../images/map.png";
import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import features from "../../utils/features.json";

const annotations = [
  { coordinates: [78.9629, 20.5937], label: "India" },
  { coordinates: [37.9062, 0.0236], label: "Kenya" },
  { coordinates: [-81.5158, 27.6648], label: "Florida" },
  { coordinates: [-76.6413, 39.0458], label: "Maryland" },
  { coordinates: [-73.935242, 40.73061], label: "New York" },
  { coordinates: [-75.695, 45.424721], label: "Ottawa" },
];

const Map = () => {
  return (
    // <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
    //   <p className="font-bricolage font-medium md:text-[30px] text-[25px] lg:text-[45px] text-[#1F0A58]">
    //     We are active across countries and continents
    //   </p>
    //   <img src={mapImage} alt="map" className="w-full h-[550px] pt-8" />
    // </div>
    <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
      <p className="font-bricolage font-medium md:text-[30px] text-[25px] lg:text-[45px] text-[#1F0A58]">
        We are active across countries and continents
      </p>
      <ComposableMap>
        <ZoomableGroup zoom={1} center={[15, 0]}>
          <Geographies geography={features}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="#000"
                  strokeWidth={0.04}
                  style={{
                    default: {
                      fill: "#D3D3D3",
                    },
                    hover: {
                      fill: "#D3D3D3",
                    },
                  }}
                />
              ))
            }
          </Geographies>
          {annotations.map((annotation, index) => (
            <Annotation
              key={index}
              subject={annotation.coordinates}
              dx={0}
              dy={-40}
              // connectorProps={{
              //   stroke: "#FFF",
              //   strokeWidth: 1,
              //   strokeLinecap: "round",
              // }}
            >
              <text
                x="-12"
                y={-6}
                textAnchor="start"
                alignmentBaseline="middle"
                fontSize={10}
                fill="#172146"
                fontFamily="Open Sans"
              >
                {annotation.label}
              </text>
              <line
                x1="0"
                x2="0"
                y1="0"
                y2="35"
                stroke="#172146"
                strokeWidth="1"
              />
              <circle cx="0" cy="40" r="2" fill="#172146" />
            </Annotation>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Map;
