// @flow
import type { Action, ShopsState } from '../types';
import { assocPath, dissocPath, filter } from 'ramda';

const initialState = {
  all: [{
   id: 0,
   selected: false,
   title: 'CAUMARTIN',
   address: '64 rue Caumartin 75009 PARIS',
   lat: 48.8753127,
   lng: 2.3264949,
   phone: '0145963536',
   url: 'http://www.micromania.fr/magasin/195/caumartin.html',
  }, {
   id: 1,
   selected: false,
   title: 'LES HALLES',
   address: '210 Porte Lescot 75001 PARIS',
   lat: 48.8617874,
   lng: 2.3454189,
   phone: '0155349820',
   url: 'http://www.micromania.fr/magasin/27/les-halles.html',
  }, {
  id: 2,
  selected: false,
  title: 'MONTPARNASSE',
  address: '126, Rue de Rennes 75006 PARIS',
  lat: 48.846588,
  lng: 2.3240727,
  phone: '01.45.49.07.07',
  url: 'http://www.micromania.fr/magasin/37/montparnasse-rue-de-rennes.html',
  }, {
  id: 3,
  selected: false,
  title: 'PARIS GENERAL LECLERC',
  address: '24 Avenue du Général Leclerc 75014 PARIS',
  lat: 48.8320624,
  lng: 2.3279255,
  phone: '0145433184',
  url: 'http://www.micromania.fr/magasin/420/paris-general-leclerc.html',
  }, {
  id: 4,
  selected: false,
  title: 'ITALIE 2',
  address: '30, Avenue D\'Italie - boite 1031 75013 PARIS',
  lat: 48.829431,
  lng: 2.3529661,
  phone: '01.45.89.70.43',
  url: 'http://www.micromania.fr/magasin/29/italie-2.html',
  }, {
  id: 5,
  selected: false,
  title: 'PARIS VAUGIRARD',
  address: '365, Rue de Vaugirard 75015 PARIS',
  lat: 48.836331,
  lng: 2.2931311,
  phone: '0153688688',
  url: 'http://www.micromania.fr/magasin/418/paris-vaugirard.html',
  }, {
  id: 6,
  selected: false,
  title: 'PARIS VICTOR HUGO',
  address: '137 Avenue Victor Hugo 75116 PARIS',
  lat: 48.867409,
  lng: 2.2781153,
  phone: '0147271310',
  url: 'http://www.micromania.fr/magasin/419/paris-victor-hugo.html',
  }, {
  id: 7,
  selected: false,
  title: 'KREMLIN BICETRE',
  address: 'Centre commercial OKABE, Avenue de Fontainebleau 94270 LE KREMLIN BICETRE',
  lat: 48.8116257,
  lng: 2.3606229,
  phone: '0146710282',
  url: 'http://www.micromania.fr/magasin/365/kremlin-bicetre.html',
  }, {
  id: 8,
  selected: false,
  title: 'VILLENEUVE LA GARENNE',
  address: 'Centre Commercial Qwartz, 20 rue de la Bongarde 92390 VILLENEUVE LA GARENNE',
  lat: 48.9254954,
  lng: 2.3265214,
  phone: '01 47 33 45 47',
  url: 'http://www.micromania.fr/magasin/443/villeneuve-la-garenne.html',
  }, {
  id: 9,
  selected: false,
  title: 'ANTONY',
  address: '137 Avenue Victor Hugo 75116 PARIS',
  lat: 48.7519411,
  lng: 2.302571,
  phone: '01.46.74.06.26',
  url: 'http://www.micromania.fr/magasin/49/antony.html',
  }],
};

const reducer = (
  state: ShopsState = initialState,
  action: Action,
): ShopsState => {
  switch (action.type) {

    case 'DOWNLOAD_SHOPS_CSV': {
      var isSelectedTrue = n => (n.selected) ? true : false;

      return filter(isSelectedTrue, state);
    }

    case 'TOGGLE_SHOP_SELECTED': {
      const { id, selected } = action.payload.shop;
      return assocPath(['all', id, 'selected'], !selected, state);
    }

    default:
      return state;

  }
};

export default reducer;
