import { Card, CardContent, CardHeader, Container } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import DashboardLayout from "src/components/dashboard-layout/DashboardLayout";
import { decodeJson, decodeSpectrum } from "src/lib/decoder";
import { SpectrumPlotCanvas } from "src/lib/spectrum-plot-canvas";

const WS_API = `${process.env.NEXT_PUBLIC_WS_API}/spectrogram-`;

const SpectrogramPage = () => {
  const [socketStatus, setSocketStatus] = useState("disconnected");
  const router = useRouter();
  const protocol =
    typeof router.query.protocol === "string"
      ? router.query.protocol
      : undefined;

  const connectWebSocket = useCallback(async () => {
    if (!protocol) {
      return;
    }

    // SVG
    // spectrumPlot = new SpectrumPlotSvg("#chart");
    // spectrumPlot.draw(mockSpectrumData);

    // Canvas
    // const spectrumPlot = new SpectrumPlotCanvas({
    //   canvasId: "myCanvas",
    //   unitsPerTickX: 1000,
    //   unitsPerTickY: 2,
    // });
    // spectrumPlot.draw(mockSpectrumData);

    const wsApi = `${WS_API}${protocol}`;
    // prettier-ignore
    console.log(`SpectrogramPage: protocol = ${protocol}, wsApi = ${wsApi}`);

    // socket
    const ws = new WebSocket(wsApi);

    ws.onerror = function (e) {
      console.error("SpectrogramPage: ws onerror, error = ", e);
    };

    ws.onclose = function () {
      console.log("SpectrogramPage: ws onclose");
    };

    ws.onopen = function () {
      console.log("SpectrogramPage: ws onopen");
      // ws.send("status: ws open");
    };

    ws.onmessage = function (msg) {
      let data = msg?.data;

      try {
        if (data instanceof ArrayBuffer) {
          // prettier-ignore
          console.log("SpectrogramPage: received, type = ArrayBuffer, data = ", data);
        } else if (data instanceof Blob) {
          decodeSpectrum(data).then((decoded: any) => {
            // prettier-ignore
            console.log("SpectrogramPage: received type = Blob, decoded = ", decoded);
            // window.requestAnimationFrame(() => spectrumPlot?.draw(decoded));
          });
        } else {
          const decoded = decodeJson(data);
          if (decoded && decoded.status) {
            setSocketStatus(decoded.status);
          } else {
            // console.log("SpectrogramPage: received type = text, decoded = ", decoded);
            // window.requestAnimationFrame(() => spectrumPlot?.draw(decoded));
          }
        }
      } catch (e) {
        console.error("SpectrogramPage: received, decoding error = ", e);
      }
    };

    return () => {
      ws.close();
    };
  }, [protocol]);

  useEffect(() => {
    connectWebSocket();
  }, [connectWebSocket]);

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
              <CardHeader
                title="SPECTROGRAM"
                subheader={
                  "socket: " + socketStatus + ", serialization:" + protocol
                }
              />

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

export default SpectrogramPage;
