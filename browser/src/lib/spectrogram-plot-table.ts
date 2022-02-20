import * as d3 from "d3";
import * as _ from "lodash";
import { SpectrogramPlot } from "./spectrogram-plot";

const WIDTH = 1000;
const HEIGHT = 600;
const CELL_HEIGHT = 100;
const CELL_WIDTH = 300;
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
  len;

  constructor(divId) {
    this.divId = divId;
  }

  draw(data) {
    this.data = data;
    console.log(data);
    if (
      !this.table ||
      this.len !== data.length
      // || !_.isEqual(this.colNames, polarisation)
      // ||!_.isEqual(this.rowNames, baseline)
    ) {
      this.len = data.length;
      // const [baseline, polarisation] = data.map((d) => [
      //   d.baseline,
      //   d.polarisation,
      // ]);
      // this.colNames = polarisation;
      // this.rowNames = baseline;
      this.numCols = Math.floor(WIDTH / (CELL_WIDTH + CELL_GAP)); // this.colNames.length;
      this.numRows = Math.ceil(this.len / this.numCols) || 1; // this.rowNames.length;

      console.log(this.numCols, this.numRows);

      this.cells = new Array(this.numRows);
      for (let i = 0; i < this.numRows; i++) {
        this.cells[i] = new Array(this.numCols);
      }

      console.log("cells = ", this.cells);

      this.drawTable();
    }

    console.log(this.cells);

    // console.log('spectrograms = ', this.spectrograms)
    let idx = 0;
    for (let i = 0; i < this.numCols; i++) {
      for (let j = 0; j < this.numRows; j++) {
        if (idx >= this.len) break;

        console.log(this.cells[j][i]);

        if (!this.cells[j][i]) {
          this.cells[j][i] = new SpectrogramPlot(`canvas${idx}`);
        }
        // console.log(this.data[idx]);
        this.cells[j][i].draw(this.data[idx].phase);
        idx++;
      }
    }
  }

  drawTable() {
    // clear/remove existing table
    d3.select("#" + this.divId)
      .selectAll("table")
      .remove();

    this.table = d3
      .select("#" + this.divId)
      .append("table")
      .style("class", "table");

    let tablebody = this.table.append("tbody");
    let rows = tablebody.selectAll("tr").data(this.cells).enter().append("tr");
    // We built the rows using the nested array - now each row has its own array.
    let cells = rows
      .selectAll("td")
      // each row has data associated; we get it and enter it for the cells.
      .data((d) => {
        console.log(d);
        return d;
      })
      .enter()
      .append("td")
      .text((d) => {
        return "hello";
      })
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

    return;
  }
}

export default SpectrogramPlotTable;
