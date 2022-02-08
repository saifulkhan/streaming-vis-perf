import { Card, CardContent, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import React, { ReactElement, useEffect } from "react";
import DashboardLayout from "src/components/dashboard-layout/DashboardLayout";
import { processSpectrumProto } from "src/utils/process";

const wsUrl = "ws://localhost:8002/consumer/spectrum-pb";

const SpectrumPb = () => {
  useEffect(() => {
    const ws = new WebSocket(wsUrl);

    ws.onerror = function (e) {
      console.error("[spectrum-pb]: ws error = ", e);
    };

    ws.onclose = function () {
      console.log("[spectrum-pb]: ws closed");
    };

    ws.onopen = function () {
      ws.send("[spectrum-pb]: ws open");
    };

    ws.onmessage = function (msg) {
      let data = msg?.data;

      try {
        if (data instanceof ArrayBuffer) {
          // prettier-ignore
          console.log("[spectrum-pb]: received, type = ArrayBuffer, data = ", data);
        } else if (data instanceof Blob) {
          console.log("[spectrum-pb]: received, type = Blob, data = ", data);
          processSpectrumProto(data);
        } else {
          console.log("[spectrum-pb]: received, type = text, data = ", data);
        }
      } catch (e) {
        console.error("[spectrum-pb]: receive, error = ", e);
      }
    };

    return () => {
      ws.close();
    };
  });

  return (
    <>
      <Head>
        <title>Spectrum</title>
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
                {/* <Typography variant="h4"></Typography> */}
                {/* <br /> */}
              </CardContent>
            </Card>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default SpectrumPb;
