import { useState } from "react";
import "./assets/style.css";
import PollForm from "./Poll/PollForm";
import IconButton from "@material-ui/core/IconButton";
import PollIcon from "@material-ui/icons/Poll";

function App() {
  const [Poll, setPoll] = useState(false);
  const onPollClick = () => {
    setPoll(!Poll);
  };
  return (
    <div>
      <div style={{ height: "100vh" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "1rem",
          }}
        >
          <IconButton size="medium">
            <PollIcon
              onClick={onPollClick}
              color="primary"
              aria-label="Poll for Meeting"
            >
              Poll
            </PollIcon>
          </IconButton>
        </div>
        <div
          style={{
            width: "33%",
            margin: "0 auto",
            transition: "ease-in 0.25s",
          }}
        >
          {" "}
          {Poll ? <PollForm /> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
