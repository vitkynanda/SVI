import { Button, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import { useMutation, useQueryClient } from "react-query";
import { postArticle } from "../../constants/api";
import { toast } from "react-toastify";

const PostForm = () => {
  const queryClient = useQueryClient();
  const options = ["Sports", "Education", "Economics"];
  const [postInput, setPostInput] = useState({
    title: "",
    content: "",
    category: "",
    status: "",
  });

  const { mutate } = useMutation((postData) => postArticle(postData), {
    onSuccess: (post) => {
      queryClient.invalidateQueries("getAllArticle");
      toast.success(
        `${
          post.status === "Published" ? "Published" : "Add to draft"
        } succesfully`
      );
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <form className="flex flex-col p-3 rounded-md shadow-md m-3 space-y-5 w-1/3">
      <h2 className="font-semibold">New Post</h2>
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
  );
};

export default PostForm;
