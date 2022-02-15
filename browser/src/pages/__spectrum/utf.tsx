import { Card, CardContent, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useEffect } from "react";
import DashboardLayout from "src/components/dashboard-layout/DashboardLayout";
import { SpectrumPlotCanvas } from "src/lib/spectrum-plot-canvas";
import { SpectrumPlotSvg } from "src/lib/spectrum-plot-svg";
import { decodeSpectrumUtf } from "src/lib/data-processing";
import { mockSpectrumData } from "./spectrum-mock-data";

const wsUrl = "ws://localhost:8002/consumer/spectrum-utf";

const SpectrumPb = () => {
  useEffect(() => {
    // SVG
    // const spectrumPlot = new SpectrumPlotSvg("#chart");
    // spectrumPlot.draw(mockSpectrumData);

    // Canvas
    const spectrumPlotCanvas = new SpectrumPlotCanvas({
      canvasId: "myCanvas",
      unitsPerTickX: 1000,
      unitsPerTickY: 2,
    });

    // spectrumPlotCanvas.draw(mockSpectrumData);

    // socket
    const ws = new WebSocket(wsUrl);

    ws.onerror = function (e) {
      console.error("[utf-8]: ws error = ", e);
    };

    ws.onclose = function () {
      console.log("[utf-8]: ws closed");
    };

    ws.onopen = function () {
      ws.send("[utf-8]: ws open");
    };

    ws.onmessage = function (msg) {
      let data = msg?.data;

      try {
        if (data instanceof ArrayBuffer) {
          // prettier-ignore
          console.log("[utf-8]: received, type = ArrayBuffer, data = ", data);
        } else if (data instanceof Blob) {
          console.log("[utf-8]: received, type = Blob, data = ", data);
        } else {
          // console.log("[utf-8]: received, type = text, data = ", data);
          data = decodeSpectrumUtf(data);
          if (data && data?.channels?.length > 0 && data?.power.length > 0) {
            // console.log("[utf-8]: received, type = text, data = ", data);
            window.requestAnimationFrame(() => spectrumPlotCanvas.draw(data));
          }
        }
      } catch (e) {
        console.error("[utf-8]: receive, error = ", e);
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
                  width="1600"
                  height="600"
                  style={{ border: "1px solid black" }}
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
