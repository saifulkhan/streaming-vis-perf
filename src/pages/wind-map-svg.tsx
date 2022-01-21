import React, { ReactElement, useEffect } from "react";
import { Card, CardContent, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";

import DashboardLayout from "src/components/dashboard-layout/DashboardLayout";
import { draw } from "src/lib/windmap-svg";

const WindMapSVG = () => {
  const router = useRouter();
  const type =
    typeof router.query.type === "string" ? router.query.type : undefined;

  useEffect(() => {
    draw();
  }, []);

  return (
    <>
      <Head>
        <title>Wind-map(SVG)</title>
      </Head>
      {/* <DashboardLayout> */}
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
              <div id="chart">
                <svg width="1000" height="600">
                  <g id="map"></g>
                  {/* <path
                    id="alaska-blocker"
                    fill=""
                    d="M0,300 L500,500 L0,500"
                  ></path> */}
                  <g id="traces"></g>
                </svg>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Box>
      {/* </DashboardLayout> */}
    </>
  );
};

export default WindMapSVG;
