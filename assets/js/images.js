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
  function own(src, alt, pos, render, small) {
    return { src: src, small: small, alt: alt, pos: pos || "50% 50%", render: !!render, demo: false };
  }

  // собственные фото компании (цех и изделия): большой файл + копия 800 px, без значка
  function shop(path, alt, pos) {
    var b = "assets/images/" + path;
    return own(b + ".webp", alt, pos, false, b + "-800.webp");
  }
  // чертёж: превью для карточки + полный лист для просмотра
  function drawing(name, alt) {
    var b = "assets/images/drawings/" + name;
    var o = own(b + ".webp", alt, "50% 50%", false);
    o.full = b + "-full.webp"; o.drawing = true;
    return o;
  }
  // визуализация изделия компании: большой файл + уменьшенная копия 800 px
  function viz(name, alt, pos) {
    var b = "assets/images/products/" + name;
    return own(b + ".webp", alt, pos, true, b + "-800.webp");
  }

  window.SITE_IMAGES = {
    /* ---------- ГЛАВНАЯ ---------- */
    hero: shop("workshop/laser-1", {
      ru: "Станок лазерной резки металла в цехе ASKAR TAU ELECTRO",
      kk: "ASKAR TAU ELECTRO цехындағы металды лазермен кесу станогы",
      en: "Laser metal cutting machine in the ASKAR TAU ELECTRO workshop" }, "60% 55%"),
    darkRoof: demo("1757413962101-5b536be1b764", {
      ru: "Стальные фермы покрытия промышленного здания в перспективе",
      kk: "Өнеркәсіптік ғимарат жабынының болат фермалары",
      en: "Steel roof trusses of an industrial building in perspective" }),
    ctaSparks: demo("1784442201403-9bee7050144c", {
      ru: "Сварщик за работой, искры в тёмном цехе",
      kk: "Дәнекерлеуші жұмыста, қараңғы цехтағы ұшқындар",
      en: "Welder at work with sparks in a dark workshop" }),

    /* ---------- О КОМПАНИИ ---------- */
    aboutFactory: demo("1720036237334-9263cd28c3d4", {
      ru: "Производственный цех с оборудованием",
      kk: "Жабдықталған өндірістік цех",
      en: "Production workshop with equipment" }),
    aboutLine: demo("1720036237182-5e0adada1873", {
      ru: "Цех металлообработки",
      kk: "Металл өңдеу цехы",
      en: "Metalworking shop" }),
    aboutHall: demo("1608126841830-53832c4b326f", {
      ru: "Мастерская по изготовлению металлоконструкций",
      kk: "Металл конструкцияларын дайындау шеберханасы",
      en: "Steel fabrication workshop" }),

    /* ---------- ПРОДУКЦИЯ: демо-фото ---------- */
    frames: demo("1785257532053-34686f5c3e10", {
      ru: "Стальной каркас промышленного здания на этапе монтажа",
      kk: "Монтаж кезеңіндегі өнеркәсіптік ғимараттың болат қаңқасы",
      en: "Steel frame of an industrial building under erection" }),
    frames2: demo("1531435338678-4ef2b632e95d", {
      ru: "Арочные стальные балки покрытия",
      kk: "Жабынның доға тәрізді болат арқалықтары",
      en: "Arched steel roof beams" }),
    trusses: demo("1627922529156-41f27fb6f7ac", {
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
    industrial: demo("1609627016501-b862497c7294", {
      ru: "Решётчатая стальная конструкция крупным планом",
      kk: "Торлы болат конструкция жақыннан",
      en: "Lattice steel structure close-up" }),
    finished: demo("1565610222536-ef125c59da2e", {
      ru: "Готовое здание на стальном каркасе: пролёт с фермами покрытия",
      kk: "Болат қаңқалы дайын ғимарат: жабын фермалары бар аралық",
      en: "Finished steel-framed building: bay with roof trusses" }),
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
    welding2: demo("1608126841548-dfad1d420a0f", {
      ru: "Сварщик в маске работает в мастерской",
      kk: "Маскадағы дәнекерлеуші шеберханада жұмыс істеуде",
      en: "Welder in a helmet working in a workshop" }),
    welding3: demo("1569950044239-51ead24e2c48", {
      ru: "Сварка металлоконструкции в цехе, искры",
      kk: "Цехта металл конструкцияны дәнекерлеу, ұшқындар",
      en: "Welding a steel structure in the shop with sparks" }),
    welding4: demo("1608126842524-7e10c3b18453", {
      ru: "Сборка и сварка металлических секций",
      kk: "Металл секцияларды құрастыру және дәнекерлеу",
      en: "Assembling and welding steel panels" }),
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
    cutting: demo("1508465818649-14a170138405", {
      ru: "Резка металла, сноп искр",
      kk: "Металды кесу, ұшқындар",
      en: "Metal cutting with a shower of sparks" }),
    painting: demo("1734290173288-031bf53b7ccb", {
      ru: "Обработка поверхности металла перед покраской",
      kk: "Бояу алдында металл бетін өңдеу",
      en: "Metal surface treatment before painting" }),
    painting2: demo("1795165308718-2b2faf9dd0a1", {
      ru: "Краскопульт для антикоррозийной обработки",
      kk: "Коррозияға қарсы өңдеуге арналған бүріккіш",
      en: "Spray gun for anti-corrosion coating" }),
    montage: demo("1600965581129-eef8a214ec9d", {
      ru: "Монтажник на стальных балках на высоте",
      kk: "Биіктіктегі болат арқалықтардағы монтажшы",
      en: "Steel erector working on beams at height" }),
    montage2: demo("1616224952327-6240f31e5bdc", {
      ru: "Монтаж стального каркаса с подъёмника",
      kk: "Көтергіштен болат қаңқаны монтаждау",
      en: "Erecting a steel frame from a lift" }),
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

    montage4: demo("1614127938540-a1139bee1841", {
      ru: "Монтажники на металлической конструкции кровли",
      kk: "Шатырдың металл конструкциясындағы монтажшылар",
      en: "Erectors working on a steel roof structure" }),
    sparks2: demo("1582649831749-e2d634f55cf3", {
      ru: "Вспышка сварочной дуги в тёмном цехе",
      kk: "Қараңғы цехтағы дәнекерлеу доғасының жарқылы",
      en: "Welding arc flash in a dark workshop" }),
    warehouse: demo("1694885169342-909981fb408a", {
      ru: "Пролёт здания со стальными фермами покрытия",
      kk: "Болат жабын фермалары бар ғимарат аралығы",
      en: "Building bay with steel roof trusses" }),
    glassRoof: demo("1668886580919-ce45651f3ccf", {
      ru: "Стальные фермы светопрозрачной кровли",
      kk: "Мөлдір шатырдың болат фермалары",
      en: "Steel trusses of a glazed roof" }),

    /* ---------- ЦЕХ ASKAR TAU ELECTRO (собственные фото) ---------- */
    shopLaser1: shop("workshop/laser-1", {
      ru: "Станок лазерной резки металла в цехе ASKAR TAU ELECTRO", kk: "ASKAR TAU ELECTRO цехындағы металды лазермен кесу станогы", en: "Laser metal cutting machine in the ASKAR TAU ELECTRO workshop" }, "50% 55%"),
    shopLaser2: shop("workshop/laser-2", {
      ru: "Лазерная резка листового металла", kk: "Табақ металды лазермен кесу", en: "Laser cutting of sheet metal" }, "50% 55%"),
    shopLaser3: shop("workshop/laser-3", {
      ru: "Станок лазерной резки PROMAX", kk: "PROMAX лазерлік кесу станогы", en: "PROMAX laser cutting machine" }, "50% 55%"),
    shopLaser4: shop("workshop/laser-4", {
      ru: "Рабочий стол станка лазерной резки с листом металла", kk: "Металл табағы бар лазерлік кесу станогының үстелі", en: "Laser cutter table with a steel sheet" }, "50% 55%"),
    shopLaser5: shop("workshop/laser-5", {
      ru: "Станок лазерной резки и пульт оператора", kk: "Лазерлік кесу станогы және оператор пульті", en: "Laser cutter and operator console" }, "50% 55%"),
    shopPress: shop("workshop/press-brake", {
      ru: "Листогибочный пресс PROMAX 63/2500", kk: "PROMAX 63/2500 табақ иілу прессі", en: "PROMAX 63/2500 press brake" }, "50% 50%"),
    shopPowder: shop("workshop/powder-line", {
      ru: "Линия порошковой покраски и камера полимеризации", kk: "Ұнтақты бояу желісі және полимерлеу камерасы", en: "Powder coating line and curing oven" }, "50% 50%"),
    shopPressFront: shop("workshop/press-front", {
      ru: "Листогибочный пресс, вид спереди", kk: "Табақ иілу прессі, алдыңғы көрініс", en: "Press brake, front view" }, "50% 50%"),
    shopPressSide: shop("workshop/press-side", {
      ru: "Листогибочный пресс в цехе", kk: "Цехтағы табақ иілу прессі", en: "Press brake in the workshop" }, "50% 50%"),
    shopPressPanel: shop("workshop/press-panel", {
      ru: "Пульт управления листогибочного пресса", kk: "Табақ иілу прессінің басқару пульті", en: "Press brake control panel" }, "50% 40%"),
    shopPaintHangers: shop("workshop/paint-hangers", {
      ru: "Детали корпусов на подвесах линии покраски", kk: "Бояу желісінің ілгектеріндегі корпус бөлшектері", en: "Enclosure parts on the paint line hangers" }, "50% 50%"),
    shopPaintBoxes: shop("workshop/paint-boxes", {
      ru: "Корпуса шкафов перед порошковой покраской", kk: "Ұнтақты бояу алдындағы шкаф корпустары", en: "Cabinet bodies before powder coating" }, "50% 50%"),
    shopOven: shop("workshop/oven", {
      ru: "Камера полимеризации порошковой краски", kk: "Ұнтақты бояуды полимерлеу камерасы", en: "Powder coating curing oven" }, "50% 50%"),
    shopOvenPanel: shop("workshop/oven-panel", {
      ru: "Пульт управления камерой полимеризации", kk: "Полимерлеу камерасының басқару пульті", en: "Curing oven control panel" }, "50% 50%"),
    shopStock1: shop("workshop/stock-rack", {
      ru: "Стеллажи с металлом и заготовками", kk: "Металл мен дайындамалар сөрелері", en: "Racks with metal and blanks" }, "50% 50%"),
    shopStock2: shop("workshop/stock-sheets", {
      ru: "Склад листового металла", kk: "Табақ металл қоймасы", en: "Sheet metal storage" }, "50% 50%"),
    shopStock3: shop("workshop/stock-shelf", {
      ru: "Листовой металл на стеллаже", kk: "Сөредегі табақ металл", en: "Sheet metal on a rack" }, "50% 50%"),
    shopTables: shop("workshop/shop-tables", {
      ru: "Участок сборки в цехе", kk: "Цехтағы құрастыру учаскесі", en: "Assembly area in the workshop" }, "50% 50%"),
    shopHall: shop("workshop/shop-hall", {
      ru: "Производственный цех ASKAR TAU ELECTRO", kk: "ASKAR TAU ELECTRO өндірістік цехы", en: "ASKAR TAU ELECTRO production hall" }, "50% 50%"),
    shopAisle: shop("workshop/shop-aisle", {
      ru: "Цех: проход между участками", kk: "Цех: учаскелер арасындағы өткел", en: "Workshop aisle between work areas" }, "50% 50%"),
    shopCnc: shop("workshop/cnc-screen", {
      ru: "Программа раскроя на экране станка с ЧПУ", kk: "ЦБ станогының экранындағы пішу бағдарламасы", en: "Nesting program on the CNC screen" }, "50% 50%"),
    shopFinished: shop("workshop/finished-rack", {
      ru: "Готовые корпуса на складе", kk: "Қоймадағы дайын корпустар", en: "Finished enclosures in storage" }, "50% 50%"),
    shopLaserTable: shop("workshop/laser-table", {
      ru: "Раскрой листа на станке лазерной резки", kk: "Лазерлік кесу станогында табақты пішу", en: "Sheet nesting on the laser cutter" }, "50% 50%"),

    /* ---------- ИЗДЕЛИЯ (собственные фото) ---------- */
    pVentGrille: shop("products/vent-grille", {
      ru: "Вентиляционная решётка с овальной перфорацией", kk: "Сопақ тесіктері бар желдету торы", en: "Ventilation grille with slotted perforation" }),
    pHatch: shop("products/hatch-door", {
      ru: "Люк-дверца с замком и порошковым покрытием", kk: "Құлпы бар ұнтақты бояулы есік-люк", en: "Access hatch door with lock, powder coated" }),
    pEnclosureInner: shop("products/enclosure-inner-door", {
      ru: "Шкаф ШМП с внутренней дверью и уплотнителем", kk: "Ішкі есігі мен тығыздағышы бар ШМП шкафы", en: "Wall-mount enclosure with inner door and seal" }),
    pVruLegs: shop("products/vru-outdoor-legs", {
      ru: "Уличное ВРУ на опорах с амперметрами и автоматом", kk: "Амперметрлері мен автоматы бар тіректегі көшелік ВРУ", en: "Outdoor distribution board on legs with ammeters and breaker" }),
    pCabMeters: shop("products/cab-meter-windows", {
      ru: "Двухдверный шкаф с окнами под приборы учёта", kk: "Есептеу аспаптарына арналған терезелері бар екі есікті шкаф", en: "Two-door cabinet with meter windows" }),
    pCabGlass: shop("products/cab-glass-ammeters", {
      ru: "Щит с остеклённой дверью, амперметрами и сигнальными лампами", kk: "Шыны есігі, амперметрлері мен сигнал шамдары бар қалқан", en: "Panel with glazed door, ammeters and indicator lamps" }),

    /* ---------- ЧЕРТЕЖИ ---------- */
    dwVru12: drawing("vru12-1", {
      ru: "Чертёж: уличное ВРУ 900×500×800, 3D-сборка", kk: "Сызба: көшелік ВРУ 900×500×800, 3D жинақ", en: "Drawing: outdoor distribution board 900×500×800, 3D assembly" }),
    dwVru12b: drawing("vru12-2", {
      ru: "Чертёж: детали ВРУ с размерами", kk: "Сызба: өлшемдері бар ВРУ бөлшектері", en: "Drawing: distribution board parts with dimensions" }),
    dwLeg: drawing("vru12-3", {
      ru: "Чертёж: опора ВРУ — 3D-модель и развёртка", kk: "Сызба: ВРУ тірегі — 3D модель және жазба", en: "Drawing: board leg — 3D model and flat pattern" }),
    dwRoof: drawing("vru12-4", {
      ru: "Чертёж: крыша ВРУ — развёртка и гибка", kk: "Сызба: ВРУ шатыры — жазба және иілу", en: "Drawing: board roof — flat pattern and bends" }),
    dwVruAmp: drawing("vru-amp", {
      ru: "Чертёж: ВРУ 1700×800×500 с окнами под амперметры", kk: "Сызба: амперметр терезелері бар ВРУ 1700×800×500", en: "Drawing: distribution board 1700×800×500 with ammeter windows" }),
    dwShmp: drawing("shmp", {
      ru: "Чертёж: шкаф ШМП 800×450×250 IP54 с дополнительной дверью", kk: "Сызба: қосымша есігі бар ШМП 800×450×250 IP54 шкафы", en: "Drawing: enclosure 800×450×250 IP54 with inner door" }),
    dwHatch2: drawing("hatch-2door", {
      ru: "Чертёж: люк двустворчатый 1190×890×50", kk: "Сызба: екі жармалы люк 1190×890×50", en: "Drawing: double-leaf hatch 1190×890×50" }),
    dwHatchFire: drawing("hatch-fire", {
      ru: "Чертёж: люк встроенный для пожарного шкафа 1405×580", kk: "Сызба: өрт шкафына арналған кіріктірілген люк 1405×580", en: "Drawing: built-in hatch for a fire hose cabinet 1405×580" }),

    /* ---------- ЭЛЕКТРОШКАФЫ И ЛЕСТНИЦА (визуализации компании, высокое качество) ---------- */
    cabOpen4: viz("cab-open-4section", {
      ru: "Визуализация: шкаф для электрооборудования из четырёх секций, открытая дверь с автоматами",
      kk: "Визуализация: төрт секциялы электр шкафы, автоматтары бар ашық есік",
      en: "Render: four-section electrical cabinet with an open door showing breakers" }),
    cabOpen3: viz("cab-open-3section", {
      ru: "Визуализация: многосекционный электрошкаф с открытой секцией",
      kk: "Визуализация: ашық секциясы бар көпсекциялы электр шкафы",
      en: "Render: multi-section electrical cabinet with one section open" }),
    cabControl: viz("cab-control-panel", {
      ru: "Визуализация: шкаф управления с сенсорной панелью оператора и кнопками",
      kk: "Визуализация: оператор панелі мен батырмалары бар басқару шкафы",
      en: "Render: control cabinet with an operator touch panel and buttons" }),
    cab3door: viz("cab-3door", {
      ru: "Визуализация: трёхдверный напольный электрошкаф",
      kk: "Визуализация: үш есікті еденге қойылатын электр шкафы",
      en: "Render: three-door floor-standing electrical cabinet" }),
    cab2door: viz("cab-2door", {
      ru: "Визуализация: двухдверный электрошкаф с вентиляционными решётками",
      kk: "Визуализация: желдету торлары бар екі есікті электр шкафы",
      en: "Render: two-door electrical cabinet with ventilation grilles" }),
    cabLong: viz("cab-long-4door", {
      ru: "Визуализация: низкий четырёхдверный электрошкаф",
      kk: "Визуализация: аласа төрт есікті электр шкафы",
      en: "Render: low four-door electrical cabinet" }),
    cabEnclosure: viz("cab-ventilated-enclosure", {
      ru: "Визуализация: вентилируемый корпус для электрооборудования",
      kk: "Визуализация: электр жабдығына арналған желдетілетін корпус",
      en: "Render: ventilated enclosure for electrical equipment" }),
    cabSingle: viz("cab-single", {
      ru: "Визуализация: однодверный напольный электрошкаф",
      kk: "Визуализация: бір есікті еденге қойылатын электр шкафы",
      en: "Render: single-door floor-standing electrical cabinet" }),
    cabWall: viz("cab-wall", {
      ru: "Визуализация: настенный электрошкаф на колонне",
      kk: "Визуализация: бағанаға ілінген электр шкафы",
      en: "Render: wall-mounted electrical cabinet on a column" }),
    cabOutdoor: viz("cab-outdoor", {
      ru: "Визуализация: компактный уличный электрошкаф",
      kk: "Визуализация: шағын көшелік электр шкафы",
      en: "Render: compact outdoor electrical cabinet" }),
    pStairsPlatform: viz("stairs-platform", {
      ru: "Визуализация: металлическая лестница с площадкой и ограждениями",
      kk: "Визуализация: алаңы мен қоршаулары бар металл баспалдақ",
      en: "Render: steel staircase with platform and guardrails" }),

    /* ---------- ВИЗУАЛИЗАЦИИ ИЗДЕЛИЙ ASKAR TAU ELECTRO ---------- */
    pGateWood: own("assets/images/products/gate-wood-slats.webp", {
      ru: "Визуализация: откатные ворота с деревянными ламелями и логотипом",
      kk: "Визуализация: ағаш ламельдері бар сырғымалы қақпа",
      en: "Render: sliding gate with timber slats and logo" }, "50% 50%", true),
    pGateLaser: own("assets/images/products/gate-laser-pattern.webp", {
      ru: "Визуализация: ворота с лазерной резкой и фирменной табличкой",
      kk: "Визуализация: лазермен кесілген өрнегі бар қақпа",
      en: "Render: gate with laser-cut pattern and nameplate" }, "50% 50%", true),
    pStairsYellow: own("assets/images/products/stairs-yellow-treads.webp", {
      ru: "Визуализация: лестница с жёлтыми противоскользящими ступенями",
      kk: "Визуализация: сырғанауға қарсы сары басқыштары бар баспалдақ",
      en: "Render: staircase with yellow anti-slip treads" }, "50% 50%", true),
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
