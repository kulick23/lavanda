import type { SiteContent } from "@/lib/types"

export const defaultSiteContent: SiteContent = {
  categories: [
    { id: "all", label: "Все", icon: "✦" },
    { id: "bouquets", label: "Букеты", icon: "💐" },
    { id: "compositions", label: "Композиции", icon: "🌿" },
    { id: "oils", label: "Масла", icon: "💧" },
    { id: "sachets", label: "Саше", icon: "🎀" },
    { id: "soap", label: "Мыло", icon: "🧼" },
  ],
  products: [
    {
      id: "classic-bouquet",
      slug: "classic-bouquet",
      name: "Букет Classic",
      category: "bouquets",
      price: 25,
      image:
        "/images/lavender-2.jpg",
      description: "Классический букет из сушеной лаванды для дома, фотозоны или подарка.",
      badge: "Популярное",
      badgeColor: "bg-[#877391]",
      featured: true,
    },
    {
      id: "lavender-oil-15ml",
      slug: "lavender-oil-15ml",
      name: "Эфирное масло 15ml",
      category: "oils",
      price: 35,
      image:
        "/images/lavender-3.jpg",
      description: "Натуральное масло лаванды для аромаламп, ухода и расслабления.",
      badge: "Новинка",
      badgeColor: "bg-[#b8c99a]",
      featured: true,
    },
    {
      id: "sachet-relax",
      slug: "sachet-relax",
      name: "Саше Relax",
      category: "sachets",
      price: 12,
      image:
        "/images/lavender-2.jpg",
      description: "Ароматическое саше ручной работы для шкафа, спальни или автомобиля.",
    },
    {
      id: "home-composition",
      slug: "home-composition",
      name: "Композиция Home",
      category: "compositions",
      price: 45,
      image:
        "/images/lavender-3.jpg",
      description: "Интерьерная композиция для дома, студии или праздничного стола.",
      badge: "Скидка",
      badgeColor: "bg-[#a88ed2]",
      featured: true,
    },
    {
      id: "handmade-soap",
      slug: "handmade-soap",
      name: "Мыло ручной работы",
      category: "soap",
      price: 18,
      image:
        "/images/lavender-2.jpg",
      description: "Натуральное мыло с лавандой и мягким травяным ароматом.",
    },
  ],
  settings: {
    brandName: "Lavanda",
    telegram: {
      label: "Telegram",
      href: "https://t.me/lavanda_shop",
      value: "@lavanda_shop",
    },
    viber: {
      label: "Viber",
      href: "viber://chat?number=%2B375291234567",
      value: "+375 (29) 123-45-67",
    },
    instagram: {
      label: "Instagram",
      href: "https://instagram.com/lavanda_shop",
      value: "@lavanda_shop",
    },
    phone: "+375 (29) 123-45-67",
    workingHours: "Ежедневно с 9:00 до 21:00",
    location: "Беларусь, лавандовое поле по предварительной записи",
  },
  hero: {
    badge: "Выращиваем сами с любовью",
    titlePrefix: "Натуральная",
    titleAccent: "лаванда",
    titleSuffix: "с нашего поля",
    description:
      "Мы сами выращиваем лаванду и создаём из неё уникальную продукцию. Букеты, масла, саше и многое другое - всё сделано с душой и заботой.",
    image:
      "/images/lavender-1.jpg",
    floatingCardLeftTitle: "Своё поле",
    floatingCardLeftText: "Выращиваем сами",
    floatingCardRightTitle: "С любовью",
    floatingCardRightText: "Ручная работа",
  },
  about: {
    eyebrow: "Наша история",
    title: "Немного о нас",
    description:
      "Мы - семейное хозяйство, которое с любовью выращивает лаванду и создаёт натуральную продукцию",
    gallery: [
      {
        src: "/images/lavender-3.jpg",
        alt: "Сбор лаванды",
      },
      {
        src: "/images/lavender-2.jpg",
        alt: "Букеты лаванды",
      },
      {
        src: "/images/lavender-1.jpg",
        alt: "Владельцы фермы",
      },
    ],
    heading: "Выращиваем лаванду с душой и заботой",
    paragraphs: [
      "Наша история началась с любви к лаванде. Мы создали собственное поле, где выращиваем эти прекрасные цветы в экологически чистых условиях, без использования химических удобрений и пестицидов.",
      "Каждый этап - от посадки до сбора урожая - мы делаем вручную, вкладывая в это свою любовь и заботу. Это позволяет нам создавать продукцию высочайшего качества.",
      "Мы гордимся тем, что можем делиться красотой и ароматом лаванды с вами, создавая уникальные букеты, масла и другие изделия из собственноручно выращенных цветов.",
    ],
    features: [
      { title: "100% натурально" },
      { title: "Ручная работа" },
      { title: "Своё поле" },
      { title: "Эко-продукция" },
    ],
  },
  production: {
    eyebrow: "Наш процесс",
    title: "Как мы создаём продукцию",
    description: "От поля до вашего дома - каждый этап с заботой и вниманием к деталям",
    steps: [
      {
        number: "01",
        title: "Выращивание",
        description: "Лаванда растёт на нашем поле в экологически чистых условиях без химикатов",
      },
      {
        number: "02",
        title: "Сбор урожая",
        description: "Собираем лаванду вручную в период максимального цветения для лучшего аромата",
      },
      {
        number: "03",
        title: "Сушка",
        description: "Бережно сушим цветы естественным способом, сохраняя все полезные свойства",
      },
      {
        number: "04",
        title: "Создание продукции",
        description: "Из высушенной лаванды создаём букеты, масла, саше и другие изделия",
      },
    ],
    bannerImage:
      "/images/lavender-3.jpg",
    bannerTitle: "Каждый букет - частичка нашего поля",
    bannerText:
      "Мы вкладываем душу в каждое изделие, чтобы вы могли наслаждаться натуральным ароматом лаванды у себя дома",
  },
  visit: {
    eyebrow: "Приезжайте к нам",
    title: "Посетите наше лавандовое поле",
    description: "Приглашаем вас на прогулку по цветущему лавандовому полю летом",
    gallery: [
      {
        src: "/images/lavender-1.jpg",
        alt: "Посетители на лавандовом поле",
      },
      {
        src: "/images/lavender-3.jpg",
        alt: "Сбор лаванды",
      },
      {
        src: "/images/lavender-2.jpg",
        alt: "Букеты лаванды",
      },
    ],
    heading: "Время цветения - лучшее время для визита",
    paragraphs: [
      "Каждое лето, в период цветения лаванды (июнь-июль), мы открываем наше поле для посещения. Это отличная возможность увидеть, как растёт и цветёт лаванда, сделать красивые фотографии и насладиться невероятным ароматом.",
      "Вы можете прогуляться по рядам цветущей лаванды, узнать о процессе выращивания и производства, а также приобрести свежесобранные букеты и нашу продукцию прямо на месте.",
    ],
    features: [
      { title: "Июнь - Июль", text: "Сезон цветения" },
      { title: "Фотосессии", text: "Красивые локации" },
      { title: "Для всей семьи", text: "Дети в восторге" },
      { title: "Бесплатно", text: "Вход свободный" },
    ],
    ctaLabel: "Узнать о времени посещения",
    ctaLink: "https://t.me/lavanda_shop",
    bannerTitle: "Ждём вас на нашем поле!",
    bannerText: "Свяжитесь с нами, чтобы узнать точные даты цветения и запланировать свой визит",
  },
  purchaseOptions: [
    {
      title: "Telegram / Viber",
      description: "Напишите нам в мессенджер, выберите товар и договоримся о доставке.",
      action: "Написать в Telegram",
      link: "https://t.me/lavanda_shop",
      highlight: true,
    },
    {
      title: "Самовывоз",
      description: "Заберите заказ лично с нашего лавандового поля по договоренности.",
      action: "Узнать адрес",
      link: "#contact",
    },
    {
      title: "Почта Беларуси",
      description: "Отправляем по Беларуси Белпочтой или курьерской службой.",
      action: "Узнать условия",
      link: "#contact",
    },
  ],
}
