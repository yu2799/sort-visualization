import type { NextPage } from "next";
import { Box } from "@mui/material";
import { Header } from "../components/Header";
import { Contents } from "../components/Contents";

const Home: NextPage = () => {
  return (
    <Box>
      <Header />
      <Contents />
    </Box>
  );
};

export default Home;
