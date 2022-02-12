import { Card, CardContent, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import React, { ReactElement, useEffect } from "react";
import DashboardLayout from "src/components/dashboard-layout/DashboardLayout";
import { SpectrumPlotCanvas } from "src/lib/spectrum-plot-canvas";
import SpectrumPlot from "src/lib/spectrum-plot-svg";
import { processSpectrumProto } from "src/utils/process";
import { mockData } from "./mock-data";
import { data1 } from "./mock-data-2";

const wsUrl = "ws://localhost:8002/consumer/spectrum-pb";

const SpectrumPb = () => {
  useEffect(() => {
    // plot
    // const spectrumPlot = new SpectrumPlot("#chart");
    // spectrumPlot.draw(mockData);

    const spectrumPlotCanvas = new SpectrumPlotCanvas({
      canvasId: "myCanvas",
      minX: 0,
      minY: 0,
      maxX: 100,
      maxY: 20,
      unitsPerTickX: 10,
      unitsPerTickY: 2,
    });
    spectrumPlotCanvas.drawLine(mockData);
    spectrumPlotCanvas.drawArea(mockData);

    // socket
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
          processSpectrumProto(data).then((spectrum: any) => {
            //  window.requestAnimationFrame(() => spectrumPlot.draw(spectrum));
          });
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
            <Card sx={{ minWidth: 1800 }}>
              <CardContent>
                <div id="chart" />

                <canvas
                  id="myCanvas"
                  width="1200"
                  height="600"
                  style={{ border: "1px solid black;" }}
                ></canvas>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default SpectrumPb;
