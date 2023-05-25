import { createSlice } from "@reduxjs/toolkit";

// Fonction pour récupérer l'état initial à partir du stockage local
const getInitialState = () => {
  const storedUser = localStorage.getItem("user");
  return {
    user: storedUser ? JSON.parse(storedUser) : null,
  };
};

export const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      // Sauvegarder les informations de connexion de l'utilisateur dans le stockage local
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      // Supprimer les informations de connexion de l'utilisateur du stockage local
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
