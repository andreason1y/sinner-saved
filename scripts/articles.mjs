// SinnerSaved — Deep articles
// Tiptap JSON content. Imported by scripts/seed.mjs.

const doc = (...content) => ({ type: "doc", content });
const t = (text) => ({ type: "text", text });
const bold = (text) => ({ type: "text", text, marks: [{ type: "bold" }] });
const italic = (text) => ({ type: "text", text, marks: [{ type: "italic" }] });
const code = (text) => ({ type: "text", text, marks: [{ type: "code" }] });
const p = (...parts) => ({
  type: "paragraph",
  content: parts.length ? parts.map((x) => (typeof x === "string" ? t(x) : x)) : [],
});
const h2 = (text) => ({ type: "heading", attrs: { level: 2 }, content: [t(text)] });
const h3 = (text) => ({ type: "heading", attrs: { level: 3 }, content: [t(text)] });
const blockquote = (text) => ({
  type: "blockquote",
  content: [{ type: "paragraph", content: [t(text)] }],
});
const ul = (...items) => ({
  type: "bulletList",
  content: items.map((x) => ({
    type: "listItem",
    content: [{ type: "paragraph", content: [typeof x === "string" ? t(x) : x] }],
  })),
});
const ol = (...items) => ({
  type: "orderedList",
  attrs: { start: 1 },
  content: items.map((x) => ({
    type: "listItem",
    content: [{ type: "paragraph", content: [typeof x === "string" ? t(x) : x] }],
  })),
});
const codeBlock = (text, lang) => ({
  type: "codeBlock",
  attrs: { language: lang || null },
  content: [t(text)],
});
const hr = () => ({ type: "horizontalRule" });

// =========================================================================
// 1. Tiga Kata Cinta di Yohanes 21 (Makna Kata Asli)
// =========================================================================
const article1 = doc(
  p(
    "Pertama kali saya mendengar khotbah tentang dialog Yesus dan Petrus di tepi Danau Tiberias, penjelasannya rapi dan menggugah. Yesus, kata khotbah itu, bertanya dua kali dengan kata ",
    italic("agape"),
    " — cinta tertinggi, ilahi, tanpa syarat. Petrus tidak berani naik ke level itu, jadi ia hanya bisa menjawab dengan ",
    italic("phileo"),
    " — cinta persahabatan, hangat tapi terbatas. Lalu di pertanyaan ketiga, Yesus turun ke level Petrus dan ikut memakai ",
    italic("phileo"),
    ". Sebuah kasih yang merendahkan diri demi memulihkan."
  ),
  p(
    "Penjelasan itu indah. Sayangnya, sebagian besarnya tidak bertahan lama ketika saya buka teks Yunaninya."
  ),

  h2("Bukan setiap perbedaan kata adalah perbedaan makna"),
  p(
    "Hal pertama yang harus jujur kita akui: Yohanes adalah penulis yang gemar menukar-nukar sinonim. Dalam pasal yang sama (Yohanes 21:15–17), ia juga menukar tiga pasangan kata lain: 'memberi makan' (boskō) dengan 'menggembalakan' (poimainō); 'domba kecil' (arnion) dengan 'domba' (probaton); dan 'tahu' dalam 'Engkau tahu segala sesuatu' memakai dua kata Yunani berbeda. Apakah setiap pertukaran ini juga membawa pesan teologis yang halus?"
  ),
  p(
    "D.A. Carson — penafsir yang teliti dan tidak mudah terkesan — mencatat bahwa pertukaran semacam ini adalah ciri gaya Yohanes, bukan sinyal teologis di tiap kasus. Ia benar untuk berhati-hati. Banyak khotbah membaca terlalu banyak ke dalam tiap perbedaan kata, dan akhirnya bukan teks yang berbicara, tapi imajinasi penafsir."
  ),
  p(
    "Tetapi mengakui ini tidak berarti pertukaran ",
    italic("agape"),
    " ke ",
    italic("phileo"),
    " sama sekali tidak bermakna. Konteksnya — terutama konteks naratif yang lebih luas — memberi cahaya yang sulit diabaikan."
  ),

  h2("Dua perapian yang tidak boleh kita lupakan"),
  p(
    "Yohanes memakai sebuah kata Yunani yang sangat langka: ",
    italic("anthrakia"),
    " — 'api dari arang.' Kata ini hanya muncul dua kali dalam seluruh Perjanjian Baru, dan keduanya ada di Injil Yohanes."
  ),
  p(
    "Pertama, di Yohanes 18:18. Petrus berdiri menghangatkan diri di api arang yang dinyalakan para pelayan imam besar. Di api itu, ia menyangkal Yesus tiga kali."
  ),
  p(
    "Kedua, di Yohanes 21:9. Setelah kebangkitan, Yesus menyalakan api arang sendiri di pantai dan mengundang para murid-Nya makan ikan."
  ),
  p(
    "Ini bukan kebetulan. Yohanes — yang menulis dengan ekonomi kata yang tinggi — sengaja memakai kata yang sama untuk menghubungkan dua adegan ini. Petrus berjalan dari satu api ke api yang lain. Dari api yang menjadi saksi penyangkalannya ke api yang akan menjadi saksi pemulihannya."
  ),
  blockquote(
    "Yang Yesus pulihkan bukan abstraksi tentang kasih, tapi laki-laki yang masih bisa mencium asap pengkhianatannya sendiri."
  ),

  h2("Tiga pertanyaan untuk tiga penyangkalan"),
  p(
    "Petrus menyangkal tiga kali. Yesus bertanya tiga kali. Korespondensi ini terlalu rapi untuk dianggap kebetulan, dan inilah kuncinya: Yesus tidak meminta Petrus melupakan masa lalunya. Ia justru kembali ke titik luka itu, dengan presisi seorang ahli bedah."
  ),
  p(
    "Banyak dari kita ingin pemulihan yang menutupi bekas. Yesus memberi pemulihan yang membuka kembali bekas itu, lalu menghapusnya bukan dengan menjilatnya bersih, tapi dengan menggantinya menjadi panggilan: 'Gembalakan domba-domba-Ku.'"
  ),
  p(
    "Pemulihan yang seperti ini selalu mahal. Itu sebabnya teks mencatat bahwa Petrus menjadi sedih di pertanyaan ketiga (ay. 17). Bukan karena Yesus 'turun ke level' phileo — Petrus sedih karena ia tahu mengapa pertanyaan itu ditanyakan tiga kali."
  ),

  h2("Lalu apa makna pertukaran kata itu?"),
  p(
    "Saya pikir, jika ada makna teologis dalam pertukaran ",
    italic("agape"),
    " ke ",
    italic("phileo"),
    ", letaknya bukan pada kontras 'cinta tertinggi' versus 'cinta yang lebih rendah'. Itu pembagian yang dipaksakan dari kosakata teologis modern, bukan dari pemakaian Yohanes sendiri (Yohanes memakai ",
    italic("agapao"),
    " untuk Bapa yang mengasihi Anak — tapi juga dalam Yohanes 12:25, untuk seorang yang 'mengasihi nyawanya' dan akan kehilangan; dan di Yohanes 3:19, ",
    italic("agapao"),
    " dipakai untuk manusia yang 'lebih mengasihi kegelapan'). Kata yang sama, valensi yang berbeda."
  ),
  p(
    "Jadi pertukaran di Yohanes 21 mungkin lebih mirip ini: Yesus pertama-tama menggunakan kata yang lebih formal dan lebih luas. Petrus menjawab dengan kata yang lebih hangat dan lebih personal — 'Tuhan, Engkau tahu, ada kehangatan di hati saya.' Pada pertanyaan ketiga, Yesus pindah ke kata Petrus sendiri. Bukan karena Yesus turun, tapi karena Yesus berbicara dalam bahasa hati Petrus."
  ),
  p(
    "Pemulihan, ketika dilakukan dengan benar, selalu masuk ke dalam kosakata orang yang dipulihkan."
  ),

  h2("Korelasi yang lebih luas"),
  p(
    "Adegan ini bukan tertutup pada dirinya sendiri. Ia bergema dengan beberapa teks lain:"
  ),
  ul(
    "Lukas 22:31–32 — 'Aku berdoa untukmu, supaya imanmu jangan gugur. Dan engkau, jika sudah kembali, kuatkanlah saudara-saudaramu.' Yesus sudah merencanakan pemulihan ini sebelum kejatuhan terjadi.",
    "Yesaya 49:15 — 'Dapatkah seorang perempuan melupakan bayinya?' Bahasa kasih Allah yang tidak melepaskan, bahkan ketika kita melepaskan diri.",
    "1 Yohanes 4:19 — 'Kita mengasihi, karena Allah lebih dahulu mengasihi kita.' Petrus belajar di pantai itu apa yang kemudian akan ia rumuskan dalam suratnya: kasih kita selalu adalah jawaban, bukan inisiatif."
  ),

  h2("Bagi Anda dan saya"),
  p(
    "Ada dua hal yang saya bawa pulang dari adegan ini, dan saya pikir keduanya layak Anda renungkan juga."
  ),
  p(
    "Pertama, jika Anda pernah menyangkal — dengan kata, dengan diam, dengan hidup yang tidak berani menyebut nama-Nya di tempat tertentu — perhatikan bahwa Yesus tidak meminta Anda untuk menyembunyikan asap itu. Ia justru menyalakan api lagi, mengundang Anda duduk, dan bertanya pelan: 'Apakah kamu mengasihi Aku?' Tiga kali, kalau perlu. Sampai pertanyaan itu mengena."
  ),
  p(
    "Kedua, ketika Anda memulihkan orang lain — anak, sahabat, jemaat, bawahan — pelajari cara Yesus. Jangan paksakan orang itu naik ke kosakata Anda. Pindah ke bahasa hatinya. Pemulihan yang sejati selalu memakai kata-kata yang orang itu sendiri sudah berikan; tugas kita hanya mengubah arahnya."
  ),
  p(
    "Petrus, beberapa tahun kemudian, akan menulis tentang Kristus yang ia kasihi 'meskipun kamu sekarang tidak melihat-Nya' (1 Pet. 1:8). Kata yang ia pakai di sana adalah ",
    italic("agapate"),
    ". Ia akhirnya naik ke kata itu — bukan karena Yesus memaksanya, tapi karena Yesus pernah turun terlebih dahulu."
  )
);

// =========================================================================
// 2. Yerusalem yang Yesus Tangisi (Sejarah & Budaya)
// =========================================================================
const article2 = doc(
  p(
    "Lukas 19:41 mencatat sebuah kalimat yang singkat dan ganjil: 'Dan ketika Yesus telah dekat dan melihat kota itu, Ia menangisi-nya.' Tiga kata kerja saja: dekat, melihat, menangis. Tetapi untuk membaca kalimat ini dengan benar, kita harus tahu kota apa yang sedang Ia lihat."
  ),
  p(
    "Yerusalem yang Yesus tangisi bukan kota di buku gambar Sekolah Minggu. Ia adalah kota yang sesak, sengit, secara politik genting, dan secara teologis bingung. Sebuah kota yang sedang diduduki, dan rakyatnya tahu itu setiap kali mereka berjumpa tentara Romawi di tikungan jalan."
  ),

  h2("Sebuah kota dalam tegangan"),
  p(
    "Yerusalem abad pertama duduk di atas dataran tinggi Yudea, dengan tembok kira-kira 1,5 kilometer persegi. Penduduk normalnya sekitar 80.000 orang. Tetapi pada Paskah, Pentakosta, dan Pondok Daun, kota itu membengkak hingga lima kali lipat. Yosefus mencatat — mungkin dengan dramatisasi yang biasa pada sejarawan kuno — bahwa pada Paskah jumlah pengunjung bisa lebih dari sejuta. Bahkan jika kita potong angka itu separuhnya, kita masih sedang membayangkan kota berukuran kecamatan yang dipadati orang dari seluruh dunia Romawi."
  ),
  p(
    "Bait Suci, yang baru saja direkonstruksi besar-besaran oleh Herodes Agung, adalah jantung visual kota. Yosefus menggambarkan batu-batu kompleks ini sebagai 'putih bagaikan salju dan beberapa di antaranya begitu besarnya sehingga sulit dipindahkan oleh ratusan tenaga kerja.' Bait Suci adalah pusat ekonomi, pusat ibadah, dan — yang paling penting untuk konteks ini — pusat harapan."
  ),
  p(
    "Sebab di balik tembok itu, denyut yang terkuat adalah denyut Mesianisme. Selama lebih dari satu abad, kota ini sudah merindukan seorang pembebas. Berbagai gerakan messianik datang dan pergi: Yudas dari Galilea, Theudas, dan beberapa lainnya yang Lukas dan Yosefus catat dengan singkat (Kis. 5:36–37). Kebanyakan berakhir dengan salib Romawi. Tapi harapan itu tidak pernah benar-benar mati."
  ),

  h2("Yang Yesus lihat — dan yang Ia tolak"),
  p(
    "Ketika Yesus memasuki Yerusalem dari Bukit Zaitun, Ia masuk ke dalam ekspektasi yang sangat spesifik. Orang-orang melambaikan daun palem (Yoh. 12:13) — simbol perlawanan nasionalis sejak Pemberontakan Makabe dua abad sebelumnya. Mereka berseru, 'Hosana bagi Anak Daud!' (Mat. 21:9) — sebuah pengakuan messianik yang sarat aspirasi politik."
  ),
  p(
    "Tetapi Yesus naik keledai, bukan kuda perang. Itu kutipan dari Zakharia 9:9 — 'lihat, Rajamu datang kepadamu, lemah lembut, mengendarai keledai.' Ayat itu, dalam Zakharia, dilanjutkan: 'Aku akan melenyapkan kereta-kereta dari Efraim dan kuda-kuda dari Yerusalem; busur perang akan dilenyapkan, dan ia akan memberitakan damai kepada bangsa-bangsa.' Mesias yang Yesus klaim sebagai diri-Nya adalah Mesias yang melucuti senjata, bukan yang mengangkatnya."
  ),
  p(
    "Itulah ketegangan yang menjadi penyebab tangisan-Nya. Kota ini menyambut-Nya, tapi mereka menyambut sosok yang mereka rancang sendiri — bukan sosok yang sebenarnya datang."
  ),
  blockquote(
    "Mungkin pengkhianatan paling halus terhadap Kristus bukan menolak-Nya, tapi menyambut-Nya dengan harapan yang salah."
  ),

  h2("Air mata yang membaca empat dekade ke depan"),
  p(
    "Yesus menangis bukan hanya karena saat itu. Lukas 19:43–44 memberi tahu kita apa yang Ia lihat: 'sebab akan datang harinya, bahwa musuhmu akan mengelilingi engkau dengan kubu, dan akan mengepung engkau dan menghimpit engkau dari segala jurusan; dan mereka akan membinasakan engkau beserta dengan pendudukmu, dan pada tembokmu mereka tidak akan membiarkan satu batu pun tinggal terletak di atas batu yang lain.'"
  ),
  p(
    "Empat dekade setelah Ia mengucapkan kalimat itu, Titus dan tentara Romawi mengelilingi Yerusalem. Pada tahun 70 Masehi, kelaparan begitu hebat sehingga Yosefus mencatat seorang ibu memakan bayinya sendiri. Bait Suci dibakar; batu-batunya tumbang. Yang tersisa hari ini di Tembok Ratapan adalah dinding penopang luar — tidak satu batu pun dari bangunan utama tetap di atas batu lainnya."
  ),
  p(
    "Yesus tidak menangis dari ketidaktahuan tentang masa depan. Ia menangis dari pengetahuan penuh tentangnya."
  ),

  h2("Ia tidak hanya menangisi Yerusalem"),
  p(
    "Saya pikir keliru kalau kita membaca adegan ini hanya sebagai catatan sejarah Israel. Yerusalem dalam Alkitab adalah lebih dari sebuah kota — ia adalah simbol dari komunitas perjanjian. Dan ketegangan antara 'Yerusalem yang ada' dan 'Yerusalem yang seharusnya' merentang sepanjang Kitab Suci."
  ),
  p(
    "Kitab para Nabi penuh dengan cara yang berbeda untuk mengeluh tentang Yerusalem. Yesaya menyebutnya 'pelacur yang setia berubah menjadi pelacur' (Yes. 1:21). Yeremia menulis Kitab Ratapan saat melihatnya jatuh ke tangan Babel pertama kali. Yehezkiel melihat kemuliaan TUHAN secara perlahan meninggalkan Bait Suci dalam vision di pasal 8–11."
  ),
  p(
    "Setiap nabi yang menangisi Yerusalem akhirnya juga menubuatkan pemulihannya. Yang menarik di Lukas 19 adalah Yesus berdiri sebagai puncak para nabi itu — Ia menangis seperti Yeremia, melihat kehancuran seperti Yehezkiel — tetapi Ia juga adalah pemulihan yang dijanjikan. Ia adalah Yang menangisi kota itu, dan Yang akan mati untuk membangun kembali."
  ),

  h2("Yerusalem yang akan turun"),
  p(
    "Wahyu 21 memberi gambar yang luar biasa. Yerusalem yang baru tidak dibangun dari bawah ke atas; ia turun dari atas. 'Dan aku melihat kota yang kudus, Yerusalem yang baru, turun dari sorga, dari Allah, yang berhias bagaikan pengantin perempuan yang berdandan untuk suaminya.'"
  ),
  p(
    "Detail ini bukan sekadar puisi. Yerusalem sejarah dibangun dengan tangan manusia dan dihancurkan oleh tangan manusia. Setiap upaya kita untuk membuat 'kota Allah' di dunia ini — dari Konstantinus sampai Genève, dari Salem sampai upaya politik kontemporer — selalu rapuh terhadap pembusukan yang sama yang membuat Yesus menangis di Bukit Zaitun."
  ),
  p(
    "Yerusalem yang Allah maksudkan tidak akan datang dari kerja keras kita. Ia akan turun. Dan ketika ia turun, tidak ada Bait Suci di dalamnya — 'sebab Allah, Tuhan Yang Mahakuasa, adalah Bait Sucinya, demikian juga Anak Domba' (Why. 21:22)."
  ),

  h2("Bagi Anda dan saya"),
  p(
    "Saya tinggal di kota — bukan Yerusalem, tetapi kota saya sendiri, yang juga punya tegangan, harapan yang salah arah, dan denyut yang campur antara doa dan keluhan. Saya pikir setiap orang yang tinggal di kota Kristen — atau di pinggirannya — tahu rasa ini."
  ),
  p(
    "Pertanyaan yang adegan ini ajukan ke saya bukan: 'Apakah kotamu cukup baik?' Tetapi: 'Ekspektasi mana yang kamu bawa kepada Kristus, dan apakah kamu siap menangis bersama-Nya jika ekspektasi itu salah?'"
  ),
  p(
    "Yesus tidak menyalahkan Yerusalem karena ia memiliki harapan. Ia menangisi Yerusalem karena harapan itu menutupi kunjungan-Nya — 'engkau tidak mengetahui saat Allah melawat engkau' (Luk. 19:44). Bahaya terbesar bagi orang religius bukan keraguan; ia adalah ekspektasi yang sudah diisi penuh sehingga tidak ada ruang lagi untuk Tuhan yang sebenarnya datang."
  ),
  p(
    "Hari ini, ketika Anda berdoa, perhatikan: apakah Anda meminta kepada Yesus untuk meneguhkan apa yang sudah Anda inginkan, atau Anda memberikan diri Anda untuk apa yang Ia inginkan? Yang pertama adalah Yerusalem yang melambaikan palem. Yang kedua adalah pengantin perempuan yang turun dari sorga, berhias untuk suaminya, tanpa lagi memerlukan bait yang dibangun manusia."
  )
);

// =========================================================================
// 3. Roma 9: Predestinasi yang Tidak Berusaha Menyenangkan Anda (Ayat-ayat Sulit)
// =========================================================================
const article3 = doc(
  p(
    "Kalau Anda membaca surat Roma satu kali dalam satu duduk — yang sebenarnya cara Paulus berharap suratnya dibaca — Anda akan sampai di pasal 9 dengan kepala sedikit pusing. Pasal-pasal sebelumnya sudah cukup sulit: pendamaian, pembenaran, kesatuan dengan Kristus, hidup dalam Roh. Tapi pasal 9 adalah jenis yang lain dari kesulitan. Ia bukan sulit secara intelektual saja; ia sulit secara emosional."
  ),
  p(
    "Dan saya pikir itu bukan kebetulan. Paulus sendiri tahu pasal ini akan menyakitkan, karena ia membukanya dengan pengakuan mengejutkan: 'Aku mengatakan kebenaran dalam Kristus … aku mau terkutuk dan terpisah dari Kristus demi saudara-saudaraku, kaum sebangsaku' (Rom. 9:1–3)."
  ),
  p(
    "Itu bukan pembukaan dari teolog yang dingin. Itu pembukaan dari seorang yang akan mengajar tentang pemilihan ilahi sambil menangis."
  ),

  h2("Mengapa pasal 9 ada di sana"),
  p(
    "Pertanyaan pertama yang harus kita tanyakan bukan 'apa kata Paulus tentang predestinasi.' Pertanyaan pertama adalah: mengapa ia menulis pasal 9 sama sekali?"
  ),
  p(
    "Konteksnya: Paulus baru saja mengakhiri pasal 8 dengan pernyataan yang luar biasa — 'tidak ada sesuatu pun yang akan dapat memisahkan kita dari kasih Allah, yang ada dalam Kristus Yesus' (Rom. 8:39). Tetapi ada satu masalah yang akan langsung muncul di kepala pembaca Yahudi yang cermat: kalau janji-janji Allah memang tidak terpatahkan, mengapa banyak Israel — bangsa perjanjian — tidak menerima Kristus? Apakah Allah gagal pada janji-Nya kepada Abraham?"
  ),
  p(
    "Pasal 9–11 adalah satu argumen panjang yang menjawab: tidak. Bukan firman Allah yang gagal. Yang gagal adalah cara kita memahami siapa 'Israel' yang dimaksud."
  ),

  h2("Bukan semua keturunan Abraham adalah Israel"),
  p(
    "Paulus bekerja sangat hati-hati di sini. Ia mulai dengan dua kasus dari Kitab Kejadian — keduanya kasus-kasus 'pemilihan' yang tidak nyaman."
  ),
  p(
    "Pertama, Ismael dan Ishak. Keduanya anak Abraham; hanya satu yang menjadi anak perjanjian. 'Bukan anak-anak menurut daging adalah anak-anak Allah, tetapi anak-anak perjanjianlah yang dianggap sebagai keturunan Abraham' (Rom. 9:8). Keturunan biologis tidak otomatis berarti keturunan janji."
  ),
  p(
    "Kedua, dan inilah yang lebih berat: Yakub dan Esau. Mereka adalah saudara kembar dari ibu yang sama. Tidak ada perbedaan latar belakang. Dan Paulus memberi tahu kita kapan Allah memilih: 'sebab waktu anak-anak itu belum dilahirkan dan belum melakukan yang baik atau yang jahat — supaya rencana Allah tentang pemilihan-Nya diteguhkan, bukan berdasarkan perbuatan, tetapi berdasarkan panggilan-Nya' (Rom. 9:11)."
  ),
  p(
    "Lalu Paulus mengutip Maleakhi 1:2–3: 'Aku mengasihi Yakub, tetapi membenci Esau.'"
  ),
  p(
    "Itu bukan ayat untuk dipajang di dinding."
  ),

  h2("Tetapi mari kita baca dengan lebih hati-hati"),
  p(
    "Beberapa hal harus kita perhatikan sebelum panik."
  ),
  p(
    "Pertama, dalam konteks Maleakhi sendiri, 'Yakub' dan 'Esau' adalah dua bangsa — Israel dan Edom — bukan dua individu. Maleakhi 1:4 langsung berbicara tentang 'wilayah Edom' yang dirobohkan. Jadi Paulus, ketika ia mengutip ayat ini, mungkin sedang menggunakannya dengan sense korporatif yang sama: ini tentang bagaimana Allah memilih satu garis perjanjian melalui sejarah, bukan tentang individu A versus individu B yang masing-masing dipredestinasi ke surga atau neraka sebelum mereka ada."
  ),
  p(
    "Kedua, kata Ibrani yang diterjemahkan 'membenci' (",
    italic("sane"),
    ") sering memakai sense komparatif dalam idiom Ibrani — 'kurang dikasihi daripada' yang lain. Bandingkan dengan Lukas 14:26: 'Jikalau seorang datang kepada-Ku dan ia tidak membenci bapanya, ibunya, isterinya, anak-anaknya, saudara-saudaranya laki-laki atau perempuan, bahkan nyawanya sendiri, ia tidak dapat menjadi murid-Ku.' Yesus tidak meminta kita harum kebencian aktif terhadap orang tua kita. Ia memakai idiom yang sama."
  ),
  p(
    "Ini tidak melenyapkan kekuatan teks. Pemilihan ilahi tetap ada, dan Paulus tidak meminta maaf untuknya. Tetapi ini menyelamatkan kita dari membaca ayat ini sebagai potret Allah yang memutuskan, dengan dingin dan sebelum penciptaan, untuk membenci orang tertentu untuk kekekalan."
  ),

  h2("Firaun, dan pertanyaan tentang siapa mengeraskan dulu"),
  p(
    "Paulus melanjutkan dengan kasus yang lebih sulit lagi: Firaun. Ia mengutip Keluaran 9:16 — 'Inilah sebabnya Aku membiarkan engkau hidup, yaitu supaya memperlihatkan kepadamu kekuasaan-Ku.' Lalu ia menyimpulkan: 'Ia menaruh belas kasihan kepada siapa yang dikehendaki-Nya dan Ia menegarkan hati siapa yang dikehendaki-Nya' (Rom. 9:18)."
  ),
  p(
    "Hati-hati membaca Keluaran sendiri. Cerita Firaun tidak sesederhana 'Allah mengeraskan, Firaun korban.' Mari hitung:"
  ),
  ul(
    "Sebelum tulah pertama, Allah memang berbicara tentang 'mengeraskan hati Firaun' (Kel. 4:21; 7:3). Ini sebagai prediksi.",
    "Tetapi ketika tulah dimulai, lima kali pertama teks justru berkata: 'hati Firaun tetap keras' atau 'Firaun mengeraskan hatinya' (Kel. 7:13, 22; 8:15, 19, 32). Subjek aktifnya adalah Firaun.",
    "Baru pada tulah keenam dan setelahnya teks berkata: 'TUHAN mengeraskan hati Firaun' (Kel. 9:12; 10:1, 20, 27; 11:10; 14:8)."
  ),
  p(
    "Ini bukan kebetulan urutan. Allah, menurut Keluaran, mengeraskan hati seorang yang sudah lebih dulu mengeraskan hatinya sendiri. Ada sense judisial di sini — Allah menyerahkan Firaun kepada apa yang Firaun sendiri sudah pilih (bandingkan Rom. 1:24, 26, 28: 'Allah menyerahkan mereka')."
  ),
  blockquote(
    "Pengerasan hati ilahi dalam Alkitab hampir selalu adalah ratifikasi dari pengerasan diri yang sudah berlangsung — bukan inisiatif Allah yang sewenang-wenang."
  ),

  h2("Bejana kemurahan dan bejana kemurkaan"),
  p(
    "Ayat 22–23 sering dibaca sebagai: 'Allah menciptakan sebagian orang sebagai bejana kemurkaan dan sebagian lain sebagai bejana kemurahan.' Tetapi perhatikan pilihan kata Paulus."
  ),
  p(
    "Ayat 22: bejana kemurkaan 'yang telah disediakan' (",
    italic("katērtismena"),
    ") — bentuk pasif. Tidak dikatakan 'yang Allah siapkan.' Ada kesengajaan teologis di sini; banyak penafsir berargumen bahwa subjek implisitnya bisa jadi adalah bejana itu sendiri yang menyiapkan diri untuk binasa."
  ),
  p(
    "Ayat 23: bejana kemurahan 'yang telah dipersiapkan-Nya' (",
    italic("proētoimasen"),
    ") — bentuk aktif, dengan Allah sebagai subjek eksplisit."
  ),
  p(
    "Asimetri ini tidak boleh dianggap kebetulan. Paulus, dengan presisi gramatikal yang khas, menjaga jarak antara dua hal: keselamatan kita sepenuhnya dari Allah; tetapi kebinasaan, jika datang, datang dari diri kita sendiri yang menyiapkannya."
  ),

  h2("Roma 11 sebagai antidot"),
  p(
    "Pasal 9 tidak boleh dibaca sendirian. Paulus, setelah dua pasal yang sangat berat, menutup unit besar ini dengan sebuah doxologi. Roma 11 berakhir dengan ayat yang sering kita cantumkan tapi jarang kita biarkan benar-benar mengubah cara kita membaca pasal 9:"
  ),
  blockquote(
    "Sebab Allah telah mengurung semua orang dalam ketidaktaatan, supaya Ia dapat menunjukkan kemurahan-Nya atas mereka semua. — Roma 11:32"
  ),
  p(
    "'Mereka semua.' Setelah dua pasal tentang pemilihan, pengerasan, dan bejana, Paulus mendarat pada kalimat yang luas hampir tak terkira. Predestinasi yang ia ajarkan, sebagaimana pun keras dalam detailnya, berujung pada Allah yang ingin menunjukkan kemurahan kepada banyak orang. Bukan untuk membela kemurkaan-Nya. Bukan untuk membenarkan keputusan-Nya. Untuk menunjukkan kemurahan."
  ),

  h2("Doktrin sulit dan kerendahan hati"),
  p(
    "Saya tidak akan berpura-pura semua keberatan terhadap pasal 9 punya jawaban yang membuat hati lega. Sebagian tetap meninggalkan rasa pahit kecil di lidah, dan saya pikir Paulus tahu itu juga. Itu sebabnya ia menutup pasal 11 — bukan dengan jawaban yang lebih dingin — tetapi dengan kekaguman: 'O alangkah dalamnya kekayaan, hikmat dan pengetahuan Allah! Sungguh tak terselidiki keputusan-keputusan-Nya' (Rom. 11:33)."
  ),
  p(
    "Doktrin yang sulit adalah pintu menuju kerendahan hati teologis. Kita tidak diizinkan, sebagai orang percaya, untuk tinggal pada paragraf yang nyaman dan loncat dari paragraf yang sulit. Tetapi kita juga tidak diizinkan untuk memakai paragraf yang sulit sebagai pemukul orang-orang yang berbeda dari kita. Antara dua bahaya ini — penolakan dan kebanggaan — Paulus memberi kita jalan ketiga: tinggal di teks, dengan air mata di mata, dan dengan kemurahan-Nya tertanam dalam hati."
  ),
  p(
    "Predestinasi, kalau dibaca dengan benar, tidak membuat saya merasa eksklusif. Ia membuat saya gemetar. Tidak ada satu pun dalam diri saya yang membuat saya layak untuk dipilih. Dan justru karena itu, saya tidak punya alasan untuk merasa lebih tinggi dari siapa pun yang masih belum dipanggil. Tugas saya bukan membaca daftar yang tidak diberikan kepada saya. Tugas saya adalah memberi tahu siapa pun yang mau mendengar bahwa pintu masih terbuka."
  )
);

// =========================================================================
// 4. Mengapa Substitusi Tidak Bisa Dihapus dari Salib (Bedah Doktrin)
// =========================================================================
const article4 = doc(
  p(
    "Setiap dekade, ada gelombang baru yang berusaha menggeser substitusi dari pusat Injil. Argumennya berbeda-beda, tapi keberatan utamanya kurang lebih satu: gambaran Allah yang menghukum Anak-Nya yang tidak bersalah demi memuaskan kemarahan-Nya terdengar — kalau kita berani jujur — agak mengerikan secara moral."
  ),
  p(
    "Saya mengerti keberatan itu. Saya pernah merasakannya sendiri. Tetapi setelah bertahun-tahun membaca Kitab Suci dan mendengarkan kritik-kritik terbaik terhadap doktrin substitusi, saya tetap sampai pada kesimpulan yang sama: kalau substitusi dihapus, yang tersisa bukan versi Injil yang lebih baik. Yang tersisa hanya inspirasi moral yang sopan."
  ),

  h2("Apa yang sebenarnya diserang"),
  p(
    "Sebelum saya membela, saya harus jujur tentang apa yang dibela dan apa yang tidak."
  ),
  p(
    "Yang sering diserang oleh kritik modern adalah karikatur substitusi — versi populer yang memang masalah:"
  ),
  ul(
    "Allah Bapa marah; Yesus mengintervensi.",
    "Allah Bapa adalah hakim yang dingin; Yesus adalah Anak yang penuh kasih.",
    "Salib adalah tempat di mana Allah memuaskan emosi-Nya pada korban tidak bersalah."
  ),
  p(
    "Saya tidak membela versi ini. Versi ini bukan substitusi yang Alkitab ajarkan; ia adalah substitusi yang tritsm-nya pecah, sehingga Bapa dan Anak tidak lagi satu kehendak. Dan justru itu yang Alkitab tolak dengan keras."
  ),

  h2("Substitusi dalam Yesaya 53"),
  p(
    "Mari kita kembali ke teks. Yesaya 53 ditulis tujuh ratus tahun sebelum Kristus, dan teks ini tidak meninggalkan ruang untuk ambiguitas:"
  ),
  blockquote(
    "Tetapi sesungguhnya, penyakit kitalah yang ditanggungnya, dan kesengsaraan kita yang dipikulnya … Ia tertikam oleh karena pemberontakan kita, ia diremukkan oleh karena kejahatan kita; ganjaran yang mendatangkan keselamatan bagi kita ditimpakan kepadanya, dan oleh bilur-bilurnya kita menjadi sembuh. — Yesaya 53:4–5"
  ),
  p(
    "Setiap frasa di sini adalah substitusi: 'penyakit kitalah yang ditanggungnya' (kita yang seharusnya menanggung), 'tertikam oleh karena pemberontakan kita' (kita yang seharusnya ditikam), 'ganjaran … ditimpakan kepadanya' (ganjaran kita, dipindahkan kepadanya). Ini bukan inspirasi. Ini bukan teladan. Ini pertukaran."
  ),
  p(
    "Pasal yang sama menambah hal yang lebih mengganggu: 'Tetapi TUHAN telah menimpakan kepadanya kejahatan kita sekalian' (53:6). 'Tetapi TUHAN berkehendak meremukkan dia dengan kesakitan' (53:10). Aktor utama dalam adegan ini bukan Romawi atau Sanhedrin. TUHAN sendiri."
  ),
  p(
    "Kita tidak bisa hapus baris itu tanpa merobek Yesaya."
  ),

  h2("Hari Pendamaian — gambar yang Yesus penuhi"),
  p(
    "Latar belakang Yesaya 53 adalah Hari Pendamaian (Imamat 16). Pada hari itu, dua kambing dipakai. Yang pertama disembelih, darahnya dipercikkan di Tutup Pendamaian — tempat yang Tuhan janjikan untuk berjumpa dengan Israel di atas Tabut Perjanjian (Kel. 25:22). Yang kedua dilepaskan ke padang gurun, setelah imam besar meletakkan tangannya di kepalanya dan 'mengakui … segala kejahatan orang Israel' (Im. 16:21)."
  ),
  p(
    "Dua kambing, dua aspek dari satu pekerjaan. Yang pertama menanggung hukuman; yang kedua membawa pergi dosa. Itu bukan kebetulan ritual. Itu cetak biru."
  ),
  p(
    "Penulis Ibrani, dengan sengaja, mengangkat semua simbol ini ke Kristus: 'Ia tidak masuk ke dalamnya dengan membawa darah domba jantan dan darah anak lembu, tetapi dengan membawa darah-Nya sendiri … untuk selama-lamanya' (Ibr. 9:12). Ia adalah kedua kambing itu. Ia menanggung hukuman, dan ia membawa pergi dosa."
  ),

  h2("Galatia 3:13 dan 2 Korintus 5:21"),
  p(
    "Paulus, ketika menulis kepada gereja-gereja yang ia rintis, tidak pernah mengaburkan substitusi. Dua ayat menonjol:"
  ),
  blockquote(
    "Kristus telah menebus kita dari kutuk hukum Taurat dengan menjadi kutuk karena kita, sebab ada tertulis: 'Terkutuklah orang yang digantung pada kayu salib!' — Galatia 3:13"
  ),
  blockquote(
    "Dia yang tidak mengenal dosa telah dibuat-Nya menjadi dosa karena kita, supaya dalam Dia kita dibenarkan oleh Allah. — 2 Korintus 5:21"
  ),
  p(
    "Kalimat-kalimat ini sangat berani. Kristus 'menjadi kutuk' (",
    italic("genomenos hyper hēmōn katara"),
    ") — bukan 'mengilustrasikan kutuk', bukan 'menjadi teladan menanggung kutuk'. Ia menjadi-nya. Dan 'dibuat menjadi dosa' (",
    italic("hamartian epoiēsen"),
    ") — bukan 'memperlakukannya sebagai berdosa', tetapi 'membuatnya menjadi dosa.'"
  ),
  p(
    "Bahasa ini akan terdengar mengerikan kalau kita memisahkan Bapa dan Anak. Tetapi Paulus tidak memisahkannya. Justru ia mengatakan bahwa keseluruhan operasi ini adalah karya Allah: 'Allah … telah mendamaikan dunia dengan diri-Nya oleh Kristus' (2 Kor. 5:19). Bukan Anak yang menyelamatkan kita dari Bapa. Itu adalah Bapa, Anak, dan Roh — satu Allah, satu kehendak — yang bekerja bersama untuk menyelamatkan."
  ),

  h2("Jadi mengapa kritikus tetap tidak puas?"),
  p(
    "Saya pikir keberatan moral terhadap substitusi sebenarnya menyembunyikan satu intuisi yang sehat dan satu intuisi yang keliru."
  ),
  p(
    "Intuisi yang sehat: 'Tidak adil untuk satu orang dihukum atas dosa orang lain.' Itu benar dalam pengadilan manusia. Pengadilan kita tidak boleh menjatuhkan hukuman atas substitut. Yang sehat di sini adalah penolakan terhadap injustice."
  ),
  p(
    "Tapi intuisi yang keliru di balik intuisi yang sehat itu adalah ini: 'Kalau substitusi tidak adil, maka Allah seharusnya tidak melakukannya.' Yang dilewatkan di sini adalah satu detail yang sangat penting: Yesus bukan substitut yang dipaksa. Ia adalah Allah yang menyubstitusikan diri-Nya sendiri."
  ),
  blockquote(
    "Dalam pengadilan manusia, hakim tidak boleh menghukum sukarelawan demi membebaskan terdakwa. Tetapi dalam pengadilan ilahi, Hakim itu sendiri yang turun dari kursi dan duduk di kursi terdakwa."
  ),
  p(
    "Kalimat itu mengubah segalanya. Substitusi ilahi bukan tentang Bapa yang dingin dan Anak yang dipaksa. Ia tentang Allah Tritunggal yang sudah memutuskan, sebelum ada dunia, bahwa solusi untuk dosa kita akan dipikul oleh Diri-Nya sendiri. 'Anak Domba yang telah disembelih sejak dunia dijadikan' (Why. 13:8)."
  ),

  h2("Yang akan tersisa kalau kita hapus"),
  p(
    "Beberapa teolog modern menyarankan agar kita ganti substitusi dengan teori-teori lain: Christus Victor (Kristus mengalahkan kuasa jahat di salib), pengaruh moral (salib menggerakkan kita untuk hidup berbeda), recapitulation (Kristus mengulangi sejarah Adam dengan benar)."
  ),
  p(
    "Saya tidak menentang teori-teori ini sama sekali. Christus Victor adalah biblis (Kol. 2:15: 'Ia melucuti pemerintah-pemerintah dan penguasa-penguasa'). Moral influence ada (1 Pet. 2:21: 'Sebab untuk itulah kamu dipanggil … meninggalkan teladan'). Recapitulation kuat dalam Roma 5 dan 1 Korintus 15. Semua ini benar, dan Alkitab mengajarkannya."
  ),
  p(
    "Tetapi mereka tidak menggantikan substitusi; mereka mengelilinginya. Christus Victor menjawab: bagaimana Kristus mengalahkan musuh kita? Substitusi: dengan menanggung penghakiman yang menjadi senjata mereka. Moral influence menjawab: bagaimana salib mengubah saya? Substitusi: dengan menunjukkan harga sebenarnya dari dosa saya. Recapitulation menjawab: apa yang Yesus lakukan sebagai Adam baru? Substitusi: ia menanggung kutukan yang Adam pertama bawa atas kita."
  ),
  p(
    "Hapus substitusi, dan teori-teori lain runtuh. Christus Victor tanpa substitusi adalah pertarungan tanpa darah. Moral influence tanpa substitusi adalah motivasi tanpa pertukaran. Recapitulation tanpa substitusi adalah teladan tanpa transfer."
  ),

  h2("Bagi Anda dan saya"),
  p(
    "Salib bukan formula untuk dianalisis. Tetapi ia juga bukan emosi yang bisa kita biarkan tanpa bentuk. Substitusi memberi salib bentuknya — ia mengatakan kepada saya: dosaku, dosamu, sungguh-sungguh ditangani. Bukan diabaikan. Bukan dipindahkan ke tempat lain. Dipikul."
  ),
  p(
    "Itu sebabnya, ketika saya merasa diri saya terlalu kotor untuk datang kepada Tuhan — dan ada hari-hari ketika perasaan itu sangat kuat — yang menjawab keberatan saya bukan kalimat motivasi atau slogan tentang penerimaan diri. Yang menjawab adalah pertukaran. Bahwa di salib, Yesus menukar diri-Nya yang bersih dengan saya yang kotor — dan menutup transaksi itu sehingga tidak ada lagi yang bisa membatalkannya."
  ),
  p(
    "Anda boleh mengkritik substitusi sebanyak yang Anda mau. Tapi sebelum Anda buang, tanyakan pada diri Anda: kalau ini bukan Injil, lalu apa yang akan Anda berikan kepada orang yang tahu — dengan jujur — bahwa mereka tidak bisa menyelamatkan diri mereka sendiri?"
  )
);

export const ARTICLES = [];
ARTICLES.push({
  title: "Tiga Kata Cinta di Yohanes 21",
  slug: "tiga-kata-cinta-di-yohanes-21",
  excerpt:
    "Khotbah-khotbah populer membaca pertukaran agape dan phileo terlalu rapi. Teks Yunaninya lebih menarik — dan lebih mengena — daripada cerita yang biasa kita dengar di mimbar.",
  cover: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=1600&auto=format&fit=crop&q=80",
  main_category: "ruang-alkitab",
  sub_category: "makna-kata-asli",
  tags: ["yunani", "yohanes", "petrus", "pemulihan"],
  content_json: article1,
  published_at: "2026-05-22T09:00:00Z",
});
ARTICLES.push({
  title: "Yerusalem yang Yesus Tangisi",
  slug: "yerusalem-yang-yesus-tangisi",
  excerpt:
    "Sebelum kita memahami air mata Yesus di Bukit Zaitun, kita harus tahu kota apa yang sedang Ia lihat — dan ekspektasi mana yang sedang menutupi kunjungan-Nya.",
  cover: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=1600&auto=format&fit=crop&q=80",
  main_category: "ruang-alkitab",
  sub_category: "sejarah-budaya",
  tags: ["yerusalem", "lukas", "konteks", "mesianisme"],
  content_json: article2,
  published_at: "2026-05-19T09:00:00Z",
});
ARTICLES.push({
  title: "Roma 9: Predestinasi yang Tidak Berusaha Menyenangkan Anda",
  slug: "roma-9-predestinasi-tidak-menyenangkan",
  excerpt:
    "Yakub-Esau, Firaun, bejana kemurkaan, bejana kemurahan. Pasal yang tidak ramah untuk dipajang — tapi yang justru, jika dibaca dengan air mata, mendarat di kemurahan untuk semua.",
  cover: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1600&auto=format&fit=crop&q=80",
  main_category: "ruang-alkitab",
  sub_category: "ayat-ayat-sulit",
  tags: ["roma", "predestinasi", "kedaulatan", "paulus"],
  content_json: article3,
  published_at: "2026-05-15T09:00:00Z",
});
ARTICLES.push({
  title: "Mengapa Substitusi Tidak Bisa Dihapus dari Salib",
  slug: "mengapa-substitusi-tidak-bisa-dihapus",
  excerpt:
    "Setiap generasi mencoba menggeser substitusi dari pusat. Tetapi tanpa pertukaran, salib hanya menjadi inspirasi moral yang sopan — dan Injil kehilangan jantungnya.",
  cover: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&auto=format&fit=crop&q=80",
  main_category: "ruang-teologi",
  sub_category: "bedah-doktrin",
  tags: ["soteriologi", "salib", "substitusi", "yesaya 53"],
  content_json: article4,
  published_at: "2026-05-12T09:00:00Z",
});



// =========================================================================
// 5. Apologetika sebagai Disposisi, Bukan Teknik (Apologetics)
// =========================================================================
const article5 = doc(
  p(
    "1 Petrus 3:15 adalah ayat yang paling sering dipakai untuk membenarkan apologetika. Tapi hampir tidak ada yang mengutip lanjutannya di ayat 16: 'tetapi haruslah dengan lemah lembut dan hormat, dan dengan hati nurani yang murni.' Petrus tidak hanya meminta kita siap; ia meminta kita siap dengan disposisi tertentu."
  ),
  p(
    "Saya pikir di sinilah apologetika modern sering tersesat. Kita melatih diri untuk punya jawaban — tapi sering kehilangan punya hati."
  ),

  h2("Paulus di Areopagus"),
  p(
    "Kisah Para Rasul 17:22–31 adalah salah satu adegan apologetika paling instruktif di seluruh Alkitab. Paulus berdiri di hadapan filsuf Atena, dan perhatikan apa yang ia lakukan."
  ),
  p(
    "Ia tidak mulai dengan 'Kalian salah.' Ia mulai dengan 'Aku amati bahwa kalian sangat religius dalam segala hal' (ay. 22). Ia mengutip mezbah mereka — 'Kepada Allah yang tidak dikenal' (ay. 23). Ia bahkan mengutip filsuf mereka sendiri, Aratus: 'kita ini juga dari keturunan Allah' (ay. 28)."
  ),
  p(
    "Baru di akhir, setelah membangun jembatan dari kerangka pikir mereka, ia menyebut kebangkitan. Hasilnya: 'beberapa orang mengejek; dan yang lain berkata: Lain kali saja kami mendengar engkau berbicara.' Hanya 'beberapa' yang percaya (ay. 32–34). Paulus tidak mengejar viral. Ia menanam benih, lalu pergi."
  ),
  blockquote(
    "Apologetika yang baik tidak diukur dari berapa banyak yang setuju, tapi dari berapa banyak yang masih mau melanjutkan percakapan."
  ),

  h2("Yesus di hadapan Pilatus"),
  p(
    "Yohanes 18:38: 'Apakah kebenaran itu?' Pilatus bertanya — pertanyaan paling penting dalam sejarah, ditanyakan di hadapan Pribadi yang adalah jawabannya. Lalu yang tercatat di teks: Pilatus tidak menunggu jawaban. Ia langsung berbalik."
  ),
  p(
    "Dan Yesus tidak mengejarnya. Ia tidak berkata, 'Tunggu! Aku punya argumen.' Ia membiarkan pertanyaan itu menggantung."
  ),
  p(
    "Ada saat-saat dalam apologetika ketika diam adalah jawaban yang paling kuat. Bukan diam pasif, tapi diam yang menghormati realitas: tidak setiap pertanyaan datang dari hati yang siap mendengar. Kadang yang paling kasih untuk dilakukan adalah membiarkan orang itu pergi, dan berdoa."
  ),

  h2("Tiga bahaya apologetika modern"),
  p(
    "Pertama, kemenangan argumen yang kalah hati. Anda bisa menang debat dan kehilangan orangnya. Saya pernah melihat ini terjadi — termasuk pada diri saya sendiri."
  ),
  p(
    "Kedua, ketakutan akan ketidakpastian. Kalau Anda merasa harus punya jawaban untuk setiap pertanyaan sebelum Anda boleh percaya, Anda akan mempersenjatai keimanan dengan baju zirah yang melumpuhkannya. Banyak hal di Alkitab yang misterius. 'Saya tidak tahu' adalah kalimat yang sehat dalam apologetika."
  ),
  p(
    "Ketiga, mengubah kekristenan menjadi posisi intelektual. Iman bukan hanya proposisi yang disetujui; iman adalah kepercayaan yang menyerahkan diri. Apologetika yang hanya membela proposisi tanpa mengundang penyerahan diri adalah apologetika yang hanya setengah jadi."
  ),

  h2("Bagi Anda dan saya"),
  p(
    "Disposisi yang Petrus minta — lemah lembut dan hormat — bukan tambahan opsional pada apologetika; ia adalah bentuk apologetika itu sendiri. Cara Anda menjawab adalah bagian dari jawaban Anda."
  ),
  p(
    "Latihlah satu hal sebelum Anda melatih jawaban: pertanyaan. Pertanyaan yang baik membuka, pertanyaan yang buruk menutup. 'Apa yang membuatmu bertanya itu?' lebih kuat dari sepuluh argumen yang sudah Anda hafalkan."
  ),
  p(
    "Dan kalau orang itu pergi tanpa setuju — seperti kebanyakan filsuf di Areopagus — ingat bahwa Paulus tidak menganggap dirinya gagal. Ia menanam, dan ia tahu bahwa pertumbuhan bukan tugasnya. Tugasnya hanya menjaga agar benih yang ia tanam adalah benih yang sebenarnya, bukan tiruan yang dipoles untuk diterima."
  )
);
ARTICLES.push({
  title: "Apologetika sebagai Disposisi, Bukan Teknik",
  slug: "apologetika-disposisi-bukan-teknik",
  excerpt:
    "Petrus tidak hanya meminta kita siap menjawab — ia meminta kita menjawab dengan lemah lembut dan hormat. Cara Anda menjawab adalah bagian dari jawaban Anda.",
  cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&auto=format&fit=crop&q=80",
  main_category: "ruang-teologi",
  sub_category: "apologetics",
  tags: ["apologetika", "1 petrus", "areopagus", "disposisi"],
  content_json: article5,
  published_at: "2026-05-08T09:00:00Z",
});



// =========================================================================
// 6. Bonhoeffer dan Anugerah yang Mahal (Biografi Singkat)
// =========================================================================
const article6 = doc(
  p(
    "Dietrich Bonhoeffer menulis Nachfolge — yang kita kenal sebagai 'The Cost of Discipleship' — di tahun 1937. Ia berusia 31 tahun. Tujuh tahun kemudian, pada 9 April 1945, ia digantung di kamp Flossenbürg, dua minggu sebelum kamp itu dibebaskan oleh tentara Sekutu. Saya tidak bisa membaca bukunya tanpa mengingat ujung kalimat hidupnya."
  ),

  h2("Anugerah murah dan anugerah mahal"),
  p(
    "Kalimat pembuka bukunya adalah salah satu kalimat paling tajam dalam teologi abad kedua puluh: 'Anugerah murah adalah musuh maut Gereja kita. Kita berjuang hari ini untuk anugerah yang mahal.'"
  ),
  p(
    "Apa yang ia maksud? Anugerah murah, tulis Bonhoeffer, adalah 'pengampunan tanpa pertobatan, baptisan tanpa disiplin gereja, perjamuan kudus tanpa pengakuan dosa, absolusi tanpa pengakuan pribadi. Anugerah murah adalah anugerah tanpa pemuridan, anugerah tanpa salib, anugerah tanpa Yesus Kristus yang hidup dan menjelma.'"
  ),
  p(
    "Anugerah mahal, sebaliknya, adalah 'panggilan yang harus diikuti.' Ia mahal 'karena memerintahkan kepada manusia untuk menyerahkan jiwanya; ia adalah anugerah karena memberikan kepadanya satu-satunya kehidupan yang sejati.' Salib bagi Bonhoeffer bukan dekorasi liturgis — ia adalah definisi pemuridan. 'Apabila Kristus memanggil seseorang, Ia memanggilnya untuk datang dan mati' (mengutip Mat. 16:24)."
  ),

  h2("Konteks: gereja yang ikut Hitler"),
  p(
    "Untuk memahami bobot kalimat-kalimat itu, kita perlu mengerti situasi Bonhoeffer. Pada 1934, mayoritas gereja Lutheran Jerman — yang kita kenal sebagai Deutsche Christen — sudah merangkul Nazi. Mereka memajang swastika di gereja, mengeluarkan ayat-ayat dari Perjanjian Lama yang dianggap 'terlalu Yahudi', dan memberi penghormatan Hitler sebagai pemimpin yang dikirim Allah."
  ),
  p(
    "Bonhoeffer dan beberapa kawannya memisahkan diri, membentuk Bekennende Kirche — Gereja yang Mengaku. Konfessi Barmen 1934 (terutama ditulis Karl Barth) menyatakan bahwa Yesus Kristus, bukan Hitler, adalah Tuan Gereja."
  ),
  p(
    "Anugerah murah, dalam konteks ini, bukan hanya kemalasan rohani. Ia adalah agama yang merangkul kekuasaan tanpa salib. Iman yang berbaris bersama yang menang."
  ),

  h2("Keputusan 1939"),
  p(
    "Pada 1939, dengan perang yang akan meletus, Bonhoeffer pergi ke New York. Reinhold Niebuhr dan teman-teman Amerikanya menawarkan posisi mengajar di Union Seminary. Aman. Berpengaruh. Jauh dari risiko."
  ),
  p(
    "Setelah hanya 26 hari, ia menulis surat kepada Niebuhr: 'Aku telah membuat kesalahan dengan datang ke Amerika. Aku harus melalui masa sukar dalam sejarah negara saya bersama orang-orang Kristen Jerman. Aku tidak punya hak untuk berpartisipasi dalam restorasi kehidupan Kristen di Jerman setelah perang kalau aku tidak berbagi dalam pencobaan zaman ini bersama umat-Ku.'"
  ),
  p(
    "Ia kembali. Ia tahu apa yang menunggunya."
  ),

  h2("Plot pembunuhan dan etika ambivalen"),
  p(
    "Bonhoeffer terlibat dalam konspirasi pembunuhan Hitler. Ini bukan keputusan yang ia ambil dengan ringan. Sebagai murid Khotbah di Bukit, ia menulis tentang pasifisme dengan tegas. Tapi pada titik tertentu ia menyimpulkan: kalau seorang sopir mabuk membunuhi pejalan kaki, tugas Kristen bukan hanya merawat korban — tetapi juga menarik kemudi dari sopir itu."
  ),
  p(
    "Ia tidak pernah benar-benar menyelesaikan ketegangan ini secara teologis. Ia tahu pembunuhan Hitler adalah pelanggaran perintah. Ia juga tahu tidak melakukan apa-apa adalah pengkhianatan terhadap nyawa-nyawa yang sedang dibantai. Ia memilih, dan ia menerima bahwa ia mungkin perlu meminta pengampunan untuk pilihan itu."
  ),
  p(
    "Ada sesuatu yang sangat sehat — dan sangat mengganggu — tentang kerendahan hati teologis ini. Bonhoeffer tidak berpura-pura punya jawaban yang rapi untuk dilema yang terdistorsi oleh kejahatan."
  ),

  h2("Surat-surat dari Tegel"),
  p(
    "Bonhoeffer ditangkap pada April 1943. Ia menghabiskan dua tahun di penjara, banyak di Tegel di Berlin. Surat-suratnya yang tersimpan — kemudian diterbitkan sebagai 'Letters and Papers from Prison' — menunjukkan iman yang bertumbuh, bukan menyusut, di balik jeruji."
  ),
  p(
    "Salah satu kalimat paling diingat dari surat itu: 'Bukan dengan religiositas yang dangkal kita menjadi Kristen, tapi dengan partisipasi dalam penderitaan Allah di dunia.' Ia menulis ini di penjara, bukan di mimbar. Ia tahu apa yang ia tulis."
  ),

  h2("9 April 1945"),
  p(
    "Pada subuh 9 April 1945, Bonhoeffer dibangunkan dan dibawa ke tiang gantungan di Flossenbürg. Dokter kamp itu, yang menyaksikan eksekusinya, menulis: 'Aku melihat Pendeta Bonhoeffer berlutut di lantai sel, berdoa dengan khusuk kepada Tuhannya. Aku terkejut dengan cara ia berdoa, sangat saleh dan dengan keyakinan penuh bahwa Tuhan mendengarkan doanya. Di tempat eksekusi, ia mengucapkan doa pendek lagi, lalu naik tangga menuju tiang gantungan dengan berani dan tenang.'"
  ),
  p(
    "Ia berusia 39 tahun."
  ),

  h2("Bagi Anda dan saya"),
  p(
    "Saya tidak menulis ini supaya Anda atau saya merasa kecil di hadapan kepahlawanan Bonhoeffer. Saya menulis ini karena bahaya yang sebenarnya bagi iman kita hampir tidak pernah berbentuk fasisme yang jelas. Bahaya yang sebenarnya adalah anugerah murah yang halus — agama yang membuat saya nyaman, yang menyepakati apa pun yang sudah saya inginkan, yang tidak pernah memanggil saya untuk meninggalkan sesuatu."
  ),
  p(
    "Pertanyaan Bonhoeffer tetap relevan: iman yang saya pegang — apakah ia memerintahkan saya, atau hanya menemani saya? Apakah Yesus dalam hidup saya adalah Tuan, atau penggemar?"
  ),
  p(
    "Anugerah yang mahal tidak meminta saya menjadi Bonhoeffer. Tetapi ia meminta saya, hari ini, untuk menyerahkan satu hal yang Roh sedang tunjukkan. Apa pun itu. Ketaatan yang kecil hari ini membentuk ketaatan yang besar besok."
  )
);
ARTICLES.push({
  title: "Bonhoeffer dan Anugerah yang Mahal",
  slug: "bonhoeffer-dan-anugerah-yang-mahal",
  excerpt:
    "Anugerah murah adalah pengampunan tanpa pertobatan, salib tanpa darah. Bonhoeffer menulis kalimat itu sebelum membayar harganya. Tujuh tahun kemudian, ia digantung — dua minggu sebelum kebebasan tiba.",
  cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&auto=format&fit=crop&q=80",
  main_category: "ruang-lensa",
  sub_category: "biografi-singkat",
  tags: ["bonhoeffer", "discipleship", "anugerah mahal", "nazi"],
  content_json: article6,
  published_at: "2026-05-05T09:00:00Z",
});



// =========================================================================
// 7. Filter, Performance, dan Yang Tersisa dari Citra (Lensa Injil & Budaya)
// =========================================================================
const article7 = doc(
  p(
    "Setiap aplikasi yang Anda buka pagi ini meminta hal yang sama: tampilkan versi yang lebih bersih dari diri Anda. Lebih cerah, lebih percaya diri, lebih sukses, lebih spiritual. Filter bukan hanya menutupi pori-pori — ia, secara halus, juga menutupi anugerah."
  ),

  h2("Citra yang sudah ada"),
  p(
    "Kejadian 1:26–27 mungkin adalah teks paling subversif yang pernah diberikan kepada umat manusia. 'Marilah Kita menjadikan manusia menurut gambar dan rupa Kita.' Bukan beberapa manusia — semua. Bukan manusia yang sudah berhasil — semua. Sebelum prestasi, sebelum kontribusi, sebelum kurasi diri."
  ),
  p(
    "Era yang kita hidupi membalik logika ini. Kita tidak diberi nilai; kita harus memproduksinya. Lewat foto. Lewat caption. Lewat berapa banyak orang menekan jempol pada apa yang kita pamerkan. Kita tidak lagi ditemukan; kita harus terus ditampilkan."
  ),
  p(
    "Tapi inilah ironi yang harus dihadapi: filter justru bekerja paling keras pada orang yang paling diam-diam ragu bahwa citra di dalam dirinya cukup bagus untuk dilihat tanpa filter."
  ),

  h2("Citra yang rusak — tapi tidak hilang"),
  p(
    "Kejadian 3 tidak menghapus Kejadian 1. Kejatuhan merusak citra ilahi dalam manusia, tapi tidak melenyapkannya. Kejadian 9:6 — sesudah air bah, di dunia yang sudah jelas-jelas berdosa — masih berkata bahwa pembunuhan itu salah karena 'Allah membuat manusia menurut gambar-Nya.' Yakobus, ribuan tahun kemudian, masih memperingatkan kita bahwa lidah tidak boleh mengutuk sesama 'yang diciptakan menurut gambar Allah' (Yak. 3:9)."
  ),
  p(
    "Dosa merusak citra; ia tidak menghapusnya. Karena itu pemulihan yang Allah tawarkan bukanlah pemberian citra baru dari nol — tetapi pemulihan citra yang sudah ada. Sebuah restorasi, bukan substitusi."
  ),
  blockquote(
    "Allah tidak meminta Anda menjadi orang lain. Ia mengembalikan Anda menjadi siapa Anda sejak semula."
  ),

  h2("Bukan kurasi, tapi kontemplasi"),
  p(
    "Paulus menggambarkan proses pemulihan citra dengan sebuah kalimat yang luar biasa di 2 Korintus 3:18: 'kita semua, dengan muka yang tidak berselubung, mencerminkan kemuliaan Tuhan, sedang diubah menjadi serupa dengan gambar-Nya, dari kemuliaan kepada kemuliaan, oleh Roh Tuhan.'"
  ),
  p(
    "Dua kata kunci: 'mencerminkan' dan 'diubah'. Kita tidak menghasilkan kemuliaan — kita memantulkannya. Kita tidak melakukan transformasi — kita ditransformasi. Kata kerjanya pasif: ",
    italic("metamorphoumetha"),
    " — kata yang sama yang dipakai untuk transfigurasi Yesus di Matius 17."
  ),
  p(
    "Dan perhatikan media transformasi itu: melihat. Bukan berusaha keras. Bukan kurasi yang lebih baik. Melihat. Kontemplasi yang berkelanjutan pada Pribadi yang adalah citra sempurna dari Allah yang tidak kelihatan (Kol. 1:15)."
  ),
  p(
    "Filter adalah upaya tergesa-gesa untuk menghasilkan citra. Pemulihan adalah waktu yang sabar untuk dipantulkan."
  ),

  h2("Identitas dari adopsi, bukan dari follower"),
  p(
    "Roma 8:15: 'Sebab kamu tidak menerima roh perbudakan yang membuat kamu menjadi takut lagi, tetapi kamu telah menerima Roh yang menjadikan kamu anak Allah. Oleh Roh itu kita berseru: \"ya Abba, ya Bapa!\"'"
  ),
  p(
    "Adopsi sebagai anak adalah salah satu metafora terkuat yang Paulus pakai untuk keselamatan, dan ada alasannya. Dalam masyarakat Romawi abad pertama, anak angkat memiliki status hukum yang sama dengan anak biologis — kadang bahkan lebih, karena ia dipilih, bukan kebetulan lahir."
  ),
  p(
    "Identitas Kristen tidak datang dari berapa banyak yang mengikuti Anda. Ia datang dari fakta bahwa Anda telah dipilih untuk diadopsi. Itu identitas yang stabil — tidak bergantung pada algoritma, tidak naik-turun dengan engagement rate, tidak runtuh ketika seseorang berhenti memuji Anda."
  ),

  h2("Bagi Anda dan saya"),
  p(
    "Saya tidak mengusulkan Anda menghapus Instagram. Itu bukan poinnya. Poinnya adalah: perhatikan apa yang sedang Anda lakukan ketika Anda memilih filter. Apa yang sedang Anda tutupi? Apa yang Anda takut orang akan lihat kalau Anda jujur?"
  ),
  p(
    "Lalu — dan ini bagian yang lebih penting — perhatikan: di hadapan Allah, citra itu sudah dilihat. Sudah lama sekali. Dia melihatnya sebelum Anda mempelajari cara untuk menutupinya. Dan Dia tetap memanggil Anda anak-Nya."
  ),
  p(
    "Pekerjaan saya hari ini bukan membangun citra yang lebih bagus. Pekerjaan saya hari ini adalah duduk cukup lama di hadapan Citra yang Sempurna sehingga citra di dalam saya, yang lama tertutup, perlahan-lahan dipulihkan ke arah-Nya."
  )
);
ARTICLES.push({
  title: "Filter, Performance, dan Yang Tersisa dari Citra",
  slug: "filter-performance-dan-citra",
  excerpt:
    "Era media sosial menjual versi yang lebih bersih dari diri kita. Tapi citra yang dirusak Kejadian 3 tidak hilang — dan pemulihan tidak datang dari kurasi yang lebih baik, melainkan dari kontemplasi yang lebih panjang.",
  cover: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&auto=format&fit=crop&q=80",
  main_category: "ruang-lensa",
  sub_category: "lensa-injil-budaya",
  tags: ["budaya digital", "imago dei", "identitas", "transformasi"],
  content_json: article7,
  published_at: "2026-05-02T09:00:00Z",
});



// =========================================================================
// 8. Ketika Doa Terasa Seperti Berbicara ke Tembok (Refleksi)
// =========================================================================
const article8 = doc(
  p(
    "Pukul dua pagi. Saya berdoa, tapi rasanya seperti berbicara ke langit-langit kamar. Tidak ada gema, tidak ada hangat, tidak ada apa-apa. Saya bertanya pada diri sendiri: apakah Allah sedang diam, atau saya yang sudah lupa cara mendengar?"
  ),
  p(
    "Saya curiga banyak orang Kristen pernah duduk di kursi yang sama. Tetapi sangat sedikit dari kita yang mau membicarakannya — karena dalam imajinasi kita, kekeringan rohani adalah tanda kegagalan iman. Padahal, di Kitab Suci, ia justru sering tanda kedewasaan."
  ),

  h2("Mazmur 22"),
  p(
    "Daud menulis kalimat yang membuat hampir semua dari kita terkejut ketika pertama kali membacanya: 'Allahku, Allahku, mengapa Engkau meninggalkan aku?' (Mzm. 22:1). Bukan ratapan ringan. Itu protes mentah."
  ),
  p(
    "Tapi yang menarik adalah Mazmur ini tidak berhenti di situ. Ayat 22 adalah titik balik: 'Aku akan memasyhurkan nama-Mu kepada saudara-saudaraku.' Ayat 27: 'Segala ujung bumi akan mengingat dan berbalik kepada TUHAN.' Ratapan yang dimulai dengan keluhan personal berakhir dengan visi kosmis."
  ),
  p(
    "Daud tidak membatalkan kalimat pembukanya — ia menelusurinya sampai keluar. Itu pola yang berbeda dengan apa yang kita pikirkan tentang doa yang baik. Doa yang baik, di dalam Mazmur, sering harus melewati malam terlebih dahulu."
  ),

  h2("Yesus mengutip baris pertama"),
  p(
    "Di salib, Matius 27:46, Yesus berseru dengan suara nyaring: 'Eli, Eli, lema sabakhtani?' — 'Allahku, Allahku, mengapa Engkau meninggalkan Aku?'"
  ),
  p(
    "Ia mengutip Mazmur 22, ayat 1. Di Yudaisme abad pertama, mengutip baris pertama suatu Mazmur adalah cara mengaktifkan seluruh Mazmur. Yesus, dengan tenaga terakhir, sedang menunjukkan kepada siapa pun yang mau mendengar: lihat di sini, baca seluruhnya, ratapan ini berakhir dalam kemenangan."
  ),
  p(
    "Tetapi pada saat yang sama, Ia sungguh-sungguh menanggung pemisahan itu. Itu bukan akting. Bahasa Aramaik, suara nyaring, dan keterbukuan tubuh-Nya menunjukkan bahwa pemisahan itu nyata. Dua hal yang benar bersamaan: ratapan adalah ratapan, dan pengetahuan akan akhir cerita tetap memegang teks."
  ),
  blockquote(
    "Iman yang dewasa tidak menghapus ratapan — ia mengetahui Mazmur secara cukup utuh untuk meratap dan tetap berharap pada saat yang sama."
  ),

  h2("Yesus berdoa dengan ratapan dan air mata"),
  p(
    "Ibrani 5:7 memberi kita detail yang biasanya kita lewatkan: 'Dalam hidup-Nya sebagai manusia, Ia telah mempersembahkan doa dan permohonan dengan ratapan dan air mata kepada Dia, yang sanggup menyelamatkan-Nya dari maut, dan karena kesalehan-Nya Ia telah didengarkan.'"
  ),
  p(
    "'Dengan ratapan dan air mata.' Yesus tidak berdoa dengan rapi sepanjang waktu. Ia mengeluarkan suara yang tidak bisa selalu kita rumuskan dengan tata bahasa. Dan teks itu mengatakan: Ia didengar — bukan meskipun ratapan-Nya, tetapi bersamaan dengannya."
  ),
  p(
    "Itu mengubah segalanya. Ratapan bukan jenis doa yang lebih rendah. Ia adalah genre Alkitab — Mazmur memilikinya, Para Nabi memilikinya, Kristus mempraktikkannya. Doa yang kering bukan doa yang gagal; ia adalah doa yang sedang bertumbuh, jika tidak ditinggalkan."
  ),

  h2("Bagi Anda dan saya"),
  p(
    "Saya menulis ini sebagian sebagai pengingat untuk diri saya sendiri. Karena malam-malam itu masih datang. Doa-doa yang terasa seperti tembok masih ada, dan tidak selalu langsung pergi."
  ),
  p(
    "Yang saya pelajari, perlahan: tetap berdoa bukan karena merasa, tapi karena tahu. Tahu bahwa ratapan adalah doa juga. Tahu bahwa Mazmur 22 berakhir dengan kemenangan, walau ayat 1 belum terasa seperti kemenangan. Tahu bahwa Yesus pernah duduk di kursi yang sama dan didengarkan."
  ),
  p(
    "Doa yang dirasakan adalah hadiah. Doa yang dipilih meskipun tidak dirasakan adalah pertumbuhan. Keduanya adalah doa, dan Bapa mendengarkan keduanya."
  )
);
ARTICLES.push({
  title: "Ketika Doa Terasa Seperti Berbicara ke Tembok",
  slug: "ketika-doa-seperti-berbicara-ke-tembok",
  excerpt:
    "Mazmur 22 dimulai dengan ratapan dan berakhir dengan kemenangan. Yesus mengutip baris pertamanya di salib — bukan untuk putus asa, tapi untuk mengaktifkan seluruh Mazmur. Doa yang kering bukan doa yang gagal.",
  main_category: "sinners-note",
  sub_category: "refleksi",
  tags: ["doa", "kekeringan rohani", "mazmur 22", "ratapan"],
  content_json: article8,
  published_at: "2026-04-29T09:00:00Z",
});

// =========================================================================
// 9. Hari Saya Berhenti Berpura-pura (Catatan)
// =========================================================================
const article9 = doc(
  p(
    "Iman saya dulu sangat rapi. Saya tahu jawaban yang benar untuk hampir setiap pertanyaan; saya bisa mengutip ayat di tempat yang tepat; doa saya tersusun seperti sketsa pidato. Lalu hidup terjadi, dan semua kerapian itu rontok satu per satu. Yang tersisa, akhirnya, adalah doa yang sangat pendek: 'Tuhan, kasihanilah aku.'"
  ),
  p(
    "Aneh — itu adalah doa yang paling jujur yang pernah saya doakan, dan rasanya seperti pertama kali saya benar-benar berdoa."
  ),

  h2("Pemungut cukai di sudut Bait Suci"),
  p(
    "Lukas 18:9–14 adalah perumpamaan yang Yesus ceritakan, kata teks, 'kepada beberapa orang yang menganggap dirinya benar dan memandang rendah semua orang lain.' Sebuah deskripsi yang lebih akurat tentang saya — dulu, dan kadang masih sekarang — daripada yang nyaman saya akui."
  ),
  p(
    "Dua orang naik ke Bait Suci untuk berdoa. Yang satu, orang Farisi, berdiri dan berdoa 'di dalam dirinya' (",
    italic("pros heauton"),
    " — secara harfiah 'kepada dirinya sendiri'). Doanya rapi, akurat, dan secara teknis tidak salah: 'Aku tidak seperti orang lain, perampok, orang lalim, pezinah, atau juga seperti pemungut cukai ini.' Setiap fakta di doa itu mungkin benar. Doa itu hanya tidak ditujukan kepada orang yang seharusnya."
  ),
  p(
    "Pemungut cukai berdiri jauh-jauh. Tidak berani menengadah. Memukul dada dan berkata: 'Ya Allah, kasihanilah aku orang berdosa ini.' Doanya tidak rapi. Ia tidak punya teologi yang berkembang baik. Ia hanya punya kejujuran."
  ),
  p(
    "Yesus menyimpulkan: pemungut cukai itu pulang ke rumah dengan dibenarkan. Yang lain tidak."
  ),

  h2("Kuil adalah tempat yang berbahaya"),
  p(
    "Yang saya pelajari dari perumpamaan itu — perlahan dan menyakitkan — adalah ini: bahaya religius terbesar bagi saya bukan ada di luar gereja. Ia ada di dalam, di kursi paling rohani, di doa-doa yang paling rapi, di jawaban yang paling cepat."
  ),
  p(
    "Karena performa religius selalu terasa seperti kesalehan. Itu sebabnya ia begitu sulit dideteksi. Ketika saya menyusun doa saya untuk terdengar baik di hadapan orang, saya tidak merasa seperti munafik — saya merasa seperti orang yang sedang serius beriman."
  ),
  p(
    "Pemungut cukai tidak punya tampilan untuk dipertahankan. Itu sebabnya ia bisa mendoakan satu kalimat yang Allah dengarkan."
  ),

  h2("Mazmur 51"),
  p(
    "Daud, setelah peristiwa Bathsheba dan Uria, menulis Mazmur 51. Bukan untuk dipublikasikan — tapi pada akhirnya dimasukkan ke dalam kanon, mungkin karena gereja memerlukan template untuk mengaku."
  ),
  p(
    "Ayat 6: 'Sesungguhnya, Engkau berkenan akan kebenaran dalam batin, dan dengan diam-diam Engkau memberitahukan hikmat kepadaku.'"
  ),
  p(
    "'Kebenaran dalam batin.' Ibrani: ",
    italic("emet ba-tuchot"),
    " — kebenaran di tempat yang paling tersembunyi. Allah tidak terlalu terkesan dengan kebenaran yang dipajang di etalase kalau tidak ada kebenaran di gudang."
  ),
  p(
    "Ayat 17 menambahkan: 'korban sembelihan kepada Allah ialah jiwa yang hancur; hati yang patah dan remuk tidak akan Kau pandang hina.' Pengakuan dosa, bagi Daud, bukan akhir cerita — ia adalah ukuran."
  ),

  h2("Pengakuan sebagai pintu, bukan tujuan"),
  p(
    "1 Yohanes 1:9 sering kita kutip: 'Jika kita mengaku dosa kita, maka Ia adalah setia dan adil, sehingga Ia akan mengampuni segala dosa kita dan menyucikan kita dari segala kejahatan.'"
  ),
  p(
    "Tetapi kita lebih jarang membaca ayat 8 dan 10 yang mengapitnya: 'Jika kita berkata, bahwa kita tidak berdosa, maka kita menipu diri kita sendiri … Jika kita berkata bahwa kita tidak ada berbuat dosa, maka kita membuat Dia menjadi pendusta.' Yohanes menempatkan pengakuan dosa sebagai bagian dari postur Kristen yang berkelanjutan, bukan transaksi sekali tahun."
  ),
  p(
    "Kejujuran, pada akhirnya, adalah pintu masuk anugerah. Bukan akhir; bukan reward; pintu. Dan pintu itu hanya bekerja kalau kita berani mendekat tanpa kostum."
  ),

  h2("Bagi Anda dan saya"),
  p(
    "Saya pikir banyak dari kita capek karena terus memakai topeng — dan bingung mengapa kita capek di hadapan Allah, karena Allah seharusnya tempat kita istirahat. Tapi topeng tidak istirahat. Topeng terus bekerja."
  ),
  p(
    "Doa pemungut cukai adalah doa yang melepas topeng. Ini hanya enam kata dalam Yunani: ",
    italic("Ho theos, hilastheti moi tō hamartōlō"),
    " — Allah, kasihanilah aku, orang berdosa ini. Sebagian besar dari kita tidak berdoa kalimat ini bukan karena terlalu sederhana, tapi karena terlalu jujur."
  ),
  p(
    "Coba doakan satu kali hari ini. Bukan sebagai performa — sebagai pelepasan. Lihat apa yang berubah dalam tubuh Anda ketika Anda mengucapkannya tanpa menambah apa pun di belakangnya. Ada sesuatu yang sangat lega ketika kita berhenti membela diri di hadapan Yang sudah membela kita."
  )
);
ARTICLES.push({
  title: "Hari Saya Berhenti Berpura-pura",
  slug: "hari-saya-berhenti-berpura-pura",
  excerpt:
    "Pemungut cukai tidak punya teologi yang berkembang baik. Ia hanya punya kejujuran. Yesus berkata ia pulang dibenarkan. Performa religius selalu terasa seperti kesalehan — itu sebabnya begitu sulit dideteksi.",
  main_category: "sinners-note",
  sub_category: "catatan",
  tags: ["kejujuran", "pertobatan", "lukas 18", "mazmur 51"],
  content_json: article9,
  published_at: "2026-04-25T09:00:00Z",
});
