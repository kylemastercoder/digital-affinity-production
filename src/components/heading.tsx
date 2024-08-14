import React from "react";

interface HeadingProps {
  title: string;
  description?: string;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description, className }) => {
  return (
    <div className={className}>
      <h3 className="font-bold text-4xl mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default Heading;
