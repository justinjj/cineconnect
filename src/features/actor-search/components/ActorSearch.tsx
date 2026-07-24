import { Autocomplete, TextField } from "@mui/material";

const actors = [
  "Mohanlal",
  "Mammootty",
  "Fahadh Faasil",
  "Prithviraj Sukumaran",
  "Dulquer Salmaan",
  "Suresh Gopi",
];

type ActorSearchProps = {
  label: string;
};

export default function ActorSearch({ label }: ActorSearchProps) {
  return (
    <Autocomplete
      options={actors}
      renderInput={(params) => (
        <TextField {...params} label={label} />
      )}
    />
  );
}