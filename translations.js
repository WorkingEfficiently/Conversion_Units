/*
 * UI strings and article copy, one block per language.
 *
 * This is hand-written per locale, not machine-translated — the goal is
 * that a Spanish or Japanese visitor gets an actual article, not a
 * translated-in-place English one. Unit codes (km, kg, KiB, °F...) are
 * left in their international abbreviated form in every language, because
 * that's what the converter tool itself displays regardless of `lang`.
 *
 * Used by:
 *  - script.js, loaded as a plain <script> in the browser (reads
 *    document.documentElement.lang and falls back to "en")
 *  - scripts/build-locales.js, which reads this same file with require()
 *    to generate /es/index.html, /fr/index.html, etc. from LOCALE_HOME
 */
(function (root) {
  "use strict";

  var LOCALES = [
    { code: "en", label: "English", path: "/" },
    { code: "es", label: "Español", path: "/es/" },
    { code: "fr", label: "Français", path: "/fr/" },
    { code: "de", label: "Deutsch", path: "/de/" },
    { code: "pt", label: "Português", path: "/pt/" },
    { code: "it", label: "Italiano", path: "/it/" },
    { code: "ja", label: "日本語", path: "/ja/" }
  ];

  var I18N = {

    en: {
      dir: "ltr",
      meta: {
        title: "Universal Unit Converter – Convert Length, Mass, Volume, Time, Temperature & More",
        description: "Free online unit converter for length, mass, volume, time, speed, temperature, pressure, energy, power, digital storage, and angle. Instant results, real conversion formulas, no sign-up."
      },
      nav: { home: "Home", about: "About Us", contact: "Contact Us", privacy: "Privacy Policy", terms: "Terms of Service", lang: "Language" },
      ui: {
        fromTitle: "From",
        resultsTitle: "Converted Results",
        quickAccessTitle: "Quick Access Units",
        searchPlaceholder: "Search units...",
        inputAria: "Value to convert",
        noscript: "Enable JavaScript in your browser to interactively convert values across length, weight, volume, temperature, and more in real time.",
        copied: "Copied!"
      },
      categories: { length: "Length", mass: "Mass", volume: "Volume", time: "Time", speed: "Speed", temperature: "Temperature", pressure: "Pressure", energy: "Energy", power: "Power", digital: "Digital Storage", angle: "Angle" },
      hero: {
        h1: "A unit converter that shows its work",
        lead: "Type a number, pick where it's coming from, and see it converted into every other unit in that category at once — no dropdown-hunting. Built for people who convert units more than once a week: engineers checking a spec, cooks scaling a US recipe, students doing physics homework at 11pm."
      },
      article: {
        heading: "How unit conversion actually works",
        intro: "Every measurement is a number tied to a scale. Converting between units means re-expressing the same real-world quantity — a length, a mass, a temperature — on a different scale. That's straightforward when both scales share a fixed ratio (a mile is always 1.609344 kilometers), and it gets trickier when the scales don't start at the same zero point, which is exactly what happens with temperature.",
        sections: [
          {
            title: "Length & distance",
            body: "Length conversions are the ones people search for most, mostly because the US (plus Liberia and Myanmar) sticks with imperial units while nearly everywhere else uses metric. Recipes, road signs, and height all run into this.",
            list: [
              "1 mile = 1.609344 kilometers (exact, by international agreement since 1959)",
              "1 foot = 12 inches = 0.3048 meters",
              "1 meter = 100 centimeters = 1,000 millimeters"
            ]
          },
          {
            title: "Mass & weight",
            body: "Kilograms and pounds get used interchangeably in everyday speech, even though mass and weight aren't technically the same thing. For daily use, here's what matters:",
            list: [
              "1 kilogram = 2.20462 pounds",
              "1 pound = 16 ounces = 0.453592 kilogram",
              "1 stone = 14 pounds = 6.35 kilograms — still how the UK and Ireland talk about body weight"
            ]
          },
          {
            title: "Temperature — formulas, not ratios",
            body: "This is the one category where you can't just multiply. Celsius, Fahrenheit, and Kelvin don't share a zero point, so converting needs an offset as well as a ratio.",
            list: [
              "°F = (°C × 9⁄5) + 32",
              "°C = (°F − 32) × 5⁄9",
              "K = °C + 273.15 — Kelvin has no negative numbers; 0 K is absolute zero"
            ]
          },
          {
            title: "Digital storage — decimal vs. binary, and why your drive “lies”",
            body: "This is the conversion that genuinely confuses people, and it's not their fault — the industry uses two different definitions of the same prefixes. Storage makers (and the SI system) define a kilobyte as 1,000 bytes. Operating systems have historically shown a kilobyte as 1,024 bytes, because computers count in binary and 1,024 (2¹⁰) is a round number there. That's why a drive sold as “1 TB” shows up as roughly 931 GB in Windows. To avoid the confusion, this tool includes both: KB/MB/GB/TB for the decimal definition and KiB/MiB/GiB/TiB for the binary one.",
            list: [
              "1 kilobyte (KB) = 1,000 bytes — 1 kibibyte (KiB) = 1,024 bytes",
              "1 gigabyte (GB) = 1,000,000,000 bytes — 1 gibibyte (GiB) = 1,073,741,824 bytes",
              "1 GB ≈ 0.931 GiB, which is why storage always looks smaller once it's formatted"
            ]
          },
          {
            title: "Volume & cooking measurements",
            body: "Recipe conversions are their own headache because “a cup” isn't the same size everywhere, and tablespoons/teaspoons are easy to mix up mid-recipe. The values here use US customary measurements, which is what most recipe sites default to.",
            list: [
              "1 US cup = 16 tablespoons = 48 teaspoons ≈ 236.59 mL (often rounded to 240 mL on nutrition labels)",
              "1 US tablespoon = 3 teaspoons ≈ 14.79 mL",
              "1 US gallon = 3.785 liters — a UK (imperial) gallon is about 20% bigger, at 4.546 liters"
            ]
          }
        ],
        categoriesNote: "The tool above covers all of these plus Speed, Pressure, Energy, Power, and Angle — eleven categories in total, with more added when there's a good reason to.",
        faqHeading: "Frequently asked questions"
      },
      faq: [
        { q: "How many kilometers are in a mile?", a: "Exactly 1.609344 kilometers. It's been the internationally agreed definition since 1959, when English-speaking countries standardized the mile at exactly 5,280 feet." },
        { q: "Why does the US still use Fahrenheit?", a: "Mostly history. Fahrenheit was standard across the British Empire until the mid-20th century; almost everywhere else switched to Celsius as part of a broader move to the metric system, but everyday measurement in the US was never fully converted." },
        { q: "Is a US gallon the same as a UK gallon?", a: "No — a UK (imperial) gallon is 4.546 liters, about 20% bigger than a US gallon at 3.785 liters. Recipes and fuel-economy figures from the UK need converting separately if you're used to US gallons." },
        { q: "What's the difference between a gigabyte and a gibibyte?", a: "A gigabyte (GB) is 1,000,000,000 bytes under the decimal definition most manufacturers use. A gibibyte (GiB) is 1,073,741,824 bytes, the binary definition your operating system often uses instead. They're close but not identical — which is why storage devices seem to “lose” capacity once formatted." },
        { q: "Why can't you just multiply for temperature like other units?", a: "Because Celsius and Fahrenheit don't start at the same zero. Length and mass conversions are pure ratios — multiply by a constant — but temperature scales are also offset from each other, so the formula needs both a multiplication and an addition step." },
        { q: "Are the results on this page exact?", a: "Where a conversion factor is defined exactly — inches to centimeters, or Celsius to Kelvin — yes. Where it isn't, like US cup sizes that vary slightly by source, we use the most widely accepted value and note it in the guide above." }
      ],
      footer: { rights: "All rights reserved." }
    },

    es: {
      dir: "ltr",
      meta: {
        title: "Conversor de Unidades Universal – Convierte Longitud, Masa, Volumen, Temperatura y Más",
        description: "Conversor de unidades gratuito y online: longitud, masa, volumen, tiempo, velocidad, temperatura, presión, energía, potencia, almacenamiento digital y ángulos. Resultados instantáneos, sin registro."
      },
      nav: { home: "Inicio", about: "Sobre Nosotros", contact: "Contacto", privacy: "Privacidad", terms: "Términos", lang: "Idioma" },
      ui: {
        fromTitle: "Desde",
        resultsTitle: "Resultados de la Conversión",
        quickAccessTitle: "Unidades de Acceso Rápido",
        searchPlaceholder: "Buscar unidades...",
        inputAria: "Valor a convertir",
        noscript: "Activa JavaScript en tu navegador para convertir longitudes, pesos, volúmenes, temperaturas y más en tiempo real.",
        copied: "¡Copiado!"
      },
      categories: { length: "Longitud", mass: "Masa", volume: "Volumen", time: "Tiempo", speed: "Velocidad", temperature: "Temperatura", pressure: "Presión", energy: "Energía", power: "Potencia", digital: "Almacenamiento Digital", angle: "Ángulo" },
      hero: {
        h1: "Un conversor de unidades que lo muestra todo a la vez",
        lead: "Escribe un número, elige de qué unidad parte, y verás el resultado en todas las demás unidades de esa categoría al mismo tiempo, sin abrir menús desplegables uno por uno. Pensado para quien convierte unidades más de una vez por semana: estudiantes de física, cocineros siguiendo una receta en libras, o cualquiera que reciba un plano en pulgadas y trabaje en centímetros."
      },
      article: {
        heading: "Cómo funciona realmente la conversión de unidades",
        intro: "Toda medida es un número asociado a una escala. Convertir unidades significa expresar la misma magnitud física — una longitud, una masa, una temperatura — en otra escala. Es sencillo cuando ambas escalas mantienen una proporción fija (una milla siempre son 1,609344 kilómetros), y se complica cuando las escalas no comparten el mismo punto cero, que es justo lo que ocurre con la temperatura.",
        sections: [
          {
            title: "Longitud y distancia",
            body: "Las conversiones de longitud son las que más se buscan, sobre todo porque Estados Unidos (junto con Liberia y Myanmar) sigue usando el sistema imperial mientras el resto del mundo usa el métrico. Recetas, señales de tráfico y estaturas chocan constantemente con esto.",
            list: [
              "1 milla = 1,609344 kilómetros (valor exacto, acordado internacionalmente desde 1959)",
              "1 pie = 12 pulgadas = 0,3048 metros",
              "1 metro = 100 centímetros = 1.000 milímetros"
            ]
          },
          {
            title: "Masa y peso",
            body: "En el habla cotidiana, kilogramos y libras se usan como sinónimos, aunque masa y peso no son técnicamente lo mismo. Para el uso diario, esto es lo que importa:",
            list: [
              "1 kilogramo = 2,20462 libras",
              "1 libra = 16 onzas = 0,453592 kilogramo",
              "1 stone = 14 libras = 6,35 kilogramos — así se sigue hablando del peso corporal en el Reino Unido e Irlanda"
            ]
          },
          {
            title: "Temperatura: fórmulas, no proporciones",
            body: "Esta es la única categoría donde no basta con multiplicar. Celsius, Fahrenheit y Kelvin no comparten un punto cero, así que la conversión necesita un desplazamiento además de una proporción.",
            list: [
              "°F = (°C × 9⁄5) + 32",
              "°C = (°F − 32) × 5⁄9",
              "K = °C + 273,15 — Kelvin no tiene números negativos; 0 K es el cero absoluto"
            ]
          },
          {
            title: "Almacenamiento digital: decimal frente a binario, y por qué tu disco “miente”",
            body: "Esta es la conversión que de verdad confunde a la gente, y no es culpa suya: la industria usa dos definiciones distintas para los mismos prefijos. Los fabricantes de almacenamiento (y el sistema internacional SI) definen un kilobyte como 1.000 bytes. Los sistemas operativos muestran tradicionalmente un kilobyte como 1.024 bytes, porque los ordenadores cuentan en binario y 1.024 (2¹⁰) es un número redondo en ese sistema. Por eso un disco vendido como “1 TB” aparece con unos 931 GB en Windows. Para evitar la confusión, esta herramienta incluye ambas: KB/MB/GB/TB para la definición decimal y KiB/MiB/GiB/TiB para la binaria.",
            list: [
              "1 kilobyte (KB) = 1.000 bytes — 1 kibibyte (KiB) = 1.024 bytes",
              "1 gigabyte (GB) = 1.000.000.000 bytes — 1 gibibyte (GiB) = 1.073.741.824 bytes",
              "1 GB ≈ 0,931 GiB, por eso el almacenamiento siempre parece “más pequeño” una vez formateado"
            ]
          },
          {
            title: "Volumen y medidas de cocina",
            body: "Las conversiones de recetas tienen su propio dolor de cabeza porque “una taza” no mide lo mismo en todas partes, y cucharadas/cucharaditas son fáciles de confundir a mitad de receta. Los valores aquí usan medidas estadounidenses habituales, las que usan por defecto la mayoría de webs de recetas.",
            list: [
              "1 taza (US) = 16 cucharadas = 48 cucharaditas ≈ 236,59 mL (se redondea a 240 mL en etiquetas nutricionales)",
              "1 cucharada (US) = 3 cucharaditas ≈ 14,79 mL",
              "1 galón (US) = 3,785 litros — un galón imperial (Reino Unido) es un 20% más grande, con 4,546 litros"
            ]
          }
        ],
        categoriesNote: "La herramienta de arriba cubre todo esto además de Velocidad, Presión, Energía, Potencia y Ángulo — once categorías en total, y se añaden más cuando tiene sentido hacerlo.",
        faqHeading: "Preguntas frecuentes"
      },
      faq: [
        { q: "¿Cuántos kilómetros tiene una milla?", a: "Exactamente 1,609344 kilómetros. Es la definición acordada internacionalmente desde 1959, cuando los países de habla inglesa fijaron la milla en exactamente 5.280 pies." },
        { q: "¿Por qué Estados Unidos sigue usando Fahrenheit?", a: "Sobre todo por historia. Fahrenheit fue el estándar en todo el Imperio Británico hasta mediados del siglo XX; casi todos los demás países pasaron a Celsius junto con la adopción general del sistema métrico, pero en Estados Unidos las medidas cotidianas nunca se convirtieron del todo." },
        { q: "¿Un galón estadounidense es igual a uno británico?", a: "No — un galón imperial (Reino Unido) son 4,546 litros, aproximadamente un 20% más que un galón estadounidense (3,785 litros). Las recetas y los datos de consumo de combustible del Reino Unido hay que convertirlos aparte si estás acostumbrado al galón estadounidense." },
        { q: "¿Cuál es la diferencia entre un gigabyte y un gibibyte?", a: "Un gigabyte (GB) son 1.000.000.000 bytes según la definición decimal que usan la mayoría de fabricantes. Un gibibyte (GiB) son 1.073.741.824 bytes, la definición binaria que suele usar el sistema operativo. Son valores parecidos pero no idénticos, por eso los discos parecen “perder” capacidad al formatearlos." },
        { q: "¿Por qué no basta con multiplicar para convertir temperatura, como con otras unidades?", a: "Porque Celsius y Fahrenheit no empiezan en el mismo cero. Las conversiones de longitud y masa son proporciones puras — se multiplica por una constante — pero las escalas de temperatura también están desplazadas entre sí, así que la fórmula necesita tanto una multiplicación como una suma." },
        { q: "¿Son exactos los resultados de esta página?", a: "Cuando el factor de conversión está definido de forma exacta — pulgadas a centímetros, o Celsius a Kelvin — sí. Cuando no lo está, como el tamaño de la taza estadounidense que varía un poco según la fuente, usamos el valor más aceptado y lo indicamos en la guía de arriba." }
      ],
      footer: { rights: "Todos los derechos reservados." }
    },

    fr: {
      dir: "ltr",
      meta: {
        title: "Convertisseur d'Unités Universel – Longueur, Masse, Volume, Température et Plus",
        description: "Convertisseur d'unités gratuit en ligne : longueur, masse, volume, temps, vitesse, température, pression, énergie, puissance, stockage numérique et angles. Résultats instantanés, sans inscription."
      },
      nav: { home: "Accueil", about: "À Propos", contact: "Contact", privacy: "Confidentialité", terms: "Conditions", lang: "Langue" },
      ui: {
        fromTitle: "Depuis",
        resultsTitle: "Résultats de la Conversion",
        quickAccessTitle: "Unités d'Accès Rapide",
        searchPlaceholder: "Rechercher une unité...",
        inputAria: "Valeur à convertir",
        noscript: "Activez JavaScript dans votre navigateur pour convertir longueurs, poids, volumes, températures et plus encore en temps réel.",
        copied: "Copié !"
      },
      categories: { length: "Longueur", mass: "Masse", volume: "Volume", time: "Temps", speed: "Vitesse", temperature: "Température", pressure: "Pression", energy: "Énergie", power: "Puissance", digital: "Stockage Numérique", angle: "Angle" },
      hero: {
        h1: "Un convertisseur d'unités qui affiche tout en même temps",
        lead: "Saisissez un nombre, indiquez son unité de départ, et obtenez instantanément le résultat dans toutes les autres unités de la catégorie — sans ouvrir des menus déroulants un par un. Conçu pour celles et ceux qui convertissent des unités plus d'une fois par semaine : élèves en physique, cuisiniers suivant une recette en onces, ou toute personne qui reçoit un plan en pouces et travaille en centimètres."
      },
      article: {
        heading: "Comment fonctionne réellement la conversion d'unités",
        intro: "Toute mesure est un nombre rattaché à une échelle. Convertir des unités revient à exprimer la même grandeur physique — une longueur, une masse, une température — sur une échelle différente. C'est simple quand les deux échelles partagent un rapport fixe (un mile fait toujours 1,609344 kilomètre), et ça se complique quand les échelles n'ont pas le même point zéro, ce qui est justement le cas de la température.",
        sections: [
          {
            title: "Longueur et distance",
            body: "Ce sont les conversions les plus recherchées, surtout parce que les États-Unis (avec le Liberia et le Myanmar) utilisent encore le système impérial alors que presque tout le reste du monde est passé au métrique. Recettes, panneaux routiers et tailles s'y heurtent en permanence.",
            list: [
              "1 mile = 1,609344 kilomètre (valeur exacte, fixée par accord international depuis 1959)",
              "1 pied = 12 pouces = 0,3048 mètre",
              "1 mètre = 100 centimètres = 1 000 millimètres"
            ]
          },
          {
            title: "Masse et poids",
            body: "Dans le langage courant, kilogrammes et livres sont utilisés indifféremment, même si masse et poids ne désignent pas exactement la même chose en physique. Au quotidien, voici ce qui compte :",
            list: [
              "1 kilogramme = 2,20462 livres",
              "1 livre = 16 onces = 0,453592 kilogramme",
              "1 stone = 14 livres = 6,35 kilogrammes — toujours utilisé au Royaume-Uni et en Irlande pour le poids d'une personne"
            ]
          },
          {
            title: "Température : des formules, pas des rapports",
            body: "C'est la seule catégorie où une simple multiplication ne suffit pas. Celsius, Fahrenheit et Kelvin n'ont pas le même point zéro : la conversion demande donc un décalage en plus d'un rapport.",
            list: [
              "°F = (°C × 9⁄5) + 32",
              "°C = (°F − 32) × 5⁄9",
              "K = °C + 273,15 — le Kelvin n'a pas de nombres négatifs ; 0 K est le zéro absolu"
            ]
          },
          {
            title: "Stockage numérique : décimal ou binaire, et pourquoi votre disque “ment”",
            body: "C'est la conversion qui prête vraiment à confusion, et ce n'est la faute de personne : l'industrie utilise deux définitions différentes pour les mêmes préfixes. Les fabricants de stockage (et le système international SI) définissent un kilo-octet comme 1 000 octets. Les systèmes d'exploitation ont longtemps affiché un kilo-octet comme 1 024 octets, parce que les ordinateurs comptent en binaire et que 1 024 (2¹⁰) y est un nombre rond. C'est pourquoi un disque vendu “1 To” apparaît autour de 931 GB sous Windows. Pour éviter la confusion, cet outil propose les deux : KB/MB/GB/TB pour la définition décimale, et KiB/MiB/GiB/TiB pour la binaire.",
            list: [
              "1 kilo-octet (KB) = 1 000 octets — 1 kibi-octet (KiB) = 1 024 octets",
              "1 gigaoctet (GB) = 1 000 000 000 octets — 1 gibioctet (GiB) = 1 073 741 824 octets",
              "1 GB ≈ 0,931 GiB, ce qui explique pourquoi le stockage semble toujours “rétrécir” une fois formaté"
            ]
          },
          {
            title: "Volume et mesures de cuisine",
            body: "Les conversions de recettes ont leur propre casse-tête, car “une tasse” ne fait pas la même taille partout, et cuillères à soupe/à café se confondent facilement en pleine recette. Les valeurs ici utilisent les mesures américaines courantes, celles par défaut sur la plupart des sites de recettes anglophones.",
            list: [
              "1 tasse (US) = 16 cuillères à soupe = 48 cuillères à café ≈ 236,59 mL (arrondi à 240 mL sur les étiquettes nutritionnelles)",
              "1 cuillère à soupe (US) = 3 cuillères à café ≈ 14,79 mL",
              "1 gallon (US) = 3,785 litres — un gallon impérial (Royaume-Uni) est environ 20 % plus grand, à 4,546 litres"
            ]
          }
        ],
        categoriesNote: "L'outil ci-dessus couvre tout cela, plus la Vitesse, la Pression, l'Énergie, la Puissance et l'Angle — onze catégories au total, avec d'autres ajoutées quand cela a du sens.",
        faqHeading: "Questions fréquentes"
      },
      faq: [
        { q: "Combien de kilomètres fait un mile ?", a: "Exactement 1,609344 kilomètre. C'est la définition retenue au niveau international depuis 1959, quand les pays anglophones ont fixé le mile à exactement 5 280 pieds." },
        { q: "Pourquoi les États-Unis utilisent-ils encore Fahrenheit ?", a: "Surtout pour des raisons historiques. Le Fahrenheit était la norme dans tout l'Empire britannique jusqu'au milieu du XXe siècle ; presque partout ailleurs on est passé au Celsius avec l'adoption plus large du système métrique, mais les mesures du quotidien aux États-Unis n'ont jamais été entièrement converties." },
        { q: "Un gallon américain est-il identique à un gallon britannique ?", a: "Non — un gallon impérial (Royaume-Uni) fait 4,546 litres, environ 20 % de plus qu'un gallon américain (3,785 litres). Les recettes et les chiffres de consommation venus du Royaume-Uni doivent être reconvertis séparément si vous avez l'habitude du gallon américain." },
        { q: "Quelle est la différence entre un gigaoctet et un gibioctet ?", a: "Un gigaoctet (GB) correspond à 1 000 000 000 octets selon la définition décimale utilisée par la plupart des fabricants. Un gibioctet (GiB) correspond à 1 073 741 824 octets, la définition binaire souvent utilisée par le système d'exploitation. Les deux valeurs sont proches mais pas identiques — c'est pourquoi le stockage semble toujours “perdre” de la capacité une fois formaté." },
        { q: "Pourquoi ne suffit-il pas de multiplier pour la température, comme pour les autres unités ?", a: "Parce que Celsius et Fahrenheit ne partent pas du même zéro. Les conversions de longueur et de masse sont de pures proportions — on multiplie par une constante — mais les échelles de température sont aussi décalées l'une par rapport à l'autre, la formule a donc besoin à la fois d'une multiplication et d'une addition." },
        { q: "Les résultats de cette page sont-ils exacts ?", a: "Quand un facteur de conversion est défini de façon exacte — pouces vers centimètres, ou Celsius vers Kelvin — oui. Quand ce n'est pas le cas, comme la taille de la tasse américaine qui varie légèrement selon les sources, on utilise la valeur la plus largement admise, indiquée dans le guide ci-dessus." }
      ],
      footer: { rights: "Tous droits réservés." }
    },

    de: {
      dir: "ltr",
      meta: {
        title: "Universeller Einheitenrechner – Länge, Masse, Volumen, Temperatur und mehr umrechnen",
        description: "Kostenloser Online-Einheitenrechner für Länge, Masse, Volumen, Zeit, Geschwindigkeit, Temperatur, Druck, Energie, Leistung, digitalen Speicher und Winkel. Sofortige Ergebnisse, keine Anmeldung nötig."
      },
      nav: { home: "Start", about: "Über Uns", contact: "Kontakt", privacy: "Datenschutz", terms: "Nutzungsbedingungen", lang: "Sprache" },
      ui: {
        fromTitle: "Von",
        resultsTitle: "Umrechnungsergebnisse",
        quickAccessTitle: "Schnellzugriff auf Einheiten",
        searchPlaceholder: "Einheit suchen...",
        inputAria: "Umzurechnender Wert",
        noscript: "Aktivieren Sie JavaScript in Ihrem Browser, um Längen, Gewichte, Volumen, Temperaturen und mehr in Echtzeit umzurechnen.",
        copied: "Kopiert!"
      },
      categories: { length: "Länge", mass: "Masse", volume: "Volumen", time: "Zeit", speed: "Geschwindigkeit", temperature: "Temperatur", pressure: "Druck", energy: "Energie", power: "Leistung", digital: "Digitaler Speicher", angle: "Winkel" },
      hero: {
        h1: "Ein Einheitenrechner, der alles auf einmal zeigt",
        lead: "Zahl eingeben, Ausgangseinheit auswählen – und Sie sehen das Ergebnis sofort in allen anderen Einheiten dieser Kategorie, ohne sich durch Dropdowns zu klicken. Gemacht für alle, die öfter als einmal pro Woche umrechnen müssen: Physikstudierende, Hobbyköche mit einem US-Rezept, oder wer einen Bauplan in Zoll bekommt und in Zentimetern weiterarbeitet."
      },
      article: {
        heading: "Wie Einheitenumrechnung wirklich funktioniert",
        intro: "Jede Messung ist letztlich eine Zahl auf einer bestimmten Skala. Einheiten umzurechnen heißt, dieselbe physikalische Größe – eine Länge, eine Masse, eine Temperatur – auf einer anderen Skala auszudrücken. Das ist einfach, wenn beide Skalen ein festes Verhältnis teilen (eine Meile sind immer 1,609344 Kilometer), und wird kniffliger, wenn die Skalen keinen gemeinsamen Nullpunkt haben – genau das ist bei Temperatur der Fall.",
        sections: [
          {
            title: "Länge und Entfernung",
            body: "Längenumrechnungen werden am häufigsten gesucht – vor allem, weil die USA (zusammen mit Liberia und Myanmar) beim imperialen System geblieben sind, während fast der Rest der Welt metrisch misst. Rezepte, Straßenschilder und Körpergrößen stoßen ständig darauf.",
            list: [
              "1 Meile = 1,609344 Kilometer (exakt, international festgelegt seit 1959)",
              "1 Fuß = 12 Zoll = 0,3048 Meter",
              "1 Meter = 100 Zentimeter = 1.000 Millimeter"
            ]
          },
          {
            title: "Masse und Gewicht",
            body: "Im Alltag werden Kilogramm und Pfund oft synonym benutzt, auch wenn Masse und Gewicht physikalisch nicht dasselbe sind. Für den täglichen Gebrauch zählt das hier:",
            list: [
              "1 Kilogramm = 2,20462 Pfund",
              "1 Pfund (lb) = 16 Unzen = 0,453592 Kilogramm",
              "1 Stone = 14 Pfund = 6,35 Kilogramm — in Großbritannien und Irland noch immer die übliche Angabe fürs Körpergewicht"
            ]
          },
          {
            title: "Temperatur – Formeln statt Verhältnisse",
            body: "Das ist die einzige Kategorie, bei der reines Multiplizieren nicht reicht. Celsius, Fahrenheit und Kelvin teilen sich keinen Nullpunkt, daher braucht die Umrechnung zusätzlich zu einem Verhältnis auch eine Verschiebung.",
            list: [
              "°F = (°C × 9⁄5) + 32",
              "°C = (°F − 32) × 5⁄9",
              "K = °C + 273,15 — Kelvin kennt keine negativen Werte; 0 K ist der absolute Nullpunkt"
            ]
          },
          {
            title: "Digitaler Speicher – Dezimal vs. Binär, und warum die Festplatte “lügt”",
            body: "Das ist die Umrechnung, die wirklich für Verwirrung sorgt, und das liegt nicht an Ihnen – die Branche nutzt zwei verschiedene Definitionen für dieselben Vorsilben. Speicherhersteller (und das SI-System) definieren ein Kilobyte als 1.000 Byte. Betriebssysteme zeigen ein Kilobyte traditionell als 1.024 Byte an, weil Computer binär zählen und 1.024 (2¹⁰) dort eine runde Zahl ist. Deshalb taucht eine als “1 TB” verkaufte Festplatte unter Windows mit etwa 931 GB auf. Um die Verwirrung zu vermeiden, enthält dieses Tool beide Definitionen: KB/MB/GB/TB dezimal, KiB/MiB/GiB/TiB binär.",
            list: [
              "1 Kilobyte (KB) = 1.000 Byte — 1 Kibibyte (KiB) = 1.024 Byte",
              "1 Gigabyte (GB) = 1.000.000.000 Byte — 1 Gibibyte (GiB) = 1.073.741.824 Byte",
              "1 GB ≈ 0,931 GiB — deshalb wirkt Speicherplatz nach dem Formatieren immer kleiner"
            ]
          },
          {
            title: "Volumen und Küchenmaße",
            body: "Rezeptumrechnungen sind ein eigenes Kapitel, weil “eine Tasse” nicht überall gleich groß ist und Esslöffel/Teelöffel mitten im Rezept leicht verwechselt werden. Die Werte hier folgen den in den USA üblichen Maßen, dem Standard auf den meisten englischsprachigen Rezeptseiten.",
            list: [
              "1 US-Cup = 16 Esslöffel = 48 Teelöffel ≈ 236,59 mL (auf Nährwertangaben meist auf 240 mL gerundet)",
              "1 US-Esslöffel = 3 Teelöffel ≈ 14,79 mL",
              "1 US-Gallone = 3,785 Liter — eine britische (imperiale) Gallone ist mit 4,546 Litern rund 20 % größer"
            ]
          }
        ],
        categoriesNote: "Das Tool oben deckt all das ab, dazu Geschwindigkeit, Druck, Energie, Leistung und Winkel – insgesamt elf Kategorien, weitere kommen dazu, wenn es sinnvoll ist.",
        faqHeading: "Häufig gestellte Fragen"
      },
      faq: [
        { q: "Wie viele Kilometer sind eine Meile?", a: "Genau 1,609344 Kilometer. Das ist die international vereinbarte Definition seit 1959, als englischsprachige Länder die Meile auf exakt 5.280 Fuß festgelegt haben." },
        { q: "Warum verwenden die USA immer noch Fahrenheit?", a: "Vor allem aus historischen Gründen. Fahrenheit war bis Mitte des 20. Jahrhunderts im gesamten britischen Empire Standard; fast überall sonst wechselte man im Zuge der Umstellung aufs metrische System zu Celsius, aber die Alltagsmessungen in den USA wurden nie vollständig umgestellt." },
        { q: "Ist eine US-Gallone dasselbe wie eine britische Gallone?", a: "Nein — eine britische (imperiale) Gallone hat 4,546 Liter, etwa 20 % mehr als eine US-Gallone mit 3,785 Litern. Rezepte und Verbrauchsangaben aus Großbritannien müssen separat umgerechnet werden, wenn man an die US-Gallone gewöhnt ist." },
        { q: "Was ist der Unterschied zwischen einem Gigabyte und einem Gibibyte?", a: "Ein Gigabyte (GB) sind 1.000.000.000 Byte nach der dezimalen Definition, die die meisten Hersteller verwenden. Ein Gibibyte (GiB) sind 1.073.741.824 Byte, die binäre Definition, die das Betriebssystem oft stattdessen nutzt. Beide Werte liegen nah beieinander, sind aber nicht identisch – deshalb scheint Speicherplatz nach dem Formatieren immer “kleiner” zu werden." },
        { q: "Warum reicht bei Temperatur nicht einfach eine Multiplikation wie bei anderen Einheiten?", a: "Weil Celsius und Fahrenheit nicht beim selben Nullpunkt anfangen. Längen- und Masseumrechnungen sind reine Verhältnisse – man multipliziert mit einer Konstante –, aber Temperaturskalen sind zusätzlich gegeneinander verschoben, daher braucht die Formel sowohl eine Multiplikation als auch eine Addition." },
        { q: "Sind die Ergebnisse auf dieser Seite exakt?", a: "Wo ein Umrechnungsfaktor exakt definiert ist – Zoll zu Zentimeter oder Celsius zu Kelvin – ja. Wo das nicht der Fall ist, etwa bei der US-Cup-Größe, die je nach Quelle leicht variiert, verwenden wir den am weitesten verbreiteten Wert und vermerken das im Leitfaden oben." }
      ],
      footer: { rights: "Alle Rechte vorbehalten." }
    },

    pt: {
      dir: "ltr",
      meta: {
        title: "Conversor de Unidades Universal – Converta Comprimento, Massa, Volume, Temperatura e Mais",
        description: "Conversor de unidades gratuito e online: comprimento, massa, volume, tempo, velocidade, temperatura, pressão, energia, potência, armazenamento digital e ângulos. Resultados instantâneos, sem cadastro."
      },
      nav: { home: "Início", about: "Sobre Nós", contact: "Contato", privacy: "Privacidade", terms: "Termos", lang: "Idioma" },
      ui: {
        fromTitle: "De",
        resultsTitle: "Resultados da Conversão",
        quickAccessTitle: "Unidades de Acesso Rápido",
        searchPlaceholder: "Pesquisar unidades...",
        inputAria: "Valor a converter",
        noscript: "Ative o JavaScript no seu navegador para converter comprimentos, pesos, volumes, temperaturas e muito mais em tempo real.",
        copied: "Copiado!"
      },
      categories: { length: "Comprimento", mass: "Massa", volume: "Volume", time: "Tempo", speed: "Velocidade", temperature: "Temperatura", pressure: "Pressão", energy: "Energia", power: "Potência", digital: "Armazenamento Digital", angle: "Ângulo" },
      hero: {
        h1: "Um conversor de unidades que mostra tudo de uma vez",
        lead: "Digite um número, escolha a unidade de origem e veja o resultado em todas as outras unidades da categoria ao mesmo tempo — sem precisar abrir um menu suspenso de cada vez. Feito para quem converte unidades mais de uma vez por semana: estudantes de física, quem segue uma receita em xícaras americanas, ou quem recebe uma planta em polegadas e trabalha em centímetros."
      },
      article: {
        heading: "Como funciona de verdade a conversão de unidades",
        intro: "Toda medida é um número associado a uma escala. Converter unidades significa expressar a mesma grandeza física — um comprimento, uma massa, uma temperatura — em outra escala. É simples quando as duas escalas mantêm uma proporção fixa (uma milha é sempre 1,609344 quilômetro), e complica quando as escalas não começam no mesmo ponto zero, que é exatamente o caso da temperatura.",
        sections: [
          {
            title: "Comprimento e distância",
            body: "As conversões de comprimento são as mais buscadas, principalmente porque os Estados Unidos (junto com Libéria e Mianmar) continuam usando o sistema imperial enquanto quase todo o resto do mundo usa o métrico. Receitas, placas de trânsito e alturas esbarram nisso o tempo todo.",
            list: [
              "1 milha = 1,609344 quilômetro (valor exato, acordado internacionalmente desde 1959)",
              "1 pé = 12 polegadas = 0,3048 metro",
              "1 metro = 100 centímetros = 1.000 milímetros"
            ]
          },
          {
            title: "Massa e peso",
            body: "No dia a dia, quilogramas e libras acabam usados como sinônimos, mesmo que massa e peso não sejam tecnicamente a mesma coisa. Para o uso comum, o que importa é isto:",
            list: [
              "1 quilograma = 2,20462 libras",
              "1 libra = 16 onças = 0,453592 quilograma",
              "1 stone = 14 libras = 6,35 quilogramas — ainda é assim que Reino Unido e Irlanda falam de peso corporal"
            ]
          },
          {
            title: "Temperatura: fórmulas, não proporções",
            body: "Esta é a única categoria em que não basta multiplicar. Celsius, Fahrenheit e Kelvin não compartilham um ponto zero, então a conversão precisa de um deslocamento além de uma proporção.",
            list: [
              "°F = (°C × 9⁄5) + 32",
              "°C = (°F − 32) × 5⁄9",
              "K = °C + 273,15 — Kelvin não tem números negativos; 0 K é o zero absoluto"
            ]
          },
          {
            title: "Armazenamento digital: decimal x binário, e por que o disco “mente”",
            body: "Esta é a conversão que realmente confunde, e a culpa não é sua: a indústria usa duas definições diferentes para os mesmos prefixos. Os fabricantes de armazenamento (e o sistema SI) definem um kilobyte como 1.000 bytes. Os sistemas operacionais historicamente mostram um kilobyte como 1.024 bytes, porque computadores contam em binário e 1.024 (2¹⁰) é um número redondo nesse sistema. Por isso um disco vendido como “1 TB” aparece como uns 931 GB no Windows. Para evitar a confusão, esta ferramenta traz as duas: KB/MB/GB/TB para a definição decimal e KiB/MiB/GiB/TiB para a binária.",
            list: [
              "1 kilobyte (KB) = 1.000 bytes — 1 kibibyte (KiB) = 1.024 bytes",
              "1 gigabyte (GB) = 1.000.000.000 bytes — 1 gibibyte (GiB) = 1.073.741.824 bytes",
              "1 GB ≈ 0,931 GiB, por isso o armazenamento sempre parece “menor” depois de formatado"
            ]
          },
          {
            title: "Volume e medidas de cozinha",
            body: "Conversões de receita têm sua própria complicação, porque “uma xícara” não tem o mesmo tamanho em todo lugar, e colheres de sopa/chá são fáceis de trocar no meio da receita. Os valores aqui usam medidas americanas, padrão na maioria dos sites de receita em inglês.",
            list: [
              "1 xícara (US) = 16 colheres de sopa = 48 colheres de chá ≈ 236,59 mL (arredondado para 240 mL nos rótulos nutricionais)",
              "1 colher de sopa (US) = 3 colheres de chá ≈ 14,79 mL",
              "1 galão (US) = 3,785 litros — um galão imperial (Reino Unido) é cerca de 20% maior, com 4,546 litros"
            ]
          }
        ],
        categoriesNote: "A ferramenta acima cobre tudo isso, além de Velocidade, Pressão, Energia, Potência e Ângulo — onze categorias no total, com mais sendo adicionadas quando faz sentido.",
        faqHeading: "Perguntas frequentes"
      },
      faq: [
        { q: "Quantos quilômetros tem uma milha?", a: "Exatamente 1,609344 quilômetro. É a definição acordada internacionalmente desde 1959, quando os países de língua inglesa fixaram a milha em exatamente 5.280 pés." },
        { q: "Por que os Estados Unidos ainda usam Fahrenheit?", a: "Principalmente por motivos históricos. Fahrenheit era o padrão em todo o Império Britânico até meados do século 20; quase todo o resto do mundo migrou para Celsius junto com a adoção mais ampla do sistema métrico, mas as medidas do dia a dia nos EUA nunca foram totalmente convertidas." },
        { q: "Um galão americano é igual a um galão britânico?", a: "Não — um galão imperial (Reino Unido) tem 4,546 litros, cerca de 20% a mais que um galão americano, de 3,785 litros. Receitas e dados de consumo de combustível do Reino Unido precisam de conversão separada se você está acostumado ao galão americano." },
        { q: "Qual é a diferença entre gigabyte e gibibyte?", a: "Um gigabyte (GB) equivale a 1.000.000.000 bytes na definição decimal usada pela maioria dos fabricantes. Um gibibyte (GiB) equivale a 1.073.741.824 bytes, a definição binária que o sistema operacional costuma usar. Os valores são próximos, mas não idênticos — por isso o armazenamento parece sempre “perder” capacidade depois de formatado." },
        { q: "Por que não basta multiplicar para converter temperatura, como em outras unidades?", a: "Porque Celsius e Fahrenheit não começam no mesmo zero. Conversões de comprimento e massa são proporções puras — multiplica-se por uma constante —, mas as escalas de temperatura também estão deslocadas entre si, então a fórmula precisa de uma multiplicação e de uma soma." },
        { q: "Os resultados desta página são exatos?", a: "Onde um fator de conversão é definido de forma exata — polegadas para centímetros, ou Celsius para Kelvin — sim. Onde não é, como o tamanho da xícara americana, que varia um pouco conforme a fonte, usamos o valor mais aceito e indicamos isso no guia acima." }
      ],
      footer: { rights: "Todos os direitos reservados." }
    },

    it: {
      dir: "ltr",
      meta: {
        title: "Convertitore di Unità Universale – Converti Lunghezza, Massa, Volume, Temperatura e Altro",
        description: "Convertitore di unità gratuito e online: lunghezza, massa, volume, tempo, velocità, temperatura, pressione, energia, potenza, archiviazione digitale e angoli. Risultati istantanei, senza registrazione."
      },
      nav: { home: "Home", about: "Chi Siamo", contact: "Contatti", privacy: "Privacy", terms: "Termini", lang: "Lingua" },
      ui: {
        fromTitle: "Da",
        resultsTitle: "Risultati della Conversione",
        quickAccessTitle: "Unità di Accesso Rapido",
        searchPlaceholder: "Cerca unità...",
        inputAria: "Valore da convertire",
        noscript: "Attiva JavaScript nel tuo browser per convertire lunghezze, pesi, volumi, temperature e altro in tempo reale.",
        copied: "Copiato!"
      },
      categories: { length: "Lunghezza", mass: "Massa", volume: "Volume", time: "Tempo", speed: "Velocità", temperature: "Temperatura", pressure: "Pressione", energy: "Energia", power: "Potenza", digital: "Archiviazione Digitale", angle: "Angolo" },
      hero: {
        h1: "Un convertitore di unità che mostra tutto insieme",
        lead: "Digita un numero, scegli l'unità di partenza e vedi subito il risultato in tutte le altre unità della categoria — senza aprire un menu a tendina alla volta. Pensato per chi converte unità più di una volta a settimana: studenti di fisica, chi segue una ricetta in tazze americane, o chi riceve un disegno in pollici e lavora in centimetri."
      },
      article: {
        heading: "Come funziona davvero la conversione delle unità",
        intro: "Ogni misura è un numero legato a una scala. Convertire le unità significa esprimere la stessa grandezza fisica — una lunghezza, una massa, una temperatura — su una scala diversa. È semplice quando le due scale condividono un rapporto fisso (un miglio corrisponde sempre a 1,609344 chilometri), e si complica quando le scale non partono dallo stesso punto zero, esattamente ciò che accade con la temperatura.",
        sections: [
          {
            title: "Lunghezza e distanza",
            body: "Le conversioni di lunghezza sono le più cercate, soprattutto perché gli Stati Uniti (insieme a Liberia e Myanmar) usano ancora il sistema imperiale mentre quasi tutto il resto del mondo è passato al metrico. Ricette, cartelli stradali e altezze ci sbattono contro di continuo.",
            list: [
              "1 miglio = 1,609344 chilometri (valore esatto, stabilito per accordo internazionale dal 1959)",
              "1 piede = 12 pollici = 0,3048 metri",
              "1 metro = 100 centimetri = 1.000 millimetri"
            ]
          },
          {
            title: "Massa e peso",
            body: "Nel linguaggio comune, chilogrammi e libbre vengono usati come sinonimi, anche se massa e peso non sono tecnicamente la stessa cosa. Per l'uso quotidiano, ecco cosa conta:",
            list: [
              "1 chilogrammo = 2,20462 libbre",
              "1 libbra = 16 once = 0,453592 chilogrammi",
              "1 stone = 14 libbre = 6,35 chilogrammi — nel Regno Unito e in Irlanda si usa ancora per il peso corporeo"
            ]
          },
          {
            title: "Temperatura: formule, non proporzioni",
            body: "Questa è l'unica categoria in cui non basta moltiplicare. Celsius, Fahrenheit e Kelvin non condividono lo stesso punto zero, quindi la conversione richiede uno scarto oltre a un rapporto.",
            list: [
              "°F = (°C × 9⁄5) + 32",
              "°C = (°F − 32) × 5⁄9",
              "K = °C + 273,15 — il Kelvin non ha numeri negativi; 0 K è lo zero assoluto"
            ]
          },
          {
            title: "Archiviazione digitale: decimale o binario, e perché il tuo disco “mente”",
            body: "Questa è la conversione che confonde davvero, e non è colpa di nessuno: il settore usa due definizioni diverse per gli stessi prefissi. I produttori di storage (e il sistema SI) definiscono un kilobyte come 1.000 byte. I sistemi operativi hanno storicamente mostrato un kilobyte come 1.024 byte, perché i computer contano in binario e 1.024 (2¹⁰) lì è un numero tondo. Per questo un disco venduto come “1 TB” appare come circa 931 GB su Windows. Per evitare confusione, questo strumento include entrambe: KB/MB/GB/TB per la definizione decimale e KiB/MiB/GiB/TiB per quella binaria.",
            list: [
              "1 kilobyte (KB) = 1.000 byte — 1 kibibyte (KiB) = 1.024 byte",
              "1 gigabyte (GB) = 1.000.000.000 byte — 1 gibibyte (GiB) = 1.073.741.824 byte",
              "1 GB ≈ 0,931 GiB: ecco perché lo spazio di archiviazione sembra sempre “ridursi” dopo la formattazione"
            ]
          },
          {
            title: "Volume e misure da cucina",
            body: "Le conversioni per le ricette hanno un problema tutto loro: “una tazza” non misura lo stesso ovunque, e cucchiai/cucchiaini si confondono facilmente a metà ricetta. I valori qui usano le misure statunitensi, lo standard sulla maggior parte dei siti di ricette in inglese.",
            list: [
              "1 tazza (US) = 16 cucchiai = 48 cucchiaini ≈ 236,59 mL (arrotondato a 240 mL sulle etichette nutrizionali)",
              "1 cucchiaio (US) = 3 cucchiaini ≈ 14,79 mL",
              "1 gallone (US) = 3,785 litri — un gallone imperiale (Regno Unito) è circa il 20% più grande, con 4,546 litri"
            ]
          }
        ],
        categoriesNote: "Lo strumento qui sopra copre tutto questo, più Velocità, Pressione, Energia, Potenza e Angolo — undici categorie in totale, con altre aggiunte quando ha senso farlo.",
        faqHeading: "Domande frequenti"
      },
      faq: [
        { q: "Quanti chilometri ci sono in un miglio?", a: "Esattamente 1,609344 chilometri. È la definizione concordata a livello internazionale dal 1959, quando i paesi anglofoni hanno fissato il miglio a esattamente 5.280 piedi." },
        { q: "Perché gli Stati Uniti usano ancora i Fahrenheit?", a: "Soprattutto per motivi storici. Il Fahrenheit era lo standard in tutto l'Impero Britannico fino alla metà del XX secolo; quasi ovunque altrove si è passati ai Celsius insieme all'adozione più ampia del sistema metrico, ma le misure quotidiane negli Stati Uniti non sono mai state convertite del tutto." },
        { q: "Un gallone americano è uguale a un gallone britannico?", a: "No — un gallone imperiale (Regno Unito) è di 4,546 litri, circa il 20% in più rispetto a un gallone americano da 3,785 litri. Ricette e dati sui consumi provenienti dal Regno Unito vanno convertiti a parte se sei abituato al gallone americano." },
        { q: "Qual è la differenza tra un gigabyte e un gibibyte?", a: "Un gigabyte (GB) corrisponde a 1.000.000.000 byte secondo la definizione decimale usata dalla maggior parte dei produttori. Un gibibyte (GiB) corrisponde a 1.073.741.824 byte, la definizione binaria spesso usata dal sistema operativo. I due valori sono vicini ma non identici — per questo lo spazio di archiviazione sembra sempre “ridursi” dopo la formattazione." },
        { q: "Perché per la temperatura non basta moltiplicare come per le altre unità?", a: "Perché Celsius e Fahrenheit non partono dallo stesso zero. Le conversioni di lunghezza e massa sono proporzioni pure — si moltiplica per una costante — ma le scale di temperatura sono anche sfalsate tra loro, quindi la formula richiede sia una moltiplicazione sia un'addizione." },
        { q: "I risultati di questa pagina sono esatti?", a: "Dove un fattore di conversione è definito in modo esatto — pollici in centimetri, o Celsius in Kelvin — sì. Dove non lo è, come per la tazza statunitense che varia leggermente a seconda della fonte, usiamo il valore più diffuso e lo segnaliamo nella guida qui sopra." }
      ],
      footer: { rights: "Tutti i diritti riservati." }
    },

    ja: {
      dir: "ltr",
      meta: {
        title: "万能単位変換ツール – 長さ・質量・体積・温度をすぐ変換",
        description: "長さ、質量、体積、時間、速度、温度、圧力、エネルギー、仕事率、デジタルストレージ、角度を変換できる無料のオンライン単位変換ツール。登録不要、結果はすぐに表示されます。"
      },
      nav: { home: "ホーム", about: "概要", contact: "お問い合わせ", privacy: "プライバシーポリシー", terms: "利用規約", lang: "言語" },
      ui: {
        fromTitle: "変換元",
        resultsTitle: "変換結果",
        quickAccessTitle: "クイックアクセス単位",
        searchPlaceholder: "単位を検索...",
        inputAria: "変換する数値",
        noscript: "長さ、重さ、体積、温度などをリアルタイムで変換するには、ブラウザでJavaScriptを有効にしてください。",
        copied: "コピーしました"
      },
      categories: { length: "長さ", mass: "質量", volume: "体積", time: "時間", speed: "速度", temperature: "温度", pressure: "圧力", energy: "エネルギー", power: "仕事率", digital: "デジタルストレージ", angle: "角度" },
      hero: {
        h1: "すべての単位を一度に表示する変換ツール",
        lead: "数値を入力し、変換元の単位を選ぶだけで、そのカテゴリー内のすべての単位への変換結果を同時に確認できます。プルダウンメニューを何度も開き直す必要はありません。物理の宿題をする学生、インチ表記の図面をセンチで扱う人、週に何度も単位変換をする人のために作りました。"
      },
      article: {
        heading: "単位換算のしくみ",
        intro: "あらゆる測定値は、あるスケール上の数値にすぎません。単位を変換するとは、長さ・質量・温度といった同じ物理量を、別のスケールで表し直すことです。両方のスケールが一定の比率を保っている場合は単純です(1マイルは常に1.609344キロメートル)。しかし温度のように、スケール同士の基準点(ゼロ)がずれている場合は少し複雑になります。",
        sections: [
          {
            title: "長さ・距離",
            body: "長さの変換は最も検索されるカテゴリーです。アメリカ(そしてリベリアとミャンマー)がヤード・ポンド法を使い続けている一方、他のほとんどの国はメートル法を使っているためです。レシピ、道路標識、身長の表記などで頻繁にぶつかります。",
            list: [
              "1マイル = 1.609344キロメートル(1959年の国際協定による正確な値)",
              "1フィート = 12インチ = 0.3048メートル",
              "1メートル = 100センチメートル = 1,000ミリメートル"
            ]
          },
          {
            title: "質量・重さ",
            body: "日常会話ではキログラムとポンドが同じ感覚で使われますが、厳密には質量と重さは異なる概念です。日常使いで押さえておきたいのは次の点です。",
            list: [
              "1キログラム = 2.20462ポンド",
              "1ポンド = 16オンス = 0.453592キログラム",
              "1ストーン = 14ポンド = 6.35キログラム — イギリスとアイルランドでは今も体重表記に使われます"
            ]
          },
          {
            title: "温度 — 比例ではなく計算式",
            body: "温度だけは単純な掛け算では変換できません。摂氏・華氏・ケルビンは基準点(ゼロ)が異なるため、比率に加えてズレの補正が必要です。",
            list: [
              "°F = (°C × 9⁄5) + 32",
              "°C = (°F − 32) × 5⁄9",
              "K = °C + 273.15 — ケルビンに負の数はなく、0Kが絶対零度です"
            ]
          },
          {
            title: "デジタルストレージ — 10進数と2進数、ストレージ容量が「減る」理由",
            body: "これは本当に多くの人を混乱させる変換で、ユーザーのせいではありません。業界内で同じ接頭辞に2つの異なる定義が使われているのが原因です。ストレージメーカー(およびSI単位系)は1キロバイトを1,000バイトと定義します。一方OSは伝統的に1キロバイトを1,024バイトとして表示してきました。コンピューターは2進数で数えるため、1,024(2の10乗)がキリの良い数字になるからです。「1TB」として販売されたドライブがWindows上で約931GBと表示されるのはこのためです。この混乱を避けるため、本ツールでは10進数のKB/MB/GB/TBと、2進数のKiB/MiB/GiB/TiBの両方を用意しています。",
            list: [
              "1キロバイト(KB) = 1,000バイト — 1キビバイト(KiB) = 1,024バイト",
              "1ギガバイト(GB) = 1,000,000,000バイト — 1ギビバイト(GiB) = 1,073,741,824バイト",
              "1GB ≈ 0.931GiB — フォーマット後にストレージが「減って見える」のはこのためです"
            ]
          },
          {
            title: "体積・料理の単位",
            body: "レシピの単位変換には独特の難しさがあります。「1カップ」の大きさは国によって異なり、大さじ・小さじもレシピの途中で混同しがちです。ここではアメリカのレシピサイトが標準として使う米国式の計量を基準にしています。",
            list: [
              "1カップ(米国式) = 大さじ16杯 = 小さじ48杯 ≈ 236.59mL(栄養成分表示では240mLに丸められることが多い)",
              "1大さじ(米国式) = 小さじ3杯 ≈ 14.79mL",
              "1ガロン(米国式) = 3.785リットル — 英国式(インペリアル)ガロンは約20%大きく4.546リットル"
            ]
          }
        ],
        categoriesNote: "上記のツールでは、これらに加えて速度・圧力・エネルギー・仕事率・角度も扱っており、合計11カテゴリーです。必要に応じて今後も追加していきます。",
        faqHeading: "よくある質問"
      },
      faq: [
        { q: "1マイルは何キロメートルですか?", a: "正確に1.609344キロメートルです。1959年に英語圏の国々がマイルを正確に5,280フィートと定めて以来、国際的に合意されている定義です。" },
        { q: "なぜアメリカは今も華氏を使っているのですか?", a: "主に歴史的な理由です。20世紀半ばまで華氏は大英帝国全体の標準でした。他のほとんどの国はメートル法への移行とともに摂氏へ切り替えましたが、アメリカの日常的な計量は完全には転換されませんでした。" },
        { q: "米ガロンと英ガロンは同じですか?", a: "いいえ。英国式(インペリアル)ガロンは4.546リットルで、米ガロン(3.785リットル)よりも約20%大きくなっています。米ガロンに慣れている場合、英国のレシピや燃費表示は別途換算が必要です。" },
        { q: "ギガバイトとギビバイトの違いは何ですか?", a: "ギガバイト(GB)は、多くのメーカーが使う10進数の定義で1,000,000,000バイトです。ギビバイト(GiB)はOSがよく使う2進数の定義で1,073,741,824バイトです。両者は近い値ですが同一ではないため、ストレージはフォーマット後にいつも「容量が減った」ように見えます。" },
        { q: "なぜ温度だけ他の単位のように掛け算だけで変換できないのですか?", a: "摂氏と華氏の基準点(ゼロ)が異なるためです。長さや質量の変換は定数を掛けるだけの単純な比例関係ですが、温度のスケールは互いにずれているため、掛け算に加えて足し算(オフセット補正)も必要になります。" },
        { q: "このページの変換結果は正確ですか?", a: "インチとセンチメートル、摂氏とケルビンのように換算係数が正確に定義されている場合は正確です。米国式カップのように出典によって多少値が異なる場合は、最も広く使われている値を採用し、上記のガイドにその旨を記載しています。" }
      ],
      footer: { rights: "All rights reserved." }
    }

  };

  var api = { I18N: I18N, LOCALES: LOCALES, DEFAULT_LOCALE: "en" };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    root.I18N = I18N;
    root.LOCALES = LOCALES;
  }
})(typeof window !== "undefined" ? window : globalThis);
