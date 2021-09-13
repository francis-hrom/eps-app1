import React, { useState } from "react";
import validUrl from "valid-url";
import Form from "react-bootstrap/Form";
import { Button, CircularProgress } from "@material-ui/core";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import AssistantIcon from "@material-ui/icons/Assistant";
import SaveIcon from "@material-ui/icons/Save";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

import scanRankings from "../../services/scanRankings";
import addTarget from "../../services/targets/addTarget";

const ScanRankings = (props: any, state: any): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(
    props.url ||
      "https://webscraper.io/test-sites/e-commerce/allinone/phones/touch"
  );
  const [selector, setSelector] = useState(
    props.selector ||
      "html>body>div>div>div>div>div>div>div>div>h4>a:nth-of-type(1)"
  );
  const [items, setItems] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    return url.length > 0 && selector.length > 0;
  };

  const handleSubmit = () => {
    setLoading(true);
    setErrorMessage("");
    setItems([]);
    setSuccessMessage("");

    if (!url || !validUrl.isUri(url)) {
      setErrorMessage("Please enter valid url.");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const rankings = await scanRankings(url, selector);

        setItems(rankings);
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    })();
  };

  const handleSave = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await addTarget(url, selector);

      setSuccessMessage(
        `Target with url ${url} and selector ${selector} has been successfully saved to database.`
      );
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = () => {
    setUrl("");
    setSelector("");
  };

  return (
    <div className="ScanRankings" data-testid="ScanRankings">
      <p>
        Verify Selector tool helps user to verify functionality of a Selector
        (by using Scan Rankings tool in the background). User provides url (web
        page) and selector targeting relevant items. Then EPS visits the web
        page, scans the order of items in the web page and shows the rankings
        list. User can then visually inspect the results and save the Target
        (url, selector) to the database (<Link to="/targets">Targets</Link>).
      </p>

      <Form>
        <Form.Group controlId="url">
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="selector">
          <Form.Label>Selector</Form.Label>
          <Form.Control
            type="text"
            value={selector}
            onChange={(e) => setSelector(e.target.value)}
          />
        </Form.Group>
        {!loading && (
          <>
            <Button
              variant="contained"
              color="primary"
              disabled={!validateForm()}
              onClick={handleSubmit}
              startIcon={<LocationSearchingIcon />}
            >
              Scan Rankings
            </Button>
            <Button
              variant="contained"
              onClick={handleSetDefault}
              startIcon={<AssistantIcon />}
            >
              Remove test data
            </Button>
          </>
        )}
      </Form>

      {items.length > 0 && (
        <Alert severity="success">
          <p>
            Url:{" "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
            <br />
            Rankings: <br />
            <ol>
              {items.map((el, i) => (
                <li key={i}>{el}</li>
              ))}
            </ol>
          </p>
        </Alert>
      )}

      {items.length > 0 && !loading && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          startIcon={<SaveIcon />}
        >
          Save to targets
        </Button>
      )}

      {loading && <CircularProgress />}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
    </div>
  );
};

export default ScanRankings;
