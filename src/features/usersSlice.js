import { createSlice } from '@reduxjs/toolkit'

let initialState = []

try {
    let data = window.localStorage.getItem("users_list")

    console.log(data)
    try {
        data = JSON.parse(data)

        if (data) {
            initialState = data
        }
    } catch (err) {
        console.log('error parsing the data: ', err);
        initialState = []
    }

} catch (err) {
    alert("Something went wrong in fetching the Task List!")
    console.log(err);
}


export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUserRole: (state, action) => {            
            const email = action.payload.email
            const updatedRole = action.payload.role

            console.log(email)

            const idx = state.findIndex((obj) => obj.email == email)

            try {
                let data = window.localStorage.getItem("users_list")

                try {
                    data = JSON.parse(data)

                    if (data) {
                        state[idx].role = updatedRole
                        data = state
                        window.localStorage.setItem('users_list', JSON.stringify(data))
                        return state
                    }
                } catch (err) {
                    console.log('error parsing the data: ', err);
                    return state

                }
            } catch (err) {
                alert("Something went wrong in fetching the Task List!")
                console.log(err);
                return state

            }

        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUserRole } = userSlice.actions

export default userSlice.reducer