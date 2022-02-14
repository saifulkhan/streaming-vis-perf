import { Card, CardContent, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import React, { ReactElement, useEffect } from "react";
import DashboardLayout from "src/components/dashboard-layout/DashboardLayout";

import { processSpectrumProto } from "src/lib/data-processing";

const wsUrl = "ws://localhost:8002/consumer/topic3";

const Topic3 = () => {
  useEffect(() => {
    const ws = new WebSocket(wsUrl);

    ws.onerror = function (error) {
      console.log("Error");
    };

    ws.onclose = function () {
      console.log("Error");
    };

    ws.onopen = function () {
      ws.send("Connection established. Hello server!");
    };

    ws.onmessage = function (msg) {
      let data = msg?.data;

      try {
        if (data instanceof ArrayBuffer) {
          console.log("onmessage: type = ArrayBuffer, data = ", data);
        } else if (msg.data instanceof Blob) {
          console.log("onmessage: type = Blob, data = ", data);
          processSpectrumProto(data);
        } else {
          console.log("onmessage: type = text, data = ", data);
        }
      } catch (e) {
        console.error("invalid data");
      }
    };

    return () => {
      ws.close();
    };
  });

  return (
    <>
      <Head>
        <title>Topic3</title>
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
                <Typography variant="h4">Topic3</Typography>
                <br />
              </CardContent>
            </Card>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Topic3;
