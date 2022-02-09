import * as d3 from "d3";
// import { useRef, useEffect } from "react";
// import PropTypes from "prop-types";

let width = 1200;
let height = 600;
const margin = { top: 10, right: 10, bottom: 40, left: 50 };
width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;
const xLabel = "";
const yLabel = "";

export class SpectrumPlot {
  svg: any;
  x: any;
  y: any;

  constructor(selector, xMin, xMax, yMin, yMax) {
    // append the svg object to the selector
    this.svg = d3
      .select(selector)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // create x-scale
    this.x = d3.scaleLinear().domain([xMin, xMax]).range([0, width]);
    // add x-axis
    this.svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(this.x));

    // create y-scale
    this.y = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]);
    // add y axis
    this.svg.append("g").call(d3.axisLeft(this.y));

    // label for the x-axis
    this.svg
      .append("text")
      .attr("transform", `translate(${width / 2} ,${height + margin.top + 20})`)
      .style("fill", "grey")
      .style("text-anchor", "middle")
      .style("font-size", "15px")
      .text(xLabel);

    // label for the y-axis
    this.svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1.0em")
      .style("fill", "grey")
      .style("text-anchor", "middle")
      .style("font-size", "15px")
      .text(yLabel);
  }

  public draw(width: number, height: number, data: any) {
    // console.log("SpectrumPlot:draw: data = ", data);
    // console.log("SpectrumPlot:draw: width, height =", width, height);
    // if (
    //   !data ||
    //   !data.spectrum_values ||
    //   !data.spectrum_values.length ||
    //   !width ||
    //   !height
    // )
    //   return;

    // Clear
    // d3.select(ref.current).select("svg").remove();

    const {
      xMin,
      xMax,
      yMin,
      yMax,
      xLabel,
      yLabel,
      frequencies,
      rfis,
      flags,
      spectrum_values,
    } = data;

    // set the dimensions and margins of the graph
    // const margin = { top: 10, right: 10, bottom: 40, left: 50 };
    // width = width - margin.left - margin.right;
    // height = height - margin.top - margin.bottom;

    // // append the svg object to the body of the page
    // const svg = d3
    //   .select(ref.current)
    //   .append("svg")
    //   .attr("width", width + margin.left + margin.right)
    //   .attr("height", height + margin.top + margin.bottom)
    //   .append("g")
    //   .attr("transform", `translate(${margin.left},${margin.top})`);

    // // Add X axis --> it is a date format
    // const x = d3.scaleLinear().domain([xMin, xMax]).range([0, width]);
    // svg
    //   .append("g")
    //   .attr("transform", `translate(0,${height})`)
    //   .call(d3.axisBottom(x));

    // // Add Y axis
    // const y = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]);
    // svg.append("g").call(d3.axisLeft(y));

    // Show confidence interval or std
    this.svg
      .append("path")
      .datum(spectrum_values)
      .attr("fill", "#1f77b4")
      .attr("stroke", "none")
      .attr("opacity", 0.3)
      .attr(
        "d",
        d3
          .area()
          .curve(d3.curveMonotoneX)
          .x((value, i) => this.x(frequencies[i]))
          .y0((value) => this.y(value[0] + value[1]))
          .y1((value) => this.y(value[0] - value[2])),
      );

    // Add the line
    this.svg
      .append("path")
      .datum(spectrum_values)
      .attr("fill", "none")
      .attr("stroke", "#3366CC")
      .attr("stroke-width", 1.5)
      .attr("opacity", 1)
      .attr(
        "d",
        d3
          .line()
          .curve(d3.curveMonotoneX)
          .x((value, i) => x(frequencies[i]))
          .y((value) => y(value[0])),
      );

    this.svg
      .exit()
      .transition()
      .duration(300)
      .attr("y", height)
      .attr("height", 0)
      .remove();
  }

  // useEffect(() => {
  //   draw(props.width, props.height, props.data);
  //   // eslint-disable-next-line react/destructuring-assignment
  // }, [props.data]);

  // return (
  //   <div className="chart">
  //     <svg ref={ref} />
  //   </div>
  // );
}

// SpectrumPlot.propTypes = {
//   width: PropTypes.number.isRequired,
//   height: PropTypes.number.isRequired,
//   data: PropTypes.any.isRequired,
// };

export default SpectrumPlot;
