These are the tests used for Figure 11.

To run the SVG version, please open svg-[shape].html in your browser.
To run the SSVG version, please open ssvg-[shape].html in your browser.

The FPS and Front End Speed (Interaction Delay = 1000/Front End Speed)
are displayed in the top left corner.

Figure 11 Caption:
Rendering performance comparison between SVG and SSVG fordifferent shapes: text, circle, rectangle, and line. 
SVG has a very similarperformance across all shapes. SSVG's text rendering has a similarperformance to SVG, 
but circle, rectangle, and line all render much faster. At 10,000 nodes, SSVG's circle rendering performs 6 times faster thanSVG
(4 vs 25 FPS). SSVG's rectangle and line rendering perform about10 times faster than SVG (4 vs 39 FPS).

The test starts at 100 nodes and increments by 100 every 6 seconds until each reaches 30,100 nodes.
This takes ~25 mins from start to end. To reproduce our results wait till all the nodes have been added and 
run printMedianFps() in the console to view the results


