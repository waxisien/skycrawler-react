import { Building } from "../types";

export const filterByHeight = (minHeight: number) => (
  building: Building
): boolean => building.height >= minHeight;

export const filterByStatus = (onlyUnderConstruction: boolean) => (
  building: Building
): boolean => building.status === "U/C" || !onlyUnderConstruction;

export const findMaxHeight = (buildinds: Building[]): number =>
  Math.max(...buildinds.map((building) => building.height));
