import React from 'react';
//import { Box, Label, DropZone } from 'admin-bro';
import { Box, Label, DropZone } from '@admin-bro/design-system'

export default function Avatar(props) {
  const srcImg = props.record?.params?.documentoAdjunto;

  console.log('=============== INICIO DE DOCUMENTO ADJUNTO DE documentoAdjunto.list');
  console.log(srcImg);
  console.log('=============== FIN DE DOCUMENTO ADJUNTO DE documentoAdjunto.list');

  return <Box> {srcImg ? <img src={srcImg} width="100px" /> : 'no image'}</Box>;
  
  //return <Box> {srcImg ? <img src={srcImg} width="100px" /> : 'no image'}</Box>;
}
