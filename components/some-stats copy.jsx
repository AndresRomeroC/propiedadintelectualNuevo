import React, { useEffect, useState } from 'react'
//import { Box, H3, Placeholder, Button} from '@adminjs/design-system'
import { Box, Label, DropZone, DropZoneItem, H3, Placeholder, Button, Navigation  } from '@adminjs/design-system'
import {Link } from "react-router-dom";
import { ApiClient, useNotice, ShowAction} from 'adminjs'
//const AdminJS         = require('adminjs');


const api = new ApiClient()

const NOTICE_MESSAGE = {
  message: 'I was clicked',
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
        <H3>Marcas por vencer en 6 meses</H3>
        <Box>
          <p>With some data fetched from the backend:</p>
          {text.length ? (
            <pre>{text}</pre>
          ) : (
            <Placeholder style={{ width: 400, height: 14 }} />
          )}
          <p>and other interactions like toast :)</p>
          <p>
            
            <Link  to ='/admin/resources/MarcaPorVencer' >
            <Button onClick={() => addNotice(NOTICE_MESSAGE)}>Ir a Marcas por vencer</Button>

            </Link>
          </p>
        </Box>
      </Box>
    </Box>
  )
}

export default SomeStats
