import { Suspense } from "react";
import ConfirmSignupForm from "./ConfirmSignupForm";

export default function ConfirmSignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmSignupForm />
    </Suspense>
  );
}