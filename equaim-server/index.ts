import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { ZodError, z } from "zod";

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT;

app.post("/addition-steps", (req: Request, res: Response) => {
  const bodySchema = z.object({
    num1: z.number().positive(),
    num2: z.number().positive(),
  });

  try {
    const { num1, num2 } = bodySchema.parse(req.body);
    const result = getAdditionSteps(num1, num2);
    res.send(result);
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400);
      res.send({
        message: "Invalid body",
        details: `${e.issues[0]?.path}: ${e.issues[0]?.message}`,
      });
    }
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

type AdditionSteps = {
  [key: `step${number}`]: {
    carryString: string;
    sumString: string;
  };
};

function getAdditionSteps(num1: number, num2: number) {
  let carry = 0;
  let stepCount = 0;
  let sumString = "";
  let carryString = "_";
  const steps: AdditionSteps = {};

  while (num1 > 0 || num2 > 0 || carry > 0) {
    const digit1 = num1 % 10;
    const digit2 = num2 % 10;
    const sum = digit1 + digit2 + carry;

    if (sum >= 10) {
      carry = 1;
      sumString = (sum % 10).toString() + sumString;
      carryString = carry + carryString;
    } else {
      carry = 0;
      sumString = sum.toString() + sumString;
      carryString = carry + carryString;
    }

    steps[`step${stepCount + 1}`] = { carryString, sumString };

    num1 = Math.floor(num1 / 10);
    num2 = Math.floor(num2 / 10);
    stepCount++;
  }

  return steps;
}
