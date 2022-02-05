import { Card, CardContent, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import React, { ReactElement, useEffect } from "react";
import DashboardLayout from "src/components/dashboard-layout/DashboardLayout";

var protobuf = require("protobufjs/minimal");
import { User } from "src/lib/user";

const wsUrl = "ws://localhost:8002/consumer/test1";

const Protobuf = () => {
  useEffect(() => {
    console.log("Protobuf: useEffect: 1");
    let message = User.create({
      name: "Saiful Khan",
      favoriteNumber: 1234567891,
      favoriteColor: "red",
    });
    let buffer = User.encode(message).finish();
    let decoded = User.decode(buffer);
    console.log("Protobuf: buffer = ", buffer);
    console.log("Protobuf: decoded = ", decoded);

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
        var decodedMessage = User.decode(data);
        console.log("decodedMessage = ", decodedMessage);
      } catch (e) {
        if (e instanceof protobuf.util.ProtocolError) {
          console.log("e = ", e);
          // e.instance holds the so far decoded message with missing required fields
        } else {
          // wire format is invalid
          console.log("format invalid");
        }
      }

      if (data instanceof ArrayBuffer) {
        // data = processArrayBuffer(msg.data);
        console.log("onmessage: type = ArrayBuffer, data = ", data);
      } else if (msg.data instanceof Blob) {
        console.log("onmessage: type = Blob, data = ", data);
        toArrayBuffer(data);
        console.log("onmessage:verify = ", User.verify(data));

        // var myReader = new FileReader();
        // myReader.onload = function (event) {
        //   console.log(JSON.stringify(myReader.result));
        // };
        // myReader.readAsText(data);

        // data = processArrayBuffer(msg.data);
      } else {
        console.log("onmessage: type = text, data = ", data);
        data = processText(data);
      }
    };

    async function toArrayBuffer(data) {
      const buffer = await data.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      console.log(bytes);
      const decoded = User.decode(bytes);
      console.log("onmessage: decoded user = ", decoded);
    }

    return () => {
      // TODO
      // ws.close();
    };
  });

  function processArrayBuffer(buffer) {
    var name = new Uint8Array(buffer, 0, 16);
    var id = new Uint16Array(buffer, 16, 1);
    var score = new Float32Array(buffer, 18, 32);
  }

  function processText(data) {
    console.log("processText: data = ", data);
    return data;
  }

  return (
    <>
      <Head>
        <title>Protobuf</title>
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
                <Typography variant="h4">Protobuf</Typography>
                <br />
              </CardContent>
            </Card>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Protobuf;
