import type { QuestionsFormInputs } from "@/components/ui/QuestionsSection/QuestionsForm/QuestionsForm.config";

async function sendQuestion(data: QuestionsFormInputs): Promise<void> {
  await new Promise<void>((res, rej) =>
    setTimeout(() => {
      if (Math.random() > 0.5) {
        res();
      } else {
        rej(new Error("Failed to fetch"));
      }
    }, 1500),
  );
  console.log(data);
}

export default sendQuestion;
