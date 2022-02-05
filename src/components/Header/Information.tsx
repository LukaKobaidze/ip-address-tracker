import { informationType } from 'shared/interfaces/data.interface';
import 'styles/Header/Information.scss';

type Props = {
  information: informationType | undefined;
};

const Information = ({ information }: Props) => {
  const { ip, location, timezone, isp } = information!;

  return (
    <div className="information">
      <ul className="information__list">
        <li className="information__list__item">
          <p className="information__list__item__title">IP ADDRESS</p>
          <p className="information__list__item__text">{ip}</p>
        </li>
        <li className="information__list__item">
          <p className="information__list__item__title">LOCATION</p>
          <p className="information__list__item__text">{location}</p>
        </li>
        <li className="information__list__item">
          <p className="information__list__item__title">TIMEZONE</p>
          <p className="information__list__item__text">{timezone}</p>
        </li>
        <li className="information__list__item">
          <p className="information__list__item__title">ISP</p>
          <p className="information__list__item__text">{isp}</p>
        </li>
      </ul>
    </div>
  );
};

export default Information;
