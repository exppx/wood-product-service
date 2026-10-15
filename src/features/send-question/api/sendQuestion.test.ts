import type { MockInstance } from "vitest";
import type { QuestionsFormInputs } from "../model";
import sendQuestion from "./sendQuestion";

let logSpy: MockInstance<typeof console.log>;
let mathSpy: MockInstance<typeof Math.random>;

const data: QuestionsFormInputs = {
  name: "Test Name",
  tel: "+79999999999",
  question: "Test question",
};

describe("sendQuestion", () => {
  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    mathSpy = vi.spyOn(Math, "random");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs passed data on success", async () => {
    mathSpy.mockReturnValue(0.9);

    await sendQuestion(data);

    expect(logSpy).toHaveBeenCalledWith(data);
  });

  it("throws error on failure", async () => {
    mathSpy.mockReturnValue(0.1);

    await expect(sendQuestion(data)).rejects.toThrow();
  });
});
