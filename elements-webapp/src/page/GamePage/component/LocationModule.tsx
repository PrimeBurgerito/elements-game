import { MEDIA_URL } from '@constant/paths';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ILocation } from '@type/Location';
import * as React from 'react';
import { useState } from 'react';

export const useLocationModuleStyles = makeStyles({
  locationImage: {
    width: '100%'
  },
  locationNameDivider: {
    width: '50%',
    margin: 'auto',
    marginBottom: 15
  },
  locationName: {
    textAlign: 'center'
  }
});

interface ILocationModuleProps {
  location: ILocation;
  onLocationChange: (name: string) => void;
}

const LocationModule = (props: ILocationModuleProps): JSX.Element => {
  const {locationName, locationNameDivider, locationImage} = useLocationModuleStyles({});
  const [nearbyLocationModalOpen, setNearbyLocationModalOpen] = useState(false);

  const renderNearbyLocationsModal = (): JSX.Element => {
    return (
      <Dialog open={nearbyLocationModalOpen} onClose={() => setNearbyLocationModalOpen(false)}>
        <DialogTitle>Nearby locations</DialogTitle>
        {props.location.nearbyLocations.map((name) =>
          <Button key={`location-${name}`} onClick={() => props.onLocationChange(name)}>{name}</Button>)
        }
      </Dialog>
    );
  };


  const renderLocationImage = (): JSX.Element => {
    const openNearbyLocations = () => setNearbyLocationModalOpen(true);
    const {images} = props.location;
    const imageUrl = images && images.length ? `${MEDIA_URL}/${images[0].fileName}` : '';
    return <img onClick={openNearbyLocations} className={locationImage} src={imageUrl} alt="No image" />;
  };

  return (
    <>
      {renderNearbyLocationsModal()}
      <Typography className={locationName} variant="h2">{props.location.name}</Typography>
      <Divider className={locationNameDivider} />
      {renderLocationImage()}
    </>
  );
};

export default LocationModule;
