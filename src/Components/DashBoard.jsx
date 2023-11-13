import React, { useRef, useState } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  editTask,
  deleteTask,
  toggleChecked,
} from "../features/taskSlice";
import {
  allowedCreateTask,
  allowedDeleteTask,
  allowedEditTask,
  allowedMarkComplete,
} from "../config/roleValidations";
import { updateUserRole } from "../features/usersSlice";

const Dashboard = () => {
  const taskList = useSelector((state) => state.task);
  const authData = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.user)


  const role = authData?.role

  const dispatch = useDispatch();

  const [editItem, seteditItem] = useState({});

  // true means current action is add item | else it will be edit item.
  const [addBoolean, setAddBoolean] = useState(true);

  const refEnterTask = useRef();

  const handleRoleChange = ({ email, role }) => {
    dispatch(updateUserRole({ email: email, role: role }))
  }

  const handleEnter = () => {
    if (addBoolean) {
      if (allowedCreateTask.includes(authData?.role)) {
        dispatch(addTask({ title: refEnterTask.current.value }));
      } else {
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
      <Navbar user_name={authData.name} user_role={authData.role} />

      <Box
        sx={{
          display: "flex",
          flexWrap: 'wrap',
          justifyContent: "center",
          alignItems: 'center',
          width: '100%',
          mt: "4rem",
          gap: '4rem'
        }}
      >
        {/* Todo Box */}

        <Box
          sx={{
            margin: 'auto',
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "2rem",
            borderRadius: "2rem",
            backgroundColor: "#000E20",
            width: '35%',
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
              "& fieldset": { border: 'none' },
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
                            alignItems: 'flex-start'
                          }}
                        >

                          <Checkbox
                            defaultChecked={item.checked}
                            onChange={() => dispatch(toggleChecked({ id: item.id }))}
                            sx={{
                              mt: '-0.25rem',
                              color: "#ffffff90",
                              '&.Mui-disabled': {
                                color: '#ffffff50'
                              }
                            }}
                            disabled={!allowedMarkComplete.includes(authData?.role)}
                            // onClick={}
                          />


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
                              <img style={{ marginTop: '-2px' }} src="/images/delete_icon.svg" alt="edit" />
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

        {role == 1 ?
          <Box sx={{
            margin: 'auto',
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "2rem",
            borderRadius: "2rem",
            backgroundColor: "#000E20",
            width: "35%",
            height: "60vh",
          }}>

            <Typography variant="h6" color={'white'} mb={'1rem'}>Manage User Roles</Typography>

            {userData?.map((item) => {

              return (


                <Box key={item.email} sx={{ display: 'flex', gap: '1.5rem' }}>
                  <FormControl>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={item.role}
                      label="Age"
                      size="small"
                      sx={{
                        "& fieldset": { border: 'none' },
                        borderRadius: '2rem',
                        height: '2rem',
                        width: '130px',
                        color: 'black',
                        backgroundColor: '#9DA3AB'
                      }}
                      onChange={(e) => handleRoleChange({ email: item.email, role: e.target.value })}
                      inputProps={{ style: { color: 'white' } }}
                    >
                      <MenuItem value={1}>Admin</MenuItem>
                      <MenuItem value={2}>Controller</MenuItem>
                      <MenuItem value={3}>Head Coach</MenuItem>
                      <MenuItem value={4}>Coach</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography color={'white'}>{item.name}</Typography>
                </Box>

              )

            })}



          </Box>
          : <></>}


      </Box>
    </Box>
  );
};

export default Dashboard;
