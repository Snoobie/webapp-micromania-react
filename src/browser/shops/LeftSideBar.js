import Buttons from './Buttons';
import Map from './Map';
import Shops from './Shops';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Box, PageHeader } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { Title } from '../components';

const LeftSideBar = () => (
  <Box flexDirection="row">
    <Box flexDirection="column" maxWidth="275px" marginRight="10px">
      <Buttons />
      <Shops />
    </Box>
    <Box flexDirection="column" width="100%" maxWidth="700px" height="850px">
      <Map/>
    </Box>
  </Box>
);

export default LeftSideBar;
