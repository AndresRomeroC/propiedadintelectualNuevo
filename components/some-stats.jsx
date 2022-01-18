import React, { useEffect, useState } from 'react'
//import { Box, H3, Placeholder, Button} from '@adminjs/design-system'
import { Box, Label, DropZone, DropZoneItem, H3, H5, Placeholder, Button, Navigation  } from '@admin-bro/design-system'
import {Link } from "react-router-dom";
import { ApiClient, useNotice, ShowAction} from 'admin-bro'
//const AdminBro         = require('admin-bro');


const api = new ApiClient()

const NOTICE_MESSAGE = {
  message: 'Redirigido a Marcas sin Publicar',
  type: 'success',
}
const NOTICE_MESSAGE1 = {
  message: 'Redirigido a Marcas Publicadas',
  type: 'success',
}
const NOTICE_MESSAGE2 = {
  message: 'Redirigido a Marcas en Oposición',
  type: 'success',
}
const NOTICE_MESSAGE3 = {
  message: 'Redirigido a Marcas en Renovación',
  type: 'success',
}
const NOTICE_MESSAGE4 = {
  message: 'Redirigido a Marcas Por Vencer',
  type: 'success',
}
const NOTICE_MESSAGE5 = {
  message: 'Redirigido a Marcas con Resolución',
  type: 'success',
}
const NOTICE_MESSAGE6 = {
  message: 'Redirigido a Marcas en Proceso de cambio de Nombre',
  type: 'success',
}
const NOTICE_MESSAGE7 = {
  message: 'Redirigido a Marcas en Proceso de Transferencia',
  type: 'success',
}
const NOTICE_MESSAGE8= {
  message: 'Redirigido a Marcas en Proceso de emisión de licencia',
  type: 'success',
}





const SomeStats = (response) => {
  const [text, setText] = useState('')
  const addNotice = useNotice()
 // let data1 = "777";

  console.log(response);
  //response.data.redirectUrl= '/admin/resources/Gaceta';
  

  useEffect(() => {
    api.getPage({ pageName: 'customPage' }).then(res => {
      
      
      setText(res.data.text);
      
    })
  })

  return (
    
    <Box variant="grey">


      <section overflow="hidden" class="sc-dIsAE iZpzSd admin-bro_Box">
        <section opacity="0.2,0.4,1" class="sc-dIsAE cnTqve admin-bro_Box">
          <svg width="249px" height="179px" viewBox="0 0 249 179" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
              <stop stop-color="#FFAB86" offset="0%"></stop>
              <stop stop-color="#FFB44E" offset="100%"></stop>
            </linearGradient>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-2">
              <stop stop-color="#FFAB86" offset="0%"></stop>
              <stop stop-color="#FFB44E" offset="100%"></stop>
            </linearGradient>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-3">
              <stop stop-color="#FFF2B1" offset="0%"></stop>
              <stop stop-color="#FFEA7E" offset="100%"></stop>
            </linearGradient>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-4">
              <stop stop-color="#FFF2B1" offset="0%"></stop>
              <stop stop-color="#FFCD7E" offset="100%"></stop>
            </linearGradient>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-5">
              <stop stop-color="#FFAB86" offset="0%"></stop>
              <stop stop-color="#FFB44E" offset="100%"></stop>
            </linearGradient>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-6">
              <stop stop-color="#FFF2B1" offset="0%"></stop>
              <stop stop-color="#FFEA7E" offset="100%"></stop>
            </linearGradient>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-7">
              <stop stop-color="#FFF2B1" offset="0%"></stop>
              <stop stop-color="#FFCD7E" offset="100%"></stop>
            </linearGradient>
          </defs>
          {/* <g id="Main-Templates" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Rocket-with-motion" transform="translate(140.500000, 74.000000) rotate(17.000000) translate(-140.500000, -74.000000) translate(19.000000, -40.000000)">
              <g id="Rocket" transform="translate(137.662345, 112.855740) rotate(7.000000) translate(-137.662345, -112.855740) translate(44.162345, 11.355740)">
              <g id="Group-15">
                <ellipse id="Oval-Copy-29" fill="#F4E8DB" cx="116.379625" cy="57.5932962" rx="2.01348833" ry="2.01375162"></ellipse>
                <ellipse id="Oval-Copy-31" fill="#F4E8DB" cx="34.2293016" cy="155.058874" rx="2.01348833" ry="2.01375162"></ellipse>
                <ellipse id="Oval-Copy-19" fill="#F4E8DB" cx="160.273671" cy="140.157112" rx="4.02697665" ry="4.02750323"></ellipse>
                <ellipse id="Oval-Copy-23" fill="#F4E8DB" cx="74.0963704" cy="51.5520414" rx="4.02697665" ry="4.02750323"></ellipse>
                <g id="Group-13" transform="translate(7.404023, 136.898722)">
                  <path d="M29.2933675,62.4051811 C35.8296538,62.4051811 41.1280139,56.981389 41.127586,50.2898688 C41.1271581,43.5983485 33.1286817,0.598536152 29.2894151,0.598536152 C25.4501486,0.598536152 17.4571716,43.5968348 17.4575995,50.2883551 C17.4580274,56.9798753 22.7570812,62.4051811 29.2933675,62.4051811 Z" id="Oval-Copy-38" fill="url(#linearGradient-2)" transform="translate(29.292593, 31.501859) rotate(-141.000000) translate(-29.292593, -31.501859) "></path>
                  <path d="M31.7199672,52.9593428 C36.0774914,52.9593428 39.6097439,49.5375303 39.6094739,45.3158883 C39.609204,41.0942463 36.2259176,5.20641018 31.9585807,5.20641018 C27.6912437,5.20641018 23.829213,41.0932372 23.8294829,45.3148792 C23.8297529,49.5365212 27.362443,52.9593428 31.7199672,52.9593428 Z" id="Oval-Copy-39" fill="url(#linearGradient-3)" transform="translate(31.719478, 29.082876) rotate(-141.000000) translate(-31.719478, -29.082876) "></path>
                  <path d="M34.9968773,41.9727682 C38.5555221,41.9727682 41.440206,39.3509657 41.4399991,36.1163003 C41.4397923,32.8816348 39.1523789,8.14353111 35.5937342,8.14353111 C32.0350894,8.14353111 28.5527996,32.8808107 28.5530065,36.1154762 C28.5532133,39.3501416 31.4382326,41.9727682 34.9968773,41.9727682 Z" id="Oval-Copy-39" fill="url(#linearGradient-4)" transform="translate(34.996503, 25.058150) rotate(-141.000000) translate(-34.996503, -25.058150) "></path>
                </g>
                <g id="Group-11" transform="translate(102.175136, 89.252917) rotate(40.000000) translate(-102.175136, -89.252917) translate(59.675136, 8.752917)" fill-rule="nonzero" stroke="#C9D1F6" stroke-width="1.97424893">
                  <path d="M67.7777024,49.7502517 L70.9362925,43.3067657 C71.4162191,42.3277211 72.598949,41.9231061 73.5779935,42.4030327 C73.9711105,42.5957382 74.289021,42.9136487 74.4817265,43.3067657 L77.6403166,49.7502517 C78.8999695,52.3199286 79.5548698,55.1437885 79.5548698,58.0055999 L79.5548698,151.358137 C79.5548698,151.903311 79.1129192,152.345261 78.5677454,152.345261 L66.8502737,152.345261 C66.3050999,152.345261 65.8631492,151.903311 65.8631492,151.358137 L65.8631492,58.0055999 C65.8631492,55.1437885 66.5180495,52.3199286 67.7777024,49.7502517 Z" id="Rectangle" fill="#FFFFFF" stroke-linejoin="round"></path>
                  <path d="M7.91445895,50.2479489 L11.0730491,43.8044629 C11.5529757,42.8254183 12.7357055,42.4208033 13.7147501,42.9007299 C14.107867,43.0934354 14.4257776,43.4113459 14.6184831,43.8044629 L17.7770732,50.2479489 C19.0367261,52.8176258 19.6916264,55.6414857 19.6916264,58.5032971 L19.6916264,151.855834 C19.6916264,152.401008 19.2496757,152.842959 18.7045019,152.842959 L6.98703021,152.842959 C6.44185643,152.842959 5.99990575,152.401008 5.99990575,151.855834 L5.99990575,58.5032971 C5.99990575,55.6414857 6.65480605,52.8176258 7.91445895,50.2479489 Z" id="Rectangle-Copy-11" fill="#FFFFFF" stroke-linejoin="round"></path>
                  <path d="M33.0906011,11.354303 L39.4002623,2.2723825 C40.6444904,0.481481126 43.104949,0.0383148853 44.8958504,1.282543 C45.2821175,1.55090196 45.6173309,1.88611536 45.8856899,2.2723825 L52.195351,11.354303 C57.249981,18.6297726 59.9589757,27.2769281 59.9589757,36.1359202 L59.9589757,116.427862 L59.9589757,116.427862 L25.3269765,116.427862 L25.3269765,36.1359202 C25.3269765,27.2769281 28.0359712,18.6297726 33.0906011,11.354303 Z" id="Rectangle" fill="#F0F1F9" stroke-linejoin="round"></path>
                  <path d="M51.0709343,145.945436 L52.4616111,78.430609 L57.2782797,97.1345431 C59.5841699,106.088702 64.1795587,114.289067 70.6130652,120.930158 L75.1292812,125.592095 C78.7263886,129.305267 81.1674641,133.983364 82.155819,139.057808 L83.2511862,144.681678 C83.2493456,145.075537 83.1550246,145.406318 82.9636792,145.638528 C82.7984747,145.839014 82.5607084,145.945436 82.2993925,145.945436 L51.0709343,145.945436 Z" id="Path-3" fill="#F0F1F9"></path>
                  <path d="M1.47150229,145.425806 L2.86217912,77.9109797 L7.67884773,96.6149137 C9.98473789,105.569073 14.5801267,113.769438 21.0136332,120.410529 L25.5298492,125.072466 C29.1269566,128.785638 31.5680321,133.463734 32.556387,138.538179 L33.6517543,144.162049 C33.6499136,144.555907 33.5555926,144.886689 33.3642472,145.118899 C33.1990427,145.319385 32.9612764,145.425806 32.6999605,145.425806 L1.47150229,145.425806 Z" id="Path-3-Copy" fill="#F0F1F9" transform="translate(17.779835, 108.554400) scale(-1, 1) translate(-17.779835, -108.554400) "></path>
                  <path d="M34.132116,58.9706471 L38.6749518,50.4371325 C39.9558754,48.0309746 42.9448456,47.1187919 45.3510036,48.3997155 C46.2176737,48.8610893 46.9270468,49.5704624 47.3884206,50.4371325 L51.9312564,58.9706471 C53.7557124,62.3978065 54.7099185,66.2208379 54.7099185,70.1033707 L54.7099185,151.938396 L54.7099185,151.938396 L31.3534539,151.938396 L31.3534539,70.1033707 C31.3534539,66.2208379 32.3076599,62.3978065 34.132116,58.9706471 Z" id="Rectangle-2" fill="#FFFFFF" stroke-linejoin="round"></path>
                  <path d="M59.4280489,155.429317 L25.9649033,155.429317 L25.9649033,146.347684 C25.9649033,143.83986 26.9813998,141.569451 28.6248522,139.925999 C30.2683047,138.282547 32.5387131,137.26605 35.0465369,137.26605 L50.3464153,137.26605 C52.8542392,137.26605 55.1246476,138.282547 56.7681,139.925999 C58.4115525,141.569451 59.4280489,143.83986 59.4280489,146.347684 L59.4280489,155.429317 Z" id="Rectangle" fill="#FFFFFF"></path>
                  <path d="M42.9716921,126.282389 L42.9716921,160.264511" id="Line-2" fill="#F0F1F9" stroke-linecap="round"></path>
                </g>
                <g id="Group-14" transform="translate(45.907534, 162.711131)">
                  <path d="M17.7186,38.6625878 C21.7220753,38.6625878 24.9673209,35.3405151 24.9670588,31.241959 C24.9667967,27.1434028 19.3527647,0.806017733 17.7161791,0.806017733 C16.0795936,0.806017733 10.46893,27.1424757 10.469192,31.2410318 C10.4694541,35.339588 13.7151246,38.6625878 17.7186,38.6625878 Z" id="Oval" fill="url(#linearGradient-5)" transform="translate(17.718125, 19.734303) rotate(-141.000000) translate(-17.718125, -19.734303) "></path>
                  <path d="M19.8990176,30.9168623 C22.5680012,30.9168623 24.7315058,28.8210022 24.7313405,26.2352465 C24.7311751,23.6494907 23.015537,3.87414324 20.3465534,3.87414324 C17.6775699,3.87414324 15.0659306,23.6488726 15.066096,26.2346284 C15.0662613,28.8203841 17.2300341,30.9168623 19.8990176,30.9168623 Z" id="Oval-Copy-35" fill="url(#linearGradient-6)" transform="translate(19.898718, 17.395503) rotate(-141.000000) translate(-19.898718, -17.395503) "></path>
                  <path d="M21.5173735,25.4314166 C23.5191112,25.4314166 25.1417404,23.8708065 25.1416173,21.9454104 C25.1414942,20.0200143 23.8547724,5.29496477 21.8530347,5.29496477 C19.851297,5.29496477 17.8925608,20.0195507 17.8926839,21.9449468 C17.8928071,23.8703429 19.5156359,25.4314166 21.5173735,25.4314166 Z" id="Oval-Copy-40" fill="url(#linearGradient-7)" transform="translate(21.517151, 15.363191) rotate(-141.000000) translate(-21.517151, -15.363191) "></path>
                </g>
                <g id="Group-14-Copy" transform="translate(0.000000, 124.047100)">
                  <path d="M17.7186,38.6625878 C21.7220753,38.6625878 24.9673209,35.3405151 24.9670588,31.241959 C24.9667967,27.1434028 19.3527647,0.806017733 17.7161791,0.806017733 C16.0795936,0.806017733 10.46893,27.1424757 10.469192,31.2410318 C10.4694541,35.339588 13.7151246,38.6625878 17.7186,38.6625878 Z" id="Oval" fill="url(#linearGradient-5)" transform="translate(17.718125, 19.734303) rotate(-141.000000) translate(-17.718125, -19.734303) "></path>
                  <path d="M19.8990176,30.9168623 C22.5680012,30.9168623 24.7315058,28.8210022 24.7313405,26.2352465 C24.7311751,23.6494907 23.015537,3.87414324 20.3465534,3.87414324 C17.6775699,3.87414324 15.0659306,23.6488726 15.066096,26.2346284 C15.0662613,28.8203841 17.2300341,30.9168623 19.8990176,30.9168623 Z" id="Oval-Copy-35" fill="url(#linearGradient-6)" transform="translate(19.898718, 17.395503) rotate(-141.000000) translate(-19.898718, -17.395503) "></path>
                  <path d="M21.5173735,25.4314166 C23.5191112,25.4314166 25.1417404,23.8708065 25.1416173,21.9454104 C25.1414942,20.0200143 23.8547724,5.29496477 21.8530347,5.29496477 C19.851297,5.29496477 17.8925608,20.0195507 17.8926839,21.9449468 C17.8928071,23.8703429 19.5156359,25.4314166 21.5173735,25.4314166 Z" id="Oval-Copy-40" fill="url(#linearGradient-7)" transform="translate(21.517151, 15.363191) rotate(-141.000000) translate(-21.517151, -15.363191) "></path>
                </g>
              </g>  
              <path d="M80.0494403,116.335122 C88.8076699,101.144407 113.894541,71.6934295 155.310052,27.9821891 L155.310052,13.433931 L76.2854597,24.2179367 L9.01739077,110.071572 L67.1069868,158.925202 L90.4566162,178.55709 C74.7602694,152.266493 71.2912108,131.525837 80.0494403,116.335122 Z" id="Path-8" fill-opacity="0.16" fill="#192035"></path>
                <ellipse id="Oval" stroke="#ACB3D7" stroke-width="0.987124464" fill="#CBD5FD" cx="134.150589" cy="51.1969656" rx="6.09273175" ry="6.08892935"></ellipse>
                <ellipse id="Oval-Copy-36" fill="#ACB3D7" cx="134.13899" cy="51.1391751" rx="3.80795734" ry="3.80558084"></ellipse>
                <ellipse id="Oval-Copy-37" fill="#CBD4FF" cx="131.474713" cy="49.3326297" rx="2.28477441" ry="2.28334851"></ellipse>
                <ellipse id="Oval-Copy-41" fill="#CBD4FF" cx="135.128283" cy="51.6142094" rx="1" ry="1"></ellipse>
              </g>
              <circle id="Oval-Copy-31" fill="#F4E8DB" cx="38.1284868" cy="108.303169" r="1"></circle>
              <circle id="Oval-Copy-22" fill="#F4E8DB" cx="4.32112887" cy="163.723438" r="3.94849785"></circle>
              <line x1="153.739825" y1="166.762478" x2="133.010212" y2="186.504967" id="Path-9-Copy" stroke="#F4E8DA" stroke-width="2.96137339" stroke-linecap="round" stroke-linejoin="round"></line>
              <line x1="71.0180476" y1="196.046139" x2="54.2369317" y2="210.853006" id="Path-9-Copy-2" stroke="#F4E8DA" stroke-width="2.96137339" stroke-linecap="round" stroke-linejoin="round"></line>
              <line x1="39.4304561" y1="139.905466" x2="27.5849626" y2="150.763835" id="Path-9-Copy-5" stroke="#F4E8DA" stroke-width="2.96137339" stroke-linecap="round" stroke-linejoin="round"></line>
              <line x1="27.0808447" y1="220.357763" x2="18.1967246" y2="226.28051" id="Path-9-Copy-6" stroke="#F4E8DA" stroke-width="2.96137339" stroke-linecap="round" stroke-linejoin="round"></line>
              <line x1="42.5501636" y1="169.913846" x2="4.05230955" y2="203.476077" id="Path-9-Copy-3" stroke="#F4E8DA" stroke-width="2.96137339" stroke-linecap="round" stroke-linejoin="round"></line>
              <line x1="143.094269" y1="193.740995" x2="104.596415" y2="227.303226" id="Path-9-Copy-4" stroke="#F4E8DA" stroke-width="2.96137339" stroke-linecap="round" stroke-linejoin="round"></line>
            </g>
          </g> */}
        </svg>
      </section>
      <section opacity="0.2,0.4,1" class="sc-dIsAE jjzQmj admin-bro_Box">
        <svg width="260px" height="260px" viewBox="0 0 260 260" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <circle id="path-1" cx="106" cy="106" r="106"></circle>
            <filter x="-17.0%" y="-17.0%" width="134.0%" height="134.0%" filterUnits="objectBoundingBox" id="filter-2">
              <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
              <feGaussianBlur stdDeviation="12" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
              <feColorMatrix values="0 0 0 0 0.958112299   0 0 0 0 0.910577834   0 0 0 0 0.855913579  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
            </filter>
            <circle id="path-3" cx="106" cy="106" r="106"></circle>
          </defs>
          {/* <g id="Main-Templates" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Group-12" transform="translate(24.000000, 24.000000)">
              <g id="Oval">
                <use fill="black" fill-opacity="1" filter="url(#filter-2)" href="#path-1"></use>
                <use fill="#F4E8DB" fill-rule="evenodd" href="#path-1"></use>
              </g>
              <g id="Path-7">
                <mask id="mask-4" fill="white">
                  <use href="#path-3"></use>
                </mask>
                <use id="Mask" fill="#F4E8DB" href="#path-3"></use>
                <path d="M39.8069626,3.76747066 C45.3021184,115.593145 97.2894125,176.043124 195.768845,185.117407 C294.248278,194.191689 253.575457,215.872553 73.750384,250.16 L-33.92,160.780637 L-25.2907546,24.0909209 L26.5457822,-4.24 L39.8069626,3.76747066 Z" 
                      fill="#C8BBB2" mask="url(#mask-4)"></path>
              </g>
              <circle id="Oval" fill="#C8BBB2" cx="80.5" cy="37.5" r="22.5"></circle>
              <circle id="Oval-Copy-3" fill="#C8BBB2" cx="158" cy="66" r="17"></circle>
              <circle id="Oval-Copy-4" stroke="#F4E8DB" stroke-width="3" fill="#C8BBB2" cx="124" cy="166" r="17"></circle>
              <circle id="Oval-Copy-5" stroke="#F4E8DB" stroke-width="1.6875" fill="#C8BBB2" cx="58.5" cy="92.5" r="9.5"></circle>
              <circle id="Oval-Copy" fill="#C8BBB2" cx="157.5" cy="124.5" r="8.5"></circle>
              <circle id="Oval-Copy-6" fill="#C8BBB2" cx="190" cy="96" r="3"></circle>
              <circle id="Oval-Copy-8" fill="#C8BBB2" cx="81" cy="113" r="3"></circle>
              <circle id="Oval-Copy-7" fill="#C8BBB2" cx="126" cy="29" r="3"></circle>
              <circle id="Oval-Copy-2" fill="#C8BBB2" cx="97.5" cy="101.5" r="8.5"></circle>
            </g>
          </g> */}
        </svg>
      </section>
      <section height="284" class="sc-dIsAE eOhsXH admin-bro_Box">
        <div color="white" class="sc-jrsJCI bTrjdm admin-bro_Text">
          <h2 font-size="h2" class="sc-dIvqjp lcIBYC sc-dlMBXb iEckwY admin-bro_Header admin-bro_H2" 
              font-weight="light">Propiedad Intelectual de LeXValor</h2>
          <div opacity="0.8" class="sc-jrsJCI fTcGZS admin-bro_Text">¡Ahora eres uno de nosotros! Preparamos una métrica para que comiences: </div>
        </div>
      </section>
    </section>
        
    <section width="1,1,1,1024" class="sc-dIsAE cQyBfq admin-bro_Box">

    <section width="1,0.5,0.5,0.3333333333333333" class="sc-dIsAE cHuGUn admin-bro_Box">
      <div class="sc-dIsAE default-dashboard__Card-y6jxa9-0 kgyQN kKlyvT admin-bro_Box">      
        <div class="sc-jrsJCI exBroz admin-bro_Text">
        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group" transform="translate(2.000000, 2.000000)">
        <Box variant="white">
       
          <H5>Marcas sin Publicar</H5>
          {/* <div class="sc-jrsJCI bJANQE admin-bro_Text"> Estado en trámite </div> 
          cantidad de marcas sin publicar (ESTADO en trámite) y no tienen número de gaceta, 
          */}
          
          <Box>
            <Link  to ='/admin/resources/MarcaSinPublicar' >
            <Button onClick={() => addNotice(NOTICE_MESSAGE)}>Ir a Marcas sin publicar</Button>
            </Link>    
          </Box>
        </Box>
        </g>   
        </g> 
      </div>
      </div>
    </section>
    <section width="1,0.5,0.5,0.3333333333333333" class="sc-dIsAE cHuGUn admin-bro_Box">
     <div class="sc-dIsAE default-dashboard__Card-y6jxa9-0 kgyQN kKlyvT admin-bro_Box">     
     <div class="sc-jrsJCI exBroz admin-bro_Text"> 
        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group" transform="translate(2.000000, 2.000000)">
        <Box variant="white">
          <H5>Marcas publicadas</H5>
          {/* <div class="sc-jrsJCI bJANQE admin-bro_Text">Estado publicadas </div> 
          cantidad de marcas publicadas en gaceta (publicadas), (ESTADO PUBLICADA)
          */}
          <Box>
            <Link  to ='/admin/resources/MarcaPublicada' >
            <Button onClick={() => addNotice(NOTICE_MESSAGE1)}>Ir a Marcas publicadas</Button>
            </Link>    
          </Box>
        </Box>
        </g>   
        </g> 
      </div>
      </div>
    </section>
    
    <section width="1,0.5,0.5,0.3333333333333333" class="sc-dIsAE cHuGUn admin-bro_Box">
      <div class="sc-dIsAE default-dashboard__Card-y6jxa9-0 kgyQN kKlyvT admin-bro_Box">      
      <div class="sc-jrsJCI exBroz admin-bro_Text"> 
        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group" transform="translate(2.000000, 2.000000)">
        <Box variant="white">
          <H5>Marcas en Oposición</H5>
          {/* <div class="sc-jrsJCI bJANQE admin-bro_Text">Cómo modificar esta vista y agregar  </div> 
          cuantas están en oposición ( que tenga estado Oposición)*/}
          <Box>
            <Link  to ='/admin/resources/MarcaEnOposicion' >
            <Button onClick={() => addNotice(NOTICE_MESSAGE2)}>Ir a Marcas en Oposición</Button>
            </Link>    
          </Box>
        </Box>
        </g>   
        </g> 
      </div>
      </div>
    </section>

    <section width="1,0.5,0.5,0.3333333333333333" class="sc-dIsAE cHuGUn admin-bro_Box">
      <div class="sc-dIsAE default-dashboard__Card-y6jxa9-0 kgyQN kKlyvT admin-bro_Box">      
      <div class="sc-jrsJCI exBroz admin-bro_Text"> 
        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group" transform="translate(2.000000, 2.000000)">
        <Box variant="white">
          <H5>Marcas en Renovación</H5>
          {/* <div class="sc-jrsJCI bJANQE admin-bro_Text">Cómo modificar esta vista y agregar  </div> 
          cantidad de marcas en renovación, ( que tenga En proceso de renovación)
          */}
          <Box>
            <Link  to ='/admin/resources/MarcaEnRenovacion' >
            <Button onClick={() => addNotice(NOTICE_MESSAGE3)}>Ir a Marcas en Renovación</Button>
            </Link>    
          </Box>
        </Box>
        </g>   
        </g> 
      </div>
      </div>
    </section>
    

    <section width="1,0.5,0.5,0.3333333333333333" class="sc-dIsAE cHuGUn admin-bro_Box">      
      <div class="sc-dIsAE default-dashboard__Card-y6jxa9-0 kgyQN kKlyvT admin-bro_Box">      
      <div class="sc-jrsJCI exBroz admin-bro_Text"> 
        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group" transform="translate(2.000000, 2.000000)">
        <Box variant="white">
          <H5>Marcas por vencer en un rango de 6 meses</H5>
          {/* <div class="sc-jrsJCI bJANQE admin-bro_Text">Cómo modificar esta vista y agregar  </div> 
          cantidad de marcas por vencer (que ya cumplieron los 6 meses), //
          */}
          <Box>
            <Link  to ='/admin/resources/MarcaPorVencer' >
            <Button onClick={() => addNotice(NOTICE_MESSAGE4)}>Marcas por vencer</Button>
            </Link>    
          </Box>
        </Box>
        </g>   
        </g> 
      </div>
      </div>
    </section>

    

    <section width="1,0.5,0.5,0.3333333333333333" class="sc-dIsAE cHuGUn admin-bro_Box">
      <div class="sc-dIsAE default-dashboard__Card-y6jxa9-0 kgyQN kKlyvT admin-bro_Box">
      <div class="sc-jrsJCI exBroz admin-bro_Text">   
        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group" transform="translate(2.000000, 2.000000)">
        <Box variant="white">
          <H5>Marcas con Resolución</H5>
          {/* <div class="sc-jrsJCI bJANQE admin-bro_Text">Cómo modificar esta vista y agregar  </div> 
          cantidad de marcas con resolución, ( que tenga nùmero de resolución y que tenga estado REGISTRADA)
          */}
          <Box>
            <Link  to ='/admin/resources/MarcaConResolucion' >
            <Button onClick={() => addNotice(NOTICE_MESSAGE5)}>Ir a Marcas con Resolución</Button>
            </Link>    
          </Box>
        </Box>
        </g>   
        </g> 
      </div>
      </div>
    </section>
      

    <section width="1,0.5,0.5,0.3333333333333333" class="sc-dIsAE cHuGUn admin-bro_Box">
      <div class="sc-dIsAE default-dashboard__Card-y6jxa9-0 kgyQN kKlyvT admin-bro_Box">
      <div class="sc-jrsJCI exBroz admin-bro_Text">   
        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group" transform="translate(2.000000, 2.000000)">
        <Box variant="white">
          <H5>Marcas en Proceso de cambio de Nombre</H5>
          {/* <div class="sc-jrsJCI bJANQE admin-bro_Text">Cómo modificar esta vista y agregar  </div> 
          cantidad de marcas con resolución, ( que tenga nùmero de resolución y que tenga estado REGISTRADA)
          */}
          <Box>
            <Link  to ='/admin/resources/MarcaProcesoCambioNombre' >
            <Button onClick={() => addNotice(NOTICE_MESSAGE6)}>Ir a Marcas en proceso de cambio de Nombre</Button>
            </Link>    
          </Box>
        </Box>
        </g>   
        </g> 
      </div>
      </div>
    </section>
    <section width="1,0.5,0.5,0.3333333333333333" class="sc-dIsAE cHuGUn admin-bro_Box">
      <div class="sc-dIsAE default-dashboard__Card-y6jxa9-0 kgyQN kKlyvT admin-bro_Box">
      <div class="sc-jrsJCI exBroz admin-bro_Text">   
        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group" transform="translate(2.000000, 2.000000)">
        <Box variant="white">
          <H5>Marcas en Proceso de Transferencia</H5>
          {/* <div class="sc-jrsJCI bJANQE admin-bro_Text">Cómo modificar esta vista y agregar  </div> 
          */}
          <Box>
            <Link  to ='/admin/resources/MarcaProcesoTransferencia' >
            <Button onClick={() => addNotice(NOTICE_MESSAGE7)}>Ir a Marcas en Proceso de Transferencia</Button>
            </Link>    
          </Box>
        </Box>
        </g>   
        </g> 
      </div>
      </div>
    </section>
    <section width="1,0.5,0.5,0.3333333333333333" class="sc-dIsAE cHuGUn admin-bro_Box">
      <div class="sc-dIsAE default-dashboard__Card-y6jxa9-0 kgyQN kKlyvT admin-bro_Box">
      <div class="sc-jrsJCI exBroz admin-bro_Text">   
        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group" transform="translate(2.000000, 2.000000)">
        <Box variant="white">
          <H5>Marcas en Proceso de emisión de licencia</H5>
          {/* <div class="sc-jrsJCI bJANQE admin-bro_Text">Cómo modificar esta vista y agregar  </div> 
          */}
          <Box>
            <Link  to ='/admin/resources/MarcaProcesoLicenciada' >
            <Button onClick={() => addNotice(NOTICE_MESSAGE8)}>Ir a Marcas en Proceso de emisión de licencia</Button>
            </Link>    
          </Box>
        </Box>
        </g>   
        </g> 
      </div>
      </div>
    </section>

    {/* <section width="1" class="sc-dIsAE nrYdW admin-bro_Box">
    <div class="sc-jrsJCI exBroz admin-bro_Text">
    <Box variant="white">
      <H3>Marcas por vencer en un rango de 6 meses</H3>
      <Box>
        <Link  to ='/admin/resources/MarcaPorVencer' >
        <Button onClick={() => addNotice(NOTICE_MESSAGE)}>Ir a Marcas por vencer</Button>
        </Link>    
      </Box>
    </Box>
    </div>
    </section> */}


  </section>
  </Box>
  )
}

export default SomeStats
