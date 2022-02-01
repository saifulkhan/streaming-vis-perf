These are the tests used for Figure 1.

To run the SVG version, please open svg.html in your browser.
To run the SSVG version, please open ssvg.html in your browser.

The FPS and Front End Speed (Interaction Delay = 1000/Front End Speed)
are displayed in the top left corner.

Figure 1 Caption:
Wattenberg  and  Viegas popular  wind  map  visualization  is  written  for  the  Web
using  Canvas  for  its  rendering  speed(http://hint.fm/wind/).  
Implementation via the more-familiar SVG and D3.js is comparatively 
simple and enables element-levelevents for interaction, styling with CSS, 
and element inspection, but results in slow rendering at 7 frames per second (FPS). 
UsingSSVG, via one line of additional code, the frame rate reaches 36 FPS. This is comparable to the 
original canvas implementation at˜25 FPS. Live at ssvg.io/examples/windmap.




