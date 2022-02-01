(function() {
  const fpsContainer = document.createElement("div");
  fpsContainer.setAttribute("id", "fps-meter");
  fpsContainer.style.cssText = "position: absolute;left: 10px;top: 10px;background-color: #2121219c;color: #fff;padding: 10px;";

  const visFpsLabel = document.createElement("p");
  visFpsLabel.innerHTML = "Vis Speed:";
  visFpsLabel.style.cssText = "margin: 0;font-size: 10px;display: flex;align-items: center;letter-spacing: 1px;font-family: sans-serif;";
 
  const visFpsText = document.createElement("p");
  visFpsText.innerHTML = "FPS";
  visFpsText.style.cssText = "margin: 0;font-size: 14px;display: flex;align-items: center;letter-spacing: 1px;font-family: sans-serif;";

  const visFpsData = document.createElement("span");
  visFpsData.setAttribute("id", "fps-element");
  visFpsData.style.cssText = "font-size: 24px;margin-right: 10px";

  const frontendFpsLabel = document.createElement("p");
  frontendFpsLabel.innerHTML = "Front-end Speed:";
  frontendFpsLabel.style.cssText = "margin: 0;font-size: 10px;display: flex;align-items: center;letter-spacing: 1px;font-family: sans-serif; margin-top: 15px;";

  const frontendFpsText = document.createElement("p");
  frontendFpsText.innerHTML = "FPS";
  frontendFpsText.style.cssText = "margin: 0;font-size: 14px;display: flex;align-items: center;letter-spacing: 1px;font-family: sans-serif;";

  const frontendFpsData = document.createElement("span");
  frontendFpsData.setAttribute("id", "frontend-fps-element");
  frontendFpsData.style.cssText = "font-size: 24px;margin-right: 10px";

  visFpsText.insertAdjacentElement("afterbegin", visFpsData);
  frontendFpsText.insertAdjacentElement("afterbegin", frontendFpsData);

  fpsContainer.appendChild(visFpsLabel);
  fpsContainer.appendChild(visFpsText);
  fpsContainer.appendChild(frontendFpsLabel);
  fpsContainer.appendChild(frontendFpsText);

  document.body.appendChild(fpsContainer);

  const lastTenFramesTimes = [];

  const canvas = document.getElementsByTagName("canvas");
  const isCanvas = canvas.length;

  const performanceMeasureRAF = () => {

    lastTenFramesTimes.push(Date.now());

    if (lastTenFramesTimes.length > 100) {
      lastTenFramesTimes.shift(); // Remove first item
    }

    if (lastTenFramesTimes.length > 1) {
      const timeForTenDrawsMs = Date.now() - lastTenFramesTimes[0];
      const fps = Math.round(lastTenFramesTimes.length / timeForTenDrawsMs * 1000);
      if (!isCanvas) {
        visFpsData.innerHTML = fps;
      }
      frontendFpsData.innerHTML = fps;
    }

    requestAnimationFrame(performanceMeasureRAF);
  };

  performanceMeasureRAF();
})();
