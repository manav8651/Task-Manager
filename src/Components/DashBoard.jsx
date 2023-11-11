import React, { useRef, useState } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  editTask,
  deleteTask,
  markCompleted,
} from "../features/taskSlice";
import {
    allowedCreateTask,
  allowedDeleteTask,
  allowedEditTask,
  allowedMarkComplete,
} from "../config/roleValidations";

const Dashboard = () => {
  const taskList = useSelector((state) => state.task);
  const authData = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [editItem, seteditItem] = useState({});

  // true means current action is add item | else it will be edit item.
  const [addBoolean, setAddBoolean] = useState(true);

  const refEnterTask = useRef();

  const handleEnter = () => {
    if (addBoolean) {
        if(allowedCreateTask.includes(authData?.role)){
            dispatch(addTask({ title: refEnterTask.current.value }));
        }else{
            alert('Your role is not allowed to create tasks!')
        }
    } else {
      dispatch(
        editTask({ id: editItem.id, newTitle: refEnterTask.current.value })
      );
      setAddBoolean(true);
    }
    refEnterTask.current.value = "";
  };

  console.log('auth: ' + JSON.stringify(authData));

  return (
    <Box
      sx={{
        backgroundColor: "#051F3D",
        height: "100vh",
      }}
    >
      <Navbar />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "4rem",
        }}
      >
        {/* Todo Box */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "2rem",
            borderRadius: "2rem",
            backgroundColor: "#000E20",
            width: { md: "40%", sm: "50%", xs: "80%" },
            height: "60vh",
          }}
        >
          <TextField
            variant="outlined"
            id="dashboard test"
            size="small"
            placeholder="Enter Task..."
            inputRef={refEnterTask}
            sx={{
              borderRadius: "2rem",
              backgroundColor: "white",
            }}
            onKeyDown={(key) => {
              if (key.code == "Enter") {
                //add to the list
                handleEnter({ action: 1 });
              }
            }}
          />
          <Box
            sx={{
              overflowY: "auto",
            }}
          >
            {taskList?.length == 0 ? (
              <Typography
                variant="h6"
                align="center"
                mt={"2rem"}
                color={"white"}
              >
                :) You Have No Pending Tasks!
              </Typography>
            ) : (
              <>
                {taskList?.map((item, key) => {
                  return (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          // px: '1rem',
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            gap: "1rem",
                            color: "white",
                          }}
                        >
                          {allowedMarkComplete.includes(authData?.role) ? (
                            <Checkbox color={"primary"} />
                          ) : (
                            <></>
                          )}
                          <Typography variant="body1" fontSize={"1.25rem"}>
                            {item.title}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            ml: "1rem",
                          }}
                        >
                          {allowedEditTask.includes(authData?.role) ? (
                            <IconButton
                              onClick={() => {
                                refEnterTask.current.value = item.title;
                                setAddBoolean(false);
                                seteditItem(item);
                              }}
                            >
                              <img src="/images/edit_icon.svg" alt="edit" />
                            </IconButton>
                          ) : (
                            <></>
                          )}

                          {allowedDeleteTask.includes(authData?.role) ? (
                            <IconButton
                              onClick={() => {
                                dispatch(deleteTask({ id: item.id }));
                              }}
                            >
                              <img src="/images/delete_icon.svg" alt="edit" />
                            </IconButton>
                          ) : (
                            <></>
                          )}
                        </Box>
                      </Box>
                    </>
                  );
                })}
              </>
            )}
          </Box>
        </Box>

        {/* User Box */}

        <Box></Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
