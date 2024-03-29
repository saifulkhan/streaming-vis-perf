import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TimelineIcon from "@mui/icons-material/Timeline";
import { useRouter } from "next/router";

import { Protocol } from "src/models/protocol";
import { MessageTopic } from "src/models/message-topic";
import { decodeJson, decodeSpectrum } from "src/lib/decoder";
import DashboardLayout from "src/components/dashboard-layout/DashboardLayout";
import { SpectrumPlotSvg } from "src/lib/spectrum-plot-svg";

const WIDTH = 1200;
const HEIGHT = 600;
const MESSAGE_TOPIC = MessageTopic.SPECTRUM;

const SpectrumPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const [socketStatus, setSocketStatus] = useState("disconnected");

  const protocol: Protocol =
    typeof router.query.protocol === "string" &&
    Object.values(Protocol).includes(router.query.protocol as Protocol)
      ? (router.query.protocol as Protocol)
      : undefined;

  const connectToWebSocket = useCallback(async () => {
    if (!protocol) {
      return;
    }
    //
    // spectrum plot: SVG implementation
    //
    const spectrumPlot = new SpectrumPlotSvg("#divId", WIDTH, HEIGHT);

    //
    // Spectrum plot: canvas implementation 
    // The Ci/SD band visualization is not complete
    //
    // const spectrumPlot = new SpectrumPlotCanvas({
    //   canvasId: "canvasId",
    //   unitsPerTickX: 1000,
    //   unitsPerTickY: 2,
    // });

    // test plot with mock data
    // spectrumPlot.draw(mockSpectrumData);

    const WS_API = `${process.env.NEXT_PUBLIC_WS_API}/${protocol}_${MESSAGE_TOPIC}`;
    // prettier-ignore
    console.log(`SpectrumPage: connecting to WS_API = ${WS_API}`);

    // socket
    const ws = new WebSocket(WS_API);

    ws.onerror = function (e) {
      console.error("SpectrumPage: ws onerror, error = ", e);
    };

    ws.onclose = function () {
      console.log("SpectrumPage: ws onclose");
    };

    ws.onopen = function () {
      console.log("SpectrumPage: ws onopen");
      // ws.send("status: ws open");
    };

    ws.onmessage = function (msg) {
      const data = msg?.data;

      try {
        if (data instanceof ArrayBuffer) {
          // prettier-ignore
          console.log("SpectrumPage: received, type = ArrayBuffer, data = ", data);
        } else if (data instanceof Blob) {
          decodeSpectrum(data, true).then((decoded: any) => {
            // prettier-ignore
            // console.log("SpectrumPage: received type = Blob, decoded = ", decoded);
            window.requestAnimationFrame(() => spectrumPlot?.draw(decoded));
          });
        } else {
          const decoded = decodeJson(data, true);
          if (decoded && decoded.status) {
            setSocketStatus(decoded.status);
          } else {
            // prettier-ignore
            // console.log("SpectrumPage: received type = text, decoded = ", decoded);
            window.requestAnimationFrame(() => spectrumPlot?.draw(decoded));
          }
        }
      } catch (e) {
        console.error("SpectrumPage: received, decoding error = ", e);
      }
    };

    return () => {
      ws.close();
    };
  }, [protocol]);

  useEffect(() => {
    connectToWebSocket();
  }, [connectToWebSocket]);

  return (
    <>
      <Head>
        <title>Spectrum Plot</title>
      </Head>
      <DashboardLayout>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ minWidth: WIDTH + 60 }}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                avatar={
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    <TimelineIcon />
                  </Avatar>
                }
                title="Spectrum Plot"
                subheader={`Socket: ${socketStatus}, Serialisation: ${protocol}`}
              />

              <CardContent sx={{ pt: "8px" }}>
                <div id="divId" />
                {/* <canvas
                      id="canvasId"
                      width={WIDTH}
                      height={HEIGHT}
                      style={{
                        outline: "gray 1px solid",
                        backgroundColor: "white",
                      }}
                    ></canvas> */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* </Container> */}
        {/* </Box> */}
      </DashboardLayout>
    </>
  );
};

export default SpectrumPage;
