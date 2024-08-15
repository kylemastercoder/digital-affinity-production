import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  title: string;
  className?: string;
  variant?: any;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  title,
  className,
  variant,
}) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {title}
        </Button>
      ) : (
        <Button variant={variant} className={className} type="submit">
          {title}
        </Button>
      )}
    </>
  );
};

export default SubmitButton;
