import React, { useState, useEffect, useRef, useCallback } from "react";
import paginationService from "../../services/paginationService";

const reducerFn = (state, action) => {
  switch (action.type) {
    case "NEXT PG": {
      const pg = state.pgNo + 1;
      return { ...state, pgNo: pg };
    }

    case "PREV PG": {
      const pg = state.pgNo - 1;
      return { ...state, pgNo: pg };
    }

    case "SET SEARCHTEXT": {
      const searchText = action.payload;
      return { ...state, searchText: searchText };
    }

    case "SET SORT FIELD": {
      const sortField = action.payload;
      return { ...state, sortField: sortField };
    }

    case "SET PAGE": {
      const pg = action.payload;
      return { ...state, pgNo: pg };
    }
  }
};
//getDocs-> single req res POLL , onSnapShot(query, callback()) -> open connection returns matching query document(auto updates), return unsubscribe()
const usePagination = ({ baseQuery, pageCheckpoints = {} }) => {
  // might not need collectionName baseQuery can be passed which would include the collectionName and pageSize
  // this way we can keep our hook clean , baseQuery includes  collectionName, pageSize thru limit()
  // const [data, setData] = useState({null})
  // const [isLoading,setIsLoading] = useState(true) // using Isloading as StateMachine ?

  const [hookState, setHookState] = useState({
    data: null,
    state: "Loading",
    error: null,
  }); //indicative of our hook's State
  const pgCheckpointsRef = useRef({ pageCheckpoints });
  const [pgParams, dispatch] = useReducer(reducerFn, {
    pgNo: 0,
    searchText: "",
    filterField: {},
  }); // indicative of our PgControllers/ Pgparams State

  //call PaginationService -> superCharged Query, pgCheckpoints

  const getPage = (pgNo) => {
    setHookState({ state: "Loading", data: null, error: null });
    dispatch({ type: "SET PAGE", payload: pgNo });
  };

  const setSearchText = (searchText) => {
    setHookState({ state: "Loading", data: null, error: null });
    dispatch({ type: "SET SEARCHTEXT", payload: searchText });
  };

  const setFilterField = (filters) => {
    setHookState({ state: "Loading", data: null, error: null });
    dispatch({ type: "SET SORT FIELD", payload: filters });
  };

  const pgTriggerFns = {
    getPage,
    setFilterField,
    setSearchText,
  }; //used in parent component like pgTriggerFns.getPage() 0-based page-index

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { pgQuery, pgCheckpoints } = await paginationService(
          baseQuery,
          pgParams,
          pgCheckpointsRef.current,
        );
        pgCheckpointsRef.current = pgCheckpoints;
        const result = await getDocs(pgQuery);
        setHookState({ state: "Success", data: result, error: null });
      } catch (e) {
        console.error("Error Fetching Docs:", e);
        setHookState({ state: "Error", data: null, error: e });
      }
    };

    fetchData();

    //useAbort Controller to Abort requests made
  }, [pgParams]);

  //try and catch block to call the pagination service which will be async

  return {
    hookState,
    pgTriggerFns,
  };
};
