import { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
} from "@mui/material";

import { searchActors } from "../../../services/api/actorApi";
import type { Actor } from "../types";

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
      value={value}
      getOptionLabel={(option) => option.name}
      loading={loading}
      onInputChange={(_, value) => setQuery(value)}
      onChange={(_, actor) => onChange(actor)}
      renderInput={(params) => (
      <TextField
          {...params}
          label={label}
      />
      )}
    />
  );
}