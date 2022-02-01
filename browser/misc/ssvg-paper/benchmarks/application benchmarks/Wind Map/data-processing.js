function getParsedData(response) {
  const data = {};

  // [0] is temperature. [1] is U component of wind, [2] is V component of wind.
  for (let i = 1; i < response.length; i++) {
    const dataPart = response[i];

    const startLatitude = Math.min(dataPart.header.la1, dataPart.header.la2);
    const endLatitude = Math.max(dataPart.header.la1, dataPart.header.la2);
    const latitudePoints = endLatitude - startLatitude + 1;

    const startLongitude = Math.min(dataPart.header.lo1, dataPart.header.lo2);
    const endLongitude = Math.max(dataPart.header.lo1, dataPart.header.lo2);
    const longitudePoints = endLongitude - startLongitude + 1;

    const windComponent = i === 1 ? 'u' : 'v';

    // "outer loop" is latitude, "inner loop" is longitude.

    let dataIndex = 0;
    let outerLoopIndex = 0;
    let innerLoopIndex = 0;

    for (let value of dataPart.data) {
      outerLoopIndex = Math.floor(dataIndex / longitudePoints);
      innerLoopIndex = dataIndex - outerLoopIndex * longitudePoints;

      let latitude = startLatitude + outerLoopIndex;
      let longitude = startLongitude + innerLoopIndex;

      if (!data[latitude]) {
        data[latitude] = {};
      }
      if (!data[latitude][longitude]) {
        data[latitude][longitude] = {u: 0, v: 0};
      }

      data[latitude][longitude][windComponent] = value;

      dataIndex++;
    }
  }
  return data;
}

function getForcePerLatLon(data, lat, lon) {
  const lowerLat = Math.floor(lat);
  const upperLat = lowerLat + 1;
  const upperLatRatio = lat - lowerLat;
  const lowerLatRatio = 1 - upperLatRatio;

  const lowerLon = Math.floor(lon);
  const upperLon = lowerLon + 1;
  const upperLonRatio = lon - lowerLon;
  const lowerLonRatio = 1 - upperLonRatio;

  const lowLow = data[lowerLat][lowerLon];
  const lowHigh = data[lowerLat][upperLon];
  const highLow = data[upperLat][lowerLon];
  const highHigh = data[upperLat][upperLon];

  let v = 0;
  v += lowLow.v * lowerLatRatio * lowerLonRatio;
  v += lowHigh.v * lowerLatRatio * upperLonRatio;
  v += highLow.v * upperLatRatio * lowerLonRatio;
  v += highHigh.v * upperLatRatio * upperLonRatio;

  let u = 0;
  u += lowLow.u * lowerLatRatio * lowerLonRatio;
  u += lowHigh.u * lowerLatRatio * upperLonRatio;
  u += highLow.u * upperLatRatio * lowerLonRatio;
  u += highHigh.u * upperLatRatio * upperLonRatio;

  return {u: u, v: v};
}

function getRandomPoint() {
  return {
    lat: 25 + Math.random() * (60 - 25),
    lon: 230 + Math.random() * (300 - 230)
  };
}

function getPointAtLength(path, length) {
  let lengthPercentage = (length / path.length) % 1.0000001;
  if (lengthPercentage < 0) {
    lengthPercentage = 1 + lengthPercentage;
  }
  const index = Math.floor((path.points.length - 1) * lengthPercentage);

  return path.points[index];
}

function createPath(projection, data) {
  const points = [getRandomPoint()];
  const xy = projection([points[0].lon, points[0].lat]);
  points[0].x = xy ? xy[0] : undefined;
  points[0].y = xy ? xy[1] : undefined;

  let length = 0;
  const dataProgressionRate = 0.007;
  const pathLength = 0.9;
  const numberOfDataPoints = pathLength / dataProgressionRate;

  for (let progress = 0; progress < numberOfDataPoints; progress++) {
    const lastPoint = points[points.length - 1];
    const wind = getForcePerLatLon(data, lastPoint.lat, lastPoint.lon);
    const nextPoint = {
      lat: lastPoint.lat + wind.v * dataProgressionRate,
      lon: lastPoint.lon + wind.u * dataProgressionRate,
      x: 0,
      y: 0
    };
    const xy = projection([nextPoint.lon, nextPoint.lat]);
    if (xy) {
      nextPoint.x = xy[0];
      nextPoint.y = xy[1];

      length += Math.sqrt(Math.pow(nextPoint.x - lastPoint.x, 2) + Math.pow(nextPoint.y - lastPoint.y, 2));

      points.push(nextPoint);
    }
  }

  return {
    length: length,
    points: points,
    progressPercent: 0
  };
}