import React, {useEffect} from "react";

import styles from "./ServerWindow.module.scss";
interface WindowProp {
  id: number;
}
const ServerWindow: React.FC<WindowProp> = ({id}) => {
  const [server, setServer] = React.useState({id, status: true, load: 0});

  const handleClick = () => {
    if (server.status === false) {
      setServer((prev) => ({...prev, status: !prev.status}));
      getServerLoad();
    } else {
      setServer((prev) => ({...prev, load: 0, status: !prev.status}));
    }
  };
  const getServerLoad = async () => {
    fetch(`http://localhost:8000/status/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setServer((prev) => ({...prev, load: result.load}));
      });
  };

  useEffect(() => {
    getServerLoad();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInterval(getServerLoad, 300000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div key={server.id} className="window">
      <div className="title-bar">
        <div className="title-bar-text">Server #{server.id}</div>
      </div>
      <div className="window-body">
        <img
          className={styles.picture}
          src={server.status ? "../src/assets/pc-on.gif" : "../src/assets/pc-off.png"}
          width="100%"
        />
      </div>
      <div className={`${styles.statusBar} window-status-bar`}>
        <span className="status-bar-field">Status: {server.status ? "ON" : "OFF"}</span>
        <span className={`status-bar-field ${styles.statusButton}`} onClick={handleClick}>
          {server.status ? "shut down" : "turn on"}
        </span>
        <span className="status-bar-field">CPU Usage: {server.status ? server.load : 0}%</span>
      </div>
    </div>
  );
};

export default ServerWindow;
