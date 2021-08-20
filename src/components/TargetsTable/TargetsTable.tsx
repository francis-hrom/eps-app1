// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import "./TargetsTable.css";
import authHeader from "../../services/auth-header";
import Alert from "react-bootstrap/Alert";

const { REACT_APP_API } = process.env;

const TargetsTable = (): JSX.Element => {
  const [data, setData] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

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
      .catch((error) => setErrorMessages([error]));
  }, []);

  const handleRowAdd = (newData, resolve) => {
    //validation
    const errorList = [];
    const { url, selector } = newData;
    if (!url) {
      errorList.push("Please enter valid url.");
    }
    if (!selector) {
      errorList.push("Please enter a valid selector.");
    }

    if (errorList.length > 0) {
      setErrorMessages(errorList);
      resolve();
    } else {
      //no error
      axios
        .post(
          `${REACT_APP_API}/targets`,
          { url, selector },
          { headers: authHeader() }
        )
        .then((res) => {
          const dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          setErrorMessages([]);
          resolve();
        })
        .catch((error) => {
          setErrorMessages([error]);
          resolve();
        });
    }
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    const errorList = [];
    const { _id, selector } = newData;
    if (!selector) {
      errorList.push("Please enter a valid selector.");
    }

    if (errorList.length > 0) {
      setErrorMessages(errorList);
      resolve();
    } else {
      axios
        .patch(
          `${REACT_APP_API}/targets/${_id}`,
          { selector },
          { headers: authHeader() }
        )
        .then((res) => {
          const dataUpdate = [...data];
          console.log(dataUpdate);
          const index = oldData.tableData.id;
          console.log(index);
          dataUpdate[index] = newData;
          console.log(dataUpdate);
          setData([...dataUpdate]);
          setErrorMessages([]);

          resolve();
        })
        .catch((error) => {
          setErrorMessages([error]);
          resolve();
        });
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    axios
      .delete(`${REACT_APP_API}/targets/${oldData._id}`, {
        headers: authHeader(),
      })
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages([error]);
        resolve();
      });
  };

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
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve);
            }),
        }}
      />
      {errorMessages.length > 0 ? (
        <Alert variant="danger">
          <ul>
            {errorMessages.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </ul>
        </Alert>
      ) : (
        ""
      )}
    </div>
  );
};

export default TargetsTable;
