import { 
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";



const OUTREACH_EVENTS_COLLECTION = "outreachEvents";
const HELP_REQ_COLLECTION = "helpRequests";
const PERSONAL_VISIT_LOG_COLLECTION = "personalVisitLog";

async function calculateNumberOfPages(collectionType, itemsPerPage) {

  if (itemsPerPage < 1 || itemsPerPage > 10) {
      throw new Error("The number of items per page must be between 1 and 10.");
  }

  let collectionRef;

  switch (collectionType) {
      case "outreachEvents":
          collectionRef = collection(db, OUTREACH_EVENTS_COLLECTION);
          break;
      case "helpRequests":
          collectionRef = collection(db, HELP_REQ_COLLECTION);
          break;
      case "visitLogs":
          collectionRef = collection(db, PERSONAL_VISIT_LOG_COLLECTION);
          break;
      default:
          throw new Error("Invalid collection type specified.");
  }

  const snapshot = await getDocs(collectionRef);
  const totalItems = snapshot.size;

  return Math.ceil(totalItems / itemsPerPage);
}

