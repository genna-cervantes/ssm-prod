export const MOCK_EXTERNAL_PUBLICATIONS = [
  {
    id: 1,
    title: "Why Should We Protect The Sierra Madre?",
    summary:
      "The Sierra Madre acts as the backbone of Luzon, protecting millions from typhoons. This article explores the ecological significance...",
    author: "Rina Jimenez",
    datePublished: "2024-03-15",
    articleLink: "https://external-news-site.com/protect-sierra-madre",
    thumbnail:
      "https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=2070&auto=format&fit=crop",
category: "Opinion", authorDP: "/assets/profile-placeholder.png",
  },
  {
    id: 2,
    title: "Sierra Madre Network Alliance Formed",
    summary:
      "A new coalition has risen to tackle the pressing issues of deforestation and illegal mining in the region.",
    author: "Alex Gamon",
    datePublished: "2023-05-22",
    articleLink: "/internal-news/alliance-formed",
    thumbnail:
      "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2070&auto=format&fit=crop",
category: "News", authorDP: "/assets/profile-placeholder.png",
  },
  {
    id: 3,
    title: "Save Sierra Madre Harmony Alliance",
    summary:
      "Local communities gather to celebrate the 10th anniversary of the conservation pact signed by indigenous leaders.",
    author: "Dept. of Agriculture",
    datePublished: "2024-09-21",
    articleLink: "https://govt-site.gov.ph/news",
    thumbnail:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
category: "Event", authorDP: "/assets/profile-placeholder.png",
  },
  {
    id: 4,
    title: "Stop Kaliwa Dam groups call on Save Sierra Madre Day",
    summary:
      "Protesters marched to the DENR office to demand the cancellation of the controversial dam project.",
    author: "ABS-CBN News",
    datePublished: "2022-09-26",
    articleLink: "https://news.abs-cbn.com/example",
    thumbnail:
      "https://images.unsplash.com/photo-1596237563267-845d1052210c?q=80&w=2070&auto=format&fit=crop",
category: "News", authorDP: "/assets/profile-placeholder.png",
  },
];

export const MOCK_INTERNAL_PUBLICATIONS = [
  {
    id: 101,
    title: "Environmental Group Condemns Mining",
    content:
      "The Save Sierra Madre Network Alliance (SSMNA) strongly condemns the recent approval of small-scale mining permits...",
    author: "Elizabeth Carranza",
    datePublished: "2024-07-01",
    thumbnail:
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop",
    authorDP: "/assets/profile-placeholder.png",
  },
  {
    id: 102,
    title: "Disenchantment in the Uplands",
    content:
      "An in-depth look at the changing socio-economic landscape of the upland communities in Rizal and Quezon.",
    author: "Elizabeth Carranza",
    datePublished: "2024-07-01",
    thumbnail:
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1974&auto=format&fit=crop",
    authorDP: "/assets/profile-placeholder.png",
  },
  {
    id: 103,
    title: "Environmental Groups Summoned Again",
    content:
      "Legal challenges mount as environmental defenders face new hurdles in their fight for preservation.",
    author: "Elizabeth Carranza",
    datePublished: "2024-09-21",
    thumbnail:
      "https://images.unsplash.com/photo-1588392382834-a891154bca4d?q=80&w=2076&auto=format&fit=crop",
    authorDP: "/assets/profile-placeholder.png",
  },
  {
    id: 104,
    title: "News Article on Paje's Confirmation",
    content:
      "The confirmation of the new DENR secretary has sparked debate among conservationist circles regarding future policies.",
    author: "Elizabeth Carranza",
    datePublished: "2024-06-30",
    thumbnail:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop",
    authorDP: "/assets/profile-placeholder.png",
  },
  {
    id: 105,
    title: "Unregulated Small Scale Gold Mining",
    content:
      "A special report on the mercury contamination risks posed by unregulated gold panning in river tributaries.",
    author: "Elizabeth Carranza",
    datePublished: "2024-07-01",
    thumbnail:
      "https://images.unsplash.com/photo-1574972748057-0b42f38d35b9?q=80&w=2070&auto=format&fit=crop",
    authorDP: "/assets/profile-placeholder.png",
  },
  {
    id: 106,
    title: "Environmental Groups Expose Corruption",
    content:
      "Whistleblowers have come forward with documents alleging irregularities in logging permit issuances.",
    author: "Elizabeth Carranza",
    datePublished: "2024-10-14",
    thumbnail:
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1976&auto=format&fit=crop",
    authorDP: "/assets/profile-placeholder.png",
  },
  {
    id: 107,
    title: "Stop Sierra Madre Dam Projects",
    content:
      "The Kaliwa Dam project continues to be a flashpoint for conflict between the government and indigenous groups.",
    author: "Delfin T. Mallari Jr.",
    datePublished: "2024-10-18",
    thumbnail:
      "https://images.unsplash.com/photo-1533282960533-51328aa49826?q=80&w=2042&auto=format&fit=crop",
    authorDP: "/assets/profile-placeholder.png",
  },
  {
    id: 108,
    title: "Sierra Madre dams ban small quarries",
    content:
      "New legislation aims to halt quarrying activities that threaten the structural integrity of the watershed.",
    author: "Delfin T. Mallari Jr.",
    datePublished: "2024-11-08",
    thumbnail:
      "https://images.unsplash.com/photo-1621451537084-482c73071a0b?q=80&w=1974&auto=format&fit=crop",
    authorDP: "/assets/profile-placeholder.png",
  },
];

export async function getArticles() {
  return ({ externalPubs: MOCK_EXTERNAL_PUBLICATIONS, internalPubs: MOCK_INTERNAL_PUBLICATIONS });
}