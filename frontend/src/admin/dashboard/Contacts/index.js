import { useEffect, useState } from "react";
import useSWR from "swr";
import { Box, Container } from "@mui/material";
import { ContactUsResults } from "./contact-us-results";
import DataTable from "./DataTable";

const Contacts = () => {
  const { data: contactUsData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/contact-us`
  );

  useEffect(() => {}, [contactUsData]);

  return (
    <>
      <h1>User Contacts</h1>
      {/* {contactUsData && (
            <ContactUsResults contactUs={contactUsData.data} />
          )} */}
      <DataTable />
    </>
  );
};

export default Contacts;
