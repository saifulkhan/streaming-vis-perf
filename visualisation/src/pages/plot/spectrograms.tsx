import { useCallback, useEffect, useState } from "react";
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
import Head from "next/head";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import { useRouter } from "next/router";

import { Protocol } from "src/models/protocol";
import { MessageTopic } from "src/models/message-topic";
import SpectrogramPlotTable from "src/lib/spectrogram-plot-table";
import { decodeJson, decodeSpectrogram } from "src/lib/decoder";
import DashboardLayout from "src/components/dashboard-layout/DashboardLayout";

const WIDTH = 1200;
const HEIGHT = 600;
const CELL_WIDTH = 150;
const CELL_HEIGHT = 75;
const MESSAGE_TOPIC = MessageTopic.SPECTROGRAMS;

const SpectrogramTable = () => {
  const theme = useTheme();
  const router = useRouter();
  const [socketStatus, setSocketStatus] = useState("disconnected");

  const protocol: Protocol =
    typeof router.query.protocol === "string" &&
    Object.values(Protocol).includes(router.query.protocol as Protocol)
      ? (router.query.protocol as Protocol)
      : undefined;

  const connectWebSocket = useCallback(async () => {
    if (!protocol) {
      return;
    }

    const spectrogramPlotTable = new SpectrogramPlotTable(
      "divId",
      WIDTH,
      HEIGHT,
      CELL_WIDTH,
      CELL_HEIGHT,
    );
    // test plot with mock data
    // spectrogramPlotTable.draw(mockSpectrogramsData.spectrogram);

    const WS_API = `${process.env.NEXT_PUBLIC_WS_API}/${protocol}_${MESSAGE_TOPIC}`;
    // prettier-ignore
    console.log(`SpectrogramsPage: connecting to WS_API = ${WS_API}`);

    // socket
    const ws = new WebSocket(WS_API);

    ws.onerror = function (e) {
      console.error("SpectrogramsPage: ws onerror, error = ", e);
    };

    ws.onclose = function () {
      console.log("SpectrogramsPage: ws onclose");
    };

    ws.onopen = function () {
      console.log("SpectrogramsPage: ws onopen");
      // ws.send("status: ws open");
    };

    ws.onmessage = function (msg) {
      const data = msg?.data;

      try {
        if (data instanceof ArrayBuffer) {
          // prettier-ignore
          console.log("SpectrogramsPage: received, type = ArrayBuffer, data = ", data);
        } else if (data instanceof Blob) {
          decodeSpectrogram(data).then((decoded: any) => {
            // prettier-ignore
            // console.log("SpectrogramsPage: received type = Blob, decoded = ", decoded);
            window.requestAnimationFrame(() => {
              spectrogramPlotTable.draw(decoded.spectrogram);
            });
          });
        } else {
          const decoded = decodeJson(data);
          // prettier-ignore
          // console.log( "SpectrogramsPage: received type = string, decoded = ", decoded, );
          if (decoded && decoded.status) {
            setSocketStatus(decoded.status);
          } else {
            // prettier-ignore
            // console.log("SpectrogramsPage: received type = text, decoded = ", decoded);
            window.requestAnimationFrame(() => {
              spectrogramPlotTable.draw(decoded.spectrogram);
            });
          }
        }
      } catch (e) {
        console.error("SpectrogramsPage: received, decoding error = ", e);
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
        <title>Phase Spectrograms</title>
      </Head>
      <DashboardLayout>
        <Box
          sx={{
            position: "fixed",
            overflow: "visible",
            bottom: 0,
            left: { xs: 0, md: 280 },
            top: 60,
            right: 0,
          }}
        >
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ minWidth: WIDTH }}>
                  <CardHeader
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    avatar={
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <WaterfallChartIcon />
                      </Avatar>
                    }
                    title="Spectrograms"
                    subheader={`Socket: ${socketStatus}, Serialisation: ${protocol}`}
                  />

                  <CardContent sx={{ pt: "8px" }}>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Click on the baseline and polarisation label to see a
                      detailed spectrogram
                    </Typography>

                    <div id="divId" />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default SpectrogramTable;
