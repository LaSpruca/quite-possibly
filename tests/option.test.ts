import { Option } from "../src/index";

it("Test unwrap", () => {
  const someVal = Option.from("Hello world");
  const noneVal = Option.from<string>();

  // Is checks
  expect(someVal.isSome()).toBeTruthy();
  expect(someVal.isNone()).toBeFalsy();

  expect(noneVal.isNone()).toBeTruthy();
  expect(noneVal.isSome()).toBeFalsy();

  // Raw unwraps
  expect(someVal.unwrap()).toBe("Hello world");
  expect(noneVal.unwrap).toThrow();

  // Unwrap or
  expect(someVal.unwrapOr("Goodbye world")).toBe("Hello world");
  expect(noneVal.unwrapOr("Goodbye world")).toBe("Goodbye world");

  // Unwrap or else
  expect(someVal.unwrapOrElse(() => "Goodbye world")).toBe("Hello world");
  expect(noneVal.unwrapOrElse(() => "Goodbye world")).toBe("Goodbye world");
});

it("Test map", () => {
  const someVal = Option.from("Hello world");

  expect(someVal.map((f) => f.length).unwrap()).toBe(11);

  const noneVal = Option.none<string>();

  expect(noneVal.map((f) => f.length).unwrap).toThrow();
});

it("Test or", () => {
  const someVal = Option.from("Hello world");
  const goodbyeWorld = Option.from("Goodbye world");
  const noneVal = Option.none<string>();

  expect(someVal.or(goodbyeWorld).unwrap()).toBe("Hello world");
  expect(noneVal.or(goodbyeWorld).unwrap()).toBe("Goodbye world");
  expect(noneVal.or(Option.none()).unwrap).toThrow();

  expect(someVal.orElse(() => goodbyeWorld).unwrap()).toBe("Hello world");
  expect(noneVal.orElse(() => goodbyeWorld).unwrap()).toBe("Goodbye world");
  expect(noneVal.orElse(() => Option.none()).unwrap).toThrow();
});

it("Test then", () => {
  const someVal = Option.from("Hello world");
  const goodbyeWorld = Option.from("Goodbye world");
  const noneVal = Option.none<string>();
  const fn = (x: string) => (x == "Hello world" ? goodbyeWorld : Option.none());

  expect(someVal.then(fn).unwrap()).toBe("Goodbye world");
  expect(goodbyeWorld.then(fn).unwrap).toThrow();
  expect(noneVal.then(fn).unwrap).toThrow();
});
