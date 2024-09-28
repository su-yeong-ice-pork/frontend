export interface Coordinate {
  latitude: number;
  longitude: number;
}

export const SERVICE_AREA: Coordinate[] = [
  {latitude: 35.23574637775597, longitude: 129.08084249987394},
  {latitude: 35.23623054054288, longitude: 129.08149695887357},
  {latitude: 35.2357836211499, longitude: 129.08185101046354},
  {latitude: 35.23533889009391, longitude: 129.0815036643961},
];

export const isPointInPolygon = (
  point: Coordinate,
  polygon: Coordinate[],
): boolean => {
  let isInside = false;
  const {latitude, longitude} = point;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].latitude,
      yi = polygon[i].longitude;
    const xj = polygon[j].latitude,
      yj = polygon[j].longitude;

    const intersect =
      yi > longitude !== yj > longitude &&
      latitude < ((xj - xi) * (longitude - yi)) / (yj - yi) + xi;
    if (intersect) isInside = !isInside;
  }
  return isInside;
};
