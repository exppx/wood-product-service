import { render, screen, waitFor } from "@/test-utils/test-utils";
import createDeferred from "@/test-utils/createDeferred";
import userEvent from "@testing-library/user-event";
import sendQuestion from "../../api/sendQuestion";
import { MAX_QUESTION_LENGTH, MIN_QUESTION_LENGTH } from "../../model";
import QuestionsForm from "./QuestionsForm";

vi.mock("../../api/sendQuestion");

const VALID_NAME = "Иван Иванов";
const VALID_TEL = "+79991234567";
const VALID_QUESTION = "a".repeat(MIN_QUESTION_LENGTH + 1);

function setup() {
  const user = userEvent.setup();
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
}

type Setup = ReturnType<typeof setup>;

async function fillField(
  user: Setup["user"],
  field: HTMLElement,
  value: string,
) {
  await user.click(field);
  await user.paste(value);
}

async function fillValidForm({
  user,
  nameInput,
  telInput,
  questionInput,
}: Setup) {
  await fillField(user, nameInput, VALID_NAME);
  await fillField(user, telInput, VALID_TEL);
  await fillField(user, questionInput, VALID_QUESTION);
}

describe("QuestionsForm", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(sendQuestion).mockResolvedValue(undefined);
  });

  describe("rendering", () => {
    it("renders fields with translated labels and placeholders", () => {
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
        screen.getByPlaceholderText("QuestionsForm.nameInput.placeholder"),
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("QuestionsForm.telInput.placeholder"),
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("QuestionsForm.questionInput.placeholder"),
      ).toBeInTheDocument();
    });

    it("renders the submit button with translated text", () => {
      setup();

      expect(
        screen.getByRole("button", { name: "QuestionsForm.submit" }),
      ).toBeInTheDocument();
    });

    it("renders an empty status region initially", () => {
      setup();

      expect(screen.getByRole("status")).toBeEmptyDOMElement();
    });
  });

  describe("validation errors", () => {
    it("shows translated required errors for empty fields", async () => {
      const { user, submitButton } = setup();

      await user.click(submitButton);

      expect(
        await screen.findByText("QuestionsForm.nameInput.errors.required"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("QuestionsForm.telInput.errors.required"),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          `QuestionsForm.questionInput.errors.required ${MAX_QUESTION_LENGTH}`,
        ),
      ).toBeInTheDocument();
      expect(sendQuestion).not.toHaveBeenCalled();
      expect(screen.getByRole("status")).toBeEmptyDOMElement();
    });

    it("shows translated error for an invalid phone number", async () => {
      const { user, nameInput, telInput, questionInput, submitButton } =
        setup();

      await fillField(user, nameInput, VALID_NAME);
      await fillField(user, telInput, "12345");
      await fillField(user, questionInput, VALID_QUESTION);
      await user.click(submitButton);

      expect(
        await screen.findByText("QuestionsForm.telInput.errors.invalid"),
      ).toBeInTheDocument();
      expect(sendQuestion).not.toHaveBeenCalled();
    });

    it("shows the 'short' error with MIN_QUESTION_LENGTH", async () => {
      const { user, nameInput, telInput, questionInput, submitButton } =
        setup();

      await fillField(user, nameInput, VALID_NAME);
      await fillField(user, telInput, VALID_TEL);
      await fillField(user, questionInput, "a".repeat(MIN_QUESTION_LENGTH - 1));
      await user.click(submitButton);

      expect(
        await screen.findByText(
          `QuestionsForm.questionInput.errors.short ${MIN_QUESTION_LENGTH}`,
        ),
      ).toBeInTheDocument();
      expect(sendQuestion).not.toHaveBeenCalled();
    });

    it("shows the 'long' error with MAX_QUESTION_LENGTH", async () => {
      const { user, nameInput, telInput, questionInput, submitButton } =
        setup();

      await fillField(user, nameInput, VALID_NAME);
      await fillField(user, telInput, VALID_TEL);
      await fillField(user, questionInput, "a".repeat(MAX_QUESTION_LENGTH + 1));
      await user.click(submitButton);

      expect(
        await screen.findByText(
          `QuestionsForm.questionInput.errors.long ${MAX_QUESTION_LENGTH}`,
        ),
      ).toBeInTheDocument();
      expect(sendQuestion).not.toHaveBeenCalled();
    });
  });

  describe("submission", () => {
    it("disables the fields and the button while the request is pending", async () => {
      const deferred = createDeferred<void>();
      vi.mocked(sendQuestion).mockReturnValue(deferred.promise);
      const form = setup();

      await fillValidForm(form);
      await form.user.click(form.submitButton);

      await waitFor(() => expect(form.submitButton).toBeDisabled());
      expect(form.nameInput).toBeDisabled();
      expect(form.telInput).toBeDisabled();
      expect(form.questionInput).toBeDisabled();

      deferred.resolve();

      await waitFor(() => expect(form.submitButton).not.toBeDisabled());
    });

    it("sends the form values to the api", async () => {
      const form = setup();

      await fillValidForm(form);
      await form.user.click(form.submitButton);

      await waitFor(() => expect(sendQuestion).toHaveBeenCalledTimes(1));
      expect(sendQuestion).toHaveBeenCalledWith(
        expect.objectContaining({
          name: VALID_NAME,
          tel: VALID_TEL,
          question: VALID_QUESTION,
        }),
      );
    });

    it("shows the success message and clears the fields after success", async () => {
      const form = setup();

      await fillValidForm(form);
      await form.user.click(form.submitButton);

      await waitFor(() =>
        expect(screen.getByRole("status")).toHaveTextContent(
          "QuestionsForm.successMessage",
        ),
      );
      expect(form.nameInput).toHaveValue("");
      expect(form.telInput).toHaveValue("");
      expect(form.questionInput).toHaveValue("");
    });

    it("shows the fail message and keeps the values when the request fails", async () => {
      vi.mocked(sendQuestion).mockRejectedValue(new Error("Network error"));
      const form = setup();

      await fillValidForm(form);
      await form.user.click(form.submitButton);

      await waitFor(() =>
        expect(screen.getByRole("status")).toHaveTextContent(
          "QuestionsForm.failMessage",
        ),
      );
      expect(form.submitButton).not.toBeDisabled();
      expect(form.nameInput).toHaveValue(VALID_NAME);
      expect(form.telInput).toHaveValue(VALID_TEL);
      expect(form.questionInput).toHaveValue(VALID_QUESTION);
    });
  });
});
