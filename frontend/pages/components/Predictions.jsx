import React from "react";
import axios from "axios";

const Predictions = () => {
  const [predData, setPredData] = React.useState([]);
  const options = [
    { label: "Bitcoin", value: "bitcoin" },

    { label: "ApeCoin", value: "Apecoin" },

    { label: "Tether", value: "tether" },
  ];
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const getApeData = async (coin) => {
    const { data } = await axios.get(`http://localhost:4000/${coin}`, {
      withCredentials: true,
    });
    console.log(data);

    // data.map((d) => console.log("row", d));
    setPredData(data);
  };
  const [value, setValue] = React.useState("Bitcoin");
  return (
    <div>
      <label>
        What do we eat?
        <div
          style={{
            width: "50%",

            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <select value={value} onChange={handleChange}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </label>

      <p>We eat {value}!</p>
      <button
        type="submit"
        onClick={() => getApeData(value)}
        class="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded-full text-lg"
      >
        Submit
      </button>

      <br />
      <br />
      <br />

      <h1>Prediction</h1>
      {/* <p>{predData.map((pred) => console.log(pred))}</p> */}
      <div
        style={{
          width: "30%",
          color: "white",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {" "}
        <p>{predData}</p>
      </div>
    </div>
  );
};

export default Predictions;
