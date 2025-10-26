import React from 'react';

interface InputCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const InputCard: React.FC<InputCardProps> = ({ title, subtitle, children }) => {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-subtitle">{subtitle}</div>
      {children}
    </div>
  );
};

export default InputCard;