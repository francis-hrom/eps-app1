import React, { useState } from "react";
import validUrl from "valid-url";
import { Form } from "react-bootstrap";
import { Button, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import SearchIcon from "@material-ui/icons/Search";
import AssistantIcon from "@material-ui/icons/Assistant";

import findSelector from "../../services/findSelector";
import ScanRankings from "../ScanRankings/ScanRankings";

const FindSelector = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [textArea, setTextArea] = useState("");
  const [selector, setSelector] = useState("");

  const validateForm = () => {
    return url.length > 0 && textArea.length > 0;
  };

  const handleSubmit = () => {
    const textArray = textArea.replace(/\r\n/g, "\n").split("\n");
    setLoading(true);
    setErrorMessage("");
    setSelector("");

    if (!url || !validUrl.isUri(url)) {
      setErrorMessage("Please enter valid url.");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const foundSelector = await findSelector(url, textArray);

        setSelector(foundSelector);
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    })();
  };

  const handleSetDefault = () => {
    setUrl("https://webscraper.io/test-sites/e-commerce/allinone/phones/touch");
    setTextArea("Nokia 123\nLG Optimus\nSamsung Galaxy");
  };

  return (
    <div className="FindSelector" data-testid="FindSelector">
      <p>
        Find Selector tool needs as input an url link to a web page and list of
        relevant items (text). It will search through the web page and return the
        most statistically relevant selector, which can be then used for Scan
        Rankings tool.
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
        <Form.Group controlId="items">
          <Form.Label>Relevant items </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
          />
          <Form.Text className="text-muted">
            Separate by new line. Case insensitive.
          </Form.Text>
        </Form.Group>
        {!loading && (
          <>
            <Button
              variant="contained"
              color="primary"
              disabled={!validateForm()}
              onClick={handleSubmit}
              startIcon={<SearchIcon />}
            >
              Find Selector
            </Button>
            <Button
              variant="contained"
              onClick={handleSetDefault}
              startIcon={<AssistantIcon />}
            >
              Set test data
            </Button>
          </>
        )}
      </Form>
      {loading && <CircularProgress />}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      {selector && (
        <div>
          <Alert severity="success">
            <p>
              <strong>
                Selector found! <br />
              </strong>
              Url: <a href={url}>{url}</a> <br />
              Selector: {selector}
            </p>
          </Alert>

          <h4>Scan Rankings:</h4>
          <ScanRankings url={url} selector={selector} />
        </div>
      )}
    </div>
  );
};

export default FindSelector;
