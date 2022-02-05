import { useEffect, useState } from 'react';
import {
  coordinatesType,
  dataType,
  informationType,
} from 'shared/interfaces/data.interface';
import Header from 'components/Header/Header';
import Map from 'components/Map/Map';
import useFetchAddress from 'hooks/useFetchAddress';
import MessageSlide from 'components/UI/MessageSlide';

const getData = (data: any): dataType => {
  return {
    ip: data.ip,
    location: `${data.location.country}, ${data.location.region}`,
    timezone: `UTC ${data.location.timezone}`,
    isp: data.isp,
    latitude: data.location.lat,
    longitude: data.location.lng,
  };
};

const getInformation = (data: dataType | undefined): informationType => {
  return {
    ip: data?.ip,
    location: data?.location,
    timezone: data?.timezone,
    isp: data?.isp,
  };
};

const getCoordinates = (data: dataType | undefined): coordinatesType => {
  return {
    latitude: data?.latitude,
    longitude: data?.longitude,
  };
};

const App = () => {
  const [submittedValue, setSubmittedValue] = useState('');
  const { data, isLoading, error } = useFetchAddress(submittedValue);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const appearFor = 5;

  useEffect(() => {
    if (!error) {
      setShowError(false);
      return;
    }

    setErrorMessage(`(${error?.code}) ${error?.message}`);
    setShowError(true);
    const timeout = setTimeout(() => {
      setShowError(false);
    }, (appearFor + 0.75) * 1000);

    return () => clearTimeout(timeout);
  }, [error]);

  const transformedData = data ? getData(data) : undefined;

  const submitValueHandler = (value: string) => {
    setSubmittedValue(value);
  };

  return (
    <>
      {showError && !isLoading && (
        <MessageSlide
          message={errorMessage}
          appearFor={error ? appearFor : undefined}
        />
      )}
      <Header
        information={getInformation(transformedData)}
        isLoading={isLoading}
        submittedValueHandler={submitValueHandler}
      />
      <main className="main">
        <Map coordinates={getCoordinates(transformedData)} />
      </main>
    </>
  );
};

export default App;
