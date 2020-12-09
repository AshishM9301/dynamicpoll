import { useState } from "react";
import "./assets/style.css";
import PollForm from "./Poll/PollForm";

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
          <button onClick={onPollClick}>Poll</button>
        </div>
        <div style={{ width: "33%", margin: "0 auto" }}>
          {" "}
          {Poll ? <PollForm /> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
