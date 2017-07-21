import LeftSideBar from './LeftSideBar';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Box, PageHeader } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { Title } from '../components';

const ShopsPage = () => (
  <Box>
    <Title message={linksMessages.shops} />
    <FormattedMessage {...linksMessages.shops}>
      {message => <PageHeader heading={message} />}
    </FormattedMessage>
    <LeftSideBar />
  </Box>
);

export default ShopsPage;
