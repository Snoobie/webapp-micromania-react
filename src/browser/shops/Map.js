import Marker from './Marker';
import React, { PropTypes, Component } from 'react';
import controllable from 'react-controllables';
import type { State, Shop } from '../../common/types';
import { Box, Text } from '../../common/components';
import GoogleMapReact from 'google-map-react';
import { compose, length } from 'ramda';
import { connect } from 'react-redux';

type MapProps = {
  shops: Object,
};
const Map = ({shops}: MapProps) => {
  var propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    hoverKey: PropTypes.string,
    clickKey: PropTypes.string,
    onCenterChange: PropTypes.func,
    onZoomChange: PropTypes.func,
    onHoverKeyChange: PropTypes.func,

  };
  const shopsMarker = shops.map(shop => {
      const {id, ...coords} = shop;

      return (
        <Marker
          key={id}
          {...coords}
          text={id}
          hover={propTypes.hoverKey === id} />
      );
    });

  _onBoundsChange = (center, zoom) => {
    propTypes.onCenterChange(center);
    propTypes.onZoomChange(zoom);
  }

  _onChildClick = (key, childProps) => {
    propTypes.onCenterChange([childProps.lat, childProps.lng]);
  }

  _onChildMouseEnter = (key) => {
    propTypes.onHoverKeyChange(key);
  }

  _onChildMouseLeave = () => {
    propTypes.onHoverKeyChange(null);
  }

  return (
    <GoogleMapReact
      defaultCenter={{lat: 48.851008, lng: 2.3435117}}
      defaultZoom={12}
      onBoundsChange={propTypes._onBoundsChange}
      onChildClick={propTypes._onChildClick}
      onChildMouseEnter={propTypes._onChildMouseEnter}
      onChildMouseLeave={propTypes._onChildMouseLeave}
    >
      {shops.map(shop => {
          const {id, address, ...coords} = shop;

          return (
            <Marker
              key={id}
              {...coords}
              text={id}
              address={address}
              hover={propTypes.hoverKey === id} />
          );
        })
      }

    </GoogleMapReact>
  );
};

controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default compose(
  connect(
    (state: State) => ({
      shops: state.shops.all,
    }),
    { },
  ),
)(Map);
