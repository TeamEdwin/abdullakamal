import { useEffect } from "react";

import AKMCHeader from "../_common/header";
import AKMCStickyHeader from "../_common/sticky-header";
import ContactUs from "../_shared/ContactUs";
import StickyMenu from "../_common/sticky-menu";
import StickyChat from "../_common/sticky-chat";
import AKMCFooter from "../_common/footer";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us - Dr. Abdulla Kamal Medical Centre";
  });

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      <ContactUs />

      <AKMCFooter />
    </>
  );
};

export default Contact;
