import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { blogId } = useParams();
  return (
    <>
      <h1>Detailed Post of {blogId}</h1>
    </>
  );
};

export default PostDetail;
