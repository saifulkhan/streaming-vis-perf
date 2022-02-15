import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import DashboardLayout from "src/components/dashboard-layout/DashboardLayout";
import { protobufDecoderFactory, jsonDecoder } from "src/lib/decoder";
import { visFunctionFactory } from "src/lib/vis-function-factory";

const VisTemplate = () => {
  // const [visType, setVisType] = useState("");
  const [socketStatus, setSocketStatus] = useState("disconnected");

  const router = useRouter();
  const vistype =
    typeof router.query.vistype === "string" ? router.query.vistype : undefined;
  const protocol =
    typeof router.query.protocol === "string"
      ? router.query.protocol
      : undefined;

  const connectWebSocket = useCallback(async () => {
    if (!vistype || !protocol) {
      return;
    }

    const wsApi = `${process.env.NEXT_PUBLIC_WS_API}/${vistype}-${protocol}`;

    // prettier-ignore
    console.log(`VisTemplate: vistype = ${vistype}, protocol = ${protocol}, wsUrl = ${wsApi}`);
    const visFunction = visFunctionFactory(vistype, false);
    const protobufDecoder = protobufDecoderFactory(vistype, protocol);

    // socket
    const ws = new WebSocket(wsApi);

    ws.onerror = function (e) {
      console.error("VisTemplate: ws onerror, error = ", e);
    };

    ws.onclose = function () {
      console.log("VisTemplate: ws onclose");
    };

    ws.onopen = function () {
      console.log("VisTemplate: ws onopen");
      // ws.send("status: ws open");
    };

    ws.onmessage = function (msg) {
      let data = msg?.data;

      try {
        if (data instanceof ArrayBuffer) {
          // prettier-ignore
          console.log("VisTemplate: received, type = ArrayBuffer, data = ", data);
        } else if (data instanceof Blob) {
          protobufDecoder(data).then((decoded: any) => {
            // prettier-ignore
            console.log("VisTemplate: received type = Blob, decoded = ", decoded);
            window.requestAnimationFrame(() => visFunction?.draw(decoded));
          });
        } else {
          const decoded = jsonDecoder(data);
          if (decoded && decoded.status) {
            setSocketStatus(decoded.status);
          } else {
            // console.log("VisTemplate: received type = text, decoded = ", decoded);
            window.requestAnimationFrame(() => visFunction?.draw(decoded));
          }
        }
      } catch (e) {
        console.error("VisTemplate: received, decoding error = ", e);
      }
    };

    return () => {
      ws.close();
    };
  }, [vistype, protocol]);

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
                title={vistype?.toUpperCase() + " [" + protocol + "]"}
                subheader={socketStatus}
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

export default VisTemplate;
