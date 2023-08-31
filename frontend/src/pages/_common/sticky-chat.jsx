import { useEffect, useRef } from "react";
import useSWR from "swr";
import "./sticky-chat.scss";
import { ReactComponent as IconChat } from "../../assets/icons/icon_chat.svg";
import { Trans, useTranslation } from "react-i18next";
// import akmcLogo from "/favicon/android-chrome-192x192.png";

const StickyChat = () => {
  const whatsappChatBox = useRef();
  const { t } = useTranslation();

  const toggleWhatsappPopup = () => {
    if (
      whatsappChatBox.current.style.display === "" ||
      whatsappChatBox.current.style.display === "none"
    ) {
      whatsappChatBox.current.style.display = "block";
    } else {
      whatsappChatBox.current.style.display = "none";
    }
  };

  const { data: contactUsData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/contact`
  );

  useEffect(() => {}, [contactUsData]);

  return (
    <div className="chat-icon">
      <div className="chat-icon__container">
        <IconChat className="icon__chat" onClick={toggleWhatsappPopup} />

        <div className="whatsapp-container ltr-text" ref={whatsappChatBox}>
          <div className="whatsapp-container__header">
            <img
              className="whatsapp-container__header-logo"
              src="/favicon/android-chrome-192x192.png"
            />
            <div className="whatsapp-container__header-text">
              <div className="whatsapp-container__header-text-title">
                {t("sticky-chat.label_AKMC")}
              </div>
              <div className="whatsapp-container__header-text-subtitle">
                {t("sticky-chat.label_replyTime")}
              </div>
            </div>
            <div
              className="whatsapp-container__header-close-btn"
              onClick={toggleWhatsappPopup}
            >
              <img
                style={{ display: "table-row" }}
                src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/Vector.png?574"
              />
            </div>
          </div>
          <div className="whatsapp-container__body">
            <div className="whatsapp-container__body--chat">
              <div className="whatsapp-container__body--chat-brand">
                {t("sticky-chat.label_AKMC")}
              </div>
              <div className="whatsapp-container__body--chat-welcome">
                <Trans i18nKey="sticky-chat.label_replyMessage"></Trans>
              </div>
            </div>
          </div>
          {contactUsData && contactUsData.data[0] && (
            <div className="whatsapp-container__footer">
              <a
                href={`https://wa.me/${
                  contactUsData.data[0].secondaryPhoneNumber
                    ? contactUsData.data[0].secondaryPhoneNumber.replace(
                        /[^\w]/g,
                        ""
                      )
                    : null
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="send-btn"
              >
                {t("sticky-chat.label_startChat")}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StickyChat;
