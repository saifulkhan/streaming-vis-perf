import { Card, CardContent, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactElement } from "react";
import DashboardLayout from "src/components/dashboard-layout/DashboardLayout";

const Home = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 8,
      }}
    >
      <Container>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5">
              Performance benchmark of streaming data visualization!
            </Typography>
            <br />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
