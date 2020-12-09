import React, { Component } from "react";

class PollUI extends Component {
  state = {
    poll: {
      pollData: "",
      voted: false,
    },
    totalVotes: 0,
    StoragePolls: [],
    voteCount: [],
  };

  componentDidMount() {
    this.onGetPoll();
  }

  onGetPoll = () => {
    this.setState({
      StoragePolls: JSON.parse(localStorage.getItem(`PollofRoom`)) || [],
    });
  };

  setPollVote = (answer) => {
    const { pollOptions } = this.props;
    const optionsOnly = pollOptions.map((item) => item);

    if (optionsOnly.includes(answer)) {
      const { poll, totalVotes } = this.state;
      const newPoll = { ...poll };
      newPoll.voted = true;
      newPoll.pollData = answer;

      this.setState({
        poll: newPoll,
        totalVotes: totalVotes + 1,
      });
    }
  };

  PollsRecoded = (option) => {
    const { StoragePolls } = this.state;
    let votes = 0;
    for (let i = 0; i < StoragePolls.length; i++) {
      if (StoragePolls[i].option === option) {
        votes = ++votes;
        this.state.voteCount.push({ [option]: votes });
      }
    }
    console.log(this.state.voteCount);
  };

  calculatePer = (option) => {
    const { StoragePolls, totalVotes } = this.state;

    let votes = 0;
    console.log(option);

    for (let i = 0; i < StoragePolls.length; i++) {
      if (StoragePolls[i].option === option) {
        votes = votes + 1;
      }
    }
    console.log(totalVotes);
    console.log(votes);
    let per = (Number.parseInt(votes) / Number.parseInt(totalVotes)) * 100;
    console.log(per);
    return per;
  };

  render() {
    const onClickButton = (option, event) => {
      const { PollQuestion, noStorage } = this.props;
      const { StoragePolls } = this.state;
      event.preventDefault();
      console.log(option);
      if (!noStorage) {
        const storage = StoragePolls;
        storage.push({
          question: PollQuestion,
          option: option,
        });
        localStorage.setItem("PollofRoom", JSON.stringify(storage));
      }
      this.setPollVote(option);
      this.PollsRecoded(option);
    };

    const { poll } = this.state;

    return (
      <div>
        <div>
          <div
            style={{
              borderRadius: "7px",
              padding: "1rem",
              background: "linear-gradient(90deg, #6369de 0%, #8c92f9 100%)",
              color: "#fff",
            }}
          >
            <div
              style={{
                background: "inherit",

                border: "0",
                height: "3rem",
                padding: "1rem",
                color: "#ffffff",

                fontSize: "1.25rem",
              }}
            >
              {this.props.PollQuestion}
            </div>
            <div
              className="flex"
              style={{
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              {this.props.pollOptions.map((option, index) =>
                !poll.voted ? (
                  <button
                    style={{
                      margin: ".15rem 0",
                      display: "flex",
                      justifyContent: "space-between",
                      border: 0,
                      padding: "0.25rem 0.25rem",
                      background: "#fff",
                      borderRadius: "7px",
                      appearance: "none",
                      outline: "2px solid transparent",
                      outlineOffset: "2px",
                    }}
                    key={index}
                    className="button-data"
                    onClick={(event) => onClickButton(option, event)}
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
                    <div style={{ alignSelf: "center", fontSize: "1.25rem" }}>
                      {option}
                    </div>
                    <div></div>
                  </button>
                ) : (
                  <div
                    style={{
                      margin: ".15rem 0",
                      display: "flex",
                      justifyContent: "space-between",
                      border: 0,
                      padding: "0.25rem 0.25rem",
                      background: "#fff",
                      borderRadius: "7px",
                      appearance: "none",
                      outline: "2px solid transparent",
                      outlineOffset: "2px",
                    }}
                  >
                    <div
                      className="result"
                      style={{
                        color: "#6D4B94",
                        borderColor: "#7C6497",
                        width: "100%",
                      }}
                    >
                      <div
                        className="fill"
                        style={{
                          width: `${this.calculatePer(option)}%`,
                          backgroundColor: "#6D4B943B",
                        }}
                      />
                      <div className="labels">
                        <span
                          className="percent"
                          style={{ color: "#6D4B94", margin: "0 1.25rem" }}
                        >
                          {this.calculatePer(option)}
                        </span>
                        <span
                          className="answer vote"
                          style={{ color: "#6D4B94" }}
                        >
                          {option}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            <div>Member Choose Nothing : {this.props.memberUnSelcted}</div>
            <div>Member Choose Some Thing: {this.props.memberSelcted}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PollUI;
