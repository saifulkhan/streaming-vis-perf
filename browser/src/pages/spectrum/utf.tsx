import { Card, CardContent, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import React, { ReactElement, useEffect } from "react";
import DashboardLayout from "src/components/dashboard-layout/DashboardLayout";

import { processUserProto } from "src/utils/process";

const wsUrl = "ws://localhost:8002/consumer/topic2";

const Topic2 = () => {
  useEffect(() => {
    //
    // Test protobuf encoding and decoding in JS
    // console.log("Protobuf: useEffect: 1");
    // let message = User.create({
    //   name: "Saiful Khan",
    //   favoriteNumber: 1234567891,
    //   favoriteColor: "red",
    // });
    // let buffer = User.encode(message).finish();
    // let decoded = User.decode(buffer);
    // console.log("Protobuf: buffer = ", buffer);
    // console.log("Protobuf: decoded = ", decoded);

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

      // Test
      // var protobuf = require("protobufjs/minimal");
      // try {
      //   var decodedMessage = User.decode(data);
      //   console.log("decodedMessage = ", decodedMessage);
      // } catch (e) {
      //   if (e instanceof protobuf.util.ProtocolError) {
      //     console.log("e = ", e);
      //     // e.instance holds the so far decoded message with missing required fields
      //   } else {
      //     // wire format is invalid
      //     console.log("format invalid");
      //   }
      // }

      try {
        if (data instanceof ArrayBuffer) {
          console.log("onmessage: type = ArrayBuffer, data = ", data);
        } else if (msg.data instanceof Blob) {
          console.log("onmessage: type = Blob, data = ", data);
          processUserProto(data);
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
        <title>Topic2</title>
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
                <Typography variant="h4">Topic2</Typography>
                <br />
              </CardContent>
            </Card>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Topic2;
