import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQs() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    // <div className="mx-auto max-w-8xl px-6 lg:px-8 p-20 bg-gray-100 rounded-lg h-fit">
    <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
      <p className="font-dmsans font-medium text-2xl md:text-[45px] text-[#212121]">
        Frequently Asked Questions
      </p>
      <div className=" pt-9">
        <Accordion
          className="p-3 mb-2 bg-white flex flex-col rounded-lg w-full"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className="text-lg font-dmsans"
          >
            <p className="font-dmsans font-medium text-[#2C3B3C]">
              What does Street Care do to help homeless individuals?
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="font-dmsans font-normal text-[#2C3B3C]">
              Street Care provides volunteers with a psychological toolkit and
              instructional resources to empower them to assist homeless
              individuals. The app offers guidance on providing resources,
              counseling, and emotional support. It also facilitates community
              engagement and offers a platform for users to seek or offer help
              within homeless population.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="p-3 mb-2 bg-white flex flex-col rounded-lg w-full"
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            className="text-lg font-dmsans"
          >
            <p className="font-dmsans font-medium text-[#2C3B3C]">
              Does Street Care offer emergency shelter for homeless individuals?
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="font-dmsans font-normal text-[#2C3B3C]">
              No, Street Care primarily focuses on equipping volunteers with the
              tools and knowledge to support homeless individuals but does not
              provide emergency shelter services. It serves as a resource for
              those who want to make a positive impact in the lives of homeless
              people.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="p-3 mb-2 bg-white flex flex-col rounded-lg w-full"
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
            className="text-lg font-dmsans"
          >
            <p className="font-dmsans font-medium text-[#2C3B3C]">
              Where is Street Care located, and which areas do you serve?
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="font-dmsans font-normal text-[#2C3B3C]">
              Street Care is a web and mobile app and is not location-specific.
              It can be used by volunteers and individuals anywhere in the world
              who want to assist homeless people. It transcends geographical
              boundaries and aims to create a global community of volunteers
              dedicated to helping homeless people.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="p-3 mb-2 bg-white flex flex-col rounded-lg w-full"
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
            className="text-lg font-dmsans"
          >
            <p className="font-dmsans font-medium text-[#2C3B3C]">
              Are volunteers needed, and how can I sign up to help?
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="font-dmsans font-normal text-[#2C3B3C]">
              Yes, volunteers are always needed to make a difference in the
              lives of homeless individuals. To explore volunteer opportunities,
              create an account on our platform, and explore the resources and
              tools available to assist homeless people. Click
              <a
                href="https://street-care-feature.vercel.app/signup2"
                className="underline px-1 text-blue-500"
              >
                here
              </a>
              to sign up to start as a volunteer and the app will guide you
              through the volunteering process. For a smoother experience,
              consider
              <a className="underline px-1 text-blue-500">
                downloading our app
              </a>
              for real-time updates and easy sign-ups. Your help can make a big
              difference in the lives of those in need. Thank you!
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="p-3 mb-2 bg-white flex flex-col rounded-lg w-full"
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel5bh-header"
            className="text-lg font-dmsans"
          >
            <p className="font-dmsans font-medium text-[#2C3B3C]">
              How can I donate to Street Care?
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="font-dmsans font-normal text-[#2C3B3C]">
              At Street Care, we truly believe in the extraordinary power of
              generosity. Visit our website
              <a
                href="https://street-care-feature.vercel.app/"
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
        </Accordion>
        <Accordion
          className="p-3 mb-2 bg-white flex flex-col rounded-lg w-full"
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6bh-content"
            id="panel6bh-header"
            className="text-lg font-dmsans"
          >
            <p className="font-dmsans font-medium text-[#2C3B3C]">
              Can you share stories of individuals who have helped in the past?
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="font-dmsans font-normal text-[#2C3B3C]">
              Street Care may feature inspirational stories of volunteers and
              their experiences in the app or on their website. These stories
              can provide insights into the impact volunteers have made in the
              lives of homeless individuals and inspire others to get involved.
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
