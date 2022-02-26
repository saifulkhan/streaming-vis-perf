import { Spectrograms } from "src/models/spectrogram";
import { Spectrum } from "src/models/spectrum";

export async function decodeSpectrum(
  data: any,
  log: boolean = false,
): Promise<any> {
  log && performance.mark("deserialise-start");
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const decoded = Spectrum.decode(bytes);
  log && performance.mark("deserialise-end");
  log &&
    performance.measure("deserialise", "deserialise-start", "deserialise-end");

  log &&
    console.log(
      "decodeSpectrum: decoding time = ",
      performance.getEntriesByName("deserialise").map((d) => d.duration),
    );
  return decoded;
}

export async function decodeSpectrogram(data: any, log: boolean = false) {
  log && performance.mark("deserialise-start");
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const decoded = Spectrograms.decode(bytes);
  log && performance.mark("deserialise-end");
  log &&
    performance.measure("deserialise", "deserialise-start", "deserialise-end");

  log &&
    console.log(
      "decodeSpectrogram: decoding time = ",
      performance.getEntriesByName("deserialise").map((d) => d.duration),
    );
  return decoded;
}

export function decodeJson(data: any, log: boolean = false) {
  log && performance.mark("deserialise-start");
  const decoded = JSON.parse(data);
  log && performance.mark("deserialise-end");
  log &&
    performance.measure("deserialise", "deserialise-start", "deserialise-end");

  log &&
    console.log(
      "jsonDecoder: decoding time = ",
      performance.getEntriesByName("deserialise").map((d) => d.duration),
    );
  return decoded;
}