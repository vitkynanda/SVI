import MaterialTable from "material-table";
import { CircularProgress, Box, Tooltip, IconButton } from "@mui/material";
import tableIcons from "../../Icons/tableIcons";
import formatFullDate from "../../../helpers/formatFullDate";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useQueryClient, useMutation } from "react-query";
import { deleteArticleById } from "../../../constants/api";
import { toast } from "react-toastify";

const TrashTable = ({ data }) => {
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
      <div className="flex space-x-3 items-center w-full bg-blue-100 p-4 rounded-md mx-3">
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
        title="Trash Table"
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
            title: "Updated",
            field: "updated_date",
            render: (rowData) => <p>{formatFullDate(rowData.created_date)}</p>,
          },
          {
            title: "Action",
            field: "user",
            render: (rowData) => (
              <Tooltip title="Delete Forever">
                <IconButton onClick={() => mutate(rowData.id)}>
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
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

export default TrashTable;
