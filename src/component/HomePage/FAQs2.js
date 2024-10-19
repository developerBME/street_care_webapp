import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../../App.css";

export default function FAQs() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    // <div className="mx-auto max-w-8xl px-6 lg:px-8 p-20 bg-gray-100 rounded-lg h-fit">
    <div className="items-center justify-center px-4 py-8 lg:py-16 lg:px-12 h-full w-full rounded-2xl bg-[#F7F7F7]">
      {/* <p className="font-dmsans font-medium text-2xl md:text-[45px] text-[#212121]"> */}
      <p className="font-dmsans font-medium text-2xl lg:text-[45px] text-[#1F0A58]">
        Frequently Asked Questions
      </p>
      <div className=" pt-9">
        <Accordion
          className="mb-2 lg:py-2 lg:px-3 bg-white flex flex-col w-full borderAccordion"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}

          style={
            expanded === "panel1"
              ? { backgroundColor: "#F5EEFE", borderRadius: "12px", boxShadow:"none" }
              : { borderRadius: "12px", boxShadow:"none" }
          }
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className="text-lg font-dmsans"
          >
            <p className=" font-dmsans  font-bold text-base text-[#2C3B3C]">
              What does Street Care do to help homeless individuals?
            </p>
          </AccordionSummary>
          <hr className="h-px bg-gray-300 border-0 "></hr>
          <AccordionDetails>
            <div className="pt-4 font-dmsans font-normal text-sm text-[#2C3B3C]">
                <p>
                    Street Care provides valuable assistance to homeless individuals through its website and mobile app. It provides educational resources, including video tutorials and tip sheets, to help volunteers interact respectfully and safely with homeless individuals. Additionally, Street Care provides information on essential care items for homeless individuals, ensuring that volunteers can provide the most useful support.
                </p>
                <br></br>
                <p>
                    Furthermore, Street Care fosters a sense of community among volunteers and homeless individuals. It offers a platform for sharing outreach experiences, tracking impact, and finding like-minded individuals to engage in outreach efforts together. This sense of community and support enhances the effectiveness of their outreach initiatives.
                </p>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="mb-2 lg:py-2 lg:px-3 bg-white flex flex-col w-full borderAccordion"
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          style={
            expanded === "panel2"
              ? { backgroundColor: "#F5EEFE", borderRadius: "12px", boxShadow:"none" }
              : { borderRadius: "12px", boxShadow:"none" }
          }
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            className="text-lg font-dmsans"
          >
            <p className=" font-dmsans font-bold text-base text-[#2C3B3C]">
              Does Street Care offer emergency shelter for homeless individuals?
            </p>
          </AccordionSummary>
          <hr className="h-px bg-gray-300 border-0 "></hr>
          <AccordionDetails>
            <p className="pt-4 font-dmsans font-normal text-sm text-[#2C3B3C]">
              No, Street Care primarily focuses on equipping volunteers with the
              tools and knowledge to support homeless individuals but does not
              provide emergency shelter services. It serves as a resource for
              those who are seeking to make a positive impact in the lives of homeless
              people.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="mb-2 lg:py-2 lg:px-3 bg-white flex flex-col w-full borderAccordion"
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          style={
            expanded === "panel3"
              ? { backgroundColor: "#F5EEFE", borderRadius: "12px", boxShadow:"none" }
              : { borderRadius: "12px" , boxShadow:"none"}
          }
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
            className="text-lg font-dmsans"
          >
            <p className=" font-dmsans font-bold text-base text-[#2C3B3C]">
              Where is Street Care located, and which areas do you serve?
            </p>
          </AccordionSummary>
          <hr className="h-px bg-gray-300 border-0 "></hr>
          <AccordionDetails>
            <p className="pt-4 font-dmsans font-normal text-sm text-[#2C3B3C]">
            Street Care is a web and mobile app that is not location-specific.
              It can be used by volunteers and individuals located worldwide
              who are seeking to assist homeless people. It transcends geographical
              boundaries and aims to create a global community of volunteers
              dedicated to supporting those in need.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="mb-2 lg:py-2 lg:px-3 bg-white flex flex-col w-full borderAccordion"
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
          style={
            expanded === "panel4"
              ? { backgroundColor: "#F5EEFE", borderRadius: "12px", boxShadow:"none" }
              : { borderRadius: "12px", boxShadow:"none" }
          }
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
            className="text-lg font-dmsans"
          >
            <p className=" font-dmsans font-bold text-base text-[#2C3B3C]">
              Are volunteers needed, and how can I sign up to help?
            </p>
          </AccordionSummary>
          <hr className="h-px bg-gray-300 border-0 "></hr>
          <AccordionDetails>
            <p className="pt-4 font-dmsans font-normal text-sm text-[#2C3B3C]">
              Yes, volunteers are always needed to make a difference in the
              lives of homeless individuals. To explore volunteer opportunities,
              create an account on our platform, and explore the resources and
              tools available to assist homeless people. Click
              <a
                href="https://streetcarenow.org/signup/"
                className="underline px-1 text-blue-500"
              >
                here
              </a>
              to sign up to start as a volunteer and the app will guide you
              through the volunteering process. For a smoother experience,
              consider
              <a
                href="https://streetcare.us/app"
                className="underline px-1 text-blue-500"
                target="_blank"
              >
                downloading our app
              </a>
              for real-time updates and easy sign-ups. Your help can make a big
              difference in the lives of those in need. Thank you!
            </p>
          </AccordionDetails>
        </Accordion>
        {/* <Accordion
          className="p-3 mb-2 bg-white flex flex-col w-full borderAccordion"
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
          style={
            expanded === "panel5"
              ? { backgroundColor: "#F5EEFE", borderRadius: "12px", boxShadow:"none" }
              : { borderRadius: "12px" , boxShadow:"none"}
          }
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel5bh-header"
            className="text-lg font-dmsans"
          >
            <p className="font-dmsans font-bold text-base text-[#2C3B3C]">
              How can I donate to Street Care?
            </p>
          </AccordionSummary>
          <hr className="h-px bg-gray-300 border-0 "></hr>
          <AccordionDetails>
            <p className="font-dmsans font-normal text-base text-[#2C3B3C]">
              At Street Care, we truly believe in the extraordinary power of
              generosity. Visit our website
              <a
                href="https://streetcarenow.org/"
                className="underline px-1 text-blue-500"
              >
                homepage
              </a>
              and click the "Donate" button. On the donation page, you can
              choose your preferred donation and provide the necessary payment
              information. Your support is greatly appreciated, and your
              contribution will go a long way in helping Street Care continue
              its mission to assist those in need. Thank you for creating a
              difference in our community!
            </p>
          </AccordionDetails>
        </Accordion> */}
        <Accordion
          className=" lg:py-2 lg:px-3 bg-white flex flex-col w-full borderAccordion"
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
          style={
            expanded === "panel6"
              ? { backgroundColor: "#F5EEFE", borderRadius: "12px", boxShadow:"none" }
              : { borderRadius: "12px" , boxShadow:"none"}
          }
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6bh-content"
            id="panel6bh-header"
            className="text-lg font-dmsans"
          >
            <p className=" font-dmsans font-bold text-base text-[#2C3B3C]">
              Can you share stories of individuals you've helped in the past?
            </p>
          </AccordionSummary>
          <hr className="h-px bg-gray-300 border-0 "></hr>
          <AccordionDetails>
            <p className="pt-4 font-dmsans font-normal text-sm text-[#2C3B3C]">
              Street Care may feature inspirational stories of volunteers and
              their experiences in the app or on their website. These stories
              can provide insights into the impact volunteers have made on the
              lives of homeless individuals and inspire others to get involved.
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}



