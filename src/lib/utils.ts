import { Building } from "src/types";

export const filterByHeight = (minHeight: number) => (
  building: Building
): boolean => building.height >= minHeight;

export const underConstructionStatus = "U/C";

export const filterByStatus = (onlyUnderConstruction: boolean) => (
  building: Building
): boolean =>
  building.status === underConstructionStatus || !onlyUnderConstruction;

export const findMaxHeight = (buildinds: Building[]): number =>
  Math.max(...buildinds.map((building) => building.height));
