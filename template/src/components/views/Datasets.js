import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import { getDatasets } from 'lib/sdk';

import { selectCredentials } from 'config/oauthSlice';

import DatasetsList from 'components/views/DatasetsList';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
  datasetsNotAvailable: {
    border: '0.5px solid',
    color: theme.palette.warning.main,
    padding: 20,
  },
  datasetsList: {
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));

// Limit the number of datasets, using just 1 page, up to 50 datasets
const datasetsPagination = { page: 1, size: 50 };

function Datasets() {
  const credentials = useSelector(selectCredentials);

  const classes = useStyles();

  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    if (credentials) {
      // Get datasets, once logged in
      getDatasets(credentials, datasetsPagination).then((data) => {
        // just cartodbfied datasets can be loaded as deckgl layers with CartoSQLLayers...
        const cartodbfied = data.result.filter(
          (dataset) =>
            dataset.cartodbfied && dataset.table_schema === credentials.username
        );
        setDatasets(cartodbfied);
      });
    }
  }, [credentials]);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction='column'
        justify='flex-start'
        alignItems='flex-start'
        spacing={2}
      >
        <Grid item>
          <Typography variant='h5' gutterBottom>
            Available datasets
          </Typography>
        </Grid>

        {credentials ? (
          <Grid item className={classes.datasetsList}>
            <DatasetsList datasets={datasets} />
          </Grid>
        ) : (
          <Typography className={classes.datasetsNotAvailable}>
            To see a list of datasets, you have to login first using your CARTO account
          </Typography>
        )}
      </Grid>
    </div>
  );
}

export default Datasets;
