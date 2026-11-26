/* =====================================================================
   РЕЕСТР ИЗОБРАЖЕНИЙ САЙТА
   ---------------------------------------------------------------------
   Каждое изображение на сайте берётся отсюда по ключу (data-img="ключ").
   Чтобы заменить фото на своё — ДИЗАЙН И HTML МЕНЯТЬ НЕ НУЖНО:

     1. Положите файл в папку  assets/images/own/   (лучше .webp или .jpg,
        ширина 1600–2400 px для больших блоков, 1200 px для карточек).
     2. В нужной записи ниже замените строку src на путь к файлу, например:
          src: "assets/images/own/ceh-1.webp",
        и поставьте demo: false — значок «Демо-фото» исчезнет.
     3. При желании поправьте alt (описание для поисковиков и незрячих).

   demo: true    — временное демонстрационное фото из открытого источника
                   (Unsplash, бесплатная лицензия Unsplash License).
                   На сайте помечается как демонстрационное.
   render: true  — визуализация изделия, предоставленная компанией.
   pos           — точка кадрирования (object-position), например "50% 30%".
   ===================================================================== */
(function () {
  // Режим демо-фото: "remote" — грузить с CDN Unsplash (работает сразу);
  // "local" — из папки assets/images/demo/ (после запуска
  // tools/download-demo-images.sh, который скачивает их локально).
  var DEMO_MODE = "remote";

  function u(id) {
    // Unsplash отдаёт WebP/AVIF и нужный размер по параметрам
    return DEMO_MODE === "local"
      ? { local: "assets/images/demo/" + id + ".webp" }
      : { unsplash: "https://images.unsplash.com/photo-" + id };
  }

  function demo(id, alt, pos) {
    var o = u(id);
    o.demo = true; o.alt = alt; o.pos = pos || "50% 50%";
    o.credit = "https://images.unsplash.com/photo-" + id;
    o.id = id;
    return o;
  }
  function own(src, alt, pos, render) {
    return { src: src, alt: alt, pos: pos || "50% 50%", render: !!render, demo: false };
  }

  window.SITE_IMAGES = {
    /* ---------- ГЛАВНАЯ ---------- */
    hero: demo("1747085040719-55282cc206b9", {
      ru: "Производственный цех с мостовым краном и металлическими конструкциями",
      kk: "Көпір кранымен және металл конструкцияларымен өндірістік цех",
      en: "Production hall with an overhead crane and steel structures" }, "50% 45%"),
    darkRoof: demo("1757413962101-5b536be1b764", {
      ru: "Стальные фермы покрытия промышленного здания в перспективе",
      kk: "Өнеркәсіптік ғимарат жабынының болат фермалары",
      en: "Steel roof trusses of an industrial building in perspective" }),
    ctaSparks: demo("1784442201403-9bee7050144c", {
      ru: "Сварщик за работой, искры в тёмном цехе",
      kk: "Дәнекерлеуші жұмыста, қараңғы цехтағы ұшқындар",
      en: "Welder at work with sparks in a dark workshop" }),

    /* ---------- О КОМПАНИИ ---------- */
    aboutFactory: demo("1496247749665-49cf5b1022e9", {
      ru: "Интерьер крупного промышленного предприятия",
      kk: "Ірі өнеркәсіптік кәсіпорынның ішкі көрінісі",
      en: "Interior of a large industrial plant" }),
    aboutLine: demo("1720036236855-9a1a2e4d3f26", {
      ru: "Производственный участок с промышленным оборудованием",
      kk: "Өнеркәсіптік жабдығы бар өндірістік учаске",
      en: "Production area with industrial equipment" }),
    aboutHall: demo("1717386255773-1e3037c81788", {
      ru: "Современный производственный корпус",
      kk: "Заманауи өндірістік корпус",
      en: "Modern production building" }),

    /* ---------- ПРОДУКЦИЯ: демо-фото ---------- */
    frames: demo("1785257532053-34686f5c3e10", {
      ru: "Стальной каркас промышленного здания на этапе монтажа",
      kk: "Монтаж кезеңіндегі өнеркәсіптік ғимараттың болат қаңқасы",
      en: "Steel frame of an industrial building under erection" }),
    frames2: demo("1785227988608-b47fb703256f", {
      ru: "Металлический каркас здания на фоне неба",
      kk: "Аспан аясындағы ғимараттың металл қаңқасы",
      en: "Steel building frame against the sky" }),
    trusses: demo("1509024368907-57294758cfc5", {
      ru: "Пространственные стальные фермы",
      kk: "Кеңістіктік болат фермалар",
      en: "Space steel trusses" }),
    canopyFrame: demo("1785257272547-f8dd0b6aa3f5", {
      ru: "Монтаж большепролётного стального навеса",
      kk: "Үлкен аралықты болат қалқаның монтажы",
      en: "Erection of a long-span steel canopy" }),
    hangar: demo("1646801448400-a34a5a0e570d", {
      ru: "Ангар с арочной кровлей",
      kk: "Доға тәрізді шатыры бар ангар",
      en: "Hangar with an arched roof" }),
    hangar2: demo("1760921678729-9658c8b792bb", {
      ru: "Промышленное складское здание",
      kk: "Өнеркәсіптік қойма ғимараты",
      en: "Industrial warehouse building" }),
    beams: demo("1781157076377-3c17f8c365ee", {
      ru: "Стальные балки и колонны, болтовые узлы",
      kk: "Болат арқалықтар мен бағаналар, болт түйіндері",
      en: "Steel beams and columns with bolted joints" }, "50% 40%"),
    beamYellow: demo("1562590761-84a8fb108f23", {
      ru: "Жёлтая стальная балка крупным планом",
      kk: "Сары болат арқалық жақыннан",
      en: "Yellow steel beam close-up" }),
    industrial: demo("1724814884431-5f931c9620ae", {
      ru: "Промышленная металлоконструкция изнутри",
      kk: "Өнеркәсіптік металл конструкция ішінен",
      en: "Industrial steel structure from inside" }),
    finished: demo("1790625107279-295bba597873", {
      ru: "Готовый промышленный объект",
      kk: "Дайын өнеркәсіптік нысан",
      en: "Completed industrial facility" }),
    finished2: demo("1759310347467-578dfd846229", {
      ru: "Складской комплекс с воротами",
      kk: "Қақпалары бар қойма кешені",
      en: "Warehouse complex with gates" }),
    finished3: demo("1766793110924-98e05b48eadc", {
      ru: "Современное промышленное здание с воротами",
      kk: "Қақпасы бар заманауи өнеркәсіптік ғимарат",
      en: "Modern industrial building with a large door" }),

    /* ---------- ПРОЦЕССЫ ---------- */
    welding: demo("1455165814004-1126a7199f9b", {
      ru: "Сварщик в защитной маске выполняет сварку металла",
      kk: "Қорғаныс маскасындағы дәнекерлеуші металды дәнекерлеуде",
      en: "Welder in a protective helmet welding metal" }),
    welding2: demo("1504328345606-18bbc8c9d7d1", {
      ru: "Сварочные работы на производстве",
      kk: "Өндірістегі дәнекерлеу жұмыстары",
      en: "Welding work in production" }),
    welding3: demo("1531053326607-9d349096d887", {
      ru: "Сварка металлической детали",
      kk: "Металл бөлшекті дәнекерлеу",
      en: "Welding a steel part" }),
    welding4: demo("1683470157212-cd4005549fce", {
      ru: "Сборка и сварка металлоконструкции",
      kk: "Металл конструкцияны құрастыру және дәнекерлеу",
      en: "Assembly and welding of a steel structure" }),
    grinding: demo("1714504904786-b6732390b206", {
      ru: "Обработка металла болгаркой, сноп искр",
      kk: "Металды бұрыштық тегістегішпен өңдеу",
      en: "Metal grinding with a shower of sparks" }),
    laser: demo("1764114235896-034c8772de01", {
      ru: "Лазерная резка листового металла",
      kk: "Табақ металды лазермен кесу",
      en: "Laser cutting of sheet metal" }),
    laser2: demo("1764114235891-66ff86abaf87", {
      ru: "Станок лазерной резки металла",
      kk: "Металды лазермен кесу станогы",
      en: "Laser metal cutting machine" }),
    cutting: demo("1598302936625-6075fbd98dd7", {
      ru: "Резка стальной балки, искры",
      kk: "Болат арқалықты кесу, ұшқындар",
      en: "Cutting a steel beam with sparks" }),
    painting: demo("1792262149563-61afbcb52fb7", {
      ru: "Нанесение покрытия краскопультом",
      kk: "Бояу бүріккішпен жабын жағу",
      en: "Applying a coating with a spray gun" }),
    painting2: demo("1795165308718-2b2faf9dd0a1", {
      ru: "Краскопульт для антикоррозийной обработки",
      kk: "Коррозияға қарсы өңдеуге арналған бүріккіш",
      en: "Spray gun for anti-corrosion coating" }),
    montage: demo("1623489254637-a2dd8375243d", {
      ru: "Монтажник работает на металлоконструкции",
      kk: "Монтажшы металл конструкцияда жұмыс істеуде",
      en: "Erector working on a steel structure" }),
    montage2: demo("1726087167125-03c390694a03", {
      ru: "Строительная площадка с кранами",
      kk: "Крандары бар құрылыс алаңы",
      en: "Construction site with cranes" }),
    montage3: demo("1780147345952-7ed74e568388", {
      ru: "Возведение стального каркаса здания",
      kk: "Ғимараттың болат қаңқасын тұрғызу",
      en: "Erecting a steel building frame" }),
    drawing: demo("1721244654394-36a7bc2da288", {
      ru: "Инженерный чертёж многоэтажного здания",
      kk: "Көпқабатты ғимараттың инженерлік сызбасы",
      en: "Engineering drawing of a multi-storey building" }),
    drawing2: demo("1503387837-b154d5074bd2", {
      ru: "Инженер работает над чертежом",
      kk: "Инженер сызбамен жұмыс істеуде",
      en: "Engineer working on a drawing" }),
    drawing3: demo("1503387762-592deb58ef4e", {
      ru: "Проектирование: карандаш и линейка на чертеже",
      kk: "Жобалау: сызбадағы қарындаш пен сызғыш",
      en: "Design work: pencil and ruler on a drawing" }),

    /* ---------- ВИЗУАЛИЗАЦИИ ИЗДЕЛИЙ ASKAR TAU ELECTRO ---------- */
    pGateWood: own("assets/images/products/gate-wood-slats.webp", {
      ru: "Визуализация: откатные ворота с деревянными ламелями и логотипом",
      kk: "Визуализация: ағаш ламельдері бар сырғымалы қақпа",
      en: "Render: sliding gate with timber slats and logo" }, "50% 50%", true),
    pGateLaser: own("assets/images/products/gate-laser-pattern.webp", {
      ru: "Визуализация: ворота с лазерной резкой и фирменной табличкой",
      kk: "Визуализация: лазермен кесілген өрнегі бар қақпа",
      en: "Render: gate with laser-cut pattern and nameplate" }, "50% 50%", true),
    pStairs: own("assets/images/products/stairs-industrial.webp", {
      ru: "Визуализация: промышленная металлическая лестница с площадкой",
      kk: "Визуализация: алаңы бар өнеркәсіптік металл баспалдақ",
      en: "Render: industrial steel staircase with platform" }, "50% 50%", true),
    pStairsYellow: own("assets/images/products/stairs-yellow-treads.webp", {
      ru: "Визуализация: лестница с жёлтыми противоскользящими ступенями",
      kk: "Визуализация: сырғанауға қарсы сары басқыштары бар баспалдақ",
      en: "Render: staircase with yellow anti-slip treads" }, "50% 50%", true),
    pCabinetOpen: own("assets/images/products/electrical-cabinet-open.webp", {
      ru: "Визуализация: шкаф для электрооборудования, открытая дверь",
      kk: "Визуализация: электр жабдығына арналған шкаф",
      en: "Render: electrical equipment cabinet, door open" }, "50% 50%", true),
    pCabinetClosed: own("assets/images/products/electrical-cabinet-closed.webp", {
      ru: "Визуализация: металлический корпус электрошкафа с вентиляцией",
      kk: "Визуализация: желдеткіші бар электр шкафының металл корпусы",
      en: "Render: ventilated steel electrical enclosure" }, "50% 50%", true),
    pCanopyArch: own("assets/images/products/canopy-arched.webp", {
      ru: "Визуализация: арочный навес с поликарбонатом и скамьёй",
      kk: "Визуализация: поликарбонатты доға тәрізді қалқа",
      en: "Render: arched polycarbonate canopy with bench" }, "50% 50%", true),
    pCanopyFlat: own("assets/images/products/canopy-flat.webp", {
      ru: "Визуализация: металлический навес с профнастилом",
      kk: "Визуализация: профнастилді металл қалқа",
      en: "Render: steel canopy with profiled sheeting" }, "50% 50%", true),
    pAcOrnament: own("assets/images/products/ac-cover-ornament.webp", {
      ru: "Визуализация: декоративный экран для кондиционера с орнаментом",
      kk: "Визуализация: ою-өрнекті кондиционер экраны",
      en: "Render: decorative air-conditioner screen with ornament" }, "50% 55%", true),
    pAcRoof: own("assets/images/products/ac-cover-roof.webp", {
      ru: "Визуализация: защитный короб с крышей и ажурной резкой",
      kk: "Визуализация: шатыры бар ажурлы қорғаныс қорабы",
      en: "Render: protective enclosure with roof and fretwork" }, "50% 55%", true),
    pUrban: own("assets/images/products/urban-set-ornament.webp", {
      ru: "Визуализация: ворота, кашпо и урна с национальным орнаментом",
      kk: "Визуализация: ұлттық өрнекті қақпа, гүлсауыт және урна",
      en: "Render: gate, planter and bin with national ornament" }, "50% 50%", true)
  };
})();
