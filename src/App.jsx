import { useState, useMemo, useCallback, useRef } from "react";

// ===================== DEFAULT CHART OF ACCOUNTS =====================

const podnikateliaOsnova = [
  // Účtová trieda 0 – Dlhodobý majetok
  { code: "012", name: "Aktivované náklady na vývoj", type: "suvahovy" },
  { code: "013", name: "Softvér", type: "suvahovy" },
  { code: "014", name: "Oceniteľné práva", type: "suvahovy" },
  { code: "015", name: "Goodwill", type: "suvahovy" },
  { code: "019", name: "Ostatný dlhodobý nehmotný majetok", type: "suvahovy" },
  { code: "021", name: "Stavby", type: "suvahovy" },
  { code: "022", name: "Samostatné hnuteľné veci a súbory hnuteľných vecí", type: "suvahovy" },
  { code: "025", name: "Pestovateľské celky trvalých porastov", type: "suvahovy" },
  { code: "026", name: "Základné stádo a ťažné zvieratá", type: "suvahovy" },
  { code: "029", name: "Ostatný dlhodobý hmotný majetok", type: "suvahovy" },
  { code: "031", name: "Pozemky", type: "suvahovy" },
  { code: "032", name: "Umelecké diela a zbierky", type: "suvahovy" },
  { code: "041", name: "Obstaranie dlhodobého nehmotného majetku", type: "suvahovy" },
  { code: "042", name: "Obstaranie dlhodobého hmotného majetku", type: "suvahovy" },
  { code: "043", name: "Obstaranie dlhodobého finančného majetku", type: "suvahovy" },
  { code: "051", name: "Poskytnuté preddavky na dlhodobý nehmotný majetok", type: "suvahovy" },
  { code: "052", name: "Poskytnuté preddavky na dlhodobý hmotný majetok", type: "suvahovy" },
  { code: "053", name: "Poskytnuté preddavky na dlhodobý finančný majetok", type: "suvahovy" },
  { code: "061", name: "Podielové cenné papiere a podiely v dcérskej účtovnej jednotke", type: "suvahovy" },
  { code: "062", name: "Podielové cenné papiere a podiely v spoločnosti alebo družstve s podielovou účasťou", type: "suvahovy" },
  { code: "063", name: "Realizovateľné cenné papiere a podiely", type: "suvahovy" },
  { code: "065", name: "Dlhové cenné papiere držané do splatnosti", type: "suvahovy" },
  { code: "066", name: "Pôžičky prepojeným účtovným jednotkám a účtovným jednotkám v rámci podielovej účasti", type: "suvahovy" },
  { code: "067", name: "Ostatné pôžičky", type: "suvahovy" },
  { code: "069", name: "Ostatný dlhodobý finančný majetok", type: "suvahovy" },
  { code: "072", name: "Oprávky k aktivovaným nákladom na vývoj", type: "suvahovy" },
  { code: "073", name: "Oprávky k softvéru", type: "suvahovy" },
  { code: "074", name: "Oprávky k oceniteľným právam", type: "suvahovy" },
  { code: "075", name: "Oprávky ku goodwillu", type: "suvahovy" },
  { code: "079", name: "Oprávky k ostatnému dlhodobému nehmotnému majetku", type: "suvahovy" },
  { code: "081", name: "Oprávky k stavbám", type: "suvahovy" },
  { code: "082", name: "Oprávky k samostatným hnuteľným veciam a k súboru hnuteľných vecí", type: "suvahovy" },
  { code: "085", name: "Oprávky k pestovateľským celkom trvalých porastov", type: "suvahovy" },
  { code: "086", name: "Oprávky k základnému stádu a ťažným zvieratám", type: "suvahovy" },
  { code: "089", name: "Oprávky k ostatnému dlhodobému hmotnému majetku", type: "suvahovy" },
  { code: "091", name: "Opravné položky k dlhodobému nehmotnému majetku", type: "suvahovy" },
  { code: "092", name: "Opravné položky k dlhodobému hmotnému majetku", type: "suvahovy" },
  { code: "093", name: "Opravné položky k nedokončenému dlhodobému nehmotnému majetku", type: "suvahovy" },
  { code: "094", name: "Opravné položky k nedokončenému dlhodobému hmotnému majetku", type: "suvahovy" },
  { code: "095", name: "Opravné položky k poskytnutým preddavkom na dlhodobý majetok", type: "suvahovy" },
  { code: "096", name: "Opravné položky k dlhodobému finančnému majetku", type: "suvahovy" },
  { code: "097", name: "Opravné položky k nadobudnutému majetku", type: "suvahovy" },
  { code: "098", name: "Oprávky k opravnej položke k nadobudnutému majetku", type: "suvahovy" },
  // Účtová trieda 1 – Zásoby
  { code: "111", name: "Obstaranie materiálu", type: "suvahovy" },
  { code: "112", name: "Materiál na sklade", type: "suvahovy" },
  { code: "119", name: "Materiál na ceste", type: "suvahovy" },
  { code: "121", name: "Nedokončená výroba", type: "suvahovy" },
  { code: "122", name: "Polotovary vlastnej výroby", type: "suvahovy" },
  { code: "123", name: "Výrobky", type: "suvahovy" },
  { code: "124", name: "Zvieratá", type: "suvahovy" },
  { code: "131", name: "Obstaranie tovaru", type: "suvahovy" },
  { code: "132", name: "Tovar na sklade a v predajniach", type: "suvahovy" },
  { code: "133", name: "Nehnuteľnosť na predaj", type: "suvahovy" },
  { code: "139", name: "Tovar na ceste", type: "suvahovy" },
  { code: "191", name: "Opravné položky k materiálu", type: "suvahovy" },
  { code: "192", name: "Opravné položky k nedokončenej výrobe", type: "suvahovy" },
  { code: "193", name: "Opravné položky k polotovarom vlastnej výroby", type: "suvahovy" },
  { code: "194", name: "Opravné položky k výrobkom", type: "suvahovy" },
  { code: "195", name: "Opravné položky k zvieratám", type: "suvahovy" },
  { code: "196", name: "Opravné položky k tovaru", type: "suvahovy" },
  // Účtová trieda 2 – Finančné účty
  { code: "211", name: "Pokladnica", type: "suvahovy" },
  { code: "213", name: "Ceniny", type: "suvahovy" },
  { code: "221", name: "Bankové účty", type: "suvahovy" },
  { code: "231", name: "Krátkodobé bankové úvery", type: "suvahovy" },
  { code: "232", name: "Eskontné úvery", type: "suvahovy" },
  { code: "241", name: "Vydané krátkodobé dlhopisy", type: "suvahovy" },
  { code: "249", name: "Ostatné krátkodobé finančné výpomoci", type: "suvahovy" },
  { code: "251", name: "Majetkové cenné papiere na obchodovanie", type: "suvahovy" },
  { code: "252", name: "Vlastné akcie a vlastné obchodné podiely", type: "suvahovy" },
  { code: "253", name: "Dlhové cenné papiere na obchodovanie", type: "suvahovy" },
  { code: "255", name: "Vlastné dlhopisy", type: "suvahovy" },
  { code: "256", name: "Dlhové cenné papiere so splatnosťou do jedného roka držané do splatnosti", type: "suvahovy" },
  { code: "257", name: "Ostatné realizovateľné cenné papiere", type: "suvahovy" },
  { code: "259", name: "Obstaranie krátkodobého finančného majetku", type: "suvahovy" },
  { code: "261", name: "Peniaze na ceste", type: "suvahovy" },
  { code: "291", name: "Opravné položky ku krátkodobému finančnému majetku", type: "suvahovy" },
  // Účtová trieda 3 – Zúčtovacie vzťahy
  { code: "311", name: "Odberatelia", type: "suvahovy" },
  { code: "312", name: "Zmenky na inkaso", type: "suvahovy" },
  { code: "313", name: "Pohľadávky za eskontované cenné papiere", type: "suvahovy" },
  { code: "314", name: "Poskytnuté preddavky", type: "suvahovy" },
  { code: "315", name: "Ostatné pohľadávky", type: "suvahovy" },
  { code: "316", name: "Čistá hodnota zákazky", type: "suvahovy" },
  { code: "321", name: "Dodávatelia", type: "suvahovy" },
  { code: "322", name: "Zmenky na úhradu", type: "suvahovy" },
  { code: "323", name: "Krátkodobé rezervy", type: "suvahovy" },
  { code: "324", name: "Prijaté preddavky", type: "suvahovy" },
  { code: "325", name: "Ostatné záväzky", type: "suvahovy" },
  { code: "326", name: "Nevyfakturované dodávky", type: "suvahovy" },
  { code: "331", name: "Zamestnanci", type: "suvahovy" },
  { code: "333", name: "Ostatné záväzky voči zamestnancom", type: "suvahovy" },
  { code: "335", name: "Pohľadávky voči zamestnancom", type: "suvahovy" },
  { code: "336", name: "Zúčtovanie s orgánmi sociálneho poistenia a zdravotného poistenia", type: "suvahovy" },
  { code: "341", name: "Daň z príjmov", type: "suvahovy" },
  { code: "342", name: "Ostatné priame dane", type: "suvahovy" },
  { code: "343", name: "Daň z pridanej hodnoty", type: "suvahovy" },
  { code: "345", name: "Ostatné dane a poplatky", type: "suvahovy" },
  { code: "346", name: "Dotácie zo štátneho rozpočtu", type: "suvahovy" },
  { code: "347", name: "Ostatné dotácie", type: "suvahovy" },
  { code: "351", name: "Pohľadávky voči prepojeným účtovným jednotkám a účtovným jednotkám v rámci podielovej účasti", type: "suvahovy" },
  { code: "353", name: "Pohľadávky za upísané vlastné imanie", type: "suvahovy" },
  { code: "354", name: "Pohľadávky voči spoločníkom a členom pri úhrade straty", type: "suvahovy" },
  { code: "355", name: "Ostatné pohľadávky voči spoločníkom a členom", type: "suvahovy" },
  { code: "358", name: "Pohľadávky voči účastníkom združenia", type: "suvahovy" },
  { code: "361", name: "Záväzky voči prepojeným účtovným jednotkám a účtovným jednotkám v rámci podielovej účasti", type: "suvahovy" },
  { code: "364", name: "Záväzky voči spoločníkom a členom pri rozdeľovaní zisku", type: "suvahovy" },
  { code: "365", name: "Ostatné záväzky voči spoločníkom a členom", type: "suvahovy" },
  { code: "366", name: "Záväzky voči spoločníkom a členom zo závislej činnosti", type: "suvahovy" },
  { code: "367", name: "Záväzky z upísaných nesplatených cenných papierov a vkladov", type: "suvahovy" },
  { code: "368", name: "Záväzky voči účastníkom združenia", type: "suvahovy" },
  { code: "371", name: "Pohľadávky z predaja podniku", type: "suvahovy" },
  { code: "372", name: "Záväzky z kúpy podniku", type: "suvahovy" },
  { code: "373", name: "Pohľadávky a záväzky z pevných termínových operácií", type: "suvahovy" },
  { code: "374", name: "Pohľadávky z nájmu", type: "suvahovy" },
  { code: "375", name: "Pohľadávky z vydaných dlhopisov", type: "suvahovy" },
  { code: "376", name: "Nakúpené opcie", type: "suvahovy" },
  { code: "377", name: "Predané opcie", type: "suvahovy" },
  { code: "378", name: "Iné pohľadávky", type: "suvahovy" },
  { code: "379", name: "Iné záväzky", type: "suvahovy" },
  { code: "381", name: "Náklady budúcich období", type: "suvahovy" },
  { code: "382", name: "Komplexné náklady budúcich období", type: "suvahovy" },
  { code: "383", name: "Výdavky budúcich období", type: "suvahovy" },
  { code: "384", name: "Výnosy budúcich období", type: "suvahovy" },
  { code: "385", name: "Príjmy budúcich období", type: "suvahovy" },
  { code: "391", name: "Opravné položky k pohľadávkam", type: "suvahovy" },
  { code: "395", name: "Vnútorné zúčtovanie", type: "suvahovy" },
  { code: "398", name: "Spojovací účet pri združení", type: "suvahovy" },
  // Účtová trieda 4 – Kapitálové účty a dlhodobé záväzky
  { code: "411", name: "Základné imanie", type: "suvahovy" },
  { code: "412", name: "Emisné ážio", type: "suvahovy" },
  { code: "413", name: "Ostatné kapitálové fondy", type: "suvahovy" },
  { code: "414", name: "Oceňovacie rozdiely z precenenia majetku a záväzkov", type: "suvahovy" },
  { code: "415", name: "Oceňovacie rozdiely z kapitálových účastín", type: "suvahovy" },
  { code: "416", name: "Oceňovacie rozdiely z precenenia pri zlúčení, splynutí a rozdelení", type: "suvahovy" },
  { code: "417", name: "Zákonný rezervný fond z kapitálových vkladov", type: "suvahovy" },
  { code: "418", name: "Nedeliteľný fond z kapitálových vkladov", type: "suvahovy" },
  { code: "419", name: "Zmeny základného imania", type: "suvahovy" },
  { code: "421", name: "Zákonný rezervný fond", type: "suvahovy" },
  { code: "422", name: "Nedeliteľný fond", type: "suvahovy" },
  { code: "423", name: "Štatutárne fondy", type: "suvahovy" },
  { code: "427", name: "Ostatné fondy", type: "suvahovy" },
  { code: "428", name: "Nerozdelený zisk minulých rokov", type: "suvahovy" },
  { code: "429", name: "Neuhradená strata minulých rokov", type: "suvahovy" },
  { code: "431", name: "Výsledok hospodárenia v schvaľovaní", type: "suvahovy" },
  { code: "451", name: "Rezervy zákonné", type: "suvahovy" },
  { code: "459", name: "Ostatné rezervy", type: "suvahovy" },
  { code: "461", name: "Bankové úvery", type: "suvahovy" },
  { code: "471", name: "Dlhodobé záväzky voči prepojeným účtovným jednotkám a účtovným jednotkám v rámci podielovej účasti", type: "suvahovy" },
  { code: "472", name: "Záväzky zo sociálneho fondu", type: "suvahovy" },
  { code: "473", name: "Vydané dlhopisy", type: "suvahovy" },
  { code: "474", name: "Záväzky z nájmu", type: "suvahovy" },
  { code: "475", name: "Dlhodobé prijaté preddavky", type: "suvahovy" },
  { code: "476", name: "Dlhodobé nevyfakturované dodávky", type: "suvahovy" },
  { code: "478", name: "Dlhodobé zmenky na úhradu", type: "suvahovy" },
  { code: "479", name: "Ostatné dlhodobé záväzky", type: "suvahovy" },
  { code: "481", name: "Odložený daňový záväzok a odložená daňová pohľadávka", type: "suvahovy" },
  { code: "491", name: "Vlastné imanie fyzickej osoby – podnikateľa", type: "suvahovy" },
  // Účtová trieda 5 – Náklady
  { code: "501", name: "Spotreba materiálu", type: "vysledkovy" },
  { code: "502", name: "Spotreba energie", type: "vysledkovy" },
  { code: "503", name: "Spotreba ostatných neskladovateľných dodávok", type: "vysledkovy" },
  { code: "504", name: "Predaný tovar", type: "vysledkovy" },
  { code: "505", name: "Tvorba a zúčtovanie opravných položiek k zásobám", type: "vysledkovy" },
  { code: "507", name: "Predaná nehnuteľnosť", type: "vysledkovy" },
  { code: "511", name: "Opravy a udržiavanie", type: "vysledkovy" },
  { code: "512", name: "Cestovné", type: "vysledkovy" },
  { code: "513", name: "Náklady na reprezentáciu", type: "vysledkovy" },
  { code: "518", name: "Ostatné služby", type: "vysledkovy" },
  { code: "521", name: "Mzdové náklady", type: "vysledkovy" },
  { code: "522", name: "Príjmy spoločníkov a členov zo závislej činnosti", type: "vysledkovy" },
  { code: "523", name: "Odmeny členom orgánov spoločnosti a družstva", type: "vysledkovy" },
  { code: "524", name: "Zákonné sociálne poistenie", type: "vysledkovy" },
  { code: "525", name: "Ostatné sociálne poistenie", type: "vysledkovy" },
  { code: "526", name: "Sociálne náklady fyzickej osoby – podnikateľa", type: "vysledkovy" },
  { code: "527", name: "Zákonné sociálne náklady", type: "vysledkovy" },
  { code: "528", name: "Ostatné sociálne náklady", type: "vysledkovy" },
  { code: "531", name: "Daň z motorových vozidiel", type: "vysledkovy" },
  { code: "532", name: "Daň z nehnuteľnosti", type: "vysledkovy" },
  { code: "538", name: "Ostatné dane a poplatky", type: "vysledkovy" },
  { code: "541", name: "Zostatková cena predaného dlhodobého nehmotného majetku a dlhodobého hmotného majetku", type: "vysledkovy" },
  { code: "542", name: "Predaný materiál", type: "vysledkovy" },
  { code: "543", name: "Dary", type: "vysledkovy" },
  { code: "544", name: "Zmluvné pokuty, penále a úroky z omeškania", type: "vysledkovy" },
  { code: "545", name: "Ostatné pokuty, penále a úroky z omeškania", type: "vysledkovy" },
  { code: "546", name: "Odpis pohľadávky", type: "vysledkovy" },
  { code: "547", name: "Tvorba a zúčtovanie opravných položiek k pohľadávkam", type: "vysledkovy" },
  { code: "548", name: "Ostatné náklady na hospodársku činnosť", type: "vysledkovy" },
  { code: "549", name: "Manká a škody", type: "vysledkovy" },
  { code: "551", name: "Odpisy dlhodobého nehmotného majetku a dlhodobého hmotného majetku", type: "vysledkovy" },
  { code: "553", name: "Tvorba a zúčtovanie opravných položiek k dlhodobému majetku", type: "vysledkovy" },
  { code: "555", name: "Zúčtovanie komplexných nákladov budúcich období", type: "vysledkovy" },
  { code: "557", name: "Zúčtovanie oprávky k opravnej položke k nadobudnutému majetku", type: "vysledkovy" },
  { code: "561", name: "Predané cenné papiere a podiely", type: "vysledkovy" },
  { code: "562", name: "Úroky", type: "vysledkovy" },
  { code: "563", name: "Kurzové straty", type: "vysledkovy" },
  { code: "564", name: "Náklady na precenenie cenných papierov", type: "vysledkovy" },
  { code: "565", name: "Tvorba a zúčtovanie opravných položiek k finančnému majetku", type: "vysledkovy" },
  { code: "566", name: "Náklady na krátkodobý finančný majetok", type: "vysledkovy" },
  { code: "567", name: "Náklady na derivátové operácie", type: "vysledkovy" },
  { code: "568", name: "Ostatné finančné náklady", type: "vysledkovy" },
  { code: "569", name: "Manká a škody na finančnom majetku", type: "vysledkovy" },
  { code: "591", name: "Splatná daň z príjmov", type: "vysledkovy" },
  { code: "592", name: "Odložená daň z príjmov", type: "vysledkovy" },
  { code: "595", name: "Dodatočné odvody dane z príjmov", type: "vysledkovy" },
  { code: "596", name: "Prevod podielov na výsledku hospodárenia spoločníkom", type: "vysledkovy" },
  // Účtová trieda 6 – Výnosy
  { code: "601", name: "Tržby za vlastné výrobky", type: "vysledkovy" },
  { code: "602", name: "Tržby z predaja služieb", type: "vysledkovy" },
  { code: "604", name: "Tržby za tovar", type: "vysledkovy" },
  { code: "606", name: "Výnosy zo zákazky", type: "vysledkovy" },
  { code: "607", name: "Výnosy z nehnuteľnosti na predaj", type: "vysledkovy" },
  { code: "611", name: "Zmena stavu nedokončenej výroby", type: "vysledkovy" },
  { code: "612", name: "Zmena stavu polotovarov", type: "vysledkovy" },
  { code: "613", name: "Zmena stavu výrobkov", type: "vysledkovy" },
  { code: "614", name: "Zmena stavu zvierat", type: "vysledkovy" },
  { code: "621", name: "Aktivácia materiálu a tovaru", type: "vysledkovy" },
  { code: "622", name: "Aktivácia vnútroorganizačných služieb", type: "vysledkovy" },
  { code: "623", name: "Aktivácia dlhodobého nehmotného majetku", type: "vysledkovy" },
  { code: "624", name: "Aktivácia dlhodobého hmotného majetku", type: "vysledkovy" },
  { code: "641", name: "Tržby z predaja dlhodobého nehmotného majetku a dlhodobého hmotného majetku", type: "vysledkovy" },
  { code: "642", name: "Tržby z predaja materiálu", type: "vysledkovy" },
  { code: "644", name: "Zmluvné pokuty, penále a úroky z omeškania", type: "vysledkovy" },
  { code: "645", name: "Ostatné pokuty, penále a úroky z omeškania", type: "vysledkovy" },
  { code: "646", name: "Výnosy z odpísaných pohľadávok", type: "vysledkovy" },
  { code: "648", name: "Ostatné výnosy z hospodárskej činnosti", type: "vysledkovy" },
  { code: "655", name: "Zúčtovanie komplexných nákladov budúcich období", type: "vysledkovy" },
  { code: "657", name: "Zúčtovanie oprávky k opravnej položke k nadobudnutému majetku", type: "vysledkovy" },
  { code: "661", name: "Tržby z predaja cenných papierov a podielov", type: "vysledkovy" },
  { code: "662", name: "Úroky", type: "vysledkovy" },
  { code: "663", name: "Kurzové zisky", type: "vysledkovy" },
  { code: "664", name: "Výnosy z precenenia cenných papierov", type: "vysledkovy" },
  { code: "665", name: "Výnosy z dlhodobého finančného majetku", type: "vysledkovy" },
  { code: "666", name: "Výnosy z krátkodobého finančného majetku", type: "vysledkovy" },
  { code: "667", name: "Výnosy z derivátových operácií", type: "vysledkovy" },
  { code: "668", name: "Ostatné finančné výnosy", type: "vysledkovy" },
  // Účtová trieda 7 – Uzávierkové účty
  { code: "701", name: "Začiatočný účet súvahový", type: "suvahovy" },
  { code: "702", name: "Konečný účet súvahový", type: "suvahovy" },
  { code: "710", name: "Účet ziskov a strát", type: "vysledkovy" },
  { code: "711", name: "Začiatočný účet nákladov a výnosov", type: "vysledkovy" },
];


const neziskovkyOsnova = [
  // Účtová trieda 0 – Dlhodobý majetok
  { code: "012", name: "Nehmotné výsledky z vývojovej a obdobnej činnosti", type: "suvahovy" },
  { code: "013", name: "Softvér", type: "suvahovy" },
  { code: "014", name: "Oceniteľné práva", type: "suvahovy" },
  { code: "018", name: "Drobný dlhodobý nehmotný majetok", type: "suvahovy" },
  { code: "019", name: "Ostatný dlhodobý nehmotný majetok", type: "suvahovy" },
  { code: "021", name: "Stavby", type: "suvahovy" },
  { code: "022", name: "Samostatné hnuteľné veci a súbory hnuteľných vecí", type: "suvahovy" },
  { code: "023", name: "Dopravné prostriedky", type: "suvahovy" },
  { code: "025", name: "Pestovateľské celky trvalých porastov", type: "suvahovy" },
  { code: "026", name: "Základné stádo a ťažné zvieratá", type: "suvahovy" },
  { code: "028", name: "Drobný dlhodobý hmotný majetok", type: "suvahovy" },
  { code: "029", name: "Ostatný dlhodobý hmotný majetok", type: "suvahovy" },
  { code: "031", name: "Pozemky", type: "suvahovy" },
  { code: "032", name: "Umelecké diela a zbierky", type: "suvahovy" },
  { code: "041", name: "Obstaranie dlhodobého nehmotného majetku", type: "suvahovy" },
  { code: "042", name: "Obstaranie dlhodobého hmotného majetku", type: "suvahovy" },
  { code: "043", name: "Obstaranie dlhodobého finančného majetku", type: "suvahovy" },
  { code: "051", name: "Poskytnuté preddavky na dlhodobý nehmotný majetok", type: "suvahovy" },
  { code: "052", name: "Poskytnuté preddavky na dlhodobý hmotný majetok", type: "suvahovy" },
  { code: "053", name: "Poskytnuté preddavky na dlhodobý finančný majetok", type: "suvahovy" },
  { code: "061", name: "Podielové cenné papiere a podiely v obchodných spoločnostiach v ovládanej osobe", type: "suvahovy" },
  { code: "062", name: "Podielové cenné papiere a podiely v obchodných spoločnostiach s podstatným vplyvom", type: "suvahovy" },
  { code: "065", name: "Dlhové cenné papiere držané do splatnosti", type: "suvahovy" },
  { code: "066", name: "Pôžičky podnikom v skupine", type: "suvahovy" },
  { code: "067", name: "Ostatné pôžičky", type: "suvahovy" },
  { code: "069", name: "Ostatný dlhodobý finančný majetok", type: "suvahovy" },
  { code: "072", name: "Oprávky k nehmotnému výsledku z vývojovej a obdobnej činnosti", type: "suvahovy" },
  { code: "073", name: "Oprávky k softvéru", type: "suvahovy" },
  { code: "074", name: "Oprávky k oceniteľným právam", type: "suvahovy" },
  { code: "078", name: "Oprávky k drobnému dlhodobému nehmotnému majetku", type: "suvahovy" },
  { code: "079", name: "Oprávky k ostatnému dlhodobému nehmotnému majetku", type: "suvahovy" },
  { code: "081", name: "Oprávky k stavbám", type: "suvahovy" },
  { code: "082", name: "Oprávky k samostatným hnuteľným veciam a k súborom hnuteľných vecí", type: "suvahovy" },
  { code: "083", name: "Oprávky k dopravným prostriedkom", type: "suvahovy" },
  { code: "085", name: "Oprávky k pestovateľským celkom a trvalým porastom", type: "suvahovy" },
  { code: "086", name: "Oprávky k základnému stádu a ťažným zvieratám", type: "suvahovy" },
  { code: "088", name: "Oprávky k drobnému dlhodobému hmotnému majetku", type: "suvahovy" },
  { code: "089", name: "Oprávky k ostatnému dlhodobému hmotnému majetku", type: "suvahovy" },
  { code: "091", name: "Opravná položka k dlhodobému nehmotnému majetku", type: "suvahovy" },
  { code: "092", name: "Opravná položka k dlhodobému hmotnému majetku", type: "suvahovy" },
  { code: "093", name: "Opravná položka k dlhodobému nedokončenému nehmotnému majetku", type: "suvahovy" },
  { code: "094", name: "Opravná položka k dlhodobému nedokončenému hmotnému majetku", type: "suvahovy" },
  { code: "095", name: "Opravná položka k poskytnutým preddavkom", type: "suvahovy" },
  { code: "096", name: "Opravná položka k dlhodobému finančnému majetku", type: "suvahovy" },
  // Účtová trieda 1 – Zásoby
  { code: "111", name: "Obstaranie materiálu", type: "suvahovy" },
  { code: "112", name: "Materiál na sklade", type: "suvahovy" },
  { code: "119", name: "Materiál na ceste", type: "suvahovy" },
  { code: "121", name: "Nedokončená výroba", type: "suvahovy" },
  { code: "122", name: "Polotovary vlastnej výroby", type: "suvahovy" },
  { code: "123", name: "Výrobky", type: "suvahovy" },
  { code: "124", name: "Zvieratá", type: "suvahovy" },
  { code: "131", name: "Obstaranie tovaru", type: "suvahovy" },
  { code: "132", name: "Tovar na sklade", type: "suvahovy" },
  { code: "139", name: "Tovar na ceste", type: "suvahovy" },
  { code: "191", name: "Opravná položka k materiálu", type: "suvahovy" },
  { code: "192", name: "Opravná položka k nedokončenej výrobe", type: "suvahovy" },
  { code: "193", name: "Opravná položka k polotovarom vlastnej výroby", type: "suvahovy" },
  { code: "194", name: "Opravná položka k výrobkom", type: "suvahovy" },
  { code: "195", name: "Opravná položka k zvieratám", type: "suvahovy" },
  { code: "196", name: "Opravná položka k tovaru", type: "suvahovy" },
  // Účtová trieda 2 – Finančné účty
  { code: "211", name: "Pokladnica", type: "suvahovy" },
  { code: "213", name: "Ceniny", type: "suvahovy" },
  { code: "221", name: "Bankové účty", type: "suvahovy" },
  { code: "231", name: "Krátkodobé bankové úvery", type: "suvahovy" },
  { code: "232", name: "Eskontné úvery", type: "suvahovy" },
  { code: "241", name: "Krátkodobé dlhopisy emitované účtovnou jednotkou", type: "suvahovy" },
  { code: "249", name: "Ostatné krátkodobé finančné výpomoci", type: "suvahovy" },
  { code: "251", name: "Majetkové cenné papiere na obchodovanie", type: "suvahovy" },
  { code: "253", name: "Dlhové cenné papiere na obchodovanie", type: "suvahovy" },
  { code: "255", name: "Vlastné dlhopisy", type: "suvahovy" },
  { code: "256", name: "Dlhové cenné papiere so splatnosťou do jedného roka držané do splatnosti", type: "suvahovy" },
  { code: "257", name: "Ostatné realizovateľné cenné papiere", type: "suvahovy" },
  { code: "259", name: "Obstaranie krátkodobého finančného majetku", type: "suvahovy" },
  { code: "261", name: "Peniaze na ceste", type: "suvahovy" },
  { code: "291", name: "Opravné položky ku krátkodobému finančnému majetku", type: "suvahovy" },
  // Účtová trieda 3 – Zúčtovacie vzťahy
  { code: "311", name: "Odberatelia", type: "suvahovy" },
  { code: "312", name: "Zmenky na inkaso", type: "suvahovy" },
  { code: "313", name: "Pohľadávky za eskontované cenné papiere", type: "suvahovy" },
  { code: "314", name: "Poskytnuté prevádzkové preddavky", type: "suvahovy" },
  { code: "315", name: "Ostatné pohľadávky", type: "suvahovy" },
  { code: "321", name: "Dodávatelia", type: "suvahovy" },
  { code: "322", name: "Zmenky na úhradu", type: "suvahovy" },
  { code: "323", name: "Krátkodobé rezervy", type: "suvahovy" },
  { code: "324", name: "Prijaté preddavky", type: "suvahovy" },
  { code: "325", name: "Ostatné záväzky", type: "suvahovy" },
  { code: "326", name: "Nevyfakturované dodávky", type: "suvahovy" },
  { code: "331", name: "Zamestnanci", type: "suvahovy" },
  { code: "333", name: "Ostatné záväzky voči zamestnancom", type: "suvahovy" },
  { code: "335", name: "Pohľadávky voči zamestnancom", type: "suvahovy" },
  { code: "336", name: "Zúčtovanie so Sociálnou poisťovňou a zdravotnými poisťovňami", type: "suvahovy" },
  { code: "341", name: "Daň z príjmov", type: "suvahovy" },
  { code: "342", name: "Ostatné priame dane", type: "suvahovy" },
  { code: "343", name: "Daň z pridanej hodnoty", type: "suvahovy" },
  { code: "345", name: "Ostatné dane a poplatky", type: "suvahovy" },
  { code: "346", name: "Dotácie a ostatné zúčtovanie so štátnym rozpočtom", type: "suvahovy" },
  { code: "348", name: "Dotácie a zúčtovanie s rozpočtami územnej samosprávy", type: "suvahovy" },
  { code: "358", name: "Pohľadávky voči účastníkom združení", type: "suvahovy" },
  { code: "367", name: "Záväzky z upísaných nesplatených cenných papierov a vkladov", type: "suvahovy" },
  { code: "368", name: "Záväzky voči účastníkom združení", type: "suvahovy" },
  { code: "373", name: "Pohľadávky a záväzky z pevných termínových operácií", type: "suvahovy" },
  { code: "375", name: "Pohľadávky z dlhopisov emitovaných účtovnou jednotkou", type: "suvahovy" },
  { code: "378", name: "Iné pohľadávky", type: "suvahovy" },
  { code: "379", name: "Iné záväzky", type: "suvahovy" },
  { code: "381", name: "Náklady budúcich období", type: "suvahovy" },
  { code: "383", name: "Výdavky budúcich období", type: "suvahovy" },
  { code: "384", name: "Výnosy budúcich období", type: "suvahovy" },
  { code: "385", name: "Príjmy budúcich období", type: "suvahovy" },
  { code: "391", name: "Opravná položka k pohľadávkam", type: "suvahovy" },
  { code: "395", name: "Vnútorné zúčtovanie", type: "suvahovy" },
  { code: "396", name: "Spojovací účet pri združení", type: "suvahovy" },
  // Účtová trieda 4 – Imanie, fondy, výsledok hospodárenia a dlhodobé záväzky
  { code: "411", name: "Základné imanie", type: "suvahovy" },
  { code: "412", name: "Fondy tvorené podľa osobitných predpisov", type: "suvahovy" },
  { code: "413", name: "Fond reprodukcie", type: "suvahovy" },
  { code: "414", name: "Oceňovacie rozdiely z precenenia majetku a záväzkov", type: "suvahovy" },
  { code: "415", name: "Oceňovacie rozdiely z precenenia kapitálových účastín", type: "suvahovy" },
  { code: "421", name: "Rezervný fond", type: "suvahovy" },
  { code: "423", name: "Fondy tvorené zo zisku", type: "suvahovy" },
  { code: "427", name: "Ostatné fondy", type: "suvahovy" },
  { code: "428", name: "Nevysporiadaný výsledok hospodárenia minulých rokov", type: "suvahovy" },
  { code: "431", name: "Výsledok hospodárenia v schvaľovaní", type: "suvahovy" },
  { code: "451", name: "Rezervy zákonné", type: "suvahovy" },
  { code: "459", name: "Ostatné rezervy", type: "suvahovy" },
  { code: "461", name: "Dlhodobé bankové úvery", type: "suvahovy" },
  { code: "472", name: "Záväzky zo sociálneho fondu", type: "suvahovy" },
  { code: "473", name: "Vydané dlhopisy", type: "suvahovy" },
  { code: "474", name: "Záväzky z nájmu", type: "suvahovy" },
  { code: "475", name: "Dlhodobé prijaté preddavky", type: "suvahovy" },
  { code: "476", name: "Dlhodobé nevyfakturované dodávky", type: "suvahovy" },
  { code: "478", name: "Dlhodobé zmenky na úhradu", type: "suvahovy" },
  { code: "479", name: "Ostatné dlhodobé záväzky", type: "suvahovy" },
  // Účtová trieda 5 – Náklady na činnosť
  { code: "501", name: "Spotreba materiálu", type: "vysledkovy" },
  { code: "502", name: "Spotreba energie", type: "vysledkovy" },
  { code: "504", name: "Predaný tovar", type: "vysledkovy" },
  { code: "511", name: "Opravy a udržiavanie", type: "vysledkovy" },
  { code: "512", name: "Cestovné", type: "vysledkovy" },
  { code: "513", name: "Náklady na reprezentáciu", type: "vysledkovy" },
  { code: "518", name: "Ostatné služby", type: "vysledkovy" },
  { code: "521", name: "Mzdové náklady", type: "vysledkovy" },
  { code: "524", name: "Zákonné sociálne poistenie a zdravotné poistenie", type: "vysledkovy" },
  { code: "525", name: "Ostatné sociálne poistenie", type: "vysledkovy" },
  { code: "527", name: "Zákonné sociálne náklady", type: "vysledkovy" },
  { code: "528", name: "Ostatné sociálne náklady", type: "vysledkovy" },
  { code: "531", name: "Daň z motorových vozidiel", type: "vysledkovy" },
  { code: "532", name: "Daň z nehnuteľností", type: "vysledkovy" },
  { code: "538", name: "Ostatné dane a poplatky", type: "vysledkovy" },
  { code: "541", name: "Zmluvné pokuty a penále", type: "vysledkovy" },
  { code: "542", name: "Ostatné pokuty a penále", type: "vysledkovy" },
  { code: "543", name: "Odpísanie pohľadávky", type: "vysledkovy" },
  { code: "544", name: "Úroky", type: "vysledkovy" },
  { code: "545", name: "Kurzové straty", type: "vysledkovy" },
  { code: "546", name: "Dary", type: "vysledkovy" },
  { code: "547", name: "Osobitné náklady", type: "vysledkovy" },
  { code: "548", name: "Manká a škody", type: "vysledkovy" },
  { code: "549", name: "Iné ostatné náklady", type: "vysledkovy" },
  { code: "551", name: "Odpisy dlhodobého nehmotného majetku a dlhodobého hmotného majetku", type: "vysledkovy" },
  { code: "552", name: "Zostatková cena predaného dlhodobého nehmotného majetku a dlhodobého hmotného majetku", type: "vysledkovy" },
  { code: "553", name: "Predané cenné papiere", type: "vysledkovy" },
  { code: "554", name: "Predaný materiál", type: "vysledkovy" },
  { code: "555", name: "Náklady na krátkodobý finančný majetok", type: "vysledkovy" },
  { code: "556", name: "Tvorba fondov", type: "vysledkovy" },
  { code: "557", name: "Náklady na precenenie cenných papierov", type: "vysledkovy" },
  { code: "558", name: "Tvorba a zúčtovanie opravných položiek", type: "vysledkovy" },
  { code: "561", name: "Poskytnuté príspevky organizačným zložkám", type: "vysledkovy" },
  { code: "562", name: "Poskytnuté príspevky iným účtovným jednotkám", type: "vysledkovy" },
  { code: "563", name: "Poskytnuté príspevky fyzickým osobám", type: "vysledkovy" },
  { code: "565", name: "Poskytnuté príspevky z podielu zaplatenej dane", type: "vysledkovy" },
  { code: "567", name: "Poskytnuté príspevky z verejnej zbierky", type: "vysledkovy" },
  { code: "591", name: "Daň z príjmov", type: "vysledkovy" },
  { code: "595", name: "Dodatočné odvody dane z príjmov", type: "vysledkovy" },
  // Účtová trieda 6 – Výnosy z činnosti
  { code: "601", name: "Tržby za vlastné výrobky", type: "vysledkovy" },
  { code: "602", name: "Tržby z predaja služieb", type: "vysledkovy" },
  { code: "604", name: "Tržby za predaný tovar", type: "vysledkovy" },
  { code: "611", name: "Zmena stavu zásob nedokončenej výroby", type: "vysledkovy" },
  { code: "612", name: "Zmena stavu zásob polotovarov", type: "vysledkovy" },
  { code: "613", name: "Zmena stavu zásob výrobkov", type: "vysledkovy" },
  { code: "614", name: "Zmena stavu zásob zvierat", type: "vysledkovy" },
  { code: "621", name: "Aktivácia materiálu a tovaru", type: "vysledkovy" },
  { code: "622", name: "Aktivácia vnútroorganizačných služieb", type: "vysledkovy" },
  { code: "623", name: "Aktivácia dlhodobého nehmotného majetku", type: "vysledkovy" },
  { code: "624", name: "Aktivácia dlhodobého hmotného majetku", type: "vysledkovy" },
  { code: "641", name: "Zmluvné pokuty a penále", type: "vysledkovy" },
  { code: "642", name: "Ostatné pokuty a penále", type: "vysledkovy" },
  { code: "643", name: "Platby za odpísané pohľadávky", type: "vysledkovy" },
  { code: "644", name: "Úroky", type: "vysledkovy" },
  { code: "645", name: "Kurzové zisky", type: "vysledkovy" },
  { code: "646", name: "Prijaté dary", type: "vysledkovy" },
  { code: "647", name: "Osobitné výnosy", type: "vysledkovy" },
  { code: "648", name: "Zákonné poplatky", type: "vysledkovy" },
  { code: "649", name: "Iné ostatné výnosy", type: "vysledkovy" },
  { code: "651", name: "Tržby z predaja dlhodobého nehmotného majetku a dlhodobého hmotného majetku", type: "vysledkovy" },
  { code: "652", name: "Výnosy z dlhodobého finančného majetku", type: "vysledkovy" },
  { code: "653", name: "Tržby z predaja cenných papierov a podielov", type: "vysledkovy" },
  { code: "654", name: "Tržby z predaja materiálu", type: "vysledkovy" },
  { code: "655", name: "Výnosy z krátkodobého finančného majetku", type: "vysledkovy" },
  { code: "656", name: "Výnosy z použitia fondu", type: "vysledkovy" },
  { code: "657", name: "Výnosy z precenenia cenných papierov", type: "vysledkovy" },
  { code: "658", name: "Výnosy z nájmu majetku", type: "vysledkovy" },
  { code: "661", name: "Prijaté príspevky od organizačných zložiek", type: "vysledkovy" },
  { code: "662", name: "Prijaté príspevky od právnických osôb", type: "vysledkovy" },
  { code: "663", name: "Prijaté príspevky od fyzických osôb", type: "vysledkovy" },
  { code: "664", name: "Prijaté členské príspevky", type: "vysledkovy" },
  { code: "665", name: "Príspevky z podielu zaplatenej dane", type: "vysledkovy" },
  { code: "667", name: "Prijaté príspevky z verejných zbierok", type: "vysledkovy" },
  { code: "691", name: "Dotácie", type: "vysledkovy" },
  // Účtová trieda 7 – Uzávierkové účty
  { code: "701", name: "Začiatočný účet súvahový", type: "suvahovy" },
  { code: "702", name: "Konečný účet súvahový", type: "suvahovy" },
  { code: "710", name: "Účet ziskov a strát", type: "vysledkovy" },
  { code: "711", name: "Začiatočný účet nákladov a výnosov", type: "vysledkovy" },
];

// ===================== HELPER: determine account type by class =====================
const getAccountTypeByClass = (code) => {
  const cls = parseInt(code.charAt(0), 10);
  if (cls >= 0 && cls <= 4) return "suvahovy";
  if (cls >= 5 && cls <= 6) return "vysledkovy";
  return "suvahovy";
};

const isNaklad = (code) => code.startsWith("5");
const isVynos = (code) => code.startsWith("6");

// ===================== MAIN APP =====================
export default function AccountingApp() {
  const [osnova, setOsnova] = useState("podnikatelia");
  const [customAccounts, setCustomAccounts] = useState([]);
  const [entries, setEntries] = useState([
    { id: 1, date: "", doklad: "", popis: "", md: "", dal: "", suma: 0, pripocitatelna: 0, odpocitatelna: 0 },
  ]);
  const [showImport, setShowImport] = useState(false);
  const [showOsnova, setShowOsnova] = useState(false);
  const [showPaste, setShowPaste] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [taxRate, setTaxRate] = useState(21);
  const fileInputRef = useRef(null);
  const journalInputRef = useRef(null);

  // ===================== JOURNAL EXPORT (CSV) =====================
  const exportJournal = () => {
    const header = "poradie;datum;doklad;popis;suma;md;dal;pripocitatelna;odpocitatelna";
    const rows = entries.map((e, i) =>
      [i + 1, e.date, e.doklad, `"${(e.popis || "").replace(/"/g, '""')}"`, e.suma || 0, e.md, e.dal, e.pripocitatelna || 0, e.odpocitatelna || 0].join(";")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uctovny-dennik-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ===================== JOURNAL IMPORT (CSV) =====================
  const importJournal = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target.result;
        const lines = text.split("\n").filter((l) => l.trim());
        // Skip header if it looks like one
        const startIdx = lines[0] && lines[0].toLowerCase().includes("poradie") ? 1 : 0;
        const imported = [];
        for (let i = startIdx; i < lines.length; i++) {
          const line = lines[i];
          // Parse CSV with semicolon, respecting quoted fields
          const parts = [];
          let current = "";
          let inQuotes = false;
          for (let j = 0; j < line.length; j++) {
            const ch = line[j];
            if (ch === '"') { inQuotes = !inQuotes; continue; }
            if (ch === ";" && !inQuotes) { parts.push(current.trim()); current = ""; continue; }
            current += ch;
          }
          parts.push(current.trim());
          
          if (parts.length >= 5) {
            imported.push({
              id: Date.now() + i,
              date: parts[1] || "",
              doklad: parts[2] || "",
              popis: parts[3] || "",
              suma: parseFloat(parts[4]) || 0,
              md: parts[5] || "",
              dal: parts[6] || "",
              pripocitatelna: parseFloat(parts[7]) || 0,
              odpocitatelna: parseFloat(parts[8]) || 0,
            });
          }
        }
        if (imported.length > 0) {
          setEntries((prev) => {
            const hasOnlyEmpty = prev.length === 1 && !prev[0].popis && !prev[0].md && !prev[0].dal && prev[0].suma === 0;
            return hasOnlyEmpty ? imported : [...prev, ...imported];
          });
        } else {
          alert("Nepodarilo sa naimportovať žiadne záznamy. Skontrolujte formát CSV súboru.");
        }
      } catch (err) {
        alert("Chyba pri importe denníka. Skontrolujte formát CSV súboru.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Active chart of accounts
  const activeAccounts = useMemo(() => {
    if (osnova === "podnikatelia") return podnikateliaOsnova;
    if (osnova === "neziskovky") return neziskovkyOsnova;
    return customAccounts;
  }, [osnova, customAccounts]);

  const getAccountName = useCallback(
    (code) => {
      if (!code) return "";
      const acc = activeAccounts.find((a) => a.code === code);
      return acc ? acc.name : "";
    },
    [activeAccounts]
  );

  const getAccountType = useCallback(
    (code) => {
      if (!code) return "";
      const acc = activeAccounts.find((a) => a.code === code);
      if (acc) return acc.type;
      return getAccountTypeByClass(code);
    },
    [activeAccounts]
  );

  // ===================== ENTRIES MANAGEMENT =====================
  const updateEntry = (id, field, value) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: field === "suma" || field === "pripocitatelna" || field === "odpocitatelna" ? parseFloat(value) || 0 : value } : e))
    );
  };

  const addEntry = () => {
    setEntries((prev) => [
      ...prev,
      { id: Date.now(), date: "", doklad: "", popis: "", md: "", dal: "", suma: 0, pripocitatelna: 0, odpocitatelna: 0 },
    ]);
  };

  const removeEntry = (id) => {
    setEntries((prev) => (prev.length > 1 ? prev.filter((e) => e.id !== id) : prev));
  };

  // ===================== PASTE IMPORT =====================
  const handlePasteImport = () => {
    if (!pasteText.trim()) return;
    const lines = pasteText.split("\n").filter((l) => l.trim());
    const newEntries = lines.map((line, i) => {
      const trimmed = line.trim();
      // Try to parse: detect number at start (order number), then extract sum at end
      // Common formats:
      // "1. Nákup materiálu na faktúru 5 000 €"
      // "1. VBÚ - úhrada faktúry dodávateľovi 3 200 €"  
      // "Nákup materiálu na faktúru, suma 5000"
      // "PPD - Tržby v hotovosti 1 200 €"
      
      let popis = trimmed;
      let suma = 0;
      let doklad = "";
      
      // Remove leading number/order (e.g. "1.", "1)", "1 -", "1.")
      const orderMatch = popis.match(/^\s*(\d+)\s*[\.\)\-–]\s*/);
      if (orderMatch) {
        popis = popis.substring(orderMatch[0].length);
      }
      
      // Try to extract document type from common abbreviations at the start
      const dokladMatch = popis.match(/^(VBÚ|PPD|VPD|FAP|FAV|IÚD|ZVL|PRI|VÝD|BV|ID|FA|VF|PF|PPr|VPr)\s*[\-–:]\s*/i);
      if (dokladMatch) {
        doklad = dokladMatch[1].toUpperCase();
        popis = popis.substring(dokladMatch[0].length);
      }
      
      // Extract sum from end - match patterns like "5 000 €", "5000", "5 000,00 €", "5.000,00"
      const sumaMatch = popis.match(/[\s,]\s*([\d\s]+(?:[,\.]\d{1,2})?)\s*(?:€|EUR|eur)?\s*$/);
      if (sumaMatch) {
        const sumaStr = sumaMatch[1].replace(/\s/g, "").replace(",", ".");
        const parsed = parseFloat(sumaStr);
        if (!isNaN(parsed) && parsed > 0) {
          suma = parsed;
          popis = popis.substring(0, popis.length - sumaMatch[0].length).trim();
        }
      }
      
      // Clean up trailing punctuation
      popis = popis.replace(/[,;.\-–]+\s*$/, "").trim();
      
      return {
        id: Date.now() + i,
        date: "",
        doklad,
        popis,
        md: "",
        dal: "",
        suma,
        pripocitatelna: 0,
        odpocitatelna: 0,
      };
    });

    if (newEntries.length > 0) {
      // Replace the single empty default entry, or append to existing
      setEntries((prev) => {
        const hasOnlyEmpty = prev.length === 1 && !prev[0].popis && !prev[0].md && !prev[0].dal && prev[0].suma === 0;
        return hasOnlyEmpty ? newEntries : [...prev, ...newEntries];
      });
      setPasteText("");
      setShowPaste(false);
    }
  };

  // ===================== CALCULATIONS =====================
  const validEntries = useMemo(() => entries.filter((e) => e.md && e.dal && e.suma > 0), [entries]);

  // Profit & Loss (Účet ziskov a strát)
  const { stranaMD, stranaDAL, vysledokHospodarenia } = useMemo(() => {
    // Najprv zozbierame obraty všetkých výsledkových účtov
    const vysledkoveUcty = {};

    validEntries.forEach((e) => {
      // MD strana
      if (isNaklad(e.md) || isVynos(e.md)) {
        if (!vysledkoveUcty[e.md]) vysledkoveUcty[e.md] = { code: e.md, name: getAccountName(e.md), md: 0, dal: 0 };
        vysledkoveUcty[e.md].md += e.suma;
      }
      // DAL strana
      if (isNaklad(e.dal) || isVynos(e.dal)) {
        if (!vysledkoveUcty[e.dal]) vysledkoveUcty[e.dal] = { code: e.dal, name: getAccountName(e.dal), md: 0, dal: 0 };
        vysledkoveUcty[e.dal].dal += e.suma;
      }
    });

    // Rozdelenie podľa skutočného zostatku: MD zostatok → strana MD, DAL zostatok → strana DAL
    const stranaMD = [];
    const stranaDAL = [];

    Object.values(vysledkoveUcty).forEach((u) => {
      const net = u.md - u.dal;
      if (net > 0) {
        stranaMD.push({ ...u, suma: net });
      } else if (net < 0) {
        stranaDAL.push({ ...u, suma: Math.abs(net) });
      }
    });

    const sumMD = stranaMD.reduce((s, n) => s + n.suma, 0);
    const sumDAL = stranaDAL.reduce((s, v) => s + v.suma, 0);
    return { stranaMD, stranaDAL, vysledokHospodarenia: sumDAL - sumMD };
  }, [validEntries, getAccountName]);

  // Balance sheet (Konečný účet súvahový)
  const { aktivne, pasivne } = useMemo(() => {
    const accounts = {};

    validEntries.forEach((e) => {
      const mdType = getAccountType(e.md);
      const dalType = getAccountType(e.dal);

      if (mdType === "suvahovy") {
        if (!accounts[e.md]) accounts[e.md] = { code: e.md, name: getAccountName(e.md), md: 0, dal: 0 };
        accounts[e.md].md += e.suma;
      }
      if (dalType === "suvahovy") {
        if (!accounts[e.dal]) accounts[e.dal] = { code: e.dal, name: getAccountName(e.dal), md: 0, dal: 0 };
        accounts[e.dal].dal += e.suma;
      }
    });

    const all = Object.values(accounts);
    // Účty sa zaraďujú podľa skutočného zostatku:
    // MD zostatok (md > dal) → aktíva, DAL zostatok (dal > md) → pasíva
    const aktivne = [];
    const pasivne = [];

    all.forEach((a) => {
      const net = a.md - a.dal;
      if (net > 0) {
        // Zostatok na strane MD → aktíva
        aktivne.push({ ...a, zostatok: net });
      } else if (net < 0) {
        // Zostatok na strane DAL → pasíva
        pasivne.push({ ...a, zostatok: Math.abs(net) });
      }
    });

    return { aktivne, pasivne };
  }, [validEntries, getAccountType, getAccountName]);

  const sumAktiva = aktivne.reduce((s, a) => s + a.zostatok, 0);
  const sumPasiva = pasivne.reduce((s, p) => s + p.zostatok, 0) + vysledokHospodarenia;

  // Tax calculation
  const { sumPripocitatelne, sumOdpocitatelne, zakladDane, dan } = useMemo(() => {
    const sumP = validEntries.reduce((s, e) => s + (e.pripocitatelna || 0), 0);
    const sumO = validEntries.reduce((s, e) => s + (e.odpocitatelna || 0), 0);
    const zaklad = vysledokHospodarenia + sumP - sumO;
    const zakladRounded = Math.max(0, zaklad);
    const danValue = zakladRounded * (taxRate / 100);
    return { sumPripocitatelne: sumP, sumOdpocitatelne: sumO, zakladDane: zakladRounded, dan: danValue };
  }, [validEntries, vysledokHospodarenia, taxRate]);

  // ===================== IMPORT CUSTOM ACCOUNTS =====================
  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target.result;
        const lines = text.split("\n").filter((l) => l.trim());
        const imported = lines.map((line) => {
          const parts = line.split(";").map((p) => p.trim());
          if (parts.length >= 3) {
            return { code: parts[0], name: parts[1], type: parts[2] === "vysledkovy" ? "vysledkovy" : "suvahovy" };
          } else if (parts.length >= 2) {
            return { code: parts[0], name: parts[1], type: getAccountTypeByClass(parts[0]) };
          }
          return null;
        }).filter(Boolean);
        setCustomAccounts(imported);
        setOsnova("vlastna");
        setShowImport(false);
      } catch (err) {
        alert("Chyba pri importe súboru. Skontrolujte formát (kód;názov;typ)");
      }
    };
    reader.readAsText(file);
  };

  // ===================== STYLES =====================
  const colors = {
    bg: "#f8f7f4",
    surface: "#ffffff",
    surfaceAlt: "#f2f0eb",
    border: "#e0ddd6",
    borderFocus: "#8b7e6a",
    text: "#2d2a26",
    textMuted: "#7a7468",
    accent: "#4a6741",
    accentLight: "#e8efe6",
    danger: "#b34040",
    dangerLight: "#fce8e8",
    blue: "#3d5a80",
    blueLight: "#e3edf7",
    gold: "#9a7b2f",
    goldLight: "#faf5e8",
  };

  return (
    <div style={{ fontFamily: "'Source Serif 4', 'Crimson Text', Georgia, serif", background: colors.bg, minHeight: "100vh", color: colors.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <header style={{ background: colors.text, color: colors.bg, padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "36px", height: "36px", background: colors.accent, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", fontSize: "16px", color: "#fff" }}>
            ÚČ
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "600", letterSpacing: "-0.02em" }}>Interaktívna učebná pomôcka pre študentov</h1>
            <p style={{ margin: 0, fontSize: "12px", opacity: 0.6 }}>Účtovný denník, účet ziskov a strát, konečný účet súvahový a kalkulácia dane</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <select
            value={osnova}
            onChange={(e) => setOsnova(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff",
              padding: "6px 12px", borderRadius: "6px", fontSize: "13px", fontFamily: "inherit", cursor: "pointer",
            }}
          >
            <option value="podnikatelia" style={{ color: "#000" }}>Rámcová účtová osnova (podnikatelia)</option>
            <option value="neziskovky" style={{ color: "#000" }}>Účtová osnova (neziskové organizácie)</option>
            <option value="vlastna" style={{ color: "#000" }}>Vlastná účtová osnova</option>
          </select>
          <button
            onClick={() => setShowImport(true)}
            style={{
              background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff",
              padding: "6px 14px", borderRadius: "6px", fontSize: "13px", cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Import osnovy
          </button>
          <button
            onClick={() => setShowOsnova(!showOsnova)}
            style={{
              background: showOsnova ? colors.accent : "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff",
              padding: "6px 14px", borderRadius: "6px", fontSize: "13px", cursor: "pointer", fontFamily: "inherit",
            }}
          >
            {showOsnova ? "Skryť osnovu" : "Zobraziť osnovu"}
          </button>
        </div>
      </header>

      {/* IMPORT MODAL */}
      {showImport && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "32px", maxWidth: "500px", width: "90%" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: "18px" }}>Import vlastnej účtovej osnovy</h3>
            <p style={{ fontSize: "14px", color: colors.textMuted, lineHeight: 1.6 }}>
              Nahrajte CSV súbor vo formáte: <code style={{ fontFamily: "'JetBrains Mono', monospace", background: colors.surfaceAlt, padding: "2px 6px", borderRadius: "3px" }}>kód;názov;typ</code>
            </p>
            <p style={{ fontSize: "13px", color: colors.textMuted, lineHeight: 1.6 }}>
              Typ musí byť <strong>suvahovy</strong> alebo <strong>vysledkovy</strong>. Ak typ neuvedete, bude určený automaticky podľa účtovej triedy (0-4 = súvahový, 5-6 = výsledkový).
            </p>
            <div style={{ margin: "20px 0", padding: "16px", background: colors.surfaceAlt, borderRadius: "8px", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8 }}>
              501;Spotreba materiálu;vysledkovy<br />
              211;Pokladnica;suvahovy<br />
              601;Tržby za výrobky;vysledkovy
            </div>
            <input ref={fileInputRef} type="file" accept=".csv,.txt" onChange={handleFileImport} style={{ marginBottom: "16px" }} />
            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
              <button onClick={() => setShowImport(false)} style={{ padding: "8px 20px", borderRadius: "6px", border: `1px solid ${colors.border}`, background: "transparent", cursor: "pointer", fontFamily: "inherit" }}>Zavrieť</button>
            </div>
          </div>
        </div>
      )}

      {/* PASTE IMPORT MODAL */}
      {showPaste && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "32px", maxWidth: "640px", width: "90%" }}>
            <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>Prilepiť text zadania</h3>
            <p style={{ fontSize: "13px", color: colors.textMuted, lineHeight: 1.6, margin: "0 0 16px" }}>
              Skopírujte text zadania s účtovnými prípadmi a prilepte ho sem. Každý riadok = jeden účtovný prípad.
              Aplikácia automaticky rozpozná popis a sumu. Účty MD a DAL potom doplníte ručne.
            </p>
            <p style={{ fontSize: "12px", color: colors.blue, lineHeight: 1.5, margin: "0 0 16px", padding: "8px 12px", background: colors.blueLight, borderRadius: "6px" }}>
              Ak máte CSV súbor od pedagóga alebo uloženú prácu, použite tlačidlo <strong>Importovať CSV</strong> v hlavičke denníka.
            </p>
            <div style={{ margin: "0 0 12px", padding: "12px 16px", background: colors.surfaceAlt, borderRadius: "8px", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8, color: colors.textMuted }}>
              <div style={{ fontSize: "11px", fontFamily: "inherit", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px", fontWeight: "600" }}>Príklad formátu:</div>
              1. VBÚ - Úhrada faktúry dodávateľovi 5 000 €<br />
              2. PPD - Tržby v hotovosti 1 200 €<br />
              3. IÚD - Odpis dlhodobého majetku 800 €<br />
              4. FAP - Nákup materiálu na faktúru 3 500 €
            </div>
            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder={"Prilepte sem text zadania...\n\nNapr.:\n1. Nákup materiálu za hotové 500 €\n2. Tržby za služby na faktúru 1 200 €"}
              style={{
                width: "100%", minHeight: "180px", padding: "12px", border: `1px solid ${colors.border}`,
                borderRadius: "8px", fontSize: "13px", fontFamily: "inherit", resize: "vertical",
                lineHeight: 1.6, outline: "none", boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "16px" }}>
              <button
                onClick={() => { setShowPaste(false); setPasteText(""); }}
                style={{ padding: "8px 20px", borderRadius: "6px", border: `1px solid ${colors.border}`, background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: "13px" }}
              >
                Zrušiť
              </button>
              <button
                onClick={handlePasteImport}
                style={{
                  padding: "8px 24px", borderRadius: "6px", border: "none", background: colors.blue, color: "#fff",
                  cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: "500",
                }}
              >
                Importovať ({pasteText.split("\n").filter((l) => l.trim()).length} riadkov)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHART OF ACCOUNTS PANEL */}
      {showOsnova && (
        <div style={{ background: colors.surfaceAlt, borderBottom: `1px solid ${colors.border}`, padding: "16px 32px", maxHeight: "300px", overflow: "auto" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: "15px", fontWeight: "600" }}>Účtová osnova ({osnova === "podnikatelia" ? "podnikatelia" : osnova === "neziskovky" ? "neziskové organizácie" : "vlastná"})</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "4px", fontSize: "12px" }}>
            {activeAccounts.map((a) => (
              <div key={a.code} style={{ display: "flex", gap: "8px", padding: "3px 8px", background: a.type === "vysledkovy" ? colors.goldLight : colors.blueLight, borderRadius: "4px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: "500", minWidth: "36px" }}>{a.code}</span>
                <span>{a.name}</span>
                <span style={{ marginLeft: "auto", opacity: 0.5, fontSize: "11px" }}>{a.type === "vysledkovy" ? "V" : "S"}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", minHeight: "calc(100vh - 70px)" }}>

        {/* LEFT: ACCOUNTING JOURNAL */}
        <div style={{ padding: "24px", borderRight: `1px solid ${colors.border}`, overflow: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
            <h2 style={{ margin: 0, fontSize: "17px", fontWeight: "600" }}>Účtovný denník</h2>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              <button
                onClick={() => journalInputRef.current?.click()}
                style={{
                  background: "transparent", color: colors.accent, border: `1px solid ${colors.accent}`, padding: "6px 12px",
                  borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontFamily: "inherit", fontWeight: "500",
                }}
                title="Importovať uložený denník alebo zadanie od pedagóga (CSV)"
              >
                Importovať CSV
              </button>
              <input
                ref={journalInputRef}
                type="file"
                accept=".csv,.txt"
                onChange={importJournal}
                style={{ display: "none" }}
              />
              <button
                onClick={exportJournal}
                style={{
                  background: "transparent", color: colors.blue, border: `1px solid ${colors.blue}`, padding: "6px 12px",
                  borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontFamily: "inherit", fontWeight: "500",
                }}
                title="Stiahnuť denník ako CSV súbor"
              >
                Stiahnuť CSV
              </button>
              <button
                onClick={() => setShowPaste(true)}
                style={{
                  background: colors.blue, color: "#fff", border: "none", padding: "6px 14px",
                  borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontFamily: "inherit", fontWeight: "500",
                }}
              >
                Prilepiť zadanie
              </button>
              <button
                onClick={addEntry}
                style={{
                  background: colors.accent, color: "#fff", border: "none", padding: "6px 16px",
                  borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontFamily: "inherit", fontWeight: "500",
                }}
              >
                + Pridať zápis
              </button>
            </div>
          </div>

          {/* Journal table */}
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: colors.surfaceAlt }}>
                  <th style={{ ...thStyle, width: "30px" }}>#</th>
                  <th style={{ ...thStyle, width: "90px" }}>Dátum</th>
                  <th style={{ ...thStyle, width: "70px" }}>Doklad</th>
                  <th style={{ ...thStyle, minWidth: "140px" }}>Popis operácie</th>
                  <th style={{ ...thStyle, width: "90px" }}>Suma (€)</th>
                  <th style={{ ...thStyle, width: "60px" }}>MD</th>
                  <th style={{ ...thStyle, width: "60px" }}>DAL</th>
                  <th style={{ ...thStyle, width: "80px", background: colors.dangerLight, color: colors.danger, fontSize: "11px" }}>Pripoč. (+)</th>
                  <th style={{ ...thStyle, width: "80px", background: colors.accentLight, color: colors.accent, fontSize: "11px" }}>Odpoč. (−)</th>
                  <th style={{ ...thStyle, width: "30px" }}></th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, idx) => {
                  const mdName = getAccountName(entry.md);
                  const dalName = getAccountName(entry.dal);
                  const mdType = entry.md ? getAccountType(entry.md) : "";
                  const dalType = entry.dal ? getAccountType(entry.dal) : "";

                  return (
                    <tr key={entry.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={tdStyle}>
                        <span style={{ color: colors.textMuted, fontSize: "12px" }}>{idx + 1}</span>
                      </td>
                      <td style={tdStyle}>
                        <input
                          type="date"
                          value={entry.date}
                          onChange={(e) => updateEntry(entry.id, "date", e.target.value)}
                          style={inputStyle}
                        />
                      </td>
                      <td style={tdStyle}>
                        <input
                          type="text"
                          value={entry.doklad}
                          onChange={(e) => updateEntry(entry.id, "doklad", e.target.value)}
                          placeholder="napr. VBÚ"
                          style={{ ...inputStyle, width: "62px", fontSize: "12px" }}
                        />
                      </td>
                      <td style={tdStyle}>
                        <input
                          type="text"
                          value={entry.popis}
                          onChange={(e) => updateEntry(entry.id, "popis", e.target.value)}
                          placeholder="Popis..."
                          style={{ ...inputStyle, width: "100%" }}
                        />
                      </td>
                      <td style={tdStyle}>
                        <input
                          type="number"
                          value={entry.suma || ""}
                          onChange={(e) => updateEntry(entry.id, "suma", e.target.value)}
                          placeholder="0.00"
                          style={{ ...inputStyle, width: "80px", fontFamily: "'JetBrains Mono', monospace", textAlign: "right" }}
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td style={tdStyle}>
                        <div>
                          <input
                            type="text"
                            value={entry.md}
                            onChange={(e) => updateEntry(entry.id, "md", e.target.value)}
                            placeholder="účet"
                            style={{ ...inputStyle, width: "52px", fontFamily: "'JetBrains Mono', monospace", textAlign: "center" }}
                            list={`md-list-${entry.id}`}
                          />
                          <datalist id={`md-list-${entry.id}`}>
                            {activeAccounts.map((a) => (
                              <option key={a.code} value={a.code} label={`${a.code} - ${a.name}`} />
                            ))}
                          </datalist>
                          {mdName && (
                            <div style={{ fontSize: "10px", color: mdType === "vysledkovy" ? colors.gold : colors.blue, marginTop: "2px", lineHeight: 1.2 }}>
                              {mdName}
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={tdStyle}>
                        <div>
                          <input
                            type="text"
                            value={entry.dal}
                            onChange={(e) => updateEntry(entry.id, "dal", e.target.value)}
                            placeholder="účet"
                            style={{ ...inputStyle, width: "52px", fontFamily: "'JetBrains Mono', monospace", textAlign: "center" }}
                            list={`dal-list-${entry.id}`}
                          />
                          <datalist id={`dal-list-${entry.id}`}>
                            {activeAccounts.map((a) => (
                              <option key={a.code} value={a.code} label={`${a.code} - ${a.name}`} />
                            ))}
                          </datalist>
                          {dalName && (
                            <div style={{ fontSize: "10px", color: dalType === "vysledkovy" ? colors.gold : colors.blue, marginTop: "2px", lineHeight: 1.2 }}>
                              {dalName}
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={{ ...tdStyle, background: "rgba(179,64,64,0.03)" }}>
                        <input
                          type="number"
                          value={entry.pripocitatelna || ""}
                          onChange={(e) => updateEntry(entry.id, "pripocitatelna", e.target.value)}
                          placeholder="0"
                          style={{ ...inputStyle, width: "70px", fontFamily: "'JetBrains Mono', monospace", textAlign: "right", fontSize: "12px" }}
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td style={{ ...tdStyle, background: "rgba(74,103,65,0.03)" }}>
                        <input
                          type="number"
                          value={entry.odpocitatelna || ""}
                          onChange={(e) => updateEntry(entry.id, "odpocitatelna", e.target.value)}
                          placeholder="0"
                          style={{ ...inputStyle, width: "70px", fontFamily: "'JetBrains Mono', monospace", textAlign: "right", fontSize: "12px" }}
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td style={tdStyle}>
                        <button
                          onClick={() => removeEntry(entry.id)}
                          style={{ background: "none", border: "none", color: colors.textMuted, cursor: "pointer", fontSize: "16px", padding: "2px 6px", borderRadius: "4px" }}
                          title="Odstrániť"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary of journal */}
          <div style={{ marginTop: "16px", padding: "12px 16px", background: colors.surfaceAlt, borderRadius: "8px", fontSize: "13px", display: "flex", gap: "24px" }}>
            <span>Počet zápisov: <strong>{validEntries.length}</strong></span>
            <span>Celkom MD: <strong style={{ fontFamily: "'JetBrains Mono', monospace" }}>{validEntries.reduce((s, e) => s + e.suma, 0).toFixed(2)} €</strong></span>
            <span>Celkom DAL: <strong style={{ fontFamily: "'JetBrains Mono', monospace" }}>{validEntries.reduce((s, e) => s + e.suma, 0).toFixed(2)} €</strong></span>
          </div>

          {/* Legend */}
          <div style={{ marginTop: "12px", padding: "12px 16px", background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: "8px", fontSize: "12px", color: colors.textMuted }}>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <span><span style={{ display: "inline-block", width: "10px", height: "10px", background: colors.blue, borderRadius: "2px", marginRight: "4px" }}></span>Súvahový účet</span>
              <span><span style={{ display: "inline-block", width: "10px", height: "10px", background: colors.gold, borderRadius: "2px", marginRight: "4px" }}></span>Výsledkový účet</span>
              <span><span style={{ display: "inline-block", width: "10px", height: "10px", background: colors.danger, borderRadius: "2px", marginRight: "4px" }}></span>Pripočítateľné položky → zvyšujú základ dane</span>
              <span><span style={{ display: "inline-block", width: "10px", height: "10px", background: colors.accent, borderRadius: "2px", marginRight: "4px" }}></span>Odpočítateľné položky → znižujú základ dane</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: P&L + Balance Sheet + Tax */}
        <div style={{ padding: "24px", overflow: "auto", background: colors.surfaceAlt }}>

          {/* ÚČET ZISKOV A STRÁT */}
          <div style={{ background: colors.surface, borderRadius: "10px", border: `1px solid ${colors.border}`, marginBottom: "20px", overflow: "hidden" }}>
            <div style={{ background: colors.gold, padding: "10px 20px", color: "#fff" }}>
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "600" }}>Účet ziskov a strát</h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "120px" }}>
              {/* Náklady (ľavá strana) */}
              <div style={{ padding: "12px 16px", borderRight: `1px solid ${colors.border}` }}>
                <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: colors.textMuted, marginBottom: "8px", fontWeight: "600" }}>
                  Strana MD
                </div>
                {stranaMD.map((n) => (
                  <div key={n.code} style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", padding: "3px 0", borderBottom: `1px solid ${colors.surfaceAlt}` }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", marginRight: "6px", opacity: 0.6 }}>{n.code}</span>
                    <span style={{ flex: 1 }}>{n.name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: "500" }}>{n.suma.toFixed(2)}</span>
                  </div>
                ))}
                {vysledokHospodarenia > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", padding: "6px 0", borderTop: `2px solid ${colors.accent}`, marginTop: "8px", color: colors.accent, fontWeight: "600" }}>
                    <span>Zisk</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{vysledokHospodarenia.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "8px 0 4px", borderTop: `2px solid ${colors.text}`, marginTop: "4px", fontWeight: "700" }}>
                  <span>Spolu</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {(stranaMD.reduce((s, n) => s + n.suma, 0) + Math.max(0, vysledokHospodarenia)).toFixed(2)} €
                  </span>
                </div>
              </div>
              {/* Strana DAL */}
              <div style={{ padding: "12px 16px" }}>
                <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: colors.textMuted, marginBottom: "8px", fontWeight: "600" }}>
                  Strana DAL
                </div>
                {stranaDAL.map((v) => (
                  <div key={v.code} style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", padding: "3px 0", borderBottom: `1px solid ${colors.surfaceAlt}` }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", marginRight: "6px", opacity: 0.6 }}>{v.code}</span>
                    <span style={{ flex: 1 }}>{v.name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: "500" }}>{v.suma.toFixed(2)}</span>
                  </div>
                ))}
                {vysledokHospodarenia < 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", padding: "6px 0", borderTop: `2px solid ${colors.danger}`, marginTop: "8px", color: colors.danger, fontWeight: "600" }}>
                    <span>Strata</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{Math.abs(vysledokHospodarenia).toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "8px 0 4px", borderTop: `2px solid ${colors.text}`, marginTop: "4px", fontWeight: "700" }}>
                  <span>Spolu</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {(stranaDAL.reduce((s, v) => s + v.suma, 0) + Math.max(0, -vysledokHospodarenia)).toFixed(2)} €
                  </span>
                </div>
              </div>
            </div>
            {/* VH bar */}
            <div style={{ padding: "10px 20px", background: vysledokHospodarenia >= 0 ? colors.accentLight : colors.dangerLight, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", fontWeight: "600" }}>
              <span>Výsledok hospodárenia</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: vysledokHospodarenia >= 0 ? colors.accent : colors.danger, fontSize: "16px" }}>
                {vysledokHospodarenia >= 0 ? "+" : ""}{vysledokHospodarenia.toFixed(2)} €
              </span>
            </div>
          </div>

          {/* KONEČNÝ ÚČET SÚVAHOVÝ */}
          <div style={{ background: colors.surface, borderRadius: "10px", border: `1px solid ${colors.border}`, marginBottom: "20px", overflow: "hidden" }}>
            <div style={{ background: colors.blue, padding: "10px 20px", color: "#fff" }}>
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "600" }}>Konečný účet súvahový</h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "120px" }}>
              {/* Aktíva */}
              <div style={{ padding: "12px 16px", borderRight: `1px solid ${colors.border}` }}>
                <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: colors.textMuted, marginBottom: "8px", fontWeight: "600" }}>
                  Aktíva (MD)
                </div>
                {aktivne.map((a) => (
                  <div key={a.code} style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", padding: "3px 0", borderBottom: `1px solid ${colors.surfaceAlt}` }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", marginRight: "6px", opacity: 0.6 }}>{a.code}</span>
                    <span style={{ flex: 1 }}>{a.name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: "500" }}>{a.zostatok.toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "8px 0 4px", borderTop: `2px solid ${colors.text}`, marginTop: "8px", fontWeight: "700" }}>
                  <span>Aktíva spolu</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{sumAktiva.toFixed(2)} €</span>
                </div>
              </div>
              {/* Pasíva */}
              <div style={{ padding: "12px 16px" }}>
                <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: colors.textMuted, marginBottom: "8px", fontWeight: "600" }}>
                  Pasíva (DAL)
                </div>
                {pasivne.map((p) => (
                  <div key={p.code} style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", padding: "3px 0", borderBottom: `1px solid ${colors.surfaceAlt}` }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", marginRight: "6px", opacity: 0.6 }}>{p.code}</span>
                    <span style={{ flex: 1 }}>{p.name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: "500" }}>{p.zostatok.toFixed(2)}</span>
                  </div>
                ))}
                {/* VH sa premietne do pasív */}
                {vysledokHospodarenia !== 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", padding: "3px 0", borderBottom: `1px solid ${colors.surfaceAlt}`, color: vysledokHospodarenia >= 0 ? colors.accent : colors.danger }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", marginRight: "6px", opacity: 0.6 }}>VH</span>
                    <span style={{ flex: 1 }}>{vysledokHospodarenia >= 0 ? "Zisk bežného obdobia" : "Strata bežného obdobia"}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: "500" }}>{vysledokHospodarenia.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "8px 0 4px", borderTop: `2px solid ${colors.text}`, marginTop: "8px", fontWeight: "700" }}>
                  <span>Pasíva spolu</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{sumPasiva.toFixed(2)} €</span>
                </div>
              </div>
            </div>
            {/* Balance check */}
            <div style={{
              padding: "8px 20px", fontSize: "12px",
              background: Math.abs(sumAktiva - sumPasiva) < 0.01 ? colors.accentLight : colors.dangerLight,
              color: Math.abs(sumAktiva - sumPasiva) < 0.01 ? colors.accent : colors.danger,
              fontWeight: "500", display: "flex", justifyContent: "space-between",
            }}>
              <span>{Math.abs(sumAktiva - sumPasiva) < 0.01 ? "Súvaha je vyrovnaná" : "Súvaha NIE je vyrovnaná"}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>Rozdiel: {(sumAktiva - sumPasiva).toFixed(2)} €</span>
            </div>
          </div>

          {/* KALKULÁCIA DANE Z PRÍJMOV */}
          <div style={{ background: colors.surface, borderRadius: "10px", border: `1px solid ${colors.border}`, overflow: "hidden" }}>
            <div style={{ background: "#5a4a2f", padding: "10px 20px", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "600" }}>Kalkulácia dane z príjmov</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
                <span>Sadzba:</span>
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  style={{ width: "50px", padding: "3px 6px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.15)", color: "#fff", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}
                  min="0"
                  max="100"
                />
                <span>%</span>
              </div>
            </div>
            <div style={{ padding: "16px 20px" }}>
              <table style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse" }}>
                <tbody>
                  <TaxRow label="Účtovný výsledok hospodárenia (zisk / strata)" value={vysledokHospodarenia} />
                  <TaxRow label="+ Pripočítateľné položky" value={sumPripocitatelne} color={colors.danger} />
                  <TaxRow label="− Odpočítateľné položky" value={sumOdpocitatelne} color={colors.accent} />
                  <tr style={{ borderTop: `2px solid ${colors.text}` }}>
                    <td style={{ padding: "10px 0", fontWeight: "700", fontSize: "14px" }}>Základ dane</td>
                    <td style={{ padding: "10px 0", fontWeight: "700", fontSize: "14px", textAlign: "right", fontFamily: "'JetBrains Mono', monospace" }}>
                      {zakladDane.toFixed(2)} €
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 0", color: colors.textMuted }}>Sadzba dane</td>
                    <td style={{ padding: "6px 0", textAlign: "right", fontFamily: "'JetBrains Mono', monospace", color: colors.textMuted }}>
                      {taxRate} %
                    </td>
                  </tr>
                  <tr style={{ borderTop: `2px solid ${colors.gold}` }}>
                    <td style={{ padding: "12px 0", fontWeight: "700", fontSize: "16px", color: colors.gold }}>Daň z príjmov</td>
                    <td style={{ padding: "12px 0", fontWeight: "700", fontSize: "16px", textAlign: "right", fontFamily: "'JetBrains Mono', monospace", color: colors.gold }}>
                      {dan.toFixed(2)} €
                    </td>
                  </tr>
                  <tr style={{ borderTop: `1px solid ${colors.border}` }}>
                    <td style={{ padding: "10px 0", fontWeight: "600", fontSize: "14px" }}>Čistý výsledok hospodárenia po zdanení</td>
                    <td style={{ padding: "10px 0", fontWeight: "700", fontSize: "14px", textAlign: "right", fontFamily: "'JetBrains Mono', monospace", color: vysledokHospodarenia - dan >= 0 ? colors.accent : colors.danger }}>
                      {(vysledokHospodarenia - dan).toFixed(2)} €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Info box */}
          <div style={{ marginTop: "16px", padding: "12px 16px", background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: "8px", fontSize: "11px", color: colors.textMuted, lineHeight: 1.6 }}>
            <strong style={{ fontSize: "12px" }}>Ako to funguje:</strong> Zadajte účtovné prípady do denníka vľavo. Výsledkové účty sa automaticky premietnu na Účet ziskov a strát. Súvahové účty sa zobrazia na Konečnom účte súvahovom. Pripočítateľné a odpočítateľné položky upravujú základ dane v kalkulácii dane z príjmov.
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ padding: "16px 32px", borderTop: `1px solid ${colors.border}`, textAlign: "center", fontSize: "12px", color: colors.textMuted, background: colors.surface }}>
        © {new Date().getFullYear()} NIVEN OÜ. Všetky práva vyhradené.
      </footer>
    </div>
  );
}

// ===================== HELPER COMPONENTS =====================

function TaxRow({ label, value, color }) {
  return (
    <tr style={{ borderBottom: "1px solid #e0ddd6" }}>
      <td style={{ padding: "8px 0", color: color || undefined }}>{label}</td>
      <td style={{ padding: "8px 0", textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontWeight: "500", color: color || undefined }}>
        {value.toFixed(2)} €
      </td>
    </tr>
  );
}

// ===================== SHARED STYLES =====================
const thStyle = {
  padding: "8px 6px",
  textAlign: "left",
  fontSize: "11px",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.03em",
  color: "#7a7468",
  borderBottom: "2px solid #e0ddd6",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "6px 4px",
  verticalAlign: "top",
};

const inputStyle = {
  padding: "5px 8px",
  border: "1px solid #e0ddd6",
  borderRadius: "4px",
  fontSize: "13px",
  fontFamily: "inherit",
  background: "#fff",
  outline: "none",
  transition: "border-color 0.2s",
};
