import { User } from "src/lib/user";
import { Spectrum } from "src/lib/spectrum";

export async function processUserProto(data) {
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const decoded = User.decode(bytes);
  console.log("processUserProto: user = ", decoded);
}

export async function processSpectrumProto(data) {
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const decoded = Spectrum.decode(bytes);
  console.log("processSpectrumProto: spectrum = ", decoded);
}
