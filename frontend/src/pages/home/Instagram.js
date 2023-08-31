import { useEffect, useState } from "react";
import Axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import { ReactComponent as IconInstagram } from "../../assets/icons/icon_instagram.svg";

import "./Instagram.scss";

const Instagram = () => {
  const [instaData, setInstaData] = useState();

  const getInstaFeed = async () => {
    const URL = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&limit=3&access_token=${process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN}`;
    const options = {
      method: "GET",
      url: URL,
    };

    await Axios(options)
      .then((response) => {
        // console.log(response.data.data);
        setInstaData(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getInstaFeed();
  }, []);

  return (
    <>
      <div className="instagram container text-center">
        <IconInstagram className="instagram__icon" />
        <div className="instagram__post ltr-text">
          {instaData ? (
            instaData.map((data) => (
              <a
                href={data.permalink}
                target="_blank"
                key={data.id}
                rel="noreferrer"
              >
                <img src={data.media_url} alt="Instagram Logo" width="300" />
              </a>
            ))
          ) : (
            <Skeleton variant="rounded" width={300} height={300} />
          )}
        </div>
      </div>
    </>
  );
};

export default Instagram;
