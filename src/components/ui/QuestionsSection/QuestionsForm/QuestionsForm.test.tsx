import { act, render, screen, waitFor } from "@/test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import {
  MIN_QUESTION_LENGTH,
  MAX_QUESTION_LENGTH,
  RESULT_MESSAGE_TIME,
} from "./QuestionsForm.config";
import QuestionsForm from "./QuestionsForm";

const { mockSendQuestion } = vi.hoisted(() => ({
  mockSendQuestion: vi.fn(),
}));

vi.mock("@/api/sendQuestion", () => ({
  default: mockSendQuestion,
}));

const setup = (options?: Parameters<typeof userEvent.setup>[0]) => {
  const user = userEvent.setup(options);
  render(<QuestionsForm />);
  return {
    user,
    nameInput: screen.getByLabelText("QuestionsForm.nameInput.label"),
    telInput: screen.getByLabelText("QuestionsForm.telInput.label"),
    questionInput: screen.getByLabelText("QuestionsForm.questionInput.label"),
    submitButton: screen.getByRole("button", {
      name: "QuestionsForm.submit",
    }),
  };
};

const fillField = async (
  user: ReturnType<typeof userEvent.setup>,
  field: HTMLElement,
  value: string,
) => {
  await user.click(field);
  await user.paste(value);
};

const createDeferred = <T,>() => {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

describe("QuestionsForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders form fields and submit button with translated texts", () => {
    setup();

    expect(
      screen.getByLabelText("QuestionsForm.nameInput.label"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("QuestionsForm.telInput.label"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("QuestionsForm.questionInput.label"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "QuestionsForm.submit" }),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("QuestionsForm.nameInput.placeholder"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("QuestionsForm.telInput.placeholder"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("QuestionsForm.questionInput.placeholder"),
    ).toBeInTheDocument();
  });

  it("does not send form and shows errors if required fields are empty", async () => {
    const { user, submitButton } = setup();

    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("QuestionsForm.nameInput.errors.required"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("QuestionsForm.telInput.errors.required"),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          `QuestionsForm.questionInput.errors.required ${MAX_QUESTION_LENGTH}`,
        ),
      ).toBeInTheDocument();
    });

    expect(screen.getByRole("status")).toBeEmptyDOMElement();
    expect(mockSendQuestion).not.toHaveBeenCalled();
  });

  it("shows error 'question is too short' with MIN_QUESTION_LENGTH shown", async () => {
    const { user, nameInput, telInput, questionInput, submitButton } = setup();

    await user.type(nameInput, "Иван Иванов");
    await user.type(telInput, "+79991234567");
    await user.type(questionInput, "a".repeat(MIN_QUESTION_LENGTH - 1));
    await user.click(submitButton);

    const error = await screen.findByText(
      `QuestionsForm.questionInput.errors.short ${MIN_QUESTION_LENGTH}`,
    );
    expect(error).toHaveTextContent(String(MIN_QUESTION_LENGTH));
    expect(mockSendQuestion).not.toHaveBeenCalled();
  });

  it("shows error 'question is too long' with MAX_QUESTION_LENGTH shown", async () => {
    const { user, nameInput, telInput, questionInput, submitButton } = setup();

    await user.type(nameInput, "Иван Иванов");
    await user.type(telInput, "+79991234567");
    await fillField(user, questionInput, "a".repeat(MAX_QUESTION_LENGTH + 1));
    await user.click(submitButton);

    const error = await screen.findByText(
      `QuestionsForm.questionInput.errors.long ${MAX_QUESTION_LENGTH}`,
    );
    expect(error).toHaveTextContent(String(MAX_QUESTION_LENGTH));
    expect(mockSendQuestion).not.toHaveBeenCalled();
  });

  describe("with fake timers", () => {
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
      vi.restoreAllMocks();
    });

    it("disables button while submitting and clears the form after success", async () => {
      const { user, nameInput, telInput, questionInput, submitButton } = setup({
        delay: null,
        advanceTimers: vi.advanceTimersByTime,
      });

      const deferred = createDeferred<void>();
      mockSendQuestion.mockReturnValueOnce(deferred.promise);

      const validQuestion = "a".repeat(MIN_QUESTION_LENGTH + 1);
      await user.type(nameInput, "Иван Иванов");
      await user.type(telInput, "+79991234567");
      await user.type(questionInput, validQuestion);
      await user.click(submitButton);

      await waitFor(() => expect(submitButton).toBeDisabled());

      await act(async () => {
        deferred.resolve();
        await deferred.promise;
      });

      expect(mockSendQuestion).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Иван Иванов",
          tel: "+79991234567",
          question: validQuestion,
        }),
      );

      await waitFor(() => {
        expect(screen.getByRole("status")).toHaveTextContent(
          "QuestionsForm.successMessage",
        );
      });
      expect(submitButton).not.toBeDisabled();
      expect(nameInput).toHaveValue("");
      expect(telInput).toHaveValue("");
      expect(questionInput).toHaveValue("");

      await act(async () => {
        await vi.advanceTimersByTimeAsync(RESULT_MESSAGE_TIME);
      });
      expect(screen.getByRole("status")).toBeEmptyDOMElement();
    });

    it("shows fail message and keeps form values when sendQuestion rejects", async () => {
      const { user, nameInput, telInput, questionInput, submitButton } = setup({
        delay: null,
        advanceTimers: vi.advanceTimersByTime,
      });

      const deferred = createDeferred<void>();
      mockSendQuestion.mockReturnValueOnce(deferred.promise);

      const validQuestion = "a".repeat(MIN_QUESTION_LENGTH + 1);
      await user.type(nameInput, "Иван Иванов");
      await user.type(telInput, "+79991234567");
      await user.type(questionInput, validQuestion);
      await user.click(submitButton);

      await waitFor(() => expect(submitButton).toBeDisabled());

      expect(mockSendQuestion).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Иван Иванов",
          tel: "+79991234567",
          question: validQuestion,
        }),
      );

      await act(async () => {
        deferred.reject(new Error("Network error"));
        await deferred.promise.catch(() => {});
      });

      await waitFor(() => {
        expect(screen.getByRole("status")).toHaveTextContent(
          "QuestionsForm.failMessage",
        );
      });
      expect(submitButton).not.toBeDisabled();
      expect(nameInput).toHaveValue("Иван Иванов");
      expect(telInput).toHaveValue("+79991234567");
      expect(questionInput).toHaveValue(validQuestion);

      await act(async () => {
        await vi.advanceTimersByTimeAsync(RESULT_MESSAGE_TIME);
      });
      expect(screen.getByRole("status")).toBeEmptyDOMElement();
    });

    it("resets previous result on repetitive submission", async () => {
      const { user, nameInput, telInput, questionInput, submitButton } = setup({
        delay: null,
        advanceTimers: vi.advanceTimersByTime,
      });

      const firstDeferred = createDeferred<void>();
      mockSendQuestion.mockReturnValueOnce(firstDeferred.promise);

      const validQuestion = "a".repeat(MIN_QUESTION_LENGTH + 1);

      await user.type(nameInput, "Иван Иванов");
      await user.type(telInput, "+79991234567");
      await user.type(questionInput, validQuestion);
      await user.click(submitButton);
      await act(async () => {
        firstDeferred.resolve();
        await firstDeferred.promise;
      });

      await waitFor(() =>
        expect(screen.getByRole("status")).toHaveTextContent(
          "QuestionsForm.successMessage",
        ),
      );

      const secondDeferred = createDeferred<void>();
      mockSendQuestion.mockReturnValueOnce(secondDeferred.promise);

      await fillField(user, nameInput, "Пётр Петров");
      await fillField(user, telInput, "+79997654321");
      await fillField(user, questionInput, validQuestion);
      await user.click(submitButton);

      await waitFor(() =>
        expect(screen.getByRole("status")).toBeEmptyDOMElement(),
      );

      await act(async () => {
        secondDeferred.resolve();
        await secondDeferred.promise;
      });

      await waitFor(() =>
        expect(screen.getByRole("status")).toHaveTextContent(
          "QuestionsForm.successMessage",
        ),
      );
    });
  });
});
