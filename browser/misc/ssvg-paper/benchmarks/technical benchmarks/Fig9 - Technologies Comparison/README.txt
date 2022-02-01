These are the tests used for Figure 10.

To run the SVG version, please open svg.html in your browser.
To run the SSVG version, please open ssvg.html in your browser.
To run the SSVG version on a single thread, please open ssvgSingleThread.html in your browser.
To run the Canvas version on a single thread, please open canvas.html in your browser.

The FPS and Front End Speed (Interaction Delay = 1000/Front End Speed)
are displayed in the top left corner.

Figure 10 Caption:
Rendering performance comparison between SVG, SSVG, and a native canvas implementation,
drawing anincreasing number of rectangles. To stay at 30 FPS, a SVG visualizationneeds to contain fewer 
than 2,000 rectangles, whereas enabling SSVGon  the  exact  same  code  allows  rendering  13,000  
rectangles at thesame speed. A native canvas implementation would allow about 25,000  
rectangles at the same rendering performance. 

The test starts at 100 nodes and increments by 100 every 6 seconds until each reaches 30,100 nodes.
This takes ~25 mins from start to end. To reproduce our results wait till all the nodes have been added and 
run printMedianFps() in the console to view the results


