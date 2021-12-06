import React from 'react';
//import { Box, Label, DropZone } from 'admin-bro';
import { Box, Label, DropZone } from '@admin-bro/design-system'

export default function Avatar(props) {
  const srcImg = props.record?.params?.avatar;

  return <Box> {srcImg ? <img src={srcImg} width="100px" /> : 'no image'}</Box>;
}
