import { mockSpectrumData } from "public/static/mock/spectrum-mock-data";
import { SpectrumPlotCanvas } from "./spectrum-plot-canvas";
import { SpectrumPlotSvg } from "./spectrum-plot-svg";

export function visFunctionFactory(vistype: string, mock: boolean = false) {
  console.log(`visFunctionFactory: create vistype = ${vistype}`);
  let visFunction: any;

  switch (vistype) {
    case "spectrum":
      // SVG
      // visFunction = new SpectrumPlotSvg("#chart");
      // mock && spectrumPlot.draw(mockSpectrumData);

      // Canvas
      visFunction = new SpectrumPlotCanvas({
        canvasId: "myCanvas",
        unitsPerTickX: 1000,
        unitsPerTickY: 2,
      });
      mock && visFunction.draw(mockSpectrumData);
      break;

    case "spectrogram":
      break;

    default:
      console.error(`VisTemplate: vistype = ${vistype} is not implemented.`);
  }

  return visFunction;
}
