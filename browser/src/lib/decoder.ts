import { Spectrograms } from "src/models/spectrogram";
import { Spectrum } from "src/models/spectrum";

export async function decodeSpectrum(data: any) {
  performance.mark("deserialise-start");
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const decoded = Spectrum.decode(bytes);
  performance.mark("deserialise-end");
  performance.measure("deserialise", "deserialise-start", "deserialise-end");

  // prettier-ignore
  console.log("decodeSpectrum: decoding time = ", performance.getEntriesByName("deserialise").map((d) => d.duration));
  return decoded;
}

export async function decodeSpectrogram(data: any) {
  performance.mark("deserialise-start");
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const decoded = Spectrograms.decode(bytes);
  performance.mark("deserialise-end");
  performance.measure("deserialise", "deserialise-start", "deserialise-end");

  // prettier-ignore
  console.log("decodeSpectrogram: decoding time = ", performance.getEntriesByName("deserialise").map((d) => d.duration));
  return decoded;
}

export function decodeJson(data: any) {
  performance.mark("deserialise-start");
  const decoded = JSON.parse(data);
  performance.mark("deserialise-end");
  performance.measure("deserialise", "deserialise-start", "deserialise-end");

  // prettier-ignore
  console.log("jsonDecoder: decoding time = ", performance.getEntriesByName("deserialise").map((d) => d.duration));
  return decoded;
}
