// @flow
import type { State } from '../../common/types';
import React from 'react';
import {CSVLink} from 'react-csv';
import buttonsMessages from '../../common/shops/buttonsMessages';
import { Box, Button } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { downloadShopsCSV } from '../../common/shops/actions';
import { compose, isEmpty, length, filter } from 'ramda';
import { connect } from 'react-redux';

type ButtonsProps = {
  shops: Object,
  downloadShopsCSV: typeof downloadShopsCSV,
};
const Buttons = ({ shops, downloadShopsCSV }: ButtonsProps) => {
  var isSelectedTrue = n => (n.selected) ? true : false;
  const shopsSelected = filter(isSelectedTrue, shops);
  const styleButton = m => (<Button primary>
      {m}
    </Button>
  );
  const linkButton = m => (<CSVLink style={{textDecoration: 'none'}} filename={"micromania.csv"} data={shopsSelected} >
      {styleButton(m)}
    </CSVLink>
  );

  return (
    <Box flexDirection="row" marginBottom={0.1}>
      <FormattedMessage {...buttonsMessages.download_link}>
        {message => (length(shopsSelected) > 0) ? linkButton(message) : styleButton(message)}
      </FormattedMessage>
    </Box>
  );
}

export default compose(
  connect((state: State) => ({
    shops: state.shops.all
  }), {
    downloadShopsCSV,
  }),
)(Buttons);
