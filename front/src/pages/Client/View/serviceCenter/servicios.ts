export interface MapProps {
  initialCenter?: { lat: number; lng: number };
  zoom?: number;
  markers?: {
    position: { lat: number; lng: number };
    label: string;
    direction: string;
    link: string;
    color: string;
    marca?: string;
    telefono?: string;
  }[];
}
export const initialCenter: MapProps = {
  initialCenter: {
    lat: 4.433,
    lng: -75.217,
  },
  zoom: 10,
  markers: [
    {
      position: { lat: 4.440865821340184, lng: -75.2386343596161 },
      label: 'Oficina Principal',
      direction: 'Cra. 2 #15, Ibagué, Tolima',
      link: 'https://www.google.com/maps/place/Ferreyepes/@4.4406358,-75.2412629,17z/data=!3m1!4b1!4m6!3m5!1s0x8e38c49af00526ab:0x1cdc7108594f4651!8m2!3d4.4406305!4d-75.238688!16s%2Fg%2F11rgh78y0h?hl=es&entry=ttu',
      color: 'FF8000',
    },
    {
      position: { lat: 3.4048388716495213, lng: -76.52327149704382 },
      link: 'https://www.google.com/maps/search/CALLE+25+%23+7-04+BRR+SAN+NICOLAS/@3.4038482,-76.5316799,15.25z?hl=es&entry=ttu',
      label: 'C Y M HERRAMIENTAS CALI S.A.S.',
      direction: 'CALLE 25 # 7-04 BRR SAN NICOLAS',
      telefono: '3147014399 - 3114264222',
      marca: 'Makita',
      color: '#00E4FF',
    },
    {
      position: { lat: 4.5523374101334815, lng: -74.53585481913463 },
      link: 'https://www.google.com/maps/place/Cra.+5+%235-18,+Anapoima,+Cundinamarca/@4.551685,-74.5419273,16z/data=!4m6!3m5!1s0x8e3f14d1f3bf7451:0x679b33815ccb0255!8m2!3d4.5519417!4d-74.5358119!16s%2Fg%2F11tf_6x8fl?hl=es&entry=ttu',
      label: 'MAXISERVICIOS AYC S.A.S.',
      direction: 'CR 5 #5-18',
      telefono: '312 3953100',
      marca: 'Makita',
      color: '#00E4FF',
    },
    {
      position: { lat: 5.9389167203429025, lng: -73.61322854611986 },
      link: 'https://www.google.com/maps/place/Cra.+10+%2319-78,+Barbosa,+Santander/@5.9387833,-73.6158249,17z/data=!3m1!4b1!4m6!3m5!1s0x8e41e5ae970b9fc9:0xcf8d01b84cc0b8c3!8m2!3d5.938778!4d-73.61325!16s%2Fg%2F11s3_k_41v?hl=es&entry=ttu',
      label: 'ELECTRO BARBOSA',
      direction: 'CRA 10 #19 -78',
      telefono: '3108088102',
      marca: 'Makita',
      color: '#00E4FF',
    },
    {
      position: { lat: 4.596667693297649, lng: -74.14161414612217 },
      link: 'https://www.google.com/maps/place/Tv.+68c+%2344-10,+Bogot%C3%A1/@4.5964805,-74.1442105,17z/data=!3m1!4b1!4m6!3m5!1s0x8e3f9edc82a3284f:0x998e384035f319bd!8m2!3d4.5964752!4d-74.1416356!16s%2Fg%2F11j2ym_fm4?hl=es&entry=ttu',
      label: 'MUNDO HERRAMIENTAS DEL SUR',
      direction: 'TRANSV 68 C #44 - 10',
      telefono: '601-7928279',
      marca: 'Makita',
      color: '#00E4FF',
    },
    {
      position: { lat: 4.851870308658945, lng: -74.26885883262807 },
      link: 'https://www.google.com/maps/place/Cl.+10+%2316-41,+El+Rosal,+Cundinamarca/@4.8517794,-74.271423,17z/data=!3m1!4b1!4m6!3m5!1s0x8e3f7e358e6b6039:0x4f8fec2265925254!8m2!3d4.8517741!4d-74.2688481!16s%2Fg%2F11tt6cyyv1?hl=es&entry=ttu',
      label: 'TIGENESIS S.A.S.',
      direction: 'CL 10 #16-41 BRR OBANDO',
      telefono: '314 3291357',
      marca: 'Makita',
      color: '#00E4FF',
    },
    {
      position: { lat: 1.6163376388638544, lng: -75.61119444796769 },
      link: 'https://www.google.com/maps/place/Cra.+9+%2315-12,+Florencia,+Caquet%C3%A1/@1.6161071,-75.6137157,17z/data=!3m1!4b1!4m5!3m4!1s0x8e244e05107f6d27:0x587b00d0a6f1ba24!8m2!3d1.6161017!4d-75.6111408?hl=es&entry=ttu',
      label: 'FBI SOLUCION EXPRESS',
      direction: 'Cra 9 #15A-12 BRR CENTRO',
      telefono: '3135646159',
      marca: 'Makita',
      color: '#00E4FF',
    },
    {
      position: { lat: 2.1983699318383807, lng: -75.62694879602348 },
      link: 'https://www.google.com/maps/place/Cl.+9+%239-42,+Garz%C3%B3n,+Huila/@2.1981502,-75.6318304,17z/data=!3m1!4b1!4m6!3m5!1s0x8e24d9841f312eed:0xbff19170594f8cab!8m2!3d2.1981448!4d-75.6269595!16s%2Fg%2F11frt64zr0?hl=es&entry=ttu',
      label: 'SAMAKI SERVICIOS',
      direction: 'Calle 9 # 9-42',
      telefono: '3026699566 - 3118266714 - 3112947951',
      marca: 'Makita',
      color: '#00E4FF',
    },
    {
      position: { lat: 6.242607063377485, lng: -75.57138341728366 },
      link: 'https://www.google.com/maps/place/pasaje+comercial+calle+nueva/@6.2423778,-75.5740442,17z/data=!4m6!3m5!1s0x8e442853165eb6c5:0x50be037210ba3ec0!8m2!3d6.2423831!4d-75.5714156!16s%2Fg%2F1pv0cmxhd?hl=es&entry=ttu',
      label: 'MAKICENTER MAZ S.A.S.',
      direction: 'CRA 50 #41-41PALACE PASAJE COMERCIAL CALLE NUEVA LOCAL 115',
      telefono: '310 5977337',
      marca: 'Makita',
      color: '#00E4FF',
    },
    {
      position: { lat: 6.210249879571253, lng: -75.58718371913176 },
      link: 'https://www.google.com/maps/place/Cl.+2+%2355-88,+Guayabal,+Medell%C3%ADn,+Guayabal,+Medell%C3%ADn,+Antioquia/@6.2100632,-75.5897157,17z/data=!3m1!4b1!4m6!3m5!1s0x8e4429d83453d0c7:0x80e63e2644e99e4d!8m2!3d6.2100579!4d-75.5871408!16s%2Fg%2F11tt6cvw53?hl=es&entry=ttu',
      label: 'HERRAMIENTAS Y SERVICIOS JM',
      direction: 'Cll 2 # 55-88',
      telefono: '3117480715',
      marca: 'Makita',
      color: '#00E4FF',
    },
    {
      position: { lat: 4.709532740172407, lng: -74.21752181728665 },
      link: 'https://www.google.com/maps/place/Cra.+4+Este+%2319a-17,+Mosquera,+Cundinamarca/@4.7093135,-74.2201289,17z/data=!3m1!4b1!4m5!3m4!1s0x8e3f9d555054d4fb:0x7f95a6b10c6be896!8m2!3d4.7093082!4d-74.217554?hl=es&entry=ttu',
      label: 'MYM AGROINDUSTRIAL SAS',
      direction: 'CR 4 19A 17 ESTE',
      telefono: '3138408375',
      marca: 'Makita',
      color: '#00E4FF',
    },
    {
      position: { lat: 1.2024173812179295, lng: -77.26975623262489 },
      link: 'https://www.google.com/maps/place/tienda+avenida+Chile/@1.2021868,-77.2723204,17z/data=!3m1!4b1!4m6!3m5!1s0x8e2ed4960da17923:0xc0f055c74679a496!8m2!3d1.2021814!4d-77.2697455!16s%2Fg%2F11c2p_rkzx?hl=es&entry=ttu',
      label: 'SERVICIOS TÉCNICOS TESLA',
      direction: 'Cra 9 # 19_18 Av chile',
      telefono: '3202465843 - 3207184876',
      marca: 'Makita',
      color: '#00E4FF',
    },
    {
      position: { lat: 2.6403283241516378, lng: -76.53242544796952 },
      link: 'https://www.google.com/maps/place/Cl.+7+%2311-01,+Piendam%C3%B3,+Cauca/@2.6401944,-76.5349467,17z/data=!3m1!4b1!4m6!3m5!1s0x8e300bec6dada245:0x6eba4eb80b941da!8m2!3d2.640189!4d-76.5323718!16s%2Fg%2F11j30j6n90?hl=es&entry=ttu',
      label: 'MULTIHERRAMIENTAS DEL CAUCA',
      direction: 'CALLE 7 #11-01',
      telefono: '3123153730',
      marca: 'Makita',
      color: '#00E4FF',
    },
    {
      position: { lat: 0.49811200997813504, lng: -76.49788999602701 },
      link: 'https://www.google.com/maps/place/Cra.+25+%2313-42,+Puerto+As%C3%ADs,+Putumayo/@0.4979243,-76.5027716,17z/data=!3m1!4b1!4m9!1m2!2m1!1sCR+25+13+42+BRR+RECREO+puerto+asis!3m5!1s0x8e2878d9467cbe37:0xaa2099de6567ac22!8m2!3d0.4979189!4d-76.4979007!15sCiJDUiAyNSAxMyA0MiBCUlIgUkVDUkVPIHB1ZXJ0byBhc2lzkgEQZ2VvY29kZWRfYWRkcmVzc-ABAA?hl=es&entry=ttu',
      label: 'SERVICENTER',
      direction: 'CR 25 13 42 BRR RECREO',
      telefono: '3209181213',
      marca: 'Makita',
      color: '#00E4FF',
    },
    {
      position: { lat: 7.080547686279955, lng: -74.70077567679978 },
      link: 'https://www.google.com/maps/place/Cl.+49+%2349-10,+Segovia,+Antioquia/@7.0803507,-74.7032862,17z/data=!3m1!4b1!4m6!3m5!1s0x8e436ebb1b3c6427:0x666628353b0facf!8m2!3d7.0803454!4d-74.7007113!16s%2Fg%2F11j24wfrfb?hl=es&entry=ttu',
      label: 'MAKICENTER MAZ S.A.S.',
      direction: 'CALLE 49#49-06BARRIO BRICEÑO',
      telefono: '350 8593868',
      marca: 'Makita',
      color: '#00E4FF',
    },
    {
      position: { lat: 10.470278942211223, lng: -73.24225944609775 },
      link: 'https://www.google.com/maps/place/Cl.+19b+%236b15,+Valledupar,+Cesar/@10.4701471,-73.2448558,17z/data=!3m1!4b1!4m6!3m5!1s0x8e8ab9baa357e0e3:0x870a3d96c26e393!8m2!3d10.4701418!4d-73.2422809!16s%2Fg%2F11hyc887lb?hl=es&entry=ttu',
      label: 'TALLER DE REPARACION INDUSTRIAL SERVI-RAFA',
      direction: 'CL 19B 6B 07 KENNEDY',
      telefono: '3158570112 / 3105430457',
      marca: 'Makita',
      color: '#00E4FF',
    },
    {
      position: { lat: 6.2492999, lng: -75.5645218 },
      link: 'https://www.google.com/maps/place/Av.+Oriental+%2340-27,+La+Candelaria,+Medell%C3%ADn,+La+Candelaria,+Medell%C3%ADn,+Antioquia/@6.2493052,-75.5693927,17z/data=!3m1!4b1!4m10!1m2!2m1!1sCRA.+46+AV.+ORIENTAL+40-27,+MEDELLIN,+ANTIOQUIAANTIOQUIA!3m6!1s0x8e4428f86ecac253:0x30626148084c494c!8m2!3d6.2492999!4d-75.5645218!15sCjlDUkEuIDQ2IEFWLiBPUklFTlRBTCA0MC0yNywgTUVERUxMSU4sIEFOVElPUVVJQSBBTlRJT1FVSUGSARBnZW9jb2RlZF9hZGRyZXNz4AEA!16s%2Fg%2F11rxnhkq9d?entry=ttu',
      label: 'SOLUTECNIC',
      direction: 'CRA. 46 AV. ORIENTAL 40-27, MEDELLIN, ANTIOQUIAANTIOQUIA',
      telefono: '(57)-4- 2626850 / 2623337',
      color: '#E09720',
      marca: 'Dewalt',
    },
    {
      position: { lat: 7.0597602, lng: -73.8512754 },
      link: 'https://www.google.com/maps/place/Cra.+28+%2348-75,+Barrancabermeja,+Santander/@7.0597602,-73.8538503,17z/data=!3m1!4b1!4m5!3m4!1s0x8e42eca8d3039bb3:0x803f0cb95593e021!8m2!3d7.0597549!4d-73.8512754?entry=ttu',
      label: 'JM SERVICIOS INDUSTRIALES',
      direction: 'CRA. 28 No. 48-75, BARRANCABERMEJA, SANTANDERSANTANDER',
      telefono: '(57)-7- 6211729',
      color: '#E09720',
      marca: 'Dewalt',
    },
    {
      position: { lat: 10.9891453, lng: -74.7954767 },
      link: 'https://www.google.com/maps/place/Cra.+45+%2359-21+Local+3,+Nte.+Centro+Historico,+Barranquilla,+Atl%C3%A1ntico/@10.9891453,-74.7980516,17z/data=!3m1!4b1!4m5!3m4!1s0x8ef42d71d3fb6ea1:0xe839c6f2af9f39c8!8m2!3d10.98914!4d-74.7954767?entry=ttu',
      label: 'SOLUCIONES INDUSTRIALES O.M.K',
      direction: 'CRA 45 # 59 – 21 Local 3, BARRANQUILLA, ATLANTICOATLANTICO',
      telefono: '(57) - 5- 3864065',
      color: '#E09720',
      marca: 'Dewalt',
    },
    {
      position: { lat: 4.7158553, lng: -74.2031745 },
      link: 'https://www.google.com/maps/place/Cl.+22+%238-29+8b+34,+Funza,+Cundinamarca/@4.7158553,-74.2057494,17z/data=!3m1!4b1!4m5!3m4!1s0x8e3f82b10ab508f7:0xee14e0ec5700cf6a!8m2!3d4.71585!4d-74.2031745?entry=ttu',
      label: 'INGETEC REPARACIONES',
      direction: 'CALLE 22 8 No. 8B-34, FUNZA , CUNDINAMARCACUNDINAMARCA',
      telefono: '(57)-1 - 8237067',
      color: '#E09720',
      marca: 'Dewalt',
    },
    {
      position: { lat: 10.4693342, lng: -73.2431896 },
      link: 'https://www.google.com/maps/place/Cl.+19c+%237-62,+Valledupar,+Cesar/@10.4693342,-73.2457645,17z/data=!3m1!4b1!4m6!3m5!1s0x8e8ab9baed2481f7:0x5e92d38edd7ef85b!8m2!3d10.4693289!4d-73.2431896!16s%2Fg%2F11fq2qngj9?entry=ttu',
      label: 'ELECTROBOBINADOS DEL CESAR',
      direction: 'CALLE 19C No. 7-62, VALLEDUPAR, CESARCESAR',
      telefono: '575 5890984',
      color: '#E09720',
      marca: 'Dewalt',
    },
  ],
};
