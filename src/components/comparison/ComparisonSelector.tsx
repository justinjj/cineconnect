"use client";

import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

import { useComparison } from "@/app/context/ComparisonContext";

function createComparisonKey(
  firstName: string,
  secondName: string
) {
  return [firstName, secondName]
    .map((name) => 
      name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
    )
    .join("-and-");
}

export default function ComparisonSelector() {
  const {
    selectedActors,
    removeActor,
    clearActors
  } = useComparison();

  if (selectedActors.length === 0) {
    return null;
  } 

  const hasPair = selectedActors.length === 2;

  const comparisonKey = hasPair
    ? createComparisonKey(
      selectedActors[0].name,
      selectedActors[1].name
    )
    : null;

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: (theme) => theme.zIndex.modal + 1,
        width: {
          xs: "calc(100% - 32px)",
          sm: "auto"
        },
        minWidth: {
          sm: 420,
        },
        maxWidth: 600,
        borderRadius: 3,
        px: 2,
        py: 1.5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexGrow: 1,
            minWidth: 0
          }}
        >
          {selectedActors.map((actor) => (
            <Box
              key={actor.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                minWidth: 0
              }}
            >
              <Avatar
                src={actor.profileImage ?? undefined}
                alt={actor.name}
                sx={{
                  width: 36,
                  height: 36,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: {
                      xs: 90,
                      sm: 140
                    }
                  }}
                >
                  {actor.name}
                </Typography>

                <IconButton
                  size="small"
                  onClick={() => removeActor(actor.id)}
                  aria-label={`Remove ${actor.name}`}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Avatar>
            </Box>
          ))}

          {!hasPair && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                whiteSpace: "nowrap"
              }}
            >
              + Add another
            </Typography>
          )}

          {hasPair && comparisonKey && (
            <Button
              component={Link}
              href={`/${comparisonKey}`}
              variant="contained"
              size="small"
            >
              Compare
            </Button>
          )}

          <Button
            variant="text"
            size="small"
            onClick={clearActors}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </Paper>
  )

} 