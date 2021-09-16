import * as React from "react";

import styles from "./App.module.scss";
import ServerWindow from "./components/ServerWindow";
const App: React.FC = () => {
  return (
    <main className={styles.container}>
      {Array(4)
        .fill("")
        .map((_, i) => {
          return <ServerWindow key={i + 1} id={i + 1} />;
        })}
    </main>
  );
};

export default App;
