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
import EditModal from "./EditModal";
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateArticleById } from "../../../constants/api";
import formatFullDate from "../../../helpers/formatFullDate";

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

export default function DraftTableDev({ data }) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (trashData) => updateArticleById(trashData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllArticle");
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
                <p>Created</p>
              </StyledTableCell>
              <StyledTableCell>
                <p>Action</p>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0 ? (
              data?.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell>{row.category}</StyledTableCell>
                  <StyledTableCell>
                    {formatFullDate(row.created_date)}
                  </StyledTableCell>
                  <StyledTableCell>
                    <div className="flex space-x-3 items-center">
                      <EditModal data={row} />
                      <Tooltip title="Move to Trash">
                        <IconButton
                          onClick={() => mutate({ ...row, status: "Trashed" })}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
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
