import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import Alert from "@material-ui/lab/Alert";

import authHeader from "../../services/auth-header";
const { REACT_APP_API } = process.env;

const RankingsTable = (): JSX.Element => {
  const [rankings, setRankings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${REACT_APP_API}/rankings`, { headers: authHeader() })
      .then((response) => {
        setRankings(response.data);
      })
      .catch((error) => {
        setErrorMessage("Server error. Please contact administrator.");
      });
  }, []);

  const columns = [
    {
      title: "Item",
      field: "item",
    },
    {
      title: "Url",
      field: "url",
    },
    {
      title: "Rank",
      field: "rank",
    },
  ];

  return (
    <div className="RankingsTable" data-testid="RankingsTable">
      <MaterialTable
        title="Rankings"
        data={rankings}
        columns={columns}
        options={{
          search: true,
          paging: true,
          filtering: true,
          exportButton: true,
          exportAllData: true,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: (
              <p>{errorMessage ? "SERVER ERROR" : "Loading data ..."}</p>
            ),
          },
        }}
      />
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </div>
  );
};

export default RankingsTable;
