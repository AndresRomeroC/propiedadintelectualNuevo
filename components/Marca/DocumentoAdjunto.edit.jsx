import React, { useState } from 'react';
//import { Box, Label, DropZone, DropZoneItem } from 'admin-bro';
import { Box, Label, DropZone, DropZoneItem} from '@admin-bro/design-system'

const DocumentoAdjunto = ({ property, record, onChange }) => {
   const [state, setState] = useState(false);
  const onUpload = (files) => {
     setState(true);
    onChange(property.name, files[0]);
   };
  const uploadedPhoto = record.params.documentoAdjunto;
console.log(record);
  return (
    <Box>      
      <Label>{property.label}</Label>

      <DropZone onChange={onUpload} />
      {uploadedPhoto && !state && <DropZoneItem src={`http://localhost:8080${uploadedPhoto}`} />}
       </Box>
    // Revisar cuando es de editar, debe cargar el documento del servidor.
    // <Box>
    //   <Label>{property.label}</Label>
    //   <DropZone onChange={onUpload} />
    //   {uploadedPhoto && !state && <DropZoneItem src={`http://localhost:8080${uploadedPhoto}`} />}
    // </Box>
  );
}

export default DocumentoAdjunto
