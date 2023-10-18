// Old
// import React from "react";
// import mapImage from "../../images/map.png";
// import {
//   Annotation,
//   ComposableMap,
//   Geographies,
//   Geography,
//   ZoomableGroup,
// } from "react-simple-maps";
// import features from "../../utils/features.json";

// const annotations = [
//   { coordinates: [78.9629, 20.5937], label: "India" },
//   { coordinates: [37.9062, 0.0236], label: "Kenya" },
//   { coordinates: [-81.5158, 27.6648], label: "Florida" },
//   { coordinates: [-76.6413, 39.0458], label: "Maryland" },
//   { coordinates: [-73.935242, 40.73061], label: "New York" },
//   { coordinates: [-75.695, 45.424721], label: "Ottawa" },
// ];

// const Map = () => {
//   return (
//     // <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
//     //   <p className="font-bricolage font-medium md:text-[30px] text-[25px] lg:text-[45px] text-[#1F0A58]">
//     //     We are active across countries and continents
//     //   </p>
//     //   <img src={mapImage} alt="map" className="w-full h-[550px] pt-8" />
//     // </div>
//     <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
//       <p className="font-bricolage font-medium md:text-[30px] text-[25px] lg:text-[45px] text-[#1F0A58]">
//         We are active across countries and continents
//       </p>
//       <ComposableMap>
//         <ZoomableGroup zoom={1} center={[15, 0]}>
//           <Geographies geography={features}>
//             {({ geographies }) =>
//               geographies.map((geo) => (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   stroke="#000"
//                   strokeWidth={0.04}
//                   style={{
//                     default: {
//                       fill: "#D3D3D3",
//                     },
//                     hover: {
//                       fill: "#D3D3D3",
//                     },
//                   }}
//                 />
//               ))
//             }
//           </Geographies>
//           {annotations.map((annotation, index) => (
//             <Annotation
//               key={index}
//               subject={annotation.coordinates}
//               dx={0}
//               dy={-40}
//               // connectorProps={{
//               //   stroke: "#FFF",
//               //   strokeWidth: 1,
//               //   strokeLinecap: "round",
//               // }}
//             >
//               <text
//                 x="-12"
//                 y={-6}
//                 textAnchor="start"
//                 alignmentBaseline="middle"
//                 fontSize={10}
//                 fill="#172146"
//                 fontFamily="Open Sans"
//               >
//                 {annotation.label}
//               </text>
//               <line
//                 x1="0"
//                 x2="0"
//                 y1="0"
//                 y2="35"
//                 stroke="#172146"
//                 strokeWidth="1"
//               />
//               <circle cx="0" cy="40" r="2" fill="#172146" />
//             </Annotation>
//           ))}
//         </ZoomableGroup>
//       </ComposableMap>
//     </div>
//   );
// };

// export default Map;

// Updated
// import React from "react";
// import mapImage from "../../images/map.png";
// import {
//   Annotation,
//   ComposableMap,
//   Geographies,
//   Geography,
//   ZoomableGroup,
// } from "react-simple-maps";
// import features from "../../utils/features.json";

// const annotations = [
//   { coordinates: [78.9629, 20.5937], label: "India" },
//   { coordinates: [37.9062, 0.0236], label: "Kenya" },
//   { coordinates: [-81.5158, 27.6648], label: "Florida" },
//   { coordinates: [-76.6413, 39.0458], label: "Maryland" },
//   { coordinates: [-73.935242, 40.73061], label: "New York" },
//   { coordinates: [-75.695, 45.424721], label: "Ottawa" },
// ];

// const Map = () => {
//   return (
//     // <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
//     //   <p className="font-bricolage font-medium md:text-[30px] text-[25px] lg:text-[45px] text-[#1F0A58]">
//     //     We are active across countries and continents
//     //   </p>
//     //   <img src={mapImage} alt="map" className="w-full h-[550px] pt-8" />
//     // </div>
//     <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
//       <p className="font-bricolage font-medium md:text-[30px] text-[25px] lg:text-[45px] text-[#1F0A58]">
//         We are active across countries and continents
//       </p>
//       <ComposableMap>
//         <ZoomableGroup zoom={1} center={[15, 0]}>
//           <Geographies geography={features}>
//             {({ geographies }) =>
//               geographies.map((geo) => (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   stroke="#000"
//                   strokeWidth={0.04}
//                   style={{
//                     default: {
//                       fill: "#D3D3D3",
//                     },
//                     hover: {
//                       fill: "#D3D3D3",
//                     },
//                   }}
//                 />
//               ))
//             }
//           </Geographies>
//           {annotations.map((annotation, index) => (
//             <Annotation
//               key={index}
//               subject={annotation.coordinates}
//               dx={0}
//               dy={-50}
//               connectorProps={{
//                 stroke: "#FFF",
//                 strokeWidth: 0,
//                 strokeLinecap: "round",
//               }}
//             >
//               <line
//                 x1="0"
//                 y1="50"
//                 x2="40"
//                 y2="50"
//                 stroke="black"
//                 strokeWidth="1"
//               />
//               {/* <line
//                 x1="0"
//                 y1="50"
//                 x2="30"
//                 y2="50"
//                 stroke="black"
//                 strokeWidth="1"
//               />
//               <line
//                 x1="30"
//                 y1="50"
//                 x2="40"
//                 y2="40"
//                 stroke="black"
//                 strokeWidth="1"
//               /> */}
//               <circle cx="0" cy="50" r="1.5" fill="#172146" />
//               {/* <polygon
//                 // points="20,20 20,40 100,40 100,20"
//                 points="40,40 40,60 90,60 90,40"
//                 fill="lightblue"
//                 fillOpacity={0.5}
//                 opacity={0.5}
//               /> */}
//               <rect
//                 x="40"
//                 y="35"
//                 width="50"
//                 height="30"
//                 rx="10"
//                 ry="10"
//                 fill="#172146"
//                 // fillOpacity={0.9}
//                 // opacity={0.3}
//               />
//               <text
//                 x={42}
//                 y={50}
//                 textAnchor="start"
//                 alignmentBaseline="middle"
//                 fontSize={10}
//                 fill="white"
//                 fontFamily="Open Sans"
//               >
//                 {annotation.label}
//               </text>
//             </Annotation>
//           ))}
//         </ZoomableGroup>
//       </ComposableMap>
//     </div>
//   );
// };

// export default Map;

// Updated with manual coordinates
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
          <Annotation
            key={annotations[0].label}
            subject={annotations[0].coordinates}
            dx={0}
            dy={-50}
            connectorProps={{
              stroke: "#FFF",
              strokeWidth: 0,
              strokeLinecap: "round",
            }}
          >
            <line
              x1="0"
              y1="50"
              x2="41"
              y2="50"
              stroke="#172146"
              strokeWidth="1"
            />
            <circle cx="0" cy="50" r="1.5" fill="#172146" />
            <rect
              x="40"
              y="37"
              width="35"
              height="25"
              rx="11"
              ry="14"
              fill="#172146"
              // fillOpacity={0.9}
              // opacity={0.3}
            />
            <text
              x={46}
              y={50}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={10}
              fill="#FFF"
              fontFamily="Open Sans"
            >
              {annotations[0].label}
            </text>
          </Annotation>
          <Annotation
            key={annotations[1].label}
            subject={annotations[1].coordinates}
            dx={0}
            dy={-50}
            connectorProps={{
              stroke: "#FFF",
              strokeWidth: 0,
              strokeLinecap: "round",
            }}
          >
            <line
              x1="0"
              y1="50"
              x2="41"
              y2="50"
              stroke="#172146"
              strokeWidth="1"
            />
            <circle cx="0" cy="50" r="1.5" fill="#172146" />
            <rect
              x="40"
              y="36"
              width="43"
              height="25"
              rx="11"
              ry="14"
              fill="#172146"
              // fillOpacity={0.9}
              // opacity={0.3}
            />
            <text
              x={47}
              y={48}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={10}
              fill="#FFF"
              fontFamily="Open Sans"
            >
              {annotations[1].label}
            </text>
          </Annotation>
          <Annotation
            key={annotations[2].label}
            subject={annotations[2].coordinates}
            dx={0}
            dy={-50}
            connectorProps={{
              stroke: "#FFF",
              strokeWidth: 0,
              strokeLinecap: "round",
            }}
          >
            <line
              x1="0"
              y1="50"
              x2="41"
              y2="50"
              stroke="#172146"
              strokeWidth="1"
            />
            <circle cx="0" cy="50" r="1.5" fill="#172146" />
            <rect
              x="40"
              y="36"
              width="45"
              height="25"
              rx="11"
              ry="14"
              fill="#172146"
              // fillOpacity={0.9}
              // opacity={0.3}
            />
            <text
              x={46}
              y={49}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={10}
              fill="#FFF"
              fontFamily="Open Sans"
            >
              {annotations[2].label}
            </text>
          </Annotation>
          <Annotation
            key={annotations[3].label}
            subject={annotations[3].coordinates}
            dx={0}
            dy={-50}
            connectorProps={{
              stroke: "#FFF",
              strokeWidth: 0,
              strokeLinecap: "round",
            }}
          >
            <line
              x1="0"
              y1="50"
              x2="41"
              y2="50"
              stroke="#172146"
              strokeWidth="1"
            />
            <circle cx="0" cy="50" r="1.5" fill="#172146" />
            <rect
              x="40"
              y="36"
              width="55"
              height="25"
              rx="11"
              ry="14"
              fill="#172146"
              // fillOpacity={0.9}
              // opacity={0.3}
            />
            <text
              x={45}
              y={49}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={10}
              fill="#FFF"
              fontFamily="Open Sans"
            >
              {annotations[3].label}
            </text>
          </Annotation>
          <Annotation
            key={annotations[4].label}
            subject={annotations[4].coordinates}
            dx={0}
            dy={-50}
            connectorProps={{
              stroke: "#FFF",
              strokeWidth: 0,
              strokeLinecap: "round",
            }}
          >
            <line
              x1="0"
              y1="50"
              x2="-41"
              y2="50"
              stroke="#172146"
              strokeWidth="1"
            />
            <circle cx="0" cy="50" r="1.5" fill="#172146" />
            <rect
              x="-95"
              y="35"
              width="55"
              height="25"
              rx="11"
              ry="14"
              fill="#172146"
              // fillOpacity={0.9}
              // opacity={0.3}
            />
            <text
              x={-90}
              y={48}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={10}
              fill="#FFF"
              fontFamily="Open Sans"
            >
              {annotations[4].label}
            </text>
          </Annotation>
          <Annotation
            key={annotations[5].label}
            subject={annotations[5].coordinates}
            dx={0}
            dy={-50}
            connectorProps={{
              stroke: "#FFF",
              strokeWidth: 0,
              strokeLinecap: "round",
            }}
          >
            <line
              x1="0"
              y1="50"
              x2="86"
              y2="50"
              stroke="#172146"
              strokeWidth="1"
            />
            <circle cx="0" cy="50" r="1.5" fill="#172146" />
            <rect
              x="85"
              y="36"
              width="46"
              height="25"
              rx="11"
              ry="14"
              fill="#172146"
              // fillOpacity={0.9}
              // opacity={0.3}
            />
            <text
              x={90}
              y={48}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={10}
              fill="#FFF"
              fontFamily="Open Sans"
            >
              {annotations[5].label}
            </text>
          </Annotation>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Map;
