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
  { coordinates: [-76.6413, 39.0458], label: "Baltimore" },
  { coordinates: [-73.935242, 40.73061], label: "New York" },
  { coordinates: [-75.695, 45.424721], label: "Canada" },
  { coordinates: [-77.0369, 38.9072], label: "DC" },
  { coordinates: [-71.4774, 41.5801], label: "Rhode Island" },
  { coordinates: [-119.4179, 36.7783], label: "California" },
  { coordinates: [-71.0589, 42.3601], label: "Boston" },
  { coordinates: [-99.9018, 31.9686], label: "Texas" },
];

const Map = () => {
  return (
    // <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
    //   <p className="font-bricolage font-medium md:text-[30px] text-[25px] lg:text-[45px] text-[#1F0A58]">
    //     We are active across countries and continents
    //   </p>
    //   <img src={mapImage} alt="map" className="w-full h-[550px] pt-8" />
    // </div>
    <div className="items-center justify-center px-4 pt-8 pb-2 lg:px-24 lg:pt-24 lg:pb-4 h-full w-full rounded-2xl bg-[#F7F7F7]">
      {/* <p className="font-dmsans font-medium md:text-[30px] text-[25px] lg:text-[45px] text-[#212121] tracking-tight leading-8"> */}
      <p className="font-bricolage font-medium md:text-[30px] text-[25px] lg:text-[44px] text-[#1F0A58] tracking-tight leading-8 pb-4">
        We operate globally across countries and continents
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
          {/* ===== India (index 0) — right ===== */}
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
              y="41"
              width="28"
              height="18"
              rx="9"
              ry="9"
              fill="#172146"
            />
            <text
              x={45}
              y={50}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={8}
              fill="#FFF"
              fontFamily="Open Sans"
            >
              {annotations[0].label}
            </text>
          </Annotation>
          {/* ===== Kenya (index 1) — right ===== */}
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
              y="41"
              width="34"
              height="18"
              rx="9"
              ry="9"
              fill="#172146"
            />
            <text
              x={45}
              y={50}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={8}
              fill="#FFF"
              fontFamily="Open Sans"
            >
              {annotations[1].label}
            </text>
          </Annotation>
          {/* ===== Florida (index 2) — straight down ===== */}
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
              x2="0"
              y2="85"
              stroke="#172146"
              strokeWidth="1"
            />
            <circle cx="0" cy="50" r="1.5" fill="#172146" />
            <rect
              x="-18"
              y="76"
              width="36"
              height="18"
              rx="9"
              ry="9"
              fill="#172146"
            />
            <text
              x={-13}
              y={85}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={8}
              fill="#FFF"
              fontFamily="Open Sans"
            >
              {annotations[2].label}
            </text>
          </Annotation>
          {/* ===== Baltimore (index 3) — right, above DC ===== */}
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
              x2="70"
              y2="55"
              stroke="#172146"
              strokeWidth="1"
            />
            <circle cx="0" cy="50" r="1.5" fill="#172146" />
            <rect
              x="69"
              y="46"
              width="46"
              height="18"
              rx="9"
              ry="9"
              fill="#172146"
            />
            <text
              x={74}
              y={55}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={8}
              fill="#FFF"
              fontFamily="Open Sans"
            >
              {annotations[3].label}
            </text>
          </Annotation>
          {/* ===== New York (index 4) — left ===== */}
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
              x="-84"
              y="41"
              width="44"
              height="18"
              rx="9"
              ry="9"
              fill="#172146"
            />
            <text
              x={-79}
              y={50}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={8}
              fill="#FFF"
              fontFamily="Open Sans"
            >
              {annotations[4].label}
            </text>
          </Annotation>
          {/* ===== Canada (index 5) — straight up ===== */}
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
              x2="0"
              y2="15"
              stroke="#172146"
              strokeWidth="1"
            />
            <circle cx="0" cy="50" r="1.5" fill="#172146" />
            <rect
              x="-19"
              y="6"
              width="38"
              height="18"
              rx="9"
              ry="9"
              fill="#172146"
            />
            <text
              x={-14}
              y={15}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={8}
              fill="#FFF"
              fontFamily="Open Sans"
            >
              {annotations[5].label}
            </text>
          </Annotation>
          {/* ===== DC (index 6) — right, below Baltimore ===== */}
          <Annotation
            key={annotations[6].label}
            subject={annotations[6].coordinates}
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
              x2="70"
              y2="78"
              stroke="#172146"
              strokeWidth="1"
            />
            <circle cx="0" cy="50" r="1.5" fill="#172146" />
            <rect
              x="69"
              y="69"
              width="22"
              height="18"
              rx="9"
              ry="9"
              fill="#172146"
            />
            <text
              x={74}
              y={78}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={8}
              fill="#FFF"
              fontFamily="Open Sans"
            >
              {annotations[6].label}
            </text>
          </Annotation>
          {/* ===== Rhode Island (index 7) — right ===== */}
          <Annotation
            key={annotations[7].label}
            subject={annotations[7].coordinates}
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
              x2="70"
              y2="35"
              stroke="#172146"
              strokeWidth="1"
            />
            <circle cx="0" cy="50" r="1.5" fill="#172146" />
            <rect
              x="69"
              y="26"
              width="58"
              height="18"
              rx="9"
              ry="9"
              fill="#172146"
            />
            <text
              x={74}
              y={35}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={8}
              fill="#FFF"
              fontFamily="Open Sans"
            >
              {annotations[7].label}
            </text>
          </Annotation>
          {/* ===== California (index 8) — upper-left ===== */}
          <Annotation
            key={annotations[8].label}
            subject={annotations[8].coordinates}
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
              x2="-30"
              y2="25"
              stroke="#172146"
              strokeWidth="1"
            />
            <circle cx="0" cy="50" r="1.5" fill="#172146" />
            <rect
              x="-78"
              y="16"
              width="48"
              height="18"
              rx="9"
              ry="9"
              fill="#172146"
            />
            <text
              x={-73}
              y={25}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={8}
              fill="#FFF"
              fontFamily="Open Sans"
            >
              {annotations[8].label}
            </text>
          </Annotation>
          {/* ===== Boston (index 9) — right, top of stack ===== */}
          <Annotation
            key={annotations[9].label}
            subject={annotations[9].coordinates}
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
              x2="70"
              y2="15"
              stroke="#172146"
              strokeWidth="1"
            />
            <circle cx="0" cy="50" r="1.5" fill="#172146" />
            <rect
              x="69"
              y="6"
              width="36"
              height="18"
              rx="9"
              ry="9"
              fill="#172146"
            />
            <text
              x={74}
              y={15}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={8}
              fill="#FFF"
              fontFamily="Open Sans"
            >
              {annotations[9].label}
            </text>
          </Annotation>
          {/* ===== Texas (index 10) — left ===== */}
          <Annotation
            key={annotations[10].label}
            subject={annotations[10].coordinates}
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
              x="-72"
              y="41"
              width="32"
              height="18"
              rx="9"
              ry="9"
              fill="#172146"
            />
            <text
              x={-67}
              y={50}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={8}
              fill="#FFF"
              fontFamily="Open Sans"
            >
              {annotations[10].label}
            </text>
          </Annotation>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Map;

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