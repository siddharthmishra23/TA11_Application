import { useState, useEffect } from "react";
import PageNav from "../components/PageNav";
import styles from "./Usage.module.css";
import ComparisonModal from "./Visualization";
import Carousel from "../components/Carousel";

// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "http://localhost:3006";

export default function Usage() {
  const [electricityTotal, setElectricityTotal] = useState(0);
  const [gasTotal, setGasTotal] = useState(0);
  const [devices, setDeviceList] = useState([]);
  const [postcodes, setPostcodes] = useState([]);
  const [electricityData, setElectricityData] = useState([]);
  const [gasData, setGasData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [year, setYear] = useState("");
  const [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    const years = Array.from(
      new Set(electricityData.map((item) => item.year))
    ).sort();

    setYearOptions(years);
    // Set the first year in the list as the default year
    if (years.length > 0) setYear(years[0]);
  }, [electricityData]);

  useEffect(() => {
    if (comparisonData.length > 0) {
      // Open the modal when we have comparison data
      setIsModalOpen(true);
    }
  }, [comparisonData]);

  useEffect(() => {
    fetch(`/gas`)
      .then((response) => response.json())
      .then((data) => {
        setGasData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch(`/electricity`)
      .then((response) => response.json())
      .then((data) => {
        setElectricityData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch(`/postcodes`)
      .then((response) => response.json())
      .then((data) => {
        setPostcodes(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleDelete(id) {
    setDeviceList((devices) => devices.filter((device) => device.id !== id));
  }

  function handleDevice(device) {
    setDeviceList((devices) => [...devices, device]);
  }

  useEffect(() => {
    const totalElectricity = devices.reduce((total, device) => {
      return device.type === "electricity"
        ? total + device.power * device.usage
        : total;
    }, 0);

    const totalGas = devices.reduce((total, device) => {
      return device.type === "gas"
        ? total + device.power * device.usage
        : total;
    }, 0);

    setElectricityTotal(totalElectricity * 365);
    setGasTotal(totalGas * 365);
  }, [devices]);

  // const handleCompare = () => {
  //   const yourHomeData = {
  //     name: "Your Home",
  //     electricity: electricityTotal,
  //     gas: gasTotal,
  //   };

  //   // Filter data based on selected year
  //   const electricityYearData = electricityData.filter(
  //     (data) => data.year === year
  //   );

  //   // Filter data based on selected year
  //   const gasYearData = gasData.filter((data) => data.year === year);

  //   // Combine data
  //   const combinedData = electricityYearData.map((edata) => {
  //     const gdata = gasData.find(
  //       (g) => g.year === year && g.suburb === edata.suburb
  //     );
  //     return {
  //       name: edata.suburb,
  //       electricity: edata.avg_CO2_kg_per_customer_year,
  //       gas: gdata ? gdata.avg_CO2_kg_per_customer_year : 0,
  //     };
  //   });

  //   const comparisonData = [yourHomeData, ...combinedData];
  //   setComparisonData(comparisonData);
  // };
  const handleCompare = () => {
    const yourHomeData = {
      name: "Your Home",
      electricity: electricityTotal,
      gas: gasTotal,
    };

    // Filter data based on selected year
    const electricityYearData = electricityData.filter(
      (data) => data.year == year
    );

    // Filter data based on selected year
    const gasYearData = gasData.filter((data) => data.year == year);

    // Create a list of unique suburbs from both electricity and gas data
    const allSuburbs = [
      ...new Set([
        ...electricityYearData.map((e) => e.suburb),
        ...gasYearData.map((g) => g.suburb),
      ]),
    ];

    // Combine data for each suburb
    const combinedData = allSuburbs.map((suburb) => {
      const edata = electricityYearData.find((e) => e.suburb === suburb);
      const gdata = gasYearData.find((g) => g.suburb === suburb);

      return {
        name: suburb,
        electricity: edata ? edata.avg_CO2_kg_per_customer_year : 0,
        gas: gdata ? gdata.avg_CO2_kg_per_customer_year : 0,
      };
    });

    const comparisonData = [yourHomeData, ...combinedData];
    setComparisonData(comparisonData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <PageNav />
      <section className={styles.usage}>
        {isModalOpen && (
          <ComparisonModal data={comparisonData} onClose={closeModal} />
        )}
        <div className={styles.sidebar}>
          <FormAddDevice toAdd={handleDevice} />
        </div>

        <div>
          {devices.length > 0 ? (
            <DeviceTable devices={devices} onDelete={handleDelete} />
          ) : (
            <Carousel />
          )}
        </div>
        {devices.length > 0 && (
          <div>
            {gasTotal > 0 && (
              <div className={styles.msg}>
                <p>
                  Your total Gas carbon footprint emission for a whole year
                  would be approx{" "}
                  <span
                    className={gasTotal > 6000 ? styles.danger : styles.good}
                  >
                    {gasTotal} (KG CO₂)
                  </span>
                </p>
              </div>
            )}

            {electricityTotal > 0 && (
              <div className={styles.msg}>
                <p>
                  Your total Electricity carbon footprint emission for a whole
                  year would be approx
                  <span
                    className={
                      electricityTotal > 6000 ? styles.danger : styles.good
                    }
                  >
                    {electricityTotal} (KG CO₂)
                  </span>
                </p>
              </div>
            )}

            <div style={{ margin: "2rem", fontSize: "11px" }}>
              <label>Choose a year to compare with your neighbours</label>
              <select
                name="year"
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.compare}>
              <Button onclick={handleCompare}>
                Compare with your Neighbours
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function DeviceTable({ devices, onDelete }) {
  return (
    <table className={styles.devicelist}>
      <thead>
        <tr>
          <th>Device Name</th>
          <th>Emission Type</th>
          <th>Usage (Hrs)</th>
          <th>Consumption (KWH / KJ)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device) => (
          <tr key={device.id}>
            <td>{device.name}</td>
            <td>{device.type}</td>
            <td>{device.usage}</td>
            <td>{device.power}</td>
            <td>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => onDelete(device.id)}
                title="Delete record"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 128 128"
                  width="20px"
                  height="20px"
                >
                  <path d="M 49 1 C 47.34 1 46 2.34 46 4 C 46 5.66 47.34 7 49 7 L 79 7 C 80.66 7 82 5.66 82 4 C 82 2.34 80.66 1 79 1 L 49 1 z M 24 15 C 16.83 15 11 20.83 11 28 C 11 35.17 16.83 41 24 41 L 101 41 L 101 104 C 101 113.37 93.37 121 84 121 L 44 121 C 34.63 121 27 113.37 27 104 L 27 52 C 27 50.34 25.66 49 24 49 C 22.34 49 21 50.34 21 52 L 21 104 C 21 116.68 31.32 127 44 127 L 84 127 C 96.68 127 107 116.68 107 104 L 107 40.640625 C 112.72 39.280625 117 34.14 117 28 C 117 20.83 111.17 15 104 15 L 24 15 z M 24 21 L 104 21 C 107.86 21 111 24.14 111 28 C 111 31.86 107.86 35 104 35 L 24 35 C 20.14 35 17 31.86 17 28 C 17 24.14 20.14 21 24 21 z M 50 55 C 48.34 55 47 56.34 47 58 L 47 104 C 47 105.66 48.34 107 50 107 C 51.66 107 53 105.66 53 104 L 53 58 C 53 56.34 51.66 55 50 55 z M 78 55 C 76.34 55 75 56.34 75 58 L 75 104 C 75 105.66 76.34 107 78 107 C 79.66 107 81 105.66 81 104 L 81 58 C 81 56.34 79.66 55 78 55 z" />{" "}
                </svg>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function isValidFloat(value) {
  return /^\d*(\.\d+)?$/.test(value);
}

function isValidAlphanumeric(value) {
  return /^[a-zA-Z0-9]+$/.test(value);
}
function Button({ children, disabled, onclick }) {
  return (
    <button
      className={disabled ? styles.buttonDisabled : styles.button}
      disabled={disabled}
      onClick={onclick}
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

  const [usageError, setUsageError] = useState(""); // New state for Usage error message
  const [powerError, setPowerError] = useState(""); // New state for Power error message

  function validateUsage(value) {
    if (!isValidFloat(value) || value < 1 || value > 24) {
      setUsageError("Usage should be a number between 1 and 24.");
      setUsage("");
      return false;
    }
    setUsageError(""); // Clear the error if there's no problem
    return true;
  }

  function validatePower(value) {
    if (!isValidFloat(value) || value <= 0) {
      setPowerError("Power consumption should be a positive number.");
      setPower("");
      return false;
    }
    setPowerError(""); // Clear the error if there's no problem
    return true;
  }

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
        placeholder="Enter your device name"
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
        onChange={(e) => {
          setUsage(e.target.value);
          validateUsage(e.target.value);
        }}
        placeholder="Enter your daily usage of device"
      />
      {usageError && (
        <p style={{ color: "#b36b06", fontWeight: "bold" }}>{usageError}</p>
      )}

      <label>
        {type == "electricity" ? "Power" : "Gas"} Consumption of device (
        {type == "electricity" ? "KWH" : "KJ"})
      </label>
      <input
        type="text"
        value={power}
        onChange={(e) => {
          setPower(e.target.value);
          validatePower(e.target.value);
        }}
        placeholder="Enter your device power consumption"
      />
      {powerError && (
        <p style={{ color: "#b36b06", fontWeight: "bold" }}>{powerError}</p>
      )}

      <Button disabled={isDisabled}>Add Device</Button>
    </form>
  );
}
