import React, { useState, useEffect } from "react";
import validUrl from "valid-url";
import { Button, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import MaterialTable, { Column } from "material-table";

import getAllTargets from "../../services/targets/getAllTargets";
import addTarget from "../../services/targets/addTarget";
import editTarget from "../../services/targets/editTarget";
import deleteTarget from "../../services/targets/deleteTarget";
import resetTargets from "../../services/targets/resetTargets";

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
    (async () => {
      try {
        const targets = await getAllTargets();

        setData(targets);
      } catch (error: any) {
        setErrorMessages([error.message]);
      }
    })();
  }, []);

  const handleRowAdd = (newData: any, resolve: any) => {
    setErrorMessages([]);

    const errorList = [];
    const { url, selector } = newData;

    if (!url || !validUrl.isUri(url)) {
      errorList.push("Please enter valid url.");
    }
    if (!selector) {
      errorList.push("Please enter a valid selector.");
    }

    if (errorList.length > 0) {
      setErrorMessages(errorList);
    } else {
      (async () => {
        try {
          const newTarget = await addTarget(url, selector);

          setData([...data, newTarget]);
        } catch (error: any) {
          setErrorMessages([error.message]);
        }
      })();
    }

    resolve();
  };

  const handleRowUpdate = (newData: any, oldData: any, resolve: any) => {
    setErrorMessages([]);

    const errorList = [];
    const { id, selector } = newData;

    if (!selector) {
      errorList.push("Please enter a valid selector.");
    }

    if (errorList.length > 0) {
      setErrorMessages(errorList);
    } else {
      (async () => {
        try {
          await editTarget(id, selector);

          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;

          setData([...dataUpdate]);
        } catch (error: any) {
          setErrorMessages([error.message]);
        }
      })();
    }

    resolve();
  };

  const handleRowDelete = async (oldData: any, resolve: any) => {
    setErrorMessages([]);

    try {
      await deleteTarget(oldData.id);

      const dataDelete = [...data];
      const index = oldData.tableData.id;
      dataDelete.splice(index, 1);

      setData([...dataDelete]);
    } catch (error: any) {
      setErrorMessages([error.message]);
    } finally {
      resolve();
    }
  };

  const handleSetDefault = () => {
    const confirmation = confirm(
      "All data from Targets will be deleted and default test data will be added. Do you want want to proceed?"
    );
    if (confirmation) {
      setLoading(true);
      setErrorMessages([]);

      (async () => {
        try {
          const defaultTargets = await resetTargets();

          setData(defaultTargets);

          alert(
            "Data has been reset to defaults successfully! This reset functionality is here just for the testing purposes (in production it would be removed, in order to prevent unwanted data deletion by an user)."
          );
        } catch (error: any) {
          setErrorMessages([error.message]);
        } finally {
          setLoading(false);
        }
      })();
    }
  };

  return (
    <div className="TargetsTable" data-testid="TargetsTable">
      <MaterialTable
        title="Targets Table"
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
