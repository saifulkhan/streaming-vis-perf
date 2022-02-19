import * as d3 from "d3";
import * as _ from "lodash";
import { SpectrogramPlot } from "./spectrogram-plot";

const WIDTH = 2300;
const HEIGHT = 1200;
const CELL_HEIGHT = 300;
const CELL_GAP = 10;

class SpectrogramPlotTable {
  divId;
  table;
  cells;
  colNames;
  rowNames;
  numRows;
  numCols;
  data;

  constructor(divId) {
    this.divId = divId;
  }

  draw(data) {
    this.data = data;
    console.log(data);

    if (
      !this.table
      // || !_.isEqual(this.colNames, polarisation)
      // ||!_.isEqual(this.rowNames, baseline)
    ) {
      // const [baseline, polarisation] = data.map((d) => [
      //   d.baseline,
      //   d.polarisation,
      // ]);
      // this.colNames = polarisation;
      // this.rowNames = baseline;
      this.numCols = this.colNames.length;
      this.numRows = this.rowNames.length;

      this.cells = new Array(this.numRows);
      for (let i = 0; i < this.numRows; i++) {
        this.cells[i] = new Array(this.numCols);
      }

      this.table = this.drawTable();
    }

    // console.log('spectrograms = ', this.spectrograms)
    let idx = 0;
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        if (!this.cells[i][j]) {
          this.cells[i][j] = new SpectrogramPlot(`canvas${i}${j}`);
        }
        console.log(this.data[idx]);
        this.cells[i][j].draw(this.data[idx].phase);
        idx++;
      }
    }
  }

  drawTable() {
    // clear/remove existing table
    d3.select("#" + this.divId)
      .selectAll("table")
      .remove();

    const table = d3
      .select("#" + this.divId)
      .append("table")
      .style("class", "table");

    const thead = table.append("thead");
    const tbody = table.append("tbody");

    // append the column header row
    thead
      .append("tr")
      .selectAll("th")
      .data([""].concat(this.colNames)) // column "" is for row header
      .enter()
      .append("th")
      .text((col) => col)
      .style("class", "th");

    // create a row for each object/array in the data
    const rows = tbody
      .selectAll("tr")
      .data(this.cells)
      .enter()
      .append("tr")
      .attr("id", (d, i) => {
        return i;
      });

    // create row header
    rows
      .append("th")
      .attr("scope", "row")
      .text((row, i) => this.rowNames[i]);

    // create a cell in each row for each column
    rows
      .selectAll("td")
      .data((row, i) => {
        //
        return this.colNames;
      })
      .enter()
      .append("td")
      .attr("id", function (d, i) {
        // the current node is selected using 'this', hence use 'function', not '=>'
        const trId = d3.select(this).node().parentNode.id;
        return `${trId}${i}`;
      })
      .append("canvas")
      .attr("id", function (d, i) {
        // the current node is selected using 'this', hence use 'function', not '=>'
        const tdId = d3.select(this).node().parentNode.id;
        return `canvas${tdId}`;
      })
      .attr("style", "canvas");

    return table;
  }
}

export default SpectrogramPlotTable;
