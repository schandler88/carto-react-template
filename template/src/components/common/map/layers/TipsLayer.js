import { useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';
import { selectSourceById } from 'config/cartoSlice';

export function TipsLayer() {
  const { tipsLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, tipsLayer?.source));

  if (tipsLayer && source) {
    const COLORS = {
      ONE_MILLION: [207, 89, 126],
      HUNDRED_THOUSAND: [232, 133, 113],
      TEN_THOUSAND: [238, 180, 121],
      THOUSAND: [233, 226, 156],
      HUNDRED: [156, 203, 134],
      TEN: [57, 177, 133],
      OTHER: [0, 147, 146],
    };
    return new CartoBQTilerLayer({
      id: 'tipsPointLayer',
      data: source.data,
      getFillColor: (object) => {
        if (object.properties.aggregated_total > 1000000) {
          return COLORS.ONE_MILLION;
        } else if (object.properties.aggregated_total > 100000) {
          return COLORS.HUNDRED_THOUSAND;
        } else if (object.properties.aggregated_total > 10000) {
          return COLORS.TEN_THOUSAND;
        } else if (object.properties.aggregated_total > 1000) {
          return COLORS.THOUSAND;
        } else if (object.properties.aggregated_total > 100) {
          return COLORS.HUNDRED;
        } else if (object.properties.aggregated_total > 10) {
          return COLORS.TEN;
        } else {
          return COLORS.OTHER;
        }
      },
      pointRadiusMinPixels: 2,
      stroked: false,
      pickable: false,
    });
  }
}