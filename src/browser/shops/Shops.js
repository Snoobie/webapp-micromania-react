import React from 'react';
import shopsMessages from '../../common/shops/shopsMessages';
import type { State, Shop } from '../../common/types';
import { Link } from '../components';
import { Box, Button, Text } from '../../common/components';
import { compose, prop, reverse, sortBy, values, length, filter } from 'ramda';
import { connect } from 'react-redux';
import { toggleShopSelected } from '../../common/shops/actions';
import { injectIntl } from 'react-intl';

const ShopsItem = (
  {
    intl,
    shop,
    toggleShopSelected,
  },
) => (
  <Box flexDirection="row">
    <Button backgroundColor={shop.selected ? 'success' : 'primary'} onClick={() => toggleShopSelected(shop)}>
      <Box paddingHorizontal={0.25} paddingVertical={0.25} >
        <Text color="white" size={0}>{shop.id + ". Micromania " + shop.title}</Text>
        <Text color="white" size={-1}>{shop.address}</Text>
        <Text color="white" size={-1}>{intl.formatMessage(shopsMessages.phone) + shop.phone}</Text>
        <Link color="white" align="center" display="block" to={shop.url}>
          {intl.formatMessage(shopsMessages.link)}
        </Link>
      </Box>
    </Button>
  </Box>
);
type ShopsProps = {
  intl: $IntlShape,
  shops: Object,
  toggleShopSelected: typeof toggleShopSelected,
};
const Shops = (
  {
    intl,
    shops,
    toggleShopSelected,
  }: ShopsProps,
) => {
  // if (isEmpty(todos)) {
  //   return (               {shop.selected ? '#1b6ec2' : '#51cf66'}
  //     <Text>
  //       {intl.formatMessage(todosMessages.empty)}
  //     </Text>
  //   );
  // }

  // It's ok and recommended to sort things in view, but for the bigger data
  // leverage reactjs/reselect or bvaughn/react-virtualized.
  const sortedShops: Array<Shop> = compose(
    sortBy(prop('createdAt')),
    values,
  )(shops);
  var isSelectedTrue = n => (n.selected) ? true : false;

  return (
    <Box marginVertical={0.25}>
      <Text>{intl.formatMessage(shopsMessages.shops_selected) + length(filter(isSelectedTrue, shops))}</Text>
      {sortedShops.map(shop => (
        <ShopsItem
          intl={intl}
          key={shop.id}
          shop={shop}
          toggleShopSelected={toggleShopSelected}
        />
      ))}
    </Box>
  );
};

export default compose(
  connect(
    (state: State) => ({
      shops: state.shops.all,
    }),
    { toggleShopSelected },
  ),
  injectIntl,
)(Shops);
