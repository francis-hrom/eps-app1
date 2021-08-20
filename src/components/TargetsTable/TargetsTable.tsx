// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import "./TargetsTable.css";
import authHeader from "../../services/auth-header";
const { REACT_APP_API } = process.env;

const TargetsTable = (): JSX.Element => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Url",
      field: "url",
      editable: "onAdd",
    },
    {
      title: "Selector",
      field: "selector",
    },
  ];

  useEffect(() => {
    axios
      .get(`${REACT_APP_API}/targets`, { headers: authHeader() })
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="TargetsTable" data-testid="TargetsTable">
      <MaterialTable
        title="Targets"
        data={data}
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
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);

                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000);
            }),
        }}
      />
    </div>
  );
};

export default TargetsTable;
