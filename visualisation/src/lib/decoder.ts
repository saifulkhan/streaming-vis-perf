import { Spectrograms } from "src/models/protobuf/spectrogram";
import { Spectrum } from "src/models/protobuf/spectrum";

const transTime = [];

export async function decodeSpectrum(data: any, log = false): Promise<any> {
  const time1 = Date.now();

  log && performance.mark("deserialise-start");
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const decoded = Spectrum.decode(bytes);
  log && performance.mark("deserialise-end");
  // prettier-ignore
  log && performance.measure("deserialise", "deserialise-start", "deserialise-end");
  // prettier-ignore
  log && console.log( "Spectrum: Decoding time: ", performance.getEntriesByName("deserialise").map((d) => d.duration));

  log && timeDiff(time1, decoded.timestamp);
  
  return decoded;
}

export async function decodeSpectrogram(data: any, log = false) {
  const time1 = Date.now();

  log && performance.mark("deserialise-start");
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const decoded = Spectrograms.decode(bytes);
  log && performance.mark("deserialise-end");
  // prettier-ignore
  log && performance.measure("deserialise", "deserialise-start", "deserialise-end");
  // prettier-ignore
  log && console.log( "Spectrogram: Decoding time: ", performance.getEntriesByName("deserialise").map((d) => d.duration) );

  log && timeDiff(time1, decoded.timestamp);

  return decoded;
}

export function decodeJson(data: any, log = false) {
  const time1 = Date.now();

  log && performance.mark("deserialise-start");
  const decoded = JSON.parse(data);
  log && performance.mark("deserialise-end");
  // prettier-ignore
  log && performance.measure("deserialise", "deserialise-start", "deserialise-end");
  // prettier-ignore
  log && console.log( "JSON: Decoding time: ", performance.getEntriesByName("deserialise").map((d) => d.duration), );

  log && timeDiff(time1, decoded.timestamp);

  return decoded;
}

function timeDiff(time1: number, time2: number) {
  transTime.push(time1 - time2);
  console.log("Transmission time: ", transTime);
}
