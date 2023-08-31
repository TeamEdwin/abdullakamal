import { useEffect, useState } from "react";
import useSWR from "swr";
import { Box, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";

import DataTable from "./DataTable";

const formatDate = (isoString) => {
  return dayjs(isoString).format("YYYY-MM-DD");
};

const Appointments = () => {
  const [value, setValue] = useState(dayjs(new Date()));
  const [searchParams] = useSearchParams();
  const [doctorIdParams] = useState(searchParams.get("doc"));
  const [dateSelected, setDateSelected] = useState();

  const { data: appointmentData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/appointment`
  );

  useEffect(() => {
    setDateSelected(formatDate(value));
  }, [appointmentData, doctorIdParams, value]);

  return (
    <>
      <h1 style={{ display: "inline-block" }}>Appointments</h1>

      <Box sx={{ float: "right" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["day"]}
            label="Basic example"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>

      <DataTable doctorId={doctorIdParams} selectedDate={dateSelected} />
    </>
  );
};

export default Appointments;
