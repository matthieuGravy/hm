import { LayoutMessage } from "./LayoutMessage";

interface LayoutListMessagesProps {
  msg: string[];
}

const LayoutListMessages: React.FC<LayoutListMessagesProps> = ({ msg }) => {
  const messages = msg.map((msg, index) => {
    return <LayoutMessage key={index} msg={msg} />;
  });

  return <section>{messages}</section>;
};

export { LayoutListMessages };
