import {
  Alert,
  Box,
  Button,
  Code,
  MantineProvider,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios, { AxiosError } from "axios";
import { useState } from "react";

type AdditionSteps = {
  [key: `step${number}`]: {
    carryString: string;
    sumString: string;
  };
};

type ErrorResponse = {
  message: string;
  details: string;
};

type FormInput = {
  num1: number;
  num2: number;
};

export default function App() {
  const [result, setResult] = useState<AdditionSteps>();
  const [error, setError] = useState<AxiosError<ErrorResponse> | null>(null);

  const form = useForm<FormInput>({
    initialValues: {
      num1: 0,
      num2: 0,
    },
    validate: {
      num1: (v) => (v <= 0 ? "Number must be greater than 0" : null),
      num2: (v) => (v <= 0 ? "Number must be greater than 0" : null),
    },
  });

  async function handleSubmit(values: FormInput) {
    const { num1, num2 } = values;
    try {
      const { data } = await axios.post<AdditionSteps>(
        "http://localhost:5001/addition-steps",
        {
          num1: Number(num1),
          num2: Number(num2),
        }
      );
      setResult(data);
      setError(null);
    } catch (e) {
      if (e instanceof AxiosError) setError(e);
    }
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Box mb="md" p="md" bg="gray.4">
        <Title>Step Addition</Title>
      </Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack p="md" align="start">
          <TextInput label="First Number" {...form.getInputProps("num1")} />
          <TextInput label="Second Number" {...form.getInputProps("num2")} />
          <Button type="submit">Generate steps</Button>
        </Stack>
      </form>
      {error ? (
        <Alert color="red" title="An error occured">
          {error.response?.data.message}
          <br />
          {error.response?.data.details}
        </Alert>
      ) : (
        <Code block fz="sm" p="md">
          {result ? JSON.stringify(result, null, 4) : "No results to show"}
        </Code>
      )}
    </MantineProvider>
  );
}
