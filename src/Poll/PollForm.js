import { Button, InputBase } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import PollUI from "./PollUI";

import "../assets/style.css";

const useStyles = makeStyles({
  buttonColor: {
    background: "#3f51b5c9",
    color: "#fff",
    fontWeight: "800",
    fontSize: "1rem",
  },
  input: {
    color: "#28385e",
    width: "100%",
    height: "2rem",
    fontSize: "2rem",
    margin: "1.5rem 0 1rem 0",
    fontWeight: "600",
    padding: "0.5rem",
    textAlign: "center",
  },
  options: {
    height: "1.5rem",
    padding: "1rem",
    width: "100%",
    flex: "0.8",
  },
  optionBox: {
    borderRadius: "9999px",
    display: "flex",
    width: "100%",
    margin: "0.75rem 0",
    background: "#fff",
    boxShadow: "inset 0px 0px 98px 1px rgba(99,105,222,0.29)",
  },
  optionInput: {
    margin: "0.5rem",
    width: "100%",
    alignSelf: "center",
    color: "#2a3da7",
  },
  optionBoxCircle1: {
    position: "relative",
    alignSelf: "center",
    width: "2.2rem",
    height: "2rem",
    borderRadius: "9999px",
    background: "#fff",
    textAlign: "center",
    margin: ".75rem",
  },
  optionBoxCircle2: {
    position: "absolute",
    alignSelf: "center",
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "100%",
    background: "linear-gradient(90deg, #6369de 0%, #8c92f9 100%)",
    textAlign: "center",
    top: "12.5%",
    left: "12.5%",
  },
});

function PollForm() {
  const classes = useStyles();

  const [PollName, setPollName] = useState("");
  const [Option, setOption] = useState([{ value: "" }, { value: "" }]);
  const [PollStarted, setPollStarted] = useState(false);
  const [StartPoll, setStartPoll] = useState(false);
  const [Poll, setPoll] = useState(false);

  const onFormNameChange = (e) => {
    const { value } = e.target;

    setPollName(value);
  };

  const onOptionChange = (index, event) => {
    const values = [...Option];
    values[index] = event.target.value;
    setOption(values);
  };

  const onOptionClick = (e) => {
    e.preventDefault();
    setOption([...Option, { value: "" }]);
  };

  const onClickPollStarted = (e) => {
    e.preventDefault();
    setPollStarted(true);
    console.log(Option);
  };

  if (!StartPoll) {
    if (PollName) {
      if (Option[1].value !== "") {
        setStartPoll(!StartPoll);
      }
    }
  }

  return (
    <div>
      {PollStarted ? (
        <PollUI PollQuestion={PollName} pollOptions={Option} />
      ) : (
        <div>
          <div
            style={{
              borderRadius: "7px",

              background: "#fff",
              boxShadow: "0px 0px 13px 1px rgba(99,105,222,0.29)",
            }}
          >
            <div
              style={{
                padding: "2rem 3rem",
              }}
            >
              <div className="border-color color-white">
                <InputBase
                  className={classes.input}
                  onChange={onFormNameChange}
                  placeholder="Poll Question"
                  fullWidth
                  multiline
                  required
                  rowsMax={3}
                />
              </div>
              {Option.map((option, index) => (
                <div className={classes.optionBox} key={index}>
                  <div className={classes.optionBoxCircle1}>
                    <div className={classes.optionBoxCircle2}></div>
                  </div>
                  <div className={classes.optionInput}>
                    <InputBase
                      name={`option${option}`}
                      value={option.value}
                      onChange={(event) => {
                        onOptionChange(index, event);
                      }}
                      style={{ width: "100%", fontWeight: "700" }}
                      placeholder="Write Your Options"
                    />
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={onOptionClick} variant="contained">
                  Add Options
                </Button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <Button
                variant="contained"
                style={{
                  margin: "0 auto",
                  padding: "1.5rem",
                  borderRadius: "0 4px 0 0",
                  fontWeight: "800",
                  fontSize: "1rem",
                }}
                fullWidth
              >
                Schedule poll
              </Button>{" "}
              <Button
                onClick={onClickPollStarted}
                variant="contained"
                className={classes.buttonColor}
                color="primary"
                style={{
                  margin: "0 auto",
                  padding: "1.5rem",
                  borderRadius: "0 0 4px 0",
                }}
                fullWidth
                disabled={StartPoll ? false : true}
              >
                Poll Now
              </Button>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
}

export default PollForm;
