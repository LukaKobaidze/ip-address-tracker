import 'styles/Header/Heading.scss';

type Props = {
  children: React.ReactNode;
};

const Heading = ({ children }: Props) => {
  return <h1 className="heading">{children}</h1>;
};

export default Heading;
