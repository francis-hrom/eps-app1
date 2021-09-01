import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import MaterialTable, { Column } from "material-table";

import authHeader from "../../services/auth-header";
const { REACT_APP_API } = process.env;

const TargetsTable = (): JSX.Element => {
  const [data, setData] = useState<any[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const columns: Column<any>[] = [
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
      .catch((error) =>
        setErrorMessages(["Server error. Please contact administrator."])
      );
  }, []);

  const handleRowAdd = (newData: any, resolve: any) => {
    setErrorMessages([]);

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
          resolve();
        })
        .catch((error) => {
          setErrorMessages([error]);
          resolve();
        });
    }
  };

  const handleRowUpdate = (newData: any, oldData: any, resolve: any) => {
    setErrorMessages([]);

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
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
        })
        .catch((error) => {
          setErrorMessages([error]);
          resolve();
        });
    }
  };

  const handleRowDelete = (oldData: any, resolve: any) => {
    setErrorMessages([]);

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

  const handleSetDefault = () => {
    const confirmation = confirm(
      "All data from Targets will be deleted and default test data will be added. Do you want want to proceed?"
    );
    if (confirmation) {
      setLoading(true);
      setErrorMessages([]);

      axios
        .post(
          `${REACT_APP_API}/targets/reset-to-default-data`,
          {},
          { headers: authHeader() }
        )
        .then((res) => {
          setData(res.data);
          alert(
            "Data has been reset to defaults successfully! This reset functionality is here just for the testing purposes (in production it would be removed, in order to prevent unwanted data deletion by an user)."
          );
        })
        .catch((error) => {
          setErrorMessages([error]);
        })
        .finally(() => setLoading(false));
    }
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
            emptyDataSourceMessage: (
              <p>
                {errorMessages.length ? "SERVER ERROR" : "Loading data ..."}
              </p>
            ),
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

      {errorMessages.length > 0 && (
        <Alert severity="error">
          <ul>
            {errorMessages.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </ul>
        </Alert>
      )}

      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          onClick={handleSetDefault}
          startIcon={<RestoreFromTrashIcon />}
        >
          Reset to default test data
        </Button>
      )}
    </div>
  );
};

export default TargetsTable;
