import React, { ReactElement, useEffect } from "react";
import { Card, CardContent, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";
import DashboardLayout from "src/components/dashboard-layout/DashboardLayout";

import * as d3 from "d3";
import Windy from "src/lib/windy";
import axios from "axios";

const WindMapCanvas = () => {
  const router = useRouter();

  useEffect(() => {
    var canvas = d3
      .select("#map")
      .append("canvas")
      .attr("width", 1000)
      .attr("height", 600)
      .attr("style", "position: absolute; left: 0px;");

    console.log("WindMapCanvas:");

    axios.get("/static/mock/gfs.json").then((response) => {
      console.log("WindMapCanvas: data = ", response);
      const windy = Windy({ canvas: canvas.node(), data: response.data });
      update();
    });
  }, []);

  return (
    <>
      <Head>
        <title>Wind-map(Canvas)</title>
      </Head>
      <DashboardLayout>
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
                <div id="map">
                  {/* <svg width="1000" height="600">
                  <g id="map"></g>
                  <path
                    id="alaska-blocker"
                    fill="#fff"
                    d="M0,300 L500,500 L0,500"
                  ></path>
                  <g id="traces"></g>
                </svg> */}
                </div>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default WindMapCanvas;
