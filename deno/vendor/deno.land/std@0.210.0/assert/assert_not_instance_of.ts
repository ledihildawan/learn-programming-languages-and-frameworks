// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
import { assertFalse } from "./assert_false.ts";

/**
 * Make an assertion that `obj` is not an instance of `type`.
 * If so, then throw.
 *
 * @example
 * ```ts
 * import { assertNotInstanceOf } from "https://deno.land/std@$STD_VERSION/assert/assert_not_instance_of.ts";
 *
 * assertNotInstanceOf(new Date(), Number); // Doesn't throw
 * assertNotInstanceOf(new Date(), Date); // Throws
 * ```
 */
export function assertNotInstanceOf<A, T>(
  actual: A,
  // deno-lint-ignore no-explicit-any
  unexpectedType: new (...args: any[]) => T,
  msg?: string,
): asserts actual is Exclude<A, T> {
  const msgSuffix = msg ? `: ${msg}` : ".";
  msg =
    `Expected object to not be an instance of "${typeof unexpectedType}"${msgSuffix}`;
  assertFalse(actual instanceof unexpectedType, msg);
}
