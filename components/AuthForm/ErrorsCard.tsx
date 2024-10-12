import { Card } from "@nextui-org/card";
import { ClerkAPIError } from "@clerk/types";

export const ErrorsCard = ({ errors = [] }: { errors?: ClerkAPIError[] }) => {
  if (errors.length === 0) return null;

  return (
    <Card className="rounded-md p-4 text-left mt-6 shadow-sm border-danger border-medium">
      {errors.map((error) => (
        <p
          key={`${error.code}-${error.message}`}
          className="text-sm font-mono my-2 text-danger"
        >
          {error.longMessage}
        </p>
      ))}
    </Card>
  );
};