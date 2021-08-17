import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import "./TargetsTable.css";
import authHeader from "../../services/auth-header";
const { REACT_APP_API } = process.env;

const TargetsTable = (): JSX.Element => {
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    axios
      .get(`${REACT_APP_API}/targets`, { headers: authHeader() })
      .then((response) => {
        setTargets(response.data);
      })
      .catch((e) => console.error(e));
  }, []);

  const columns = [
    {
      title: "Url",
      field: "url",
    },
    {
      title: "Selector",
      field: "selector",
    },
  ];

  return (
    <div className="TargetsTable" data-testid="TargetsTable">
      <MaterialTable
        title="Targets"
        data={targets}
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

export default TargetsTable;
