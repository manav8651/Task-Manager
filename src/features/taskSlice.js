import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

try {
  const serialData = window.localStorage.getItem("taskList");
  initialState = JSON.parse(serialData);
} catch (err) {
  alert("Something went wrong in fetching the Task List!");
  console.log(err);
}

// const initialState = [
//   {
//     title: "asdf",
//     id: 0,
//   },
//   {
//     title: "asdf",
//     id: 1,
//   },
//   {
//     title: "asdf",
//     id: 2,
//   },
// ];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const title = action.payload.title;
      const id = state.length;

      try {
        state.push({ title: title, id: id });
        window.localStorage.setItem("taskList", JSON.stringify(state));
      } catch (err) {
        alert("Something went wrong!");
        console.log(err);
      }
    },
    deleteTask: (state, action) => {
      const id = action.payload.id;
      const st = state.filter((item) => item.id != id);
      try {
        window.localStorage.setItem("taskList", JSON.stringify(st));
        return st;
      } catch (err) {
        alert("Something went wrong!");
        console.log(err);
      }
    },
    editTask: (state, action) => {
      const id = action.payload.id;
      const updatedTitle = action.payload.newTitle;
      const objIndex = state.findIndex((obj) => obj.id == id);
      state[objIndex].title = updatedTitle;

    //   Updating the localstorage
      try {
        window.localStorage.setItem("taskList", JSON.stringify(state));
        // return st;
      } catch (err) {
        alert("Something went wrong!");
        console.log(err);
      }
    },
    markCompleted: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { addTask, editTask, deleteTask, markCompleted } =
  taskSlice.actions;

export default taskSlice.reducer;
