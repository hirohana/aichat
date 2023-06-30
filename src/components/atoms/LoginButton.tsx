type Props = {
  onClick: () => void;
  children: string;
};

export default function LoginButton({ onClick, children }: Props) {
  return (
    <button onClick={onClick} className="">
      {children}
    </button>
  );
}
