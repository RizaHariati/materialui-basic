import Create from "./pages/Create";
import Notes from "./pages/Notes";
import Nav from "./Nav";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme } from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
const theme = createTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
