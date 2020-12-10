import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";

const useStyles = {
  root: {
    borderRadius: "7px",

    background: "#fff",
    boxShadow: "0px 0px 13px 1px rgba(99,105,222,0.29)",
  },
  pollQuestion: {
    color: "#28385e",
    width: "100%",
    height: "2rem",
    fontSize: "2rem",
    margin: "1.5rem 0 1rem 0",
    fontWeight: "600",
    padding: "0.5rem",
    textAlign: "center",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
};
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

    const { classes } = this.props;

    return (
      <div>
        <div className={classes.root}>
          <div
            style={{
              padding: "2rem 3rem",
            }}
          >
            <Grid item className={classes.pollQuestion}>
              {this.props.PollQuestion}
            </Grid>
            <div
              className="flex"
              style={{
                flexDirection: "column",
                justifyContent: "space-around",
                margin: "1rem 0",
              }}
            >
              {this.props.pollOptions.map((option, index) =>
                !poll.voted ? (
                  <Button
                    variant="contained"
                    style={{
                      margin: ".5rem 0",
                      display: "flex",
                      justifyContent: "space-between",
                      borderRadius: "9999px",
                      textAlign: "left",
                      background: "#fff",
                      boxShadow: "inset 0px 0px 98px 1px rgba(99,105,222,0.29)",
                      width: "100%",
                      fontWeight: "700",
                    }}
                    key={index}
                    className="button"
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
                  </Button>
                ) : (
                  <div
                    style={{
                      margin: "1rem 0 0 0",
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
                          borderRadius: "9999px",
                          width: `${this.calculatePer(option)}%`,
                          background: "#fff",
                          boxShadow:
                            "inset 0px 0px 98px 1px rgba(99,105,222,0.29)",
                        }}
                      />
                      <div
                        className="labels"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <span
                          className="answer vote"
                          style={{ color: "#6D4B94" }}
                        >
                          {option}
                        </span>
                        <span
                          className="percent"
                          style={{ color: "#6D4B94", margin: "0 1.25rem" }}
                        >
                          {this.calculatePer(option)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className={classes.flex}>
              <div>Not Participated : {this.props.memberUnSelcted}</div>
              <div>Participated: {this.props.memberSelcted}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(PollUI);
