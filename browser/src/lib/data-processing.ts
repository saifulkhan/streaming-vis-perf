import { Spectrum } from "src/models/spectrum";
import { User } from "src/models/user";

export async function processUserProto(data) {
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const decoded = User.decode(bytes);
  console.log("processUserProto: user = ", decoded);

  return decoded;
}

export async function decodeSpectrumProto(data) {
  performance.mark("deserialise-start");

  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const decoded = Spectrum.decode(bytes);
  // console.log("decodeSpectrumProto: spectrum = ", decoded);

  performance.mark("deserialise-end");
  performance.measure("deserialise", "deserialise-start", "deserialise-end");

  // prettier-ignore
  console.log("decodeSpectrumProto: decoding time = ", performance.getEntriesByName("deserialise").map((d) => d.duration));

  return decoded;
}

export function decodeSpectrumUtf(data) {
  performance.mark("deserialise-start");

  const decoded = JSON.parse(data);
  // console.log("decodeSpectrumUtf: spectrum = ", decoded);

  performance.mark("deserialise-end");
  performance.measure("deserialise", "deserialise-start", "deserialise-end");
  // prettier-ignore
  console.log("decodeSpectrumUtf: decoding time = ", performance.getEntriesByName("deserialise").map((d) => d.duration));

  return decoded;
}
