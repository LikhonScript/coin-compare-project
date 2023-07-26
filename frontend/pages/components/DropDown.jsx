import React, { useState } from "react";

function DropdownMenu() {
  const [selectedOption, setSelectedOption] = useState("Option 1");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Select an option:</label>
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </select>
      <p>You selected: {selectedOption}</p>
    </div>
  );
}

export default DropdownMenu;
