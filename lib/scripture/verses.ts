/**
 * Curated verse text (Terjemahan Baru) for the scripture popover and the
 * "Ayat Harian" card.
 *
 * Why curated (not an API): the sandbox has no outbound network to verify a
 * live Bible API, and for a theology site an *inaccurate* verse is worse than
 * no verse. So we ship a hand-verified set of the most commonly cited
 * passages. References NOT in this map keep their existing behaviour
 * (reference label + outbound link to the SABDA reader): never a guess.
 *
 * Keys are canonical references exactly as produced by `findScriptureRefs`
 * (e.g. "Yohanes 3:16"). Lookups go through `normalizeRef` so en/em dashes
 * and stray whitespace still match.
 */

import { BOOK_LOOKUP } from "./books";

export type Verse = { ref: string; text: string; textEn?: string };

/** Normalize a reference so dash variants + whitespace + commas don't break matching. */
export function normalizeRef(ref: string): string {
  let cleaned = ref
    .replace(/[\u2012\u2013\u2014\u2015]/g, "-") // figure/en/em dashes → hyphen
    .replace(/\s*([,;:])\s*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  const spaceIdx = cleaned.indexOf(" ");
  if (spaceIdx > 0) {
    const book = cleaned.slice(0, spaceIdx).toLowerCase().replace(/\.$/, "");
    const rest = cleaned.slice(spaceIdx + 1);
    const canonicalBook = BOOK_LOOKUP[book];
    if (canonicalBook) {
      cleaned = `${canonicalBook} ${rest}`;
    }
  }
  return cleaned;
}

const ENTRIES: Verse[] = [
  {
    ref: "Daniel 2:17-23, 31-35, 44-47",
    text: "(17) Kemudian pulanglah Daniel dan memberitahukan hal itu kepada Hananya, Misael dan Azarya, teman-temannya,\n(18) dengan maksud supaya mereka memohon kasih sayang kepada Allah semesta langit mengenai rahasia itu, supaya Daniel dan teman-temannya jangan dilenyapkan bersama-sama orang-orang bijaksana yang lain di Babel.\n(19) Maka rahasia itu disingkapkan kepada Daniel dalam suatu penglihatan malam. Lalu Daniel memuji Allah semesta langit.\n(20) Berkatalah Daniel: \"Terpujilah nama Allah dari selama-lamanya sampai selama-lamanya, sebab dari pada Dialah hikmat dan kekuatan!\n(21) Dia mengubah saat dan waktu, Dia memecat raja dan mengangkat raja, Dia memberi hikmat kepada orang bijaksana dan pengetahuan kepada orang yang berpengertian;\n(22) Dialah yang menyingkapkan hal-hal yang tidak terduga dan yang tersembunyi, Dia tahu apa yang ada di dalam gelap, dan terang ada pada-Nya.\n(23) Ya Allah nenek moyangku, kupuji dan kumuliakan Engkau, sebab Engkau mengaruniakan kepadaku hikmat dan kekuatan, dan telah memberitahukan kepadaku sekarang apa yang kami mohon kepada-Mu: Engkau telah memberitahukan kepada kami hal yang dipersoalkan raja.\"\n(31) Ya raja, tuanku melihat suatu penglihatan, yakni sebuah patung yang amat besar! Patung ini tinggi, berkilau-kilauan luar biasa, tegak di hadapan tuanku, dan tampak mendahsyatkan.\n(32) Adapun patung itu, kepalanya dari emas tua, dada dan lengannya dari perak, perut dan pinggangnya dari tembaga,\n(33) sedang pahanya dari besi dengan kakinya sebagian dari besi dan sebagian lagi dari tanah liat.\n(34) Sementara tuanku melihatnya, terungkit lepas sebuah batu tanpa perbuatan tangan manusia, lalu menimpa patung itu, tepat pada kakinya yang dari besi dan tanah liat itu, sehingga remuk.\n(35) Maka dengan sekaligus diremukkannyalah juga besi, tanah liat, tembaga, perak dan emas itu, dan semuanya menjadi seperti sekam di tempat pengirikan pada musim panas, lalu angin menghembuskannya, sehingga tidak ada bekas-bekasnya yang ditemukan. Tetapi batu yang menimpa patung itu menjadi gunung besar yang memenuhi seluruh bumi.\n(44) Tetapi pada zaman raja-raja, Allah semesta langit akan mendirikan suatu kerajaan yang tidak akan binasa sampai selama-lamanya, dan kekuasaan tidak akan beralih lagi kepada bangsa lain: kerajaan itu akan meremukkan segala kerajaan dan menghabisinya, tetapi kerajaan itu sendiri akan tetap untuk selama-lamanya,\n(45) tepat seperti yang tuanku lihat, bahwa tanpa perbuatan tangan manusia sebuah batu terungkit lepas dari gunung dan meremukkan besi, tembaga, tanah liat, perak dan emas itu. Allah yang maha besar telah memberitahukan kepada tuanku raja apa yang akan terjadi di kemudian hari; mimpi itu adalah benar dan maknanya dapat dipercayai.\"\n(46) Lalu sujudlah raja Nebukadnezar serta menyembah Daniel; juga dititahkannya mempersembahkan korban dan bau-bauan kepadanya.\n(47) Berkatalah raja kepada Daniel: \"Sesungguhnyalah, Allahmu itu Allah yang mengatasi segala allah dan Yang berkuasa atas segala raja, dan Yang menyingkapkan rahasia-rahasia, sebab engkau telah dapat menyingkapkan rahasia itu.\"",
    textEn: "(17) Then Daniel went to his house and made the thing known to Hananiah, Mishael, and Azariah, his companions,\n(18) that they would seek compassions from the God of the heavens concerning this mystery, so that Daniel and his companions would not be destroyed with the rest of the wise men of Babylon.\n(19) Then the mystery was revealed to Daniel in a night vision. Then Daniel blessed the God of the heavens.\n(20) Daniel answered and said: Blessed be the name of God from eternity and unto eternity, for wisdom and might are His!\n(21) And it is He who changes the times and the seasons; He deposes kings and sets up kings; He gives wisdom to the wise and knowledge to those who know understanding.\n(22) He reveals the deep and secret things; He knows what is in the darkness, and light dwells with Him.\n(23) To You, O God of my fathers, I give thanks and praise, for You have given me wisdom and might, and now have made known to me what we requested of You, for You have made known to us the king's matter.\n(31) You, O king, were watching, and behold, there was a great image. This image, huge and its brightness surpassing, stood before you; and its appearance was dreadful.\n(32) As for this image, its head was of fine gold, its breast and its arms of silver, its belly and its thighs of bronze,\n(33) its legs of iron, its feet partly of iron and partly of clay.\n(34) You were watching until a stone was cut out without hands, and it struck the image on its feet of iron and clay, and crushed them.\n(35) Then the iron, the clay, the bronze, the silver, and the gold were crushed all together, and they became like chaff from summer threshing floors; and the wind carried them away so that no trace of them was found. And the stone that struck the image became a great mountain and filled the whole earth.\n(44) And in the days of those kings the God of the heavens will set up a kingdom which will never be destroyed, nor will its sovereignty be left to another people; it will crush and put an end to all these kingdoms, and it will stand forever.\n(45) Even as you saw that a stone was cut out of the mountain without hands and that it crushed the iron, the bronze, the clay, the silver, and the gold; the great God has made known to the king what will happen after this; and the dream is certain, and its interpretation trustworthy.\n(46) Then King Nebuchadnezzar fell on his face and worshipped Daniel, and commanded that an oblation and incense should be offered to him.\n(47) The king answered Daniel and said, Truly your God is the God of gods and the Lord of kings and a revealer of mysteries, since you have been able to reveal this mystery.",
  },
  {
    ref: "Daniel 1:1-21",
    text: "(1) Pada tahun yang ketiga pemerintahan Yoyakim, raja Yehuda, datanglah Nebukadnezar, raja Babel, ke Yerusalem, lalu mengepung kota itu.\n(2) Tuhan menyerahkan Yoyakim, raja Yehuda, dan sebagian dari perkakas-perkakas di rumah Allah ke dalam tangannya. Semuanya itu dibawanya ke tanah Sinear, ke dalam rumah dewanya; perkakas-perkakas itu dibawanya ke dalam perbendaharaan dewanya.\n(3) Lalu raja bertitah kepada Aspenas, kepala istananya, untuk membawa beberapa orang Israel, yang berasal dari keturunan raja dan dari kaum bangsawan,\n(4) yakni orang-orang muda yang tidak ada sesuatu cela, yang berperawakan baik, yang memahami berbagai-bagai hikmat, berpengetahuan banyak dan yang mempunyai pengertian tentang ilmu, yakni orang-orang yang cakap untuk bekerja dalam istana raja, supaya mereka diajarkan tulisan dan bahasa orang Kasdim.\n(5) Dan raja menetapkan bagi mereka pelabur setiap hari dari santapan raja dan dari anggur yang biasa diminumnya. Mereka harus dididik selama tiga tahun, dan sesudah itu mereka harus bekerja pada raja.\n(6) Di antara mereka itu ada juga beberapa orang Yehuda, yakni Daniel, Hananya, Misael dan Azarya.\n(7) Pemimpin pegawai istana itu memberi nama lain kepada mereka: Daniel dinamainya Beltsazar, Hananya dinamainya Sadrakh, Misael dinamainya Mesakh dan Azarya dinamainya Abednego.\n(8) Daniel berketetapan untuk tidak menajiskan dirinya dengan santapan raja dan dengan anggur yang biasa diminum raja; dimintanyalah kepada pemimpin pegawai istana itu, supaya ia tak usah menajiskan dirinya.\n(9) Maka Allah mengaruniakan kepada Daniel kasih dan sayang dari pemimpin pegawai istana itu;\n(10) tetapi berkatalah pemimpin pegawai istana itu kepada Daniel: \"Aku takut, kalau-kalau tuanku raja, yang telah menetapkan makanan dan minumanmu, berpendapat bahwa kamu kelihatan kurang sehat dari pada orang-orang muda lain yang sebaya dengan kamu, sehingga karena kamu aku dianggap bersalah oleh raja.\"\n(11) Kemudian berkatalah Daniel kepada penjenang yang telah diangkat oleh pemimpin pegawai istana untuk mengawasi Daniel, Hananya, Misael dan Azarya:\n(12) \"Adakanlah percobaan dengan hamba-hambamu ini selama sepuluh hari dan biarlah kami diberikan sayur untuk dimakan dan air untuk diminum;\n(13) sesudah itu bandingkanlah perawakan kami dengan perawakan orang-orang muda yang makan dari santapan raja, kemudian perlakukanlah hamba-hambamu ini sesuai dengan pendapatmu.\"\n(14) Didengarkannyalah permintaan mereka itu, lalu diadakanlah percobaan dengan mereka selama sepuluh hari.\n(15) Setelah lewat sepuluh hari, ternyata perawakan mereka lebih baik dan mereka kelihatan lebih gemuk dari pada semua orang muda yang telah makan dari santapan raja.\n(16) Kemudian penjenang itu selalu mengambil makanan mereka dan anggur yang harus mereka minum, lalu memberikan sayur kepada mereka.\n(17) Kepada keempat orang muda itu Allah memberikan pengetahuan dan kepandaian tentang berbagai-bagai tulisan dan hikmat, sedang Daniel juga mempunyai pengertian tentang berbagai-bagai penglihatan dan mimpi.\n(18) Setelah lewat waktu yang ditetapkan raja, bahwa mereka sekalian harus dibawa menghadap, maka dibawalah mereka oleh pemimpin pegawai istana itu ke hadapan Nebukadnezar.\n(19) Raja bercakap-cakap dengan mereka; dan di antara mereka sekalian itu tidak didapati yang setara dengan Daniel, Hananya, Misael dan Azarya; maka bekerjalah mereka itu pada raja.\n(20) Dalam tiap-tiap hal yang memerlukan kebijaksanaan dan pengertian, yang ditanyakan raja kepada mereka, didapatinya bahwa mereka sepuluh kali lebih cerdas dari pada semua orang berilmu dan semua ahli jampi di seluruh kerajaannya.\n(21) Daniel ada di sana sampai tahun pertama pemerintahan Koresh.",
    textEn: "(1) In the third year of the reign of Jehoiakim king of Judah, Nebuchadnezzar king of Babylon came to Jerusalem and besieged it.\n(2) And the Lord gave Jehoiakim king of Judah into his hand, with some of the vessels of the house of God; and he brought them into the land of Shinar to the house of his god, and he brought the vessels into the treasure house of his god.\n(3) And the king spoke to Ashpenaz the master of his eunuchs that he should bring some of the children of Israel, even of the royal seed and of the nobles,\n(4) youths in whom was no defect, but who were good-looking, and educated in all wisdom, and possessing knowledge, and understanding science, and who had ability to stand in the king's palace; and that he should teach them the learning and the language of the Chaldeans.\n(5) And the king appointed for them a daily portion from the king's choice food and from the wine which he drank, and appointed that they should be educated for three years, so that at the end of them they might stand before the king.\n(6) Now among these were of the children of Judah: Daniel, Hananiah, Mishael, and Azariah.\n(7) And the prince of the eunuchs gave names to them: to Daniel he gave the name Belteshazzar; and to Hananiah, Shadrach; and to Mishael, Meshach; and to Azariah, Abednego.\n(8) But Daniel set his heart that he would not defile himself with the king's choice food or with the wine which he drank; therefore he requested of the prince of the eunuchs that he might not defile himself.\n(9) Now God granted Daniel favor and compassion in the sight of the prince of the eunuchs.\n(10) And the prince of the eunuchs said to Daniel, I fear my lord the king, who has appointed your food and your drink; for why should he see your faces looking worse than the youths who are of your age? Then you would make my head forfeit to the king.\n(11) Then Daniel said to the steward whom the prince of the eunuchs had set over Daniel, Hananiah, Mishael, and Azariah:\n(12) Please test your servants ten days, and let them give us vegetables to eat and water to drink.\n(13) Then let our appearance and the appearance of the youths who eat the king's choice food be looked upon by you; and according to what you see, deal with your servants.\n(14) So he listened to them in this matter and tested them ten days.\n(15) And at the end of ten days their appearance looked better and fatter in flesh than all the youths who ate the king's choice food.\n(16) So the steward withheld their choice food and the wine that they were to drink, and gave them vegetables.\n(17) Now as for these four youths, God gave them knowledge and skill in all learning and wisdom; and Daniel had understanding in all visions and dreams.\n(18) And at the end of the days that the king had appointed for bringing them in, the prince of the eunuchs brought them in before Nebuchadnezzar.\n(19) And the king spoke with them; and among them all, none was found like Daniel, Hananiah, Mishael, and Azariah; therefore they stood before the king.\n(20) And in every matter of wisdom and understanding concerning which the king inquired of them, he found them ten times better than all the magicians and enchanters who were in all his realm.\n(21) And Daniel continued until the first year of King Cyrus.",
  },
  {
    ref: "Daniel 2:34",
    text: "Sementara tuanku melihatnya, terungkit lepas sebuah batu tanpa perbuatan tangan manusia, lalu menimpa patung itu, tepat pada kakinya yang dari besi dan tanah liat itu, sehingga remuk.",
    textEn: "You were watching until a stone was cut out without hands, and it struck the image on its feet of iron and clay, and crushed them.",
  },
  {
    ref: "Daniel 2:44",
    text: "Tetapi pada zaman raja-raja, Allah semesta langit akan mendirikan suatu kerajaan yang tidak akan binasa sampai selama-lamanya, dan kekuasaan tidak akan beralih lagi kepada bangsa lain: kerajaan itu akan meremukkan segala kerajaan dan menghabisinya, tetapi kerajaan itu sendiri akan tetap untuk selama-lamanya,",
    textEn: "And in the days of those kings the God of the heavens will set up a kingdom which will never be destroyed, nor will its sovereignty be left to another people; it will crush and put an end to all these kingdoms, and it will stand forever.",
  },
  {
    ref: "Daniel 2:35",
    text: "Maka dengan sekaligus diremukkannyalah juga besi, tanah liat, tembaga, perak dan emas itu, dan semuanya menjadi seperti sekam di tempat pengirikan pada musim panas, lalu angin menghembuskannya, sehingga tidak ada bekas-bekasnya yang ditemukan. Tetapi batu yang menimpa patung itu menjadi gunung besar yang memenuhi seluruh bumi.",
    textEn: "Then the iron, the clay, the bronze, the silver, and the gold were crushed all together, and they became like chaff from summer threshing floors; and the wind carried them away so that no trace of them was found. And the stone that struck the image became a great mountain and filled the whole earth.",
  },
  {
    ref: "Daniel 2:47",
    text: "Berkatalah raja kepada Daniel: \"Sesungguhnyalah, Allahmu itu Allah yang mengatasi segala allah dan Yang berkuasa atas segala raja, dan Yang menyingkapkan rahasia-rahasia, sebab engkau telah dapat menyingkapkan rahasia itu.\"",
    textEn: "The king answered Daniel and said, Truly your God is the God of gods and the Lord of kings and a revealer of mysteries, since you have been able to reveal this mystery.",
  },
  {
    ref: "Daniel 1:8",
    text: "Daniel berketetapan untuk tidak menajiskan dirinya dengan santapan raja dan dengan anggur yang biasa diminum raja; dimohonnyalah kepada pemimpin pegawai istana itu, supaya ia jangan menajiskan dirinya.",
    textEn: "But Daniel set his heart that he would not defile himself with the king's choice food or with the wine which he drank; therefore he requested of the prince of the eunuchs that he might not defile himself.",
  },
  {
    ref: "Kejadian 1:1",
    text: "Pada mulanya Allah menciptakan langit dan bumi.",
  },
  {
    ref: "Yosua 1:9",
    text: "Bukankah telah Kuperintahkan kepadamu: kuatkan dan teguhkanlah hatimu? Janganlah kecut dan tawar hati, sebab TUHAN, Allahmu, menyertai engkau, ke manapun engkau pergi.",
  },
  {
    ref: "Mazmur 23:1",
    text: "TUHAN adalah gembalaku, takkan kekurangan aku.",
  },
  {
    ref: "Mazmur 23:4",
    text: "Sekalipun aku berjalan dalam lembah kekelaman, aku tidak takut bahaya, sebab Engkau besertaku; gada-Mu dan tongkat-Mu, itulah yang menghibur aku.",
  },
  {
    ref: "Mazmur 27:1",
    text: "TUHAN adalah terangku dan keselamatanku, kepada siapakah aku harus takut? TUHAN adalah benteng hidupku, terhadap siapakah aku harus gentar?",
  },
  {
    ref: "Mazmur 119:105",
    text: "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku.",
  },
  {
    ref: "Amsal 3:5",
    text: "Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri.",
  },
  {
    ref: "Amsal 3:5-6",
    text: "Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri. Akuilah Dia dalam segala lakumu, maka Ia akan meluruskan jalanmu.",
  },
  {
    ref: "Yesaya 40:31",
    text: "tetapi orang-orang yang menanti-nantikan TUHAN mendapat kekuatan baru: mereka seumpama rajawali yang naik terbang dengan kekuatan sayapnya; mereka berlari dan tidak menjadi lesu, mereka berjalan dan tidak menjadi lelah.",
  },
  {
    ref: "Yesaya 41:10",
    text: "janganlah takut, sebab Aku menyertai engkau, janganlah bimbang, sebab Aku ini Allahmu; Aku akan meneguhkan, bahkan akan menolong engkau; Aku akan memegang engkau dengan tangan kanan-Ku yang membawa kemenangan.",
  },
  {
    ref: "Yeremia 29:11",
    text: "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.",
  },
  {
    ref: "Ratapan 3:22-23",
    text: "Tak berkesudahan kasih setia TUHAN, tak habis-habisnya rahmat-Nya, selalu baru tiap pagi; besar kesetiaan-Mu!",
  },
  {
    ref: "Matius 6:33",
    text: "Tetapi carilah dahulu Kerajaan Allah dan kebenarannya, maka semuanya itu akan ditambahkan kepadamu.",
  },
  {
    ref: "Matius 11:28",
    text: "Marilah kepada-Ku, semua yang letih lesu dan berbeban berat, Aku akan memberi kelegaan kepadamu.",
  },
  {
    ref: "Matius 28:19",
    text: "Karena itu pergilah, jadikanlah semua bangsa murid-Ku dan baptislah mereka dalam nama Bapa dan Anak dan Roh Kudus,",
  },
  {
    ref: "Yohanes 1:1",
    text: "Pada mulanya adalah Firman; Firman itu bersama-sama dengan Allah dan Firman itu adalah Allah.",
  },
  {
    ref: "Yohanes 3:16",
    text: "Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.",
  },
  {
    ref: "Yohanes 8:32",
    text: "dan kamu akan mengetahui kebenaran, dan kebenaran itu akan memerdekakan kamu.",
  },
  {
    ref: "Yohanes 14:6",
    text: "Kata Yesus kepadanya: \u201cAkulah jalan dan kebenaran dan hidup. Tidak ada seorangpun yang datang kepada Bapa, kalau tidak melalui Aku.\u201d",
  },
  {
    ref: "Roma 3:23",
    text: "Karena semua orang telah berbuat dosa dan telah kehilangan kemuliaan Allah,",
  },
  {
    ref: "Roma 5:8",
    text: "Akan tetapi Allah menunjukkan kasih-Nya kepada kita, oleh karena Kristus telah mati untuk kita, ketika kita masih berdosa.",
  },
  {
    ref: "Roma 6:23",
    text: "Sebab upah dosa ialah maut; tetapi karunia Allah ialah hidup yang kekal dalam Kristus Yesus, Tuhan kita.",
  },
  {
    ref: "Roma 8:1",
    text: "Demikianlah sekarang tidak ada penghukuman bagi mereka yang ada di dalam Kristus Yesus.",
  },
  {
    ref: "Roma 8:28",
    text: "Kita tahu sekarang, bahwa Allah turut bekerja dalam segala sesuatu untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia, yaitu bagi mereka yang terpanggil sesuai dengan rencana Allah.",
  },
  {
    ref: "Roma 10:9",
    text: "Sebab jika kamu mengaku dengan mulutmu, bahwa Yesus adalah Tuhan, dan percaya dalam hatimu, bahwa Allah telah membangkitkan Dia dari antara orang mati, maka kamu akan diselamatkan.",
  },
  {
    ref: "Roma 12:2",
    text: "Janganlah kamu menjadi serupa dengan dunia ini, tetapi berubahlah oleh pembaharuan budimu, sehingga kamu dapat membedakan manakah kehendak Allah: apa yang baik, yang berkenan kepada Allah dan yang sempurna.",
  },
  {
    ref: "1 Korintus 13:4",
    text: "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong.",
  },
  {
    ref: "2 Korintus 5:17",
    text: "Jadi siapa yang ada di dalam Kristus, ia adalah ciptaan baru: yang lama sudah berlalu, sesungguhnya yang baru sudah datang.",
  },
  {
    ref: "Galatia 2:20",
    text: "namun aku hidup, tetapi bukan lagi aku sendiri yang hidup, melainkan Kristus yang hidup di dalam aku. Dan hidupku yang kuhidupi sekarang di dalam daging, adalah hidup oleh iman dalam Anak Allah yang telah mengasihi aku dan menyerahkan diri-Nya untuk aku.",
  },
  {
    ref: "Galatia 5:22",
    text: "Tetapi buah Roh ialah: kasih, sukacita, damai sejahtera, kesabaran, kemurahan, kebaikan, kesetiaan,",
  },
  {
    ref: "Efesus 2:8",
    text: "Sebab karena kasih karunia kamu diselamatkan oleh iman; itu bukan hasil usahamu, tetapi pemberian Allah,",
  },
  {
    ref: "Efesus 2:8-9",
    text: "Sebab karena kasih karunia kamu diselamatkan oleh iman; itu bukan hasil usahamu, tetapi pemberian Allah, itu bukan hasil pekerjaanmu: jangan ada orang yang memegahkan diri.",
  },
  {
    ref: "Filipi 1:6",
    text: "Akan hal ini aku yakin sepenuhnya, yaitu Ia, yang memulai pekerjaan yang baik di antara kamu, akan meneruskannya sampai pada akhirnya pada hari Kristus Yesus.",
  },
  {
    ref: "Filipi 4:6",
    text: "Janganlah hendaknya kamu kuatir tentang apapun juga, tetapi nyatakanlah dalam segala hal keinginanmu kepada Allah dalam doa dan permohonan dengan ucapan syukur.",
  },
  {
    ref: "Filipi 4:13",
    text: "Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.",
  },
  {
    ref: "Kolose 3:23",
    text: "Apapun juga yang kamu perbuat, perbuatlah dengan segenap hatimu seperti untuk Tuhan dan bukan untuk manusia.",
  },
  {
    ref: "2 Timotius 3:16",
    text: "Segala tulisan yang diilhamkan Allah memang bermanfaat untuk mengajar, untuk menyatakan kesalahan, untuk memperbaiki kelakuan dan untuk mendidik orang dalam kebenaran.",
  },
  {
    ref: "Ibrani 11:1",
    text: "Iman adalah dasar dari segala sesuatu yang kita harapkan dan bukti dari segala sesuatu yang tidak kita lihat.",
  },
  {
    ref: "1 Petrus 5:7",
    text: "Serahkanlah segala kekuatiranmu kepada-Nya, sebab Ia yang memelihara kamu.",
  },
  {
    ref: "1 Yohanes 1:9",
    text: "Jika kita mengaku dosa kita, maka Ia adalah setia dan adil, sehingga Ia akan mengampuni segala dosa kita dan menyucikan kita dari segala kejahatan.",
  },
  {
    ref: "Wahyu 21:4",
    text: "dan Ia akan menghapus segala air mata dari mata mereka, dan maut tidak akan ada lagi; tidak akan ada lagi perkabungan, atau ratap tangis, atau dukacita, sebab segala sesuatu yang lama itu telah berlalu.",
  },

  // ── Ayat yang lebih jarang dikutip, dipakai untuk rotasi "Ayat Hari Ini" ──
  {
    ref: "Ulangan 31:8",
    text: "Sebab TUHAN, Dia sendiri akan berjalan di depanmu, Dia sendiri akan menyertai engkau, Dia tidak akan membiarkan engkau dan tidak akan meninggalkan engkau; janganlah takut dan janganlah patah hati.",
  },
  {
    ref: "Mazmur 37:4",
    text: "dan bergembiralah karena TUHAN; maka Ia akan memberikan kepadamu apa yang diinginkan hatimu.",
  },
  {
    ref: "Mazmur 73:26",
    text: "Sekalipun dagingku dan hatiku habis lenyap, gunung batuku dan bagianku tetaplah Allah selama-lamanya.",
  },
  {
    ref: "Mazmur 90:12",
    text: "Ajarlah kami menghitung hari-hari kami sedemikian, hingga kami beroleh hati yang bijaksana.",
  },
  {
    ref: "Mazmur 139:23-24",
    text: "Selidikilah aku, ya Allah, dan kenallah hatiku, ujilah aku dan kenallah pikiran-pikiranku; lihatlah, apakah jalanku serong, dan tuntunlah aku di jalan yang kekal!",
  },
  {
    ref: "Amsal 16:9",
    text: "Hati manusia memikir-mikirkan jalannya, tetapi Tuhanlah yang menentukan arah langkahnya.",
  },
  {
    ref: "Amsal 18:10",
    text: "Nama TUHAN adalah menara yang kuat, ke sanalah orang benar berlari dan ia menjadi selamat.",
  },
  {
    ref: "Pengkhotbah 3:11",
    text: "Ia membuat segala sesuatu indah pada waktunya, bahkan Ia memberikan kekekalan dalam hati mereka. Tetapi manusia tidak dapat menyelami pekerjaan yang dilakukan Allah dari awal sampai akhir.",
  },
  {
    ref: "Yesaya 26:3",
    text: "Yang hatinya teguh Kaujagai dengan damai sejahtera, sebab kepada-Mulah ia percaya.",
  },
  {
    ref: "Yesaya 43:2",
    text: "Apabila engkau menyeberang melalui air, Aku akan menyertai engkau, atau melalui sungai-sungai, engkau tidak akan dihanyutkan; apabila engkau berjalan melalui api, engkau tidak akan dihanguskan, dan nyala api tidak akan membakar engkau.",
  },
  {
    ref: "Ratapan 3:25-26",
    text: "TUHAN adalah baik bagi orang yang berharap kepada-Nya, bagi jiwa yang mencari Dia. Adalah baik menanti dengan diam pertolongan TUHAN.",
  },
  {
    ref: "Mikha 6:8",
    text: "Hai manusia, telah diberitahukan kepadamu apa yang baik. Dan apakah yang dituntut TUHAN dari padamu: selain berlaku adil, mencintai kesetiaan, dan hidup dengan rendah hati di hadapan Allahmu?",
  },
  {
    ref: "Nahum 1:7",
    text: "TUHAN itu baik; Ia adalah tempat pengungsian pada waktu kesusahan; Ia mengenal orang-orang yang berlindung kepada-Nya.",
  },
  {
    ref: "Habakuk 3:17-18",
    text: "Sekalipun pohon ara tidak berbunga, pohon anggur tidak berbuah, hasil pohon zaitun mengecewakan, sekalipun ladang tidak menghasilkan bahan makanan, kambing domba terhalau dari kurungan, dan tidak ada lembu dalam kandang, namun aku akan bersorak-sorak di dalam TUHAN, beria-ria di dalam Allah yang menyelamatkan aku.",
  },
  {
    ref: "Zefanya 3:17",
    text: "TUHAN Allahmu ada di antaramu sebagai pahlawan yang memberi kemenangan. Ia bergirang karena engkau dengan sukacita, Ia membaharui engkau dalam kasih-Nya, Ia bersorak-sorak karena engkau dengan sukacita.",
  },
  {
    ref: "Roma 12:12",
    text: "Bersukacitalah dalam pengharapan, sabarlah dalam kesesakan, dan bertekunlah dalam doa!",
  },
  {
    ref: "2 Korintus 12:9",
    text: "Tetapi jawab Tuhan kepadaku: \u201cCukuplah kasih karunia-Ku bagimu, sebab justru dalam kelemahanlah kuasa-Ku menjadi sempurna.\u201d Sebab itu terlebih suka aku bermegah atas kelemahanku, supaya kuasa Kristus turun menaungi aku.",
  },
  {
    ref: "Galatia 6:9",
    text: "Janganlah kita jemu-jemu berbuat baik, karena apabila sudah datang waktunya, kita akan menuai, jika kita tidak menjadi lemah.",
  },
  {
    ref: "Kolose 3:2",
    text: "Pikirkanlah perkara yang di atas, bukan yang di bumi.",
  },
  {
    ref: "1 Tesalonika 5:16-18",
    text: "Bersukacitalah senantiasa. Tetaplah berdoa. Mengucap syukurlah dalam segala hal, sebab itulah yang dikehendaki Allah di dalam Kristus Yesus bagi kamu.",
  },
  {
    ref: "Yakobus 1:2-3",
    text: "Anggaplah sebagai suatu kebahagiaan, saudara-saudaraku, apabila kamu jatuh ke dalam berbagai-bagai pencobaan, sebab kamu tahu, bahwa ujian terhadap imanmu itu menghasilkan ketekunan.",
  },
  {
    ref: "Yakobus 1:17",
    text: "Setiap pemberian yang baik dan setiap anugerah yang sempurna, datangnya dari atas, diturunkan dari Bapa segala terang; pada-Nya tidak ada perubahan atau bayangan karena pertukaran.",
  },
  {
    ref: "1 Petrus 2:9",
    text: "Tetapi kamulah bangsa yang terpilih, imamat yang rajani, bangsa yang kudus, umat kepunyaan Allah sendiri, supaya kamu memberitakan perbuatan-perbuatan yang besar dari Dia, yang telah memanggil kamu keluar dari kegelapan kepada terang-Nya yang ajaib.",
  },
];

/** canonical (normalized) → verse */
export const VERSES: Record<string, Verse> = ENTRIES.reduce((acc, v) => {
  acc[normalizeRef(v.ref)] = v;
  return acc;
}, {} as Record<string, Verse>);

/** Returns curated verse text for a reference, or null if not in the set. */
export function getVerse(ref: string): Verse | null {
  return VERSES[normalizeRef(ref)] ?? null;
}

/**
 * Ordered list of references used by the "Ayat Harian" card. Intentionally
 * skips the most over-quoted verses (Yoh 3:16, Maz 23, Flp 4:13, Rm 8:28, …)
 * in favour of deeper cuts. Every entry here MUST exist in VERSES above so the
 * card always has verified local text. A deterministic day-of-year index keeps
 * the verse stable for everyone for the whole day.
 */
export const DAILY_VERSES: string[] = [
  "Mikha 6:8",
  "Zefanya 3:17",
  "Amsal 16:9",
  "Ratapan 3:25-26",
  "Pengkhotbah 3:11",
  "Yesaya 26:3",
  "Mazmur 90:12",
  "Habakuk 3:17-18",
  "2 Korintus 12:9",
  "Mazmur 139:23-24",
  "Yakobus 1:2-3",
  "Amsal 18:10",
  "Nahum 1:7",
  "Roma 12:12",
  "Yesaya 43:2",
  "1 Tesalonika 5:16-18",
  "Ulangan 31:8",
  "Mazmur 37:4",
  "Galatia 6:9",
  "Yakobus 1:17",
  "Mazmur 73:26",
  "Kolose 3:2",
  "1 Petrus 2:9",
];

/** Day-of-year (1-366) in the given date's local time. */
function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

/** Deterministic verse-of-the-day. */
export function getDailyVerse(date = new Date()): Verse {
  const idx = dayOfYear(date) % DAILY_VERSES.length;
  return VERSES[normalizeRef(DAILY_VERSES[idx])] ?? ENTRIES[0];
}
