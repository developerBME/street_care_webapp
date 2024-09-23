import {
    collection,
    getDocs,
    getDoc,
    doc,
    orderBy,
    updateDoc,
    query,
    where,
    limit,
    startAt,
    or,
   } from "firebase/firestore";
   import { db } from "./firebase";
   import { getAuth, onAuthStateChanged } from "firebase/auth";
   import logEvent from "./FirebaseLogger";
   import { Timestamp } from 'firebase/firestore';

   const OUTREACH_EVENTS_COLLECTION = "outreachEvents";
   const PAST_OUTREACH_EVENTS_COLLECTION = "pastOutreachEvents";
   const HELP_REQ_COLLECTION = "helpRequests";
   const PERSONAL_VISIT_LOG_COLLECTION = "personalVisitLog";

// Function for Calculating the number of pages for the PastOutreachEvents.
   export async function calculateNumberOfPages(outreachesPerPage) {
    if (outreachesPerPage < 1 || outreachesPerPage > 10) {
      throw new Error(
        "The number of outreaches per page must be between 1 and 10."
      );
    }
   
   
    const outreachEventsRef = collection(db, OUTREACH_EVENTS_COLLECTION);
    const snapshot = await getDocs(outreachEventsRef);
    const totalOutreaches = snapshot.size;
   
    return Math.ceil(totalOutreaches / outreachesPerPage);
   }


// Function for Calculating the number of pages for the helprequests.
   export async function calculateNumberOfPagesForHelpReq(helpReqPerPage) {
    if (helpReqPerPage < 1 || helpReqPerPage > 10) {
      throw new Error(
        "The number of help requests per page must be between 1 and 10."
      );
    }
  
    const helpRequestRef = collection(db, HELP_REQ_COLLECTION);
    const snapshot = await getDocs(helpRequestRef);
    const totalHelpRequests = snapshot.size;
  
    return Math.ceil(totalHelpRequests / helpReqPerPage);
  }



// Function for Calculating the number of pages for the visitlogs.
  export async function calculateNumberOfPagesForVisitlog(visitlogPerPage) {
    if (visitlogPerPage < 1 || visitlogPerPage > 10) {
      throw new Error(
        "The number of visitlogs per page must be between 1 and 10."
      );
    }
  
    const visitlogRef = collection(db, PERSONAL_VISIT_LOG_COLLECTION);
    const snapshot = await getDocs(visitlogRef);
    const totalVisitlogs = snapshot.size;
  
    return Math.ceil(totalVisitlogs / visitlogPerPage);
  }

