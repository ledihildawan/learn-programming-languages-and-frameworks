import { add, multiply } from "./artihmetic.ts";

import { assert } from './deps.ts'

function totalCost(outbound: number, inbound: number, tax: number): number {
  return multiply(add(outbound, inbound), tax)
}

console.log(totalCost(19, 31, 1.7))
console.log(totalCost(45, 27, 1.15))