// Barrel export for the supermarket 3D primitive library.
// Scene components import from here; no primitive source file re-exports another.

export { Tin } from './Tin'
export { Packet } from './Packet'
export { Bottle } from './Bottle'
export { Basket } from './Basket'
export { Shelf, SHELF_TOP_Y } from './Shelf'
export {
  ConveyorBelt,
  CONVEYOR_TOP_Y,
  CONVEYOR_LENGTH,
} from './ConveyorBelt'
export { AisleSign, AISLE_SIGN_DIMENSIONS } from './AisleSign'
export { Trolley, TROLLEY_BASKET_TOP_Y } from './Trolley'
export { Scanner } from './Scanner'
export { StudioLights } from './StudioLights'
export { StoreFloor } from './StoreFloor'

export type { PrimitiveProps, Vec3 } from './types'
