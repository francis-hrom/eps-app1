import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Alert from "@material-ui/lab/Alert";

import getAllRankings from "../../services/rankings/getAllRankings";

const RankingsTable = (): JSX.Element => {
  const [rankings, setRankings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const rankings = await getAllRankings();

        setRankings(rankings);
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    })();
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
        title="Rankings Table"
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
