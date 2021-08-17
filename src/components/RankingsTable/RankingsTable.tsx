import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import "./RankingsTable.css";
import authHeader from "../../services/auth-header";
const { REACT_APP_API } = process.env;

const RankingsTable = (): JSX.Element => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    axios
      .get(`${REACT_APP_API}/rankings`, { headers: authHeader() })
      .then((response) => {
        setRankings(response.data);
      })
      .catch((e) => console.error(e));
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
    {
      title: "Date",
      field: "date",
      render: (rowData: any) =>
        new Date(rowData.date).toISOString().slice(0, 10),
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
            emptyDataSourceMessage: <p>Loading data ...</p>,
          },
        }}
      />
    </div>
  );
};

export default RankingsTable;
