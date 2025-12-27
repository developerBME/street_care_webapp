import { useState, useEffect } from "react";
import { db } from "../component/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import collectionMapping from "./firestoreCollections";

function useSuccessMetrics() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({
    TimeStamp: null,
    HomelessPeopleAided: 12500,
    TotalVolunteers: 900,
    ItemsShared: -81000,
    PeopleMentored: 11000,
    TotalOutreach: 67,
    ChapterMembers: 1800,
  });

  useEffect(() => {
    const fetchLatestMetrics = async () => {
      try {
        const metricsCollectionRef = collection(db, collectionMapping.metrics);
        const q = query(
          metricsCollectionRef,
          orderBy("TimeStamp", "desc"), // Order by TimeStamp descending to get the latest
          limit(1), // Get only the latest document
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const latestDoc = querySnapshot.docs[0];
          const data = latestDoc.data();
          setMetrics({
            TimeStamp: data.TimeStamp || null,
            // Explicitly convert to Number to ensure .toLocaleString() works
            HomelessPeopleAided: Number(data.HomelessPeopleAided) || 0,
            TotalVolunteers: Number(data.TotalVolunteers) || 0,
            ItemsShared: Number(data.ItemsShared) || 0,
            PeopleMentored: Number(data.PeopleMentored) || 0,
            TotalOutreach: Number(data.TotalOutreach) || 0,
            ChapterMembers: Number(data.ChapterMembers) || 0,
          });
        } else {
          console.log("No metrics documents found. Using default values.");
          // If no documents are found, metrics will retain default values.
        }
      } catch (err) {
        console.error("Error fetching latest metrics:", err);
        setError("Failed to fetch metrics.");
        // Metrics will retain default values on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestMetrics();
  }, []); // Empty dependency array means this effect runs once after initial render

  return { isLoading, error, metrics };
}

export default useSuccessMetrics;
