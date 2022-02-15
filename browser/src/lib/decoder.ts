import { Spectrograms } from "src/models/spectrogram";
import { Spectrum } from "src/models/spectrum";

export function protobufDecoderFactory(vistype: string, protocol: string) {
  // prettier-ignore
  console.log(`decoderFactory: create decoder vistype = ${vistype}, protocol = ${protocol}`);

  if (vistype === "spectrum" && protocol === "protobuf") {
    return async (data: any) => {
      performance.mark("deserialise-start");
      const buffer = await data.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const decoded = Spectrum.decode(bytes);
      performance.mark("deserialise-end");
      performance.measure(
        "deserialise",
        "deserialise-start",
        "deserialise-end",
      );

      // prettier-ignore
      console.log("decoderFactory: ", vistype, protocol, ", decoding time = ", performance.getEntriesByName("deserialise").map((d) => d.duration));
      return decoded;
    };
  } else if (vistype === "spectrogram" && protocol === "protobuf") {
    return async (data: any) => {
      performance.mark("deserialise-start");
      const buffer = await data.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const decoded = Spectrograms.decode(bytes);
      performance.mark("deserialise-end");
      performance.measure(
        "deserialise",
        "deserialise-start",
        "deserialise-end",
      );

      // prettier-ignore
      console.log("decoderFactory: ", vistype, protocol, ", decoding time = ", performance.getEntriesByName("deserialise").map((d) => d.duration));
      return decoded;
    };
  } else {
    // prettier-ignore
    console.warn("decoderFactory: ", vistype, protocol, ", ProtoBuf decoder not found/required");
  }
}

export function jsonDecoder(data: any) {
  performance.mark("deserialise-start");
  const decoded = JSON.parse(data);
  performance.mark("deserialise-end");
  performance.measure("deserialise", "deserialise-start", "deserialise-end");

  // prettier-ignore
  console.log("jsonDecoder: decoding time = ", performance.getEntriesByName("deserialise").map((d) => d.duration));
  return decoded;
}
