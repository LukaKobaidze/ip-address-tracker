import { useRef } from 'react';
import { informationType } from 'shared/interfaces/data.interface';
import Heading from './Heading';
import IPAddressInput from './IPAddressInput';
import Information from './Information';
import 'styles/Header/Header.scss';

type Props = {
  information?: informationType;
  isLoading: boolean;
  submittedValueHandler: (value: string) => void;
};

const Header = ({ information, isLoading, submittedValueHandler }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredValue = inputRef.current?.value;

    if (!enteredValue) return;
    submittedValueHandler(enteredValue);
  };
  return (
    <header className="header">
      <Heading>IP Address Tracker</Heading>
      <IPAddressInput
        isLoading={isLoading}
        inputRef={inputRef}
        onSubmit={submitHandler}
      />
      <Information information={information} />
    </header>
  );
};

export default Header;
