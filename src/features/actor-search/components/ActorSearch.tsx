import { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
} from "@mui/material";

import { searchActors } from "../../../services/tmdb/tmdbService";
import type { Actor } from "../../../services/tmdb/tmdbService";

type Props = {
  label: string;
};

export default function ActorSearch({ label }: Props) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setOptions([]);
      return;
    }

    const loadActors = async () => {
      setLoading(true);

      try {
        const actors = await searchActors(query);
        setOptions(actors);
      } finally {
        setLoading(false);
      }
    };

    loadActors();
  }, [query]);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.name}
      loading={loading}
      onInputChange={(_, value) => setQuery(value)}
      renderInput={(params) => (
      <TextField
          {...params}
          label={label}
      />
      )}
    />
  );
}