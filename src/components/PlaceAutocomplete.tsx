import { Box } from '@chakra-ui/react';
import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

type PlaceAutocompleteProps = { error: string };
// @ts-ignore
const PlaceAutocomplete = ({ error, field }: PlaceAutocompleteProps) => {
  return (
    <Box>
      <GooglePlacesAutocomplete
        apiOptions={{ language: 'sk', region: 'sk' }}
        selectProps={{ ...field, isClearable: true }}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </Box>
  );
};

export default PlaceAutocomplete;
