import React, { useEffect, useState } from "react";
import PollUI from "./PollUI";

function PollForm() {
  const [PollName, setPollName] = useState("");
  const [Option, setOption] = useState([{ value: "" }, { value: "" }]);
  const [OptionNO, setOptionNO] = useState(3);
  const [Options, setOptions] = useState([1, 2]);
  const [OptionData, setOptionData] = useState([]);
  const [PollStarted, setPollStarted] = useState(false);

  const onFormNameChange = (e) => {
    const { name, value } = e.target;

    setPollName({ [name]: value });
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

  return (
    <div>
      {PollStarted ? (
        <PollUI PollQuestion={PollName.pollName} pollOptions={Option} />
      ) : (
        <div>
          <div>
            <div
              style={{
                borderRadius: "7px",
                padding: "1rem",
                background: "linear-gradient(90deg, #6369de 0%, #8c92f9 100%)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  style={{
                    borderRadius: "7px",
                    border: "0",
                    margin: "0 0.25rem",
                    padding: "1rem",
                  }}
                >
                  Schedule poll
                </button>{" "}
                <button
                  onClick={onClickPollStarted}
                  style={{
                    borderRadius: "7px",
                    border: "0",
                    margin: "0 0.25rem",
                    padding: "1rem",
                  }}
                >
                  Poll Now
                </button>
              </div>

              <div>
                <input
                  style={{
                    background: "inherit",

                    border: "0",
                    height: "3rem",
                    padding: "1rem",
                    color: "#ffffff",
                    width: "100%",
                    appearance: "none",
                    outline: "2px solid transparent",
                    outlineOffset: "2px",
                    fontSize: "1rem",
                  }}
                  name="pollName"
                  placeholder="Poll Question"
                  onChange={onFormNameChange}
                  className="input"
                />
              </div>
              {Option.map((option, index) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "0.75rem 0",
                    background: "#fff",
                    borderRadius: "7px",
                  }}
                  key={index}
                >
                  <div
                    style={{
                      position: "relative",
                      alignSelf: "center",
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "100%",
                      background:
                        "linear-gradient(90deg, #6369de 0%, #8c92f9 100%)",
                      textAlign: "center",
                      margin: ".75rem",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        alignSelf: "center",
                        width: "1.5rem",
                        height: "1.5rem",
                        borderRadius: "100%",
                        background: "#fff",
                        textAlign: "center",
                        top: "12.5%",
                        left: "12.5%",
                      }}
                    ></div>
                  </div>
                  <input
                    style={{
                      borderRadius: "7px",
                      border: "0",
                      height: "1.5rem",
                      padding: "1rem",
                      width: "100%",
                      appearance: "none",
                      outline: "2px solid transparent",
                      outlineOffset: "2px",
                    }}
                    name={`option${option}`}
                    value={option.value}
                    onChange={(event) => {
                      onOptionChange(index, event);
                    }}
                    placeholder="Write Your Options"
                  />
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={onOptionClick}
                  style={{
                    borderRadius: "7px",
                    border: "0",

                    padding: "1rem",
                  }}
                >
                  Add Options
                </button>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
}

export default PollForm;
