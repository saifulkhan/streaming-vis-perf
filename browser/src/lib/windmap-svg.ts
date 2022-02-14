import * as topojson from "topojson";
import * as d3 from "d3";
import $ from "jquery";
import axios from "axios";
import {
  createPath,
  getParsedData,
  getPointAtLength,
} from "./data-processing_";

export function draw() {
  const svg = d3.select("#chart").select("svg"); // d3.select("svg");
  const mapG = svg.select("#map");
  const tracesG = svg.select("#traces");
  const projection = d3.geoAlbersUsa();
  const path = d3.geoPath().projection(projection);

  console.log("wind-map-svg.ts: draw:");

  d3.json("https://ssvg-example-resources.surge.sh/us.json").then(
    (us: any) => {
      mapG;
      //.append("path")
      //.attr("class", "states")
      //.datum(topojson.feature(us, us.objects.states))
      //.attr("d", path);
      // $.get({
      //   url: "https://ssvg-example-resources.surge.sh/latest.json",
      // }).then((response) => {
      axios.get("/static/mock/gfs.json").then((response) => {
        // d3.json("/static/mock/gfs.json", (response, error) => {
        console.log("wind-map-svg.ts: response = ", response);

        const data = getParsedData(response.data);
        let pathDs = [];
        const numberOfSegments = 4;
        let segmentLength = 12;
        for (let i = 0; i < Math.random() * 1000000; i++) {
          pathDs.push(createPath(projection, data));
        }
        let numberRafs = 0;
        const raf = () => {
          numberRafs++;
          if (numberRafs > 50) {
            for (let i = 0; i < Math.random() * 120; i++) {
              pathDs.push(createPath(projection, data));
            }
          }
          pathDs = pathDs.filter((p) => p.progressPercent < 300);
          const segmentData = [];
          for (let d of pathDs) {
            const guideLength = d.length;
            if (!guideLength) {
              continue;
            }
            d.progressPercent += 1.1; // Move 0.4%  of the guide length per frame.
            const progressLength = (d.progressPercent * guideLength) / 100;
            for (let i = 0; i < numberOfSegments; i++) {
              let startDistance =
                progressLength + segmentLength * (i - numberOfSegments);
              let endDistance =
                progressLength + segmentLength * (i - numberOfSegments + 1);
              startDistance = startDistance < 0 ? 0 : startDistance;
              endDistance = endDistance < 0 ? 0 : endDistance;
              startDistance =
                startDistance > guideLength ? guideLength : startDistance;
              endDistance =
                endDistance > guideLength ? guideLength : endDistance;
              segmentData.push({
                start: getPointAtLength(d, startDistance),
                end: getPointAtLength(d, endDistance),
                index: i,
              });
            }
          }
          const segmentLines = tracesG.selectAll("line").data(segmentData);
          const pathsEnter = segmentLines
            .enter()
            .append("line")
            .attr("opacity", (d) => (d.index + 1) / (numberOfSegments + 2));
          pathsEnter
            .merge(segmentLines)
            .attr("x1", (d) => d.start.x)
            .attr("y1", (d) => d.start.y)
            .attr("x2", (d) => d.end.x)
            .attr("y2", (d) => d.end.y);
          requestAnimationFrame(raf);
        };
        raf();
      });
    },
    (err) => {
      console.error(err);
    },
  );
}
