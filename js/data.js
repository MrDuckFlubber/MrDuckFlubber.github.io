// ============================================================
// DATA.JS — Extended city data: 3+ cities per UTC offset zone
// ============================================================
const CITIES = [
  // UTC-12
  { id:"baker-island",   name:"Baker Island",   country:"USA (Unincorporated)",  timezone:"Etc/GMT+12",             lat:0.19,    lng:-176.48, flag:"🇺🇸", continent:"Oceania"  },
  // UTC-11
  { id:"pago-pago",      name:"Pago Pago",       country:"American Samoa",        timezone:"Pacific/Pago_Pago",       lat:-14.28,  lng:-170.70, flag:"🇦🇸", continent:"Oceania"  },
  { id:"niue",           name:"Niue",             country:"Niue",                  timezone:"Pacific/Niue",            lat:-19.05,  lng:-169.86, flag:"🇳🇺", continent:"Oceania"  },
  // UTC-10
  { id:"honolulu",       name:"Honolulu",         country:"USA",                   timezone:"Pacific/Honolulu",        lat:21.31,   lng:-157.86, flag:"🇺🇸", continent:"Americas" },
  { id:"papeete",        name:"Papeete",          country:"French Polynesia",      timezone:"Pacific/Tahiti",          lat:-17.53,  lng:-149.56, flag:"🇵🇫", continent:"Oceania"  },
  { id:"cook-islands",   name:"Rarotonga",        country:"Cook Islands",          timezone:"Pacific/Rarotonga",       lat:-21.24,  lng:-159.78, flag:"🇨🇰", continent:"Oceania"  },
  // UTC-9
  { id:"anchorage",      name:"Anchorage",        country:"USA",                   timezone:"America/Anchorage",       lat:61.22,   lng:-149.90, flag:"🇺🇸", continent:"Americas" },
  { id:"juneau",         name:"Juneau",           country:"USA",                   timezone:"America/Juneau",          lat:58.30,   lng:-134.42, flag:"🇺🇸", continent:"Americas" },
  { id:"gambier",        name:"Gambier",          country:"French Polynesia",      timezone:"Pacific/Gambier",         lat:-23.13,  lng:-134.97, flag:"🇵🇫", continent:"Oceania"  },
  // UTC-8
  { id:"los-angeles",    name:"Los Angeles",      country:"USA",                   timezone:"America/Los_Angeles",     lat:34.05,   lng:-118.24, flag:"🇺🇸", continent:"Americas" },
  { id:"vancouver",      name:"Vancouver",        country:"Canada",                timezone:"America/Vancouver",       lat:49.25,   lng:-123.12, flag:"🇨🇦", continent:"Americas" },
  { id:"tijuana",        name:"Tijuana",          country:"Mexico",                timezone:"America/Tijuana",         lat:32.52,   lng:-117.04, flag:"🇲🇽", continent:"Americas" },
  // UTC-7
  { id:"denver",         name:"Denver",           country:"USA",                   timezone:"America/Denver",          lat:39.74,   lng:-104.98, flag:"🇺🇸", continent:"Americas" },
  { id:"phoenix",        name:"Phoenix",          country:"USA",                   timezone:"America/Phoenix",         lat:33.45,   lng:-112.07, flag:"🇺🇸", continent:"Americas" },
  { id:"calgary",        name:"Calgary",          country:"Canada",                timezone:"America/Edmonton",        lat:51.05,   lng:-114.07, flag:"🇨🇦", continent:"Americas" },
  { id:"hermosillo",     name:"Hermosillo",       country:"Mexico",                timezone:"America/Hermosillo",      lat:29.07,   lng:-110.96, flag:"🇲🇽", continent:"Americas" },
  // UTC-6
  { id:"chicago",        name:"Chicago",          country:"USA",                   timezone:"America/Chicago",         lat:41.88,   lng:-87.63,  flag:"🇺🇸", continent:"Americas" },
  { id:"mexico-city",    name:"Mexico City",      country:"Mexico",                timezone:"America/Mexico_City",     lat:19.43,   lng:-99.13,  flag:"🇲🇽", continent:"Americas" },
  { id:"winnipeg",       name:"Winnipeg",         country:"Canada",                timezone:"America/Winnipeg",        lat:49.90,   lng:-97.14,  flag:"🇨🇦", continent:"Americas" },
  { id:"guatemala-city", name:"Guatemala City",   country:"Guatemala",             timezone:"America/Guatemala",       lat:14.64,   lng:-90.51,  flag:"🇬🇹", continent:"Americas" },
  { id:"san-jose-cr",    name:"San José",         country:"Costa Rica",            timezone:"America/Costa_Rica",      lat:9.93,    lng:-84.08,  flag:"🇨🇷", continent:"Americas" },
  // UTC-5
  { id:"new-york",       name:"New York",         country:"USA",                   timezone:"America/New_York",        lat:40.71,   lng:-74.01,  flag:"🇺🇸", continent:"Americas" },
  { id:"toronto",        name:"Toronto",          country:"Canada",                timezone:"America/Toronto",         lat:43.65,   lng:-79.38,  flag:"🇨🇦", continent:"Americas" },
  { id:"lima",           name:"Lima",             country:"Peru",                  timezone:"America/Lima",            lat:-12.05,  lng:-77.04,  flag:"🇵🇪", continent:"Americas" },
  { id:"bogota",         name:"Bogotá",           country:"Colombia",              timezone:"America/Bogota",          lat:4.71,    lng:-74.07,  flag:"🇨🇴", continent:"Americas" },
  { id:"havana",         name:"Havana",           country:"Cuba",                  timezone:"America/Havana",          lat:23.13,   lng:-82.38,  flag:"🇨🇺", continent:"Americas" },
  // UTC-4
  { id:"santiago",       name:"Santiago",         country:"Chile",                 timezone:"America/Santiago",        lat:-33.45,  lng:-70.67,  flag:"🇨🇱", continent:"Americas" },
  { id:"caracas",        name:"Caracas",          country:"Venezuela",             timezone:"America/Caracas",         lat:10.49,   lng:-66.88,  flag:"🇻🇪", continent:"Americas" },
  { id:"la-paz",         name:"La Paz",           country:"Bolivia",               timezone:"America/La_Paz",          lat:-16.50,  lng:-68.15,  flag:"🇧🇴", continent:"Americas" },
  { id:"asuncion",       name:"Asunción",         country:"Paraguay",              timezone:"America/Asuncion",        lat:-25.29,  lng:-57.65,  flag:"🇵🇾", continent:"Americas" },
  { id:"halifax",        name:"Halifax",          country:"Canada",                timezone:"America/Halifax",         lat:44.65,   lng:-63.58,  flag:"🇨🇦", continent:"Americas" },
  // UTC-3
  { id:"sao-paulo",      name:"São Paulo",        country:"Brazil",                timezone:"America/Sao_Paulo",       lat:-23.55,  lng:-46.63,  flag:"🇧🇷", continent:"Americas" },
  { id:"buenos-aires",   name:"Buenos Aires",     country:"Argentina",             timezone:"America/Argentina/Buenos_Aires", lat:-34.60, lng:-58.38, flag:"🇦🇷", continent:"Americas" },
  { id:"montevideo",     name:"Montevideo",       country:"Uruguay",               timezone:"America/Montevideo",      lat:-34.90,  lng:-56.19,  flag:"🇺🇾", continent:"Americas" },
  { id:"paramaribo",     name:"Paramaribo",       country:"Suriname",              timezone:"America/Paramaribo",      lat:5.87,    lng:-55.17,  flag:"🇸🇷", continent:"Americas" },
  // UTC-2
  { id:"south-georgia",  name:"South Georgia",   country:"UK Territory",          timezone:"Atlantic/South_Georgia",  lat:-54.27,  lng:-36.52,  flag:"🇬🇸", continent:"Americas" },
  // UTC-1
  { id:"praia",          name:"Praia",            country:"Cape Verde",            timezone:"Atlantic/Cape_Verde",     lat:14.93,   lng:-23.51,  flag:"🇨🇻", continent:"Africa"   },
  { id:"azores",         name:"Ponta Delgada",    country:"Portugal (Azores)",     timezone:"Atlantic/Azores",         lat:37.74,   lng:-25.67,  flag:"🇵🇹", continent:"Europe"   },
  // UTC+0
  { id:"london",         name:"London",           country:"UK",                    timezone:"Europe/London",           lat:51.51,   lng:-0.13,   flag:"🇬🇧", continent:"Europe"   },
  { id:"lisbon",         name:"Lisbon",           country:"Portugal",              timezone:"Europe/Lisbon",           lat:38.72,   lng:-9.14,   flag:"🇵🇹", continent:"Europe"   },
  { id:"dublin",         name:"Dublin",           country:"Ireland",               timezone:"Europe/Dublin",           lat:53.33,   lng:-6.25,   flag:"🇮🇪", continent:"Europe"   },
  { id:"accra",          name:"Accra",            country:"Ghana",                 timezone:"Africa/Accra",            lat:5.55,    lng:-0.20,   flag:"🇬🇭", continent:"Africa"   },
  { id:"dakar",          name:"Dakar",            country:"Senegal",               timezone:"Africa/Dakar",            lat:14.72,   lng:-17.47,  flag:"🇸🇳", continent:"Africa"   },
  { id:"reykjavik",      name:"Reykjavik",        country:"Iceland",               timezone:"Atlantic/Reykjavik",      lat:64.13,   lng:-21.82,  flag:"🇮🇸", continent:"Europe"   },
  // UTC+1
  { id:"paris",          name:"Paris",            country:"France",                timezone:"Europe/Paris",            lat:48.85,   lng:2.35,    flag:"🇫🇷", continent:"Europe"   },
  { id:"berlin",         name:"Berlin",           country:"Germany",               timezone:"Europe/Berlin",           lat:52.52,   lng:13.40,   flag:"🇩🇪", continent:"Europe"   },
  { id:"madrid",         name:"Madrid",           country:"Spain",                 timezone:"Europe/Madrid",           lat:40.42,   lng:-3.70,   flag:"🇪🇸", continent:"Europe"   },
  { id:"rome",           name:"Rome",             country:"Italy",                 timezone:"Europe/Rome",             lat:41.90,   lng:12.50,   flag:"🇮🇹", continent:"Europe"   },
  { id:"amsterdam",      name:"Amsterdam",        country:"Netherlands",           timezone:"Europe/Amsterdam",        lat:52.37,   lng:4.90,    flag:"🇳🇱", continent:"Europe"   },
  { id:"stockholm",      name:"Stockholm",        country:"Sweden",                timezone:"Europe/Stockholm",        lat:59.33,   lng:18.07,   flag:"🇸🇪", continent:"Europe"   },
  { id:"warsaw",         name:"Warsaw",           country:"Poland",                timezone:"Europe/Warsaw",           lat:52.23,   lng:21.01,   flag:"🇵🇱", continent:"Europe"   },
  { id:"lagos",          name:"Lagos",            country:"Nigeria",               timezone:"Africa/Lagos",            lat:6.52,    lng:3.38,    flag:"🇳🇬", continent:"Africa"   },
  { id:"kinshasa",       name:"Kinshasa",         country:"DR Congo",              timezone:"Africa/Kinshasa",         lat:-4.32,   lng:15.32,   flag:"🇨🇩", continent:"Africa"   },
  { id:"algiers",        name:"Algiers",          country:"Algeria",               timezone:"Africa/Algiers",          lat:36.74,   lng:3.06,    flag:"🇩🇿", continent:"Africa"   },
  { id:"tunis",          name:"Tunis",            country:"Tunisia",               timezone:"Africa/Tunis",            lat:36.82,   lng:10.17,   flag:"🇹🇳", continent:"Africa"   },
  // UTC+2
  { id:"cairo",          name:"Cairo",            country:"Egypt",                 timezone:"Africa/Cairo",            lat:30.04,   lng:31.24,   flag:"🇪🇬", continent:"Africa"   },
  { id:"johannesburg",   name:"Johannesburg",     country:"South Africa",          timezone:"Africa/Johannesburg",     lat:-26.20,  lng:28.04,   flag:"🇿🇦", continent:"Africa"   },
  { id:"harare",         name:"Harare",           country:"Zimbabwe",              timezone:"Africa/Harare",           lat:-17.83,  lng:31.05,   flag:"🇿🇼", continent:"Africa"   },
  { id:"athens",         name:"Athens",           country:"Greece",                timezone:"Europe/Athens",           lat:37.98,   lng:23.73,   flag:"🇬🇷", continent:"Europe"   },
  { id:"helsinki",       name:"Helsinki",         country:"Finland",               timezone:"Europe/Helsinki",         lat:60.17,   lng:24.94,   flag:"🇫🇮", continent:"Europe"   },
  { id:"bucharest",      name:"Bucharest",        country:"Romania",               timezone:"Europe/Bucharest",        lat:44.43,   lng:26.10,   flag:"🇷🇴", continent:"Europe"   },
  { id:"kyiv",           name:"Kyiv",             country:"Ukraine",               timezone:"Europe/Kyiv",             lat:50.45,   lng:30.52,   flag:"🇺🇦", continent:"Europe"   },
  { id:"jerusalem",      name:"Jerusalem",        country:"Israel",                timezone:"Asia/Jerusalem",          lat:31.77,   lng:35.22,   flag:"🇮🇱", continent:"Asia"     },
  // UTC+3
  { id:"moscow",         name:"Moscow",           country:"Russia",                timezone:"Europe/Moscow",           lat:55.75,   lng:37.62,   flag:"🇷🇺", continent:"Europe"   },
  { id:"istanbul",       name:"Istanbul",         country:"Turkey",                timezone:"Europe/Istanbul",         lat:41.01,   lng:28.95,   flag:"🇹🇷", continent:"Europe"   },
  { id:"nairobi",        name:"Nairobi",          country:"Kenya",                 timezone:"Africa/Nairobi",          lat:-1.29,   lng:36.82,   flag:"🇰🇪", continent:"Africa"   },
  { id:"riyadh",         name:"Riyadh",           country:"Saudi Arabia",          timezone:"Asia/Riyadh",             lat:24.69,   lng:46.72,   flag:"🇸🇦", continent:"Asia"     },
  { id:"baghdad",        name:"Baghdad",          country:"Iraq",                  timezone:"Asia/Baghdad",            lat:33.34,   lng:44.40,   flag:"🇮🇶", continent:"Asia"     },
  { id:"doha",           name:"Doha",             country:"Qatar",                 timezone:"Asia/Qatar",              lat:25.29,   lng:51.53,   flag:"🇶🇦", continent:"Asia"     },
  { id:"addis-ababa",    name:"Addis Ababa",      country:"Ethiopia",              timezone:"Africa/Addis_Ababa",      lat:9.03,    lng:38.74,   flag:"🇪🇹", continent:"Africa"   },
  // UTC+3:30
  { id:"tehran",         name:"Tehran",           country:"Iran",                  timezone:"Asia/Tehran",             lat:35.69,   lng:51.42,   flag:"🇮🇷", continent:"Asia"     },
  // UTC+4
  { id:"dubai",          name:"Dubai",            country:"UAE",                   timezone:"Asia/Dubai",              lat:25.20,   lng:55.27,   flag:"🇦🇪", continent:"Asia"     },
  { id:"baku",           name:"Baku",             country:"Azerbaijan",            timezone:"Asia/Baku",               lat:40.41,   lng:49.87,   flag:"🇦🇿", continent:"Asia"     },
  { id:"tbilisi",        name:"Tbilisi",          country:"Georgia",               timezone:"Asia/Tbilisi",            lat:41.69,   lng:44.83,   flag:"🇬🇪", continent:"Asia"     },
  { id:"yerevan",        name:"Yerevan",          country:"Armenia",               timezone:"Asia/Yerevan",            lat:40.18,   lng:44.51,   flag:"🇦🇲", continent:"Asia"     },
  { id:"mauritius",      name:"Port Louis",       country:"Mauritius",             timezone:"Indian/Mauritius",        lat:-20.16,  lng:57.50,   flag:"🇲🇺", continent:"Africa"   },
  // UTC+4:30
  { id:"kabul",          name:"Kabul",            country:"Afghanistan",           timezone:"Asia/Kabul",              lat:34.53,   lng:69.17,   flag:"🇦🇫", continent:"Asia"     },
  // UTC+5
  { id:"karachi",        name:"Karachi",          country:"Pakistan",              timezone:"Asia/Karachi",            lat:24.86,   lng:67.01,   flag:"🇵🇰", continent:"Asia"     },
  { id:"tashkent",       name:"Tashkent",         country:"Uzbekistan",            timezone:"Asia/Tashkent",           lat:41.30,   lng:69.24,   flag:"🇺🇿", continent:"Asia"     },
  { id:"yekaterinburg",  name:"Yekaterinburg",    country:"Russia",                timezone:"Asia/Yekaterinburg",      lat:56.83,   lng:60.60,   flag:"🇷🇺", continent:"Asia"     },
  // UTC+5:30
  { id:"mumbai",         name:"Mumbai",           country:"India",                 timezone:"Asia/Kolkata",            lat:19.08,   lng:72.88,   flag:"🇮🇳", continent:"Asia"     },
  { id:"new-delhi",      name:"New Delhi",        country:"India",                 timezone:"Asia/Kolkata",            lat:28.61,   lng:77.21,   flag:"🇮🇳", continent:"Asia"     },
  { id:"colombo",        name:"Colombo",          country:"Sri Lanka",             timezone:"Asia/Colombo",            lat:6.93,    lng:79.85,   flag:"🇱🇰", continent:"Asia"     },
  // UTC+5:45
  { id:"kathmandu",      name:"Kathmandu",        country:"Nepal",                 timezone:"Asia/Kathmandu",          lat:27.72,   lng:85.32,   flag:"🇳🇵", continent:"Asia"     },
  // UTC+6
  { id:"dhaka",          name:"Dhaka",            country:"Bangladesh",            timezone:"Asia/Dhaka",              lat:23.81,   lng:90.41,   flag:"🇧🇩", continent:"Asia"     },
  { id:"almaty",         name:"Almaty",           country:"Kazakhstan",            timezone:"Asia/Almaty",             lat:43.26,   lng:76.95,   flag:"🇰🇿", continent:"Asia"     },
  { id:"omsk",           name:"Omsk",             country:"Russia",                timezone:"Asia/Omsk",               lat:54.99,   lng:73.37,   flag:"🇷🇺", continent:"Asia"     },
  // UTC+6:30
  { id:"rangoon",        name:"Yangon",           country:"Myanmar",               timezone:"Asia/Yangon",             lat:16.87,   lng:96.19,   flag:"🇲🇲", continent:"Asia"     },
  // UTC+7
  { id:"bangkok",        name:"Bangkok",          country:"Thailand",              timezone:"Asia/Bangkok",            lat:13.75,   lng:100.50,  flag:"🇹🇭", continent:"Asia"     },
  { id:"jakarta",        name:"Jakarta",          country:"Indonesia",             timezone:"Asia/Jakarta",            lat:-6.21,   lng:106.85,  flag:"🇮🇩", continent:"Asia"     },
  { id:"ho-chi-minh",    name:"Ho Chi Minh City", country:"Vietnam",               timezone:"Asia/Ho_Chi_Minh",        lat:10.82,   lng:106.63,  flag:"🇻🇳", continent:"Asia"     },
  { id:"hanoi",          name:"Hanoi",            country:"Vietnam",               timezone:"Asia/Bangkok",            lat:21.03,   lng:105.85,  flag:"🇻🇳", continent:"Asia"     },
  { id:"phnom-penh",     name:"Phnom Penh",       country:"Cambodia",              timezone:"Asia/Phnom_Penh",         lat:11.56,   lng:104.92,  flag:"🇰🇭", continent:"Asia"     },
  { id:"krasnoyarsk",    name:"Krasnoyarsk",      country:"Russia",                timezone:"Asia/Krasnoyarsk",        lat:56.01,   lng:92.79,   flag:"🇷🇺", continent:"Asia"     },
  // UTC+8
  { id:"beijing",        name:"Beijing",          country:"China",                 timezone:"Asia/Shanghai",           lat:39.91,   lng:116.39,  flag:"🇨🇳", continent:"Asia"     },
  { id:"shanghai",       name:"Shanghai",         country:"China",                 timezone:"Asia/Shanghai",           lat:31.23,   lng:121.47,  flag:"🇨🇳", continent:"Asia"     },
  { id:"singapore",      name:"Singapore",        country:"Singapore",             timezone:"Asia/Singapore",          lat:1.35,    lng:103.82,  flag:"🇸🇬", continent:"Asia"     },
  { id:"hong-kong",      name:"Hong Kong",        country:"China SAR",             timezone:"Asia/Hong_Kong",          lat:22.32,   lng:114.17,  flag:"🇭🇰", continent:"Asia"     },
  { id:"taipei",         name:"Taipei",           country:"Taiwan",                timezone:"Asia/Taipei",             lat:25.03,   lng:121.57,  flag:"🇹🇼", continent:"Asia"     },
  { id:"kuala-lumpur",   name:"Kuala Lumpur",     country:"Malaysia",              timezone:"Asia/Kuala_Lumpur",       lat:3.14,    lng:101.69,  flag:"🇲🇾", continent:"Asia"     },
  { id:"manila",         name:"Manila",           country:"Philippines",           timezone:"Asia/Manila",             lat:14.60,   lng:120.98,  flag:"🇵🇭", continent:"Asia"     },
  { id:"perth",          name:"Perth",            country:"Australia",             timezone:"Australia/Perth",         lat:-31.95,  lng:115.86,  flag:"🇦🇺", continent:"Oceania"  },
  // UTC+9
  { id:"tokyo",          name:"Tokyo",            country:"Japan",                 timezone:"Asia/Tokyo",              lat:35.68,   lng:139.69,  flag:"🇯🇵", continent:"Asia"     },
  { id:"seoul",          name:"Seoul",            country:"South Korea",           timezone:"Asia/Seoul",              lat:37.57,   lng:126.98,  flag:"🇰🇷", continent:"Asia"     },
  { id:"pyongyang",      name:"Pyongyang",        country:"North Korea",           timezone:"Asia/Pyongyang",          lat:39.02,   lng:125.75,  flag:"🇰🇵", continent:"Asia"     },
  { id:"dili",           name:"Dili",             country:"East Timor",            timezone:"Asia/Dili",               lat:-8.56,   lng:125.58,  flag:"🇹🇱", continent:"Asia"     },
  { id:"yakutsk",        name:"Yakutsk",          country:"Russia",                timezone:"Asia/Yakutsk",            lat:62.03,   lng:129.73,  flag:"🇷🇺", continent:"Asia"     },
  // UTC+9:30
  { id:"darwin",         name:"Darwin",           country:"Australia",             timezone:"Australia/Darwin",        lat:-12.46,  lng:130.84,  flag:"🇦🇺", continent:"Oceania"  },
  { id:"adelaide",       name:"Adelaide",         country:"Australia",             timezone:"Australia/Adelaide",      lat:-34.93,  lng:138.60,  flag:"🇦🇺", continent:"Oceania"  },
  // UTC+10
  { id:"sydney",         name:"Sydney",           country:"Australia",             timezone:"Australia/Sydney",        lat:-33.87,  lng:151.21,  flag:"🇦🇺", continent:"Oceania"  },
  { id:"melbourne",      name:"Melbourne",        country:"Australia",             timezone:"Australia/Melbourne",     lat:-37.81,  lng:144.96,  flag:"🇦🇺", continent:"Oceania"  },
  { id:"brisbane",       name:"Brisbane",         country:"Australia",             timezone:"Australia/Brisbane",      lat:-27.47,  lng:153.03,  flag:"🇦🇺", continent:"Oceania"  },
  { id:"port-moresby",   name:"Port Moresby",     country:"Papua New Guinea",      timezone:"Pacific/Port_Moresby",    lat:-9.44,   lng:147.18,  flag:"🇵🇬", continent:"Oceania"  },
  { id:"vladivostok",    name:"Vladivostok",      country:"Russia",                timezone:"Asia/Vladivostok",        lat:43.12,   lng:131.91,  flag:"🇷🇺", continent:"Asia"     },
  // UTC+11
  { id:"noumea",         name:"Noumea",           country:"New Caledonia",         timezone:"Pacific/Noumea",          lat:-22.28,  lng:166.46,  flag:"🇳🇨", continent:"Oceania"  },
  { id:"honiara",        name:"Honiara",          country:"Solomon Islands",       timezone:"Pacific/Guadalcanal",     lat:-9.43,   lng:159.96,  flag:"🇸🇧", continent:"Oceania"  },
  { id:"magadan",        name:"Magadan",          country:"Russia",                timezone:"Asia/Magadan",            lat:59.57,   lng:150.79,  flag:"🇷🇺", continent:"Asia"     },
  // UTC+12
  { id:"auckland",       name:"Auckland",         country:"New Zealand",           timezone:"Pacific/Auckland",        lat:-36.85,  lng:174.76,  flag:"🇳🇿", continent:"Oceania"  },
  { id:"wellington",     name:"Wellington",       country:"New Zealand",           timezone:"Pacific/Auckland",        lat:-41.29,  lng:174.78,  flag:"🇳🇿", continent:"Oceania"  },
  { id:"suva",           name:"Suva",             country:"Fiji",                  timezone:"Pacific/Fiji",            lat:-18.14,  lng:178.44,  flag:"🇫🇯", continent:"Oceania"  },
  { id:"tarawa",         name:"Tarawa",           country:"Kiribati",              timezone:"Pacific/Tarawa",          lat:1.33,    lng:172.98,  flag:"🇰🇮", continent:"Oceania"  },
  // UTC+13
  { id:"nuku-alofa",     name:"Nuku'alofa",       country:"Tonga",                 timezone:"Pacific/Tongatapu",       lat:-21.14,  lng:-175.22, flag:"🇹🇴", continent:"Oceania"  },
  { id:"apia",           name:"Apia",             country:"Samoa",                 timezone:"Pacific/Apia",            lat:-13.83,  lng:-171.77, flag:"🇼🇸", continent:"Oceania"  },
  { id:"fakaofo",        name:"Fakaofo",          country:"Tokelau",               timezone:"Pacific/Fakaofo",         lat:-9.38,   lng:-171.22, flag:"🇹🇰", continent:"Oceania"  },
];
