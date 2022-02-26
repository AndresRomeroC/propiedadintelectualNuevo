import React from 'react';
//import { Box, Label, DropZone } from 'adminjs';
import { Box, Label, DropZone, DropZoneItem} from '@adminjs/design-system'

export default function Avatar(props) {
  const srcImg = props.record?.params?.profileExcelLocation;

  return <Box> {srcImg ? <img src={srcImg} width="100px" /> : 'no image'}</Box>;
}
