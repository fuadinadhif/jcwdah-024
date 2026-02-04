import { Role } from "../src/generated/prisma/enums.js";
import { prisma } from "../src/lib/prisma.js";

// Membuat fungsi seeding
async function seed() {
  try {
    console.info(`🌱 Seeding started...`);

    /* ----------------------------- Delete Old Data ---------------------------- */
    await prisma.user.deleteMany();
    await prisma.event.deleteMany();
    await prisma.wallet.deleteMany();

    /* ------------------------------- Create User ------------------------------ */
    const customers = [
      {
        name: "Setya Novanto",
        email: "setya.novanto@mail.com",
        password: "purwadhika123",
        address: "Jl. Gatot Subroto, Jakarta Barat, DKI",
        role: Role.CUSTOMER,
      },
      {
        name: "Budi Santoso",
        email: "budi.santoso@mail.com",
        password: "purwadhika123",
        address: "Jl. Merdeka, Bandung, Jawa Barat",
        role: Role.CUSTOMER,
      },
      {
        name: "Siti Aminah",
        email: "siti.aminah@mail.com",
        password: "purwadhika123",
        address: "Jl. Ahmad Yani, Surabaya, Jawa Timur",
        role: Role.CUSTOMER,
      },
      {
        name: "Andi Wijaya",
        email: "andi.wijaya@mail.com",
        password: "purwadhika123",
        address: "Jl. Pahlawan, Semarang, Jawa Tengah",
        role: Role.CUSTOMER,
      },
      {
        name: "Rina Kurniawati",
        email: "rina.kurniawati@mail.com",
        password: "purwadhika123",
        address: "Jl. Diponegoro, Yogyakarta",
        role: Role.CUSTOMER,
      },
      {
        name: "Dewi Lestari",
        email: "dewi.lestari@mail.com",
        password: "purwadhika123",
        address: "Jl. Teuku Umar, Denpasar, Bali",
        role: Role.CUSTOMER,
      },
      {
        name: "Ahmad Fauzi",
        email: "ahmad.fauzi@mail.com",
        password: "purwadhika123",
        address: "Jl. Sudirman, Pekanbaru, Riau",
        role: Role.CUSTOMER,
      },
      {
        name: "Tono Saputra",
        email: "tono.saputra@mail.com",
        password: "purwadhika123",
        address: "Jl. Sisingamangaraja, Medan, Sumatera Utara",
        role: Role.CUSTOMER,
      },
      {
        name: "Nur Aisyah",
        email: "nur.aisyah@mail.com",
        password: "purwadhika123",
        address: "Jl. Hasanuddin, Makassar, Sulawesi Selatan",
        role: Role.CUSTOMER,
      },
      {
        name: "Fajar Pratama",
        email: "fajar.pratama@mail.com",
        password: "purwadhika123",
        address: "Jl. Slamet Riyadi, Solo, Jawa Tengah",
        role: Role.CUSTOMER,
      },
    ];
    const eventOrganizers = [
      {
        name: "Anas Urbaningrum",
        email: "anas.urbaningrum@mail.com",
        password: "purwadhika123",
        address: "Jl. Sudirman, Jakarta Selatan, DKI",
        role: Role.EVENT_ORGANIZER,
      },
      {
        name: "Rizky Eventindo",
        email: "rizky.eventindo@mail.com",
        password: "purwadhika123",
        address: "Jl. Thamrin, Jakarta Pusat, DKI",
        role: Role.EVENT_ORGANIZER,
      },
      {
        name: "Mega Organizer",
        email: "mega.organizer@mail.com",
        password: "purwadhika123",
        address: "Jl. Asia Afrika, Bandung, Jawa Barat",
        role: Role.EVENT_ORGANIZER,
      },
      {
        name: "Surya Creative",
        email: "surya.creative@mail.com",
        password: "purwadhika123",
        address: "Jl. Pemuda, Semarang, Jawa Tengah",
        role: Role.EVENT_ORGANIZER,
      },
      {
        name: "Bali Festival Team",
        email: "bali.festival@mail.com",
        password: "purwadhika123",
        address: "Jl. Sunset Road, Denpasar, Bali",
        role: Role.EVENT_ORGANIZER,
      },
      {
        name: "Jogja Event Hub",
        email: "jogja.eventhub@mail.com",
        password: "purwadhika123",
        address: "Jl. Malioboro, Yogyakarta",
        role: Role.EVENT_ORGANIZER,
      },
      {
        name: "Makassar Live",
        email: "makassar.live@mail.com",
        password: "purwadhika123",
        address: "Jl. Pettarani, Makassar, Sulawesi Selatan",
        role: Role.EVENT_ORGANIZER,
      },
      {
        name: "Medan Expo",
        email: "medan.expo@mail.com",
        password: "purwadhika123",
        address: "Jl. Gatot Subroto, Medan, Sumatera Utara",
        role: Role.EVENT_ORGANIZER,
      },
      {
        name: "Surabaya Events",
        email: "surabaya.events@mail.com",
        password: "purwadhika123",
        address: "Jl. Basuki Rahmat, Surabaya, Jawa Timur",
        role: Role.EVENT_ORGANIZER,
      },
      {
        name: "Nusantara Organizer",
        email: "nusantara.organizer@mail.com",
        password: "purwadhika123",
        address: "Jl. Veteran, Malang, Jawa Timur",
        role: Role.EVENT_ORGANIZER,
      },
    ];

    await prisma.user.createMany({
      data: [...customers, ...eventOrganizers],
    });

    /* ------------------------------ Create Event ------------------------------ */
    const eventOrganizersData = await prisma.user.findMany({
      where: { role: Role.EVENT_ORGANIZER },
    });

    const events = [
      {
        eventOrganizerId: eventOrganizersData[0]?.id,
        title: "Jakarta Music Festival 2026",
        description: "Festival musik dengan artis lokal dan internasional.",
        imageUrl:
          "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
        price: 250000,
      },
      {
        eventOrganizerId: eventOrganizersData[1]?.id,
        title: "Tech Conference Indonesia",
        description:
          "Konferensi teknologi membahas AI, Web Development, dan Cloud.",
        imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
        price: 500000,
      },
      {
        eventOrganizerId: eventOrganizersData[2]?.id,
        title: "Photography Workshop",
        description: "Workshop fotografi untuk pemula hingga profesional.",
        imageUrl:
          "https://images.unsplash.com/photo-1518770660439-4636190af475",
        price: 150000,
      },
      {
        eventOrganizerId: eventOrganizersData[3]?.id,
        title: "Startup Pitch Day",
        description: "Presentasi ide startup di depan investor.",
        imageUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
        price: 100000,
      },
      {
        eventOrganizerId: eventOrganizersData[4]?.id,
        title: "Food Festival Nusantara",
        description: "Festival kuliner dari berbagai daerah di Indonesia.",
        imageUrl:
          "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
        price: 75000,
      },
      {
        eventOrganizerId: eventOrganizersData[5]?.id,
        title: "Art Exhibition Jakarta",
        description: "Pameran seni lukis dan instalasi modern.",
        imageUrl:
          "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",
        price: 120000,
      },
      {
        eventOrganizerId: eventOrganizersData[6]?.id,
        title: "Business Leadership Seminar",
        description: "Seminar kepemimpinan untuk profesional.",
        imageUrl:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        price: 300000,
      },
      {
        eventOrganizerId: eventOrganizersData[7]?.id,
        title: "Yoga & Wellness Retreat",
        description: "Acara relaksasi dan kesehatan mental.",
        imageUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a",
        price: 200000,
      },
      {
        eventOrganizerId: eventOrganizersData[8]?.id,
        title: "Gaming Tournament",
        description: "Turnamen game dengan hadiah menarik.",
        imageUrl:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420",
        price: 100000,
      },
      {
        eventOrganizerId: eventOrganizersData[9]?.id,
        title: "Fashion Show 2026",
        description: "Peragaan busana karya desainer muda.",
        imageUrl:
          "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
        price: 180000,
      },
    ];

    await prisma.event.createMany({ data: events });

    console.info(`✅ Seeding finished successfully`);
  } catch (error) {
    console.info(`❌ Seeding is failed`);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Menjalankan fungsi seeding
seed();
