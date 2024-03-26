import { createSlice } from '@reduxjs/toolkit';

interface UserPayload {
  firstName: string
  lastName: string
  gender: string
  email: string
  phoneNumber: string
  address: string
  profileImage: string
  interestedSports: string
}

interface SomeAction {
  type: string;
  payload: any;
  }

export interface State {
  user: UserPayload[]
}

const initialState = {
  user: [] as Array<any>
}

export const userData = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    createUser: (state: State, action: SomeAction) => {
      console.log(Array.isArray(state.user))
    },
  },
})

export const { createUser } = userData.actions;
export default userData.reducer;
