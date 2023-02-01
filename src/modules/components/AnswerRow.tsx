import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  darken,
  CircularProgress,
} from "@mui/material";
import ThumbDown from "../../../assets/svgComponents/ThumbDown";
import { useUpdateAnswerMutation } from "../../../generated/graphql";
import { circularButtonStyle, greenColor, textFieldStyle } from "../../pages";

interface AnswerRowProps {
  id: number;
  text: string;
  modText: string | null;
  promptIndex: number;
  rank: Array<number | null>;
  disableEditAnswer: boolean;
  thumbDownList: Array<number | null>;
  setRank: (val: Array<number | null>) => void;
  setThumbDownList: (val: Array<number | null>) => void;
}

export default function AnswerRow({
  id,
  text,
  rank,
  modText,
  setRank,
  promptIndex,
  thumbDownList,
  setThumbDownList,
  disableEditAnswer,
}: AnswerRowProps) {
  const [textValue, setTextValue] = useState(modText ?? text);
  const [errorUpdateText, setUpdateErrorText] = useState("");
  const [loadingAnswerUpdate, setLoadingAnswerUpdate] = useState(false);

  const [updateAnswer] = useUpdateAnswerMutation();

  return (
    <Grid key={id} container columns={20}>
      <Grid item md={16} sm={20} xs={20} sx={{ marginRight: "24px" }}>
        <TextField
          label={`Sample ${promptIndex + 1}`}
          fullWidth
          placeholder="Edit the generated answer as you like"
          sx={{
            ...textFieldStyle,
            ...{ input: { minHeight: "52px" } },
          }}
          value={textValue}
          error={errorUpdateText.length > 0}
          disabled={disableEditAnswer}
          onChange={(e) => {
            setUpdateErrorText("");
            setTextValue(e.target.value);
          }}
        />
      </Grid>
      <Grid item md={3} sm={20} xs={20} sx={{ marginBottom: 3 }}>
        <Stack>
          <Box
            sx={{
              display: "flex",
              width: "160px",
              justifyContent: "space-between",
            }}
          >
            {rank.map((value, index) => (
              <Box
                key={index + 1}
                onClick={() => {
                  const updatedRank = rank.map((val, idx) => {
                    if (
                      index === idx &&
                      !value &&
                      rank.every((r) => r !== id)
                    ) {
                      return id;
                    } else if (val === id && index === idx) {
                      return null;
                    }
                    return val;
                  });
                  !thumbDownList[promptIndex] && setRank(updatedRank);

                  const rankIndex = updatedRank.indexOf(id);
                  updateAnswer({
                    variables: {
                      AnswerModField: {
                        id,
                        rank: rankIndex === -1 ? null : rankIndex + 1,
                      },
                    },
                    notifyOnNetworkStatusChange: true,
                    onCompleted: () => {
                      setLoadingAnswerUpdate(false);
                    },
                    onError: (error) => {
                      setUpdateErrorText(error.message);
                    },
                  });
                }}
                sx={{
                  ...circularButtonStyle,
                  ...(rank.some((r) => r === id) &&
                    value !== id && {
                      cursor: "default",
                      color: "grey",
                      border: "1px solid grey",
                      ["&:hover"]: {
                        background: "transparent",
                      },
                    }),
                  ...(((value && value !== id && rank.every((r) => r !== id)) ||
                    thumbDownList[promptIndex]) && {
                    border: "1px solid grey",
                    color: "grey",
                    cursor: "default",
                    ["&:hover"]: {
                      background: "transparent",
                    },
                  }),
                  ...(value === id && {
                    background: greenColor,
                    color: "white",
                    ["&:hover"]: {
                      background: greenColor,
                    },
                  }),
                }}
              >
                {index + 1}
              </Box>
            ))}
            <ThumbDown
              style={{
                marginTop: "6px",
                transform: "scale(1.2)",
                cursor: "pointer",
              }}
              fill={thumbDownList[promptIndex] ? "red" : "#444"}
              onClick={() => {
                const updatedThumDownList = thumbDownList.map((val, idx) => {
                  if (promptIndex === idx && val) {
                    return null;
                  } else if (promptIndex === idx && !val) {
                    setRank(
                      rank.map((r, i) =>
                        i === idx && id === rank[idx] ? null : r
                      )
                    );
                    return id;
                  } else {
                    return val;
                  }
                });
                setThumbDownList(updatedThumDownList);
                updateAnswer({
                  variables: {
                    AnswerModField: {
                      id,
                      flag: !!updatedThumDownList[promptIndex],
                    },
                  },
                  notifyOnNetworkStatusChange: true,
                  onCompleted: () => {
                    setLoadingAnswerUpdate(false);
                  },
                  onError: (error) => {
                    setUpdateErrorText(error.message);
                  },
                });
              }}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              size="small"
              sx={{
                background: greenColor,
                width: "126px",
                mt: 2.5,
                "&:hover": {
                  background: darken(greenColor, 0.2),
                },
              }}
              startIcon={
                loadingAnswerUpdate && (
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
              onClick={() => {
                if (textValue.trim().length === 0) {
                  setUpdateErrorText("Please enter a valid answer");
                  return;
                }
                setLoadingAnswerUpdate(true);
                updateAnswer({
                  variables: {
                    AnswerModField: {
                      id,
                      modText: textValue,
                    },
                  },
                  notifyOnNetworkStatusChange: true,
                  onCompleted: () => {
                    setLoadingAnswerUpdate(false);
                  },
                  onError: (error) => {
                    setUpdateErrorText(error.message);
                  },
                });
              }}
            >
              {loadingAnswerUpdate ? "Saving..." : "Save Edits"}
            </Button>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
