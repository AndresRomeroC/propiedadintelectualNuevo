import React, { useState } from 'react';
import { Box, Label, DropZone, DropZoneItem } from 'admin-bro';


const Avatare = ({ property, record, onChange })=>  {
  const [state, setState] = useState(false);

  const onUpload = (files) => {
    setState(true);

    onChange(property.name, files[0]);
  };

  const uploadedPhoto = record.params.avatar;

  return (
    <Box>
      <Label>{property.label}</Label>
      <DropZone onChange={onUpload} />
      {uploadedPhoto && !state && <DropZoneItem src={`http://localhost:8080${uploadedPhoto}`} />}
    </Box>
  );
}

export default Avatare
