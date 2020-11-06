import React from 'react';
import Divider from '@material-ui/core/Divider';
import {
  AggregationTypes,
  FormulaWidget,
  CategoryWidget,
  currencyFormatter,
} from 'lib/sdk';
import { LayerStyle } from 'components/layers/StoresLayer';

import { SOURCE_ID } from './constants';

export default function StoresList() {
  return (
    <div>
      <FormulaWidget
        title='Total revenue'
        data-source={SOURCE_ID}
        operation-column='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        viewport-filter
      ></FormulaWidget>
      <Divider />
      <CategoryWidget
        title='Revenue by store type'
        data-source={SOURCE_ID}
        column='storetype'
        operation-column='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        labels={LayerStyle.labels}
        viewport-filter
      />
    </div>
  );
}
