import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQueryClient, useMutation } from "react-query";
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { deleteArticleById } from "../../../constants/api";
import formatFullDate from "../../../helpers/formatFullDate";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "lightgray",
    fontSize: 17,
    fontWeight: "bold",

    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TrashTableDev({ data }) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (trashData) => deleteArticleById(trashData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllArticle");
        toast.success("Post removed from database");
      },
      onError: (error) => {
        toast.error("Something went wrong");
      },
    }
  );

  const renderLoading = isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        padding: "10px",
        borderRadius: 2,
        backgroundColor: "white",
        marginBottom: 1,
      }}
    >
      <div className="flex space-x-3 items-center w-full bg-blue-100 p-4 rounded-md">
        <CircularProgress size={20} />
        <p className="text-gray-500 text-sm ">Updating data ...</p>
      </div>
    </Box>
  ) : null;

  return (
    <>
      {renderLoading}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <p>Title</p>
              </StyledTableCell>
              <StyledTableCell>
                <p>Category</p>
              </StyledTableCell>
              <StyledTableCell>
                <p>Updated</p>
              </StyledTableCell>
              <StyledTableCell>
                <p>Action</p>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0 ? (
              data?.map((row, id) => (
                <StyledTableRow key={id}>
                  <StyledTableCell component="th" scope="row">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell>{row.category}</StyledTableCell>
                  <StyledTableCell>
                    {formatFullDate(row.updated_date)}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Tooltip title="Delete Forever">
                      <IconButton onClick={() => mutate(row.id)}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={4} align="center">
                  <div className="h-72 flex items-center justify-center">
                    <p>No Data available</p>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
