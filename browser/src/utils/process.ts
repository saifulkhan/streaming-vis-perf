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
export async function processSpectrumProto(data) {
  performance.mark("deserialise-start");
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const decoded = Spectrum.decode(bytes);

  console.log("processSpectrumProto: spectrum = ", decoded);
  performance.mark("deserialise-end");
  performance.measure("deserialise", "deserialise-start", "deserialise-end");
  var measures = performance.getEntriesByName("deserialise");
  // var measure = measures[0];
  // console.log("deserialise time (ms) = ", measures);
  perf = measures.map((d) => d.duration);
  console.log(perf);

  return decoded;
}
