import type { SubmitEvent } from "react";
import { act, renderHook, waitFor } from "@/test-utils/test-utils";
import createDeferred from "@/test-utils/createDeferred";
import sendQuestion from "../../api/sendQuestion";
import {
  MIN_QUESTION_LENGTH,
  RESULT_MESSAGE_TIME,
  type QuestionsFormInputs,
} from "../../model";
import useSendQuestion from "./useSendQuestion";

vi.mock("../../api/sendQuestion");

type HookResult = { current: ReturnType<typeof useSendQuestion> };

const VALID_VALUES: QuestionsFormInputs = {
  name: "Иван Иванов",
  tel: "+79991234567",
  question: "a".repeat(MIN_QUESTION_LENGTH + 1),
};

async function fillForm(
  result: HookResult,
  values: Partial<QuestionsFormInputs> = VALID_VALUES,
) {
  for (const [name, value] of Object.entries(values)) {
    await act(async () => {
      await result.current
        .register(name as keyof QuestionsFormInputs)
        .onChange({
          target: { name, value },
          type: "change",
        });
    });
  }
}

async function submit(result: HookResult) {
  await act(async () => {
    result.current.onSubmit({
      preventDefault: vi.fn(),
    } as unknown as SubmitEvent<HTMLFormElement>);

    await Promise.resolve();
  });
}

describe("useSendQuestion", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(sendQuestion).mockResolvedValue(undefined);
  });

  describe("initial state", () => {
    it("has no result, no errors and is not submitting", () => {
      const { result } = renderHook(() => useSendQuestion());

      expect(result.current.result).toBeNull();
      expect(result.current.isSubmitting).toBe(false);
      expect(result.current.errors).toEqual({});
    });
  });

  describe("validation", () => {
    it("does not call the api and sets required errors for empty fields", async () => {
      const { result } = renderHook(() => useSendQuestion());

      await submit(result);

      await waitFor(() => {
        expect(result.current.errors.name?.message).toBe("required");
        expect(result.current.errors.tel?.message).toBe("required");
        expect(result.current.errors.question?.message).toBe("required");
      });
      expect(sendQuestion).not.toHaveBeenCalled();
      expect(result.current.result).toBeNull();
    });

    it("sets 'invalid' error for a malformed phone number", async () => {
      const { result } = renderHook(() => useSendQuestion());

      await fillForm(result, { ...VALID_VALUES, tel: "12345" });
      await submit(result);

      await waitFor(() =>
        expect(result.current.errors.tel?.message).toBe("invalid"),
      );
      expect(sendQuestion).not.toHaveBeenCalled();
    });

    it("sets 'short' error when the question is too short", async () => {
      const { result } = renderHook(() => useSendQuestion());

      await fillForm(result, {
        ...VALID_VALUES,
        question: "a".repeat(MIN_QUESTION_LENGTH - 1),
      });
      await submit(result);

      await waitFor(() =>
        expect(result.current.errors.question?.message).toBe("short"),
      );
      expect(sendQuestion).not.toHaveBeenCalled();
    });

    it("sets 'long' error when the question is too long", async () => {
      const { result } = renderHook(() => useSendQuestion());

      await fillForm(result, {
        ...VALID_VALUES,
        question: "a".repeat(1001),
      });
      await submit(result);

      await waitFor(() =>
        expect(result.current.errors.question?.message).toBe("long"),
      );
      expect(sendQuestion).not.toHaveBeenCalled();
    });
  });

  describe("successful submission", () => {
    it("calls the api with the form values", async () => {
      const { result } = renderHook(() => useSendQuestion());

      await fillForm(result);
      await submit(result);

      await waitFor(() => expect(result.current.result).toBe("success"));
      expect(sendQuestion).toHaveBeenCalledTimes(1);
      expect(sendQuestion).toHaveBeenCalledWith(
        expect.objectContaining(VALID_VALUES),
      );
    });

    it("is submitting while the request is pending", async () => {
      const deferred = createDeferred<void>();
      vi.mocked(sendQuestion).mockReturnValue(deferred.promise);
      const { result } = renderHook(() => useSendQuestion());

      await fillForm(result);
      await submit(result);

      await waitFor(() => expect(result.current.isSubmitting).toBe(true));
      expect(result.current.result).toBeNull();

      await act(async () => {
        deferred.resolve();
        await deferred.promise;
      });

      await waitFor(() => expect(result.current.isSubmitting).toBe(false));
      expect(result.current.result).toBe("success");
    });

    it("resets the form after success", async () => {
      const { result } = renderHook(() => useSendQuestion());

      await fillForm(result);
      await submit(result);
      await waitFor(() => expect(result.current.result).toBe("success"));

      // после reset поля пустые, повторная отправка не проходит валидацию
      vi.mocked(sendQuestion).mockClear();
      await submit(result);

      await waitFor(() =>
        expect(result.current.errors.name?.message).toBe("required"),
      );
      expect(sendQuestion).not.toHaveBeenCalled();
    });
  });

  describe("failed submission", () => {
    beforeEach(() => {
      vi.mocked(sendQuestion).mockRejectedValue(new Error("Network error"));
    });

    it("sets the fail result and stops submitting", async () => {
      const { result } = renderHook(() => useSendQuestion());

      await fillForm(result);
      await submit(result);

      await waitFor(() => expect(result.current.result).toBe("fail"));
      expect(result.current.isSubmitting).toBe(false);
    });

    it("keeps the form values so the user can retry", async () => {
      const { result } = renderHook(() => useSendQuestion());

      await fillForm(result);
      await submit(result);
      await waitFor(() => expect(result.current.result).toBe("fail"));

      vi.mocked(sendQuestion).mockResolvedValue(undefined);
      await submit(result);

      await waitFor(() => expect(result.current.result).toBe("success"));
      expect(sendQuestion).toHaveBeenLastCalledWith(
        expect.objectContaining(VALID_VALUES),
      );
    });
  });

  describe("result auto reset", () => {
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
      act(() => {
        vi.runOnlyPendingTimers();
      });
      vi.useRealTimers();
    });

    it("clears the success result after RESULT_MESSAGE_TIME", async () => {
      const { result } = renderHook(() => useSendQuestion());

      await fillForm(result);
      await submit(result);
      await waitFor(() => expect(result.current.result).toBe("success"));

      await act(async () => {
        await vi.advanceTimersByTimeAsync(RESULT_MESSAGE_TIME / 2);
      });
      expect(result.current.result).toBe("success");

      await act(async () => {
        await vi.advanceTimersByTimeAsync(RESULT_MESSAGE_TIME);
      });
      expect(result.current.result).toBeNull();
    });

    it("clears the fail result after RESULT_MESSAGE_TIME", async () => {
      vi.mocked(sendQuestion).mockRejectedValue(new Error("fail"));
      const { result } = renderHook(() => useSendQuestion());

      await fillForm(result);
      await submit(result);
      await waitFor(() => expect(result.current.result).toBe("fail"));

      await act(async () => {
        await vi.advanceTimersByTimeAsync(RESULT_MESSAGE_TIME);
      });

      expect(result.current.result).toBeNull();
    });

    it("resets the previous result when a new submission starts", async () => {
      const { result } = renderHook(() => useSendQuestion());

      await fillForm(result);
      await submit(result);
      await waitFor(() => expect(result.current.result).toBe("success"));

      const deferred = createDeferred<void>();
      vi.mocked(sendQuestion).mockReturnValue(deferred.promise);

      await fillForm(result);
      await submit(result);

      await waitFor(() => expect(result.current.result).toBeNull());

      await act(async () => {
        deferred.resolve();
        await deferred.promise;
      });

      await waitFor(() => expect(result.current.result).toBe("success"));
    });

    it("does not update state after unmount", async () => {
      const { result, unmount } = renderHook(() => useSendQuestion());

      await fillForm(result);
      await submit(result);
      await waitFor(() => expect(result.current.result).toBe("success"));

      unmount();

      expect(vi.getTimerCount()).toBe(0);
    });
  });
});
