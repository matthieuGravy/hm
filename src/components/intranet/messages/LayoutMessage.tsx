interface LayoutMessageProps {
  msg: string;
}

const LayoutMessage: React.FC<LayoutMessageProps> = ({ msg }) => {
  return <article>{msg}</article>;
};

export { LayoutMessage };
