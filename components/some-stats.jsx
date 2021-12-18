import React, { useEffect, useState } from 'react'
//import { Box, H3, Placeholder, Button} from '@adminjs/design-system'
import { Box, Label, DropZone, DropZoneItem, H3, Placeholder, Button, Navigation  } from '@admin-bro/design-system'
import {Link } from "react-router-dom";
import { ApiClient, useNotice, ShowAction} from 'admin-bro'
//const AdminBro         = require('admin-bro');


const api = new ApiClient()

const NOTICE_MESSAGE = {
  message: 'Redirigido a Marcas Por Vencer',
  type: 'success',
}


const SomeStats = (response) => {
  const [text, setText] = useState('')
  const addNotice = useNotice()

  console.log(response);
  //response.data.redirectUrl= '/admin/resources/Gaceta';
  

  useEffect(() => {
    api.getPage({ pageName: 'customPage' }).then(res => {
      
      setText(res.data.text);
      
    })
  })

  return (
    
    <Box variant="grey">
      <Box variant="white">
        <H3>Marcas por vencer en un rango de 6 meses</H3>
        <Box>
          
            
            <Link  to ='/admin/resources/MarcaPorVencer' >
            <Button onClick={() => addNotice(NOTICE_MESSAGE)}>Ir a Marcas por vencer</Button>

            </Link>
         
        </Box>
      </Box>
    </Box>
  )
}

export default SomeStats
