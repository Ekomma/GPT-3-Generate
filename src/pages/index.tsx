import Head from "next/head";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import WizHat from "../../assets/svgComponents/WizHat";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { addApolloState, initializeApollo } from "../../src/lib/apolloClient";
import { prisma } from "../../src/lib/prisma";
import {
  TestDocument,
  useGeneratePromptMutation,
} from "../../generated/graphql";
import { Answer } from "@prisma/client";
import AnswerRow from "../modules/components/AnswerRow";

export const greenColor = "#00FA9A";

const paperStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  p: 4,
  background: "#ffffff",
};

export const textFieldStyle = {
  mb: 4,
  "& label.Mui-focused": {
    color: "grey",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "grey",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      borderColor: "grey",
    },
    "&.Mui-focused fieldset": {
      borderColor: "grey",
      outlineColor: "grey",
    },
  },
};

const formBoxStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  background: "#ffffff",
  mb: 8,
};

const buttonStyle = {
  color: greenColor,
  borderColor: greenColor,
  alignSelf: "end",
  padding: "4px 24px",
  alignItems: "center",
  ["&:focus"]: {
    borderColor: greenColor,
    background: "#00fa9a17",
  },
  ["&:hover"]: {
    borderColor: greenColor,
    background: "#00fa9a17",
  },
};

export const circularButtonStyle = {
  borderRadius: "50%",
  height: "30px",
  width: "30px",
  display: "grid",
  placeItems: "center",
  border: `1px solid ${greenColor}`,
  fontFamily: "Roboto",
  fontSize: 13,
  cursor: "pointer",
  ["&:hover"]: {
    background: "#00fa9a17",
  },
};

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [promptText, setPromptText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const [disableEditAnswer, setDisableEditAnswer] = useState(true);
  const [promptResponse, setPromptResponse] = useState<Answer[] | []>([]);
  const [rank, setRank] = useState<Array<number | null>>([null, null, null]);
  const [thumbDownList, setThumbDownList] = useState<Array<number | null>>([
    null,
    null,
    null,
  ]);

  useEffect(() => {
    setDisableEditAnswer(
      !promptResponse.every(
        (val) => rank.includes(val.id) || thumbDownList.includes(val.id)
      )
    );
  }, [promptResponse, rank, thumbDownList]);

  const [generatePrompt] = useGeneratePromptMutation();

  async function onSubmit() {
    if (promptText.length === 0) {
      setErrorText("Please enter a valid prompt");
      return;
    }
    setLoadingPrompt(true);
    generatePrompt({
      variables: {
        prompt: promptText,
      },
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        setPromptResponse(data.generatePrompt as Answer[]);
        setLoadingPrompt(false);
      },
      onError: (error) => setErrorText(error.message),
    });
  }

  const resetRank = () => setRank([null, null, null]);

  return (
    <div style={{ background: "#d3d3d3" }}>
      <Head>
        <title>Rank and Edit Completion</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <Container component="main" sx={{ height: "100vh", p: 4 }}>
        <Grid item sm="auto" md="auto" justifyContent="center">
          <Stack width="100%">
            <Typography
              variant="h1"
              style={{ fontSize: 32, marginLeft: 10, marginBottom: 10 }}
            >
              Rank and edit the completions
            </Typography>
            <Paper sx={paperStyle} elevation={1}>
              <Box sx={formBoxStyle}>
                <TextField
                  label="Prompt"
                  fullWidth
                  placeholder="Enter a prompt to generate answers"
                  sx={textFieldStyle}
                  value={promptText}
                  error={errorText.length > 0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSubmit();
                      resetRank();
                    }
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setErrorText("");
                    setPromptText(e.target.value);
                  }}
                />
                {errorText.length > 0 && (
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "red", mt: -3, alignSelf: "start" }}
                  >
                    {errorText}
                  </Typography>
                )}
                <Button
                  disableFocusRipple
                  sx={buttonStyle}
                  variant="outlined"
                  onClick={() => {
                    onSubmit();
                    resetRank();
                  }}
                  endIcon={
                    loadingPrompt && (
                      <CircularProgress
                        sx={{
                          color: greenColor,
                          marginTop: "-3px",
                          marginLeft: "10px",
                        }}
                        size={16}
                        variant="indeterminate"
                      />
                    )
                  }
                  startIcon={
                    <WizHat
                      style={{
                        marginRight: 10,
                        width: 18,
                        transform: "translateY(-3px)",
                      }}
                    />
                  }
                >
                  Generate!
                </Button>
              </Box>
              <Box sx={{ width: "100%" }}>
                {promptResponse?.length > 0 &&
                  promptResponse.map(({ id, modText, text }, promptIndex) => (
                    <AnswerRow
                      id={id}
                      key={id}
                      rank={rank}
                      text={text}
                      modText={modText}
                      setRank={setRank}
                      promptIndex={promptIndex}
                      thumbDownList={thumbDownList}
                      setThumbDownList={setThumbDownList}
                      disableEditAnswer={disableEditAnswer}
                    />
                  ))}
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Container>
    </div>
  );
}

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo({ ctx: { req, prisma } });
  await apolloClient.query({ query: TestDocument });

  return addApolloState(apolloClient, {
    props: {},
  });
};
