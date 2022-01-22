import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, MenuItem, TextField, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import { useQueryClient, useMutation } from "react-query";
import { updateArticleById } from "../../../constants/api";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

export default function EditModal({ data }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const options = ["Sports", "Education", "Economics"];
  const [postInput, setPostInput] = useState({
    id: data.id,
    title: data.title,
    content: data.content,
    category: data.category,
    status: data.status,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostInput((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const queryClient = useQueryClient();

  const { mutate } = useMutation((postData) => updateArticleById(postData), {
    onSuccess: (post) => {
      queryClient.invalidateQueries("getAllArticle");
      handleClose();
      toast.success(
        `${
          post.status === "Published" ? "Published" : "Add to draft"
        } succesfully`
      );
    },
  });
  return (
    <div>
      <Tooltip title="Edit">
        <IconButton onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Edit Post
            </Typography>
            <form className="flex flex-col space-y-5 ">
              <TextField
                id="filled-basic"
                label="Title"
                value={postInput.title}
                onChange={handleChange}
                name="title"
              />
              <TextField
                id="outlined-select-currency"
                select
                label="Category"
                value={postInput.category}
                onChange={handleChange}
                name="category"
              >
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-multiline-static"
                label="Content"
                name="content"
                multiline
                value={postInput.content}
                onChange={handleChange}
                rows={4}
              />
              <div className="space-x-3">
                <Button
                  onClick={() => {
                    postInput.title && postInput.content && postInput.category
                      ? mutate({ ...postInput, status: "Published" })
                      : toast.error("Input not valid !");
                  }}
                  variant="contained"
                  size="small"
                  endIcon={<SendIcon />}
                >
                  Publish
                </Button>
                <Button
                  onClick={() => {
                    postInput.title && postInput.content && postInput.category
                      ? mutate({ ...postInput, status: "Drafts" })
                      : toast.error("Input not valid !");
                  }}
                  variant="contained"
                  color="warning"
                  size="small"
                  endIcon={<DraftsIcon />}
                >
                  Draft
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
