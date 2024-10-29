import React, { useState } from "react";
import { Card, Calendar, Application } from "react-rainbow-components";
import { IoCloseOutline } from "react-icons/io5";
import { styles } from "../../styles/styles";

const initialState = { range: [new Date(2024, 1, 1), new Date(2024, 1, 15)] };

const calendarContainerStyles = {
  width: "28rem",
  height: "27rem",
  borderRadius:"20px",
  backgroundColor:"white",
  border:"none",
  padding:"10px",
  boxShadow:"none"
};

const theme = {
  rainbow: {
    palette: {
      brand: "#64B5AC",
    },
    shadows: {
      brand: "none",
    },
  },
};

const FilterCalendar = ({ showCalendar, onclick }) => {
  const [state, setState] = useState(initialState);
  return (
    showCalendar && (
      <div className="w-screen h-screen z-50 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <button
          className="w-9 h-9 bg-slate-300 absolute top-4 right-5 opacity-75 p-1"
          onClick={onclick}
        >
          <IoCloseOutline className="w-full h-full text-gray-500" />
        </button>
        <div className="w-[300px] md:w-auto h-auto bg-transparent flex items-center justify-center">
          <div className="w-[300px] md:w-full h-full rainbow-align-content_center rainbow-p-vertical_xx-large rainbow-p-horizontal_medium">
            <Application theme={theme}>
            <Card
              style={calendarContainerStyles}
              className="rainbow-p-around_large w-full h-full rounded-xl"
            >
              <Calendar
                id="calendar-7"
                selectionType="range"
                value={state.range}
                onChange={(value) => setState({ range: value })}
                // disabledDays={["2019/01/23"]}
              />
              <div className="w-full pt-10 flex items-center justify-end gap-4">
                <button className={`text-xs font-medium px-4 py-2 bg-red-500 text-white rounded-lg`} onClick={onclick}>Cancel</button>
                <button className={`text-xs font-medium px-4 py-2 ${styles.bgColor} text-white rounded-lg`} onClick={onclick}>Apply Filter</button>
              </div>
            </Card>
            </Application>
          </div>
        </div>
      </div>
    )
  );
};

export default FilterCalendar;
