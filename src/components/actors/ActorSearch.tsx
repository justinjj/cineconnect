"use client";

import { useEffect, useState } from "react";

import {
  Autocomplete,
  Avatar,
  TextField,
} from "@mui/material";

import { searchActors } from "@/services/api/actorApi";
import type { Actor } from "@/types/actor";

type Props = {
  label: string;
  value: Actor | null;
  onChange: (actor: Actor | null) => void;
};

export default function ActorSearch({
  label,
  value,
  onChange,
}: Props) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      return;
    }

    let cancelled = false;

    const timeoutId = window.setTimeout(async () => {
      setLoading(true);

      try {
        const actors = await searchActors(trimmedQuery);

        if (!cancelled) {
          setOptions(actors);
        }
      } catch (error) {
        console.error(
          "Failed to search actors:",
          error
        );

        if (!cancelled) {
          setOptions([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  const visibleOptions =
    query.trim().length >= 2 ? options : [];

  return (
    <Autocomplete
      options={options}
      value={value}
      getOptionLabel={(option) => option.name}
      getOptionKey={(option) => option.id}
      loading={loading}
      onInputChange={(_, value) => setQuery(value)}
      onChange={(_, actor) => onChange(actor)}
      renderOption={(props, actor) => { 
        const { key, ...otherProps} = props;
        return (
          <li key={key} {...otherProps}>
            <Avatar
              src={actor.profileImage ?? undefined}
              alt={actor.name}
              sx={{
                width: 40,
                height: 40,
                mr: 1.5,
              }}
            >
              {actor.name.charAt(0)}
            </Avatar>

            {actor.name}
          </li>
        )
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
        />
      )}
    />
  );
}