import { useEffect, useState } from "react";
import { Link, Link as RouterLink } from "react-router-dom";
import useSWR from "swr";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Axios from "axios";

const formatDate = (ISODate) => {
  return dayjs(ISODate).format("DD MMM YYYY");
};

const PostAll = () => {
  const [postDB, setPostDB] = useState();
  const { data: postData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/stories`
  );

  const getAllBlogPost = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/stories`;
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options)
      .then((res) => {
        setPostDB(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllBlogPost()
    if (postDB) {
      console.log(postDB);
    }
  }, []);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        style={{ float: "right" }}
        component={RouterLink}
        to="/dashboard/blog/add"
      >
        New Post
      </Button>
      <h1>All Posts</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Views</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postData && postData.data.length !== 0 ? (
              postData.data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">
                    <Link to={`${row._id}/edit`} className="table__link">
                      {row["en-US"].title}
                    </Link>
                  </TableCell>
                  <TableCell>{row.createdBy.name}</TableCell>
                  {row.category ? (
                    <TableCell>{row.category["en-US"].title}</TableCell>
                  ) : (
                    <TableCell>Uncategorized</TableCell>
                  )}

                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                  <TableCell align="center">
                    <Button component={RouterLink} to={`${row._id}`}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={5} align="center">
                  No Blog Post
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PostAll;
