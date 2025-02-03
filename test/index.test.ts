import { describe, expect, test } from "vitest";
import { predictCreate3Address } from "../index";

describe("Create2", () => {
  test("Create2 matches solidity behavior", () => {
    // TODO
  });
});

describe("Create3", () => {
  test("Create3 matches solidity behavior", () => {
    const deployer = "0x0000000000000CF008e9bf9D01f8306029724c80";
    const salt =
      "0x92859e98829e4c26d8fbab6ebf4a44c99fa33b9c211fbc4405648cdd78d1a70f";
    const predicted = predictCreate3Address(deployer, salt);
    expect(predicted).toEqual("0xE3D256bFb4BeEF0e9946680FCc4b775357ce9A18");
  });
});
