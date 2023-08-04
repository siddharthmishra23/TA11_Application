import { useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Usage.module.css";

export default function Home() {
  const [elctricityTotal, setElectricityTotal] = useState(0);
  const [gasTotal, setGasTotal] = useState(0);
  const [devices, setDeviceList] = useState([]);

  function handleDevice(device) {
    setDeviceList((devices) => [...devices, device]);
    if (device.type === "electricity") {
      setElectricityTotal((oldValue) => oldValue + device.power * device.usage);
    } else if (device.type === "gas") {
      setGasTotal((oldValue) => oldValue + device.power * device.usage);
    }
  }
  return (
    <main>
      <PageNav />
      <section className={styles.usage}>
        <div className={styles.sidebar}>
          <FormAddDevice toAdd={handleDevice} />
        </div>

        <div className="">
          {devices.length > 0 && <DeviceTable devices={devices} />}
        </div>
      </section>
      <section>
        <div className={styles.msg}>
          {gasTotal > 0 && (
            <p>
              Your total Gas carbon footprint is{" "}
              <span className={gasTotal > 300 ? styles.danger : styles.good}>
                ${gasTotal}
              </span>
            </p>
          )}
        </div>
        <div className={styles.msg}>
          {elctricityTotal > 0 && (
            <p>
              Your total Electricity carbon footprint is{" "}
              <span
                className={elctricityTotal > 300 ? styles.danger : styles.good}
              >
                ${elctricityTotal}
              </span>
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

function DeviceTable({ devices }) {
  return (
    <table className={styles.devicelist}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Device Name</th>
          <th>Emission Type</th>
          <th>Usage (Hrs)</th>
          <th>Power Consumption (KWH)</th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device) => (
          <tr key={device.id}>
            <td>{device.id}</td>
            <td>{device.name}</td>
            <td>{device.type}</td>
            <td>{device.usage}</td>
            <td>{device.power}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Button({ children, disabled }) {
  return (
    <button
      className={disabled ? styles.buttonDisabled : styles.button}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function FormAddDevice({ toAdd }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("electricity");
  const [usage, setUsage] = useState("");
  const [power, setPower] = useState("");
  const [count, setCount] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();
    setCount((c) => c + 1);
    if (!name || !usage || !power) return;
    const id = count;
    const device = {
      id,
      name,
      type,
      usage: Number(usage),
      power: Number(power),
    };
    toAdd(device);
    setName("");
    setType("gas");
    setUsage("");
    setPower("");
  }
  const isDisabled = !name || !usage || !power;
  return (
    <form className="form-add-device" onSubmit={handleSubmit}>
      <label>Device Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Emission Type</label>
      <select
        name="selectList"
        id="selectList"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="electricity">Electricity</option>
        <option value="gas">Gas</option>
      </select>
      <label>Usage (Hrs)</label>
      <input
        type="text"
        value={usage}
        onChange={(e) => setUsage(e.target.value)}
      />
      <label>Power Consumtion of device (KWH) </label>
      <input
        type="text"
        value={power}
        onChange={(e) => setPower(e.target.value)}
      />
      <Button disabled={isDisabled}>Add Device</Button>
    </form>
  );
}
