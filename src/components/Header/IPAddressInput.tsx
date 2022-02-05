import { ReactComponent as IconArrow } from 'assets/images/icon-arrow.svg';
import LoadingSpinner from 'components/UI/LoadingSpinner';
import 'styles/Header/IPAddressInput.scss';

type Props = {
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const IPAddressInput = ({ isLoading, inputRef, onSubmit }: Props) => {
  return (
    <form className="ip-address-input" onSubmit={onSubmit}>
      <input
        className="ip-address-input__input"
        ref={inputRef}
        placeholder="Search for any IP address or domain"
      />
      <button className="ip-address-input__button" type="submit">
        {isLoading && <LoadingSpinner />}
        {!isLoading && <IconArrow />}
      </button>
    </form>
  );
};

export default IPAddressInput;
