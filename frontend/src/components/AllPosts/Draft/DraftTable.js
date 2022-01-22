import MaterialTable from "material-table";
import { CircularProgress, Box, Tooltip, IconButton } from "@mui/material";
import tableIcons from "../../Icons/tableIcons";
import formatFullDate from "../../../helpers/formatFullDate";
import EditModal from "./EditModal";
import { useQueryClient, useMutation } from "react-query";
import { updateArticleById } from "../../../constants/api";
import DeleteIcon from "@mui/icons-material/Delete";

const DraftTable = ({ data }) => {
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
      <MaterialTable
        localization={{
          toolbar: {
            searchPlaceholder: "Search Table",
          },
        }}
        isLoading={isLoading}
        icons={tableIcons}
        title="Draft Table"
        columns={[
          {
            title: "Title",
            field: "title",
          },
          {
            title: "Category",
            field: "category",
            width: "50%",
          },
          {
            title: "Created",
            field: "created_date",
            render: (rowData) => <p>{formatFullDate(rowData.created_date)}</p>,
          },
          {
            title: "Action",
            field: "action",
            render: (rowData) => (
              <div className="flex space-x-3 items-center">
                <EditModal data={rowData} />
                <Tooltip title="Move to Trash">
                  <IconButton
                    onClick={() => mutate({ ...rowData, status: "Trashed" })}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            ),
          },
        ]}
        data={data}
        options={{
          exportButton: true,
          pageSizeOptions: [10, 20],
          pageSize: 10,
          searchFieldPlaceholder: "Search Table",
        }}
      />
    </>
  );
};

export default DraftTable;
