import {
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";

export default function MovieSkeleton() {
  return (
    <Card sx={{ height: "100%" }}>
      <Skeleton
        variant="rectangular"
        height={360}
      />

      <CardContent>
        <Skeleton width="80%" />
        <Skeleton width="40%" />
      </CardContent>
    </Card>
  );
}