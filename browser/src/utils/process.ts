import { Spectrum } from "src/models/spectrum";
import { User } from "src/models/user";

export async function processUserProto(data) {
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const decoded = User.decode(bytes);
  console.log("processUserProto: user = ", decoded);

  return decoded;
}

let perf;
export async function decodeSpectrumProto(data) {
  performance.mark("deserialise-start");

  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const decoded = Spectrum.decode(bytes);
  // console.log("decodeSpectrumProto: spectrum = ", decoded);

  performance.mark("deserialise-end");
  performance.measure("deserialise", "deserialise-start", "deserialise-end");
  var measures = performance.getEntriesByName("deserialise");
  perf = measures.map((d) => d.duration);
  console.log("decodeSpectrumProto: decoding time = ", perf);

  return decoded;
}

export function decodeSpectrumUtf(data) {
  performance.mark("deserialise-start");

  const decoded = JSON.parse(data);
  // console.log("decodeSpectrumUtf: spectrum = ", decoded);

  performance.mark("deserialise-end");
  performance.measure("deserialise", "deserialise-start", "deserialise-end");
  var measures = performance.getEntriesByName("deserialise");
  perf = measures.map((d) => d.duration);
  console.log("decodeSpectrumUtf: decoding time = ", perf);

  return decoded;
}
