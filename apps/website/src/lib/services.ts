export type ServiceMedia = {
  type: "image" | "video";
  /** Path under /public or absolute URL */
  src: string;
  alt: string;
  /** Video only */
  poster?: string;
};

export type Service = {
  slug: string;
  /** Used as H1 and link text */
  name: string;
  /** Page <title> (the site suffix is added by the layout template) */
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** Paragraphs describing the service */
  description: string[];
  /** Short bullet points: what is included / what we can do */
  highlights: string[];
  faq: { question: string; answer: string }[];
  related: string[];
  /**
   * Photos / videos for this service. Leave empty until material exists –
   * the media section is hidden automatically.
   */
  media: ServiceMedia[];
};

const REGION = "Berlin & Brandenburg";

export const SERVICES: Service[] = [
  {
    slug: "dachhimmel-neu-beziehen",
    name: "Dachhimmel neu beziehen",
    metaTitle: `Dachhimmel neu beziehen – ${REGION}`,
    metaDescription:
      "Hängender, verfleckter oder abgelöster Dachhimmel? Wir beziehen Ihren Dachhimmel in Fredersdorf bei Berlin neu – sauber, passgenau und in Ihrem Wunschmaterial.",
    intro:
      "Ein durchhängender oder fleckiger Dachhimmel ist bei vielen Fahrzeugen ein typisches Alterungsproblem. Wir beziehen ihn neu, sodass Ihr Innenraum wieder gepflegt aussieht.",
    description: [
      "Bei einem Dachhimmel löst sich mit der Zeit der Schaumstoff, der Stoff und Trägerplatte verbindet. Die Folge: Der Bezug hängt durch oder wellt sich. Eine einfache Nachklebung hält meist nicht dauerhaft – deshalb bauen wir den Dachhimmel aus, entfernen den alten Bezug samt Schaumresten und beziehen die Trägerplatte neu.",
      "Je nach Fahrzeug und Wunsch verwenden wir Originalstoff in der Optik des Herstellers oder wählen ein anderes Material, zum Beispiel Alcantara-Optik oder Leder. Auch Sonnenblenden, Haltegriffe und Säulenverkleidungen können im gleichen Zug passend bezogen werden.",
    ],
    highlights: [
      "Ausbau und Einbau des Dachhimmels",
      "Entfernen von altem Bezug und Schaumresten",
      "Neubezug in Stoff, Alcantara-Optik oder Leder",
      "Passende Sonnenblenden und Säulenverkleidungen",
      "Auch für Fahrzeuge mit Schiebedach",
    ],
    faq: [
      {
        question: "Warum hängt mein Dachhimmel durch?",
        answer:
          "Der Schaumstoff unter dem Bezug zersetzt sich mit den Jahren durch Wärme und Feuchtigkeit. Dadurch löst sich der Stoff von der Trägerplatte. Das lässt sich nur durch einen Neubezug dauerhaft beheben.",
      },
      {
        question: "Kann man den Dachhimmel in einer anderen Farbe beziehen?",
        answer:
          "Ja. Sie können die Originaloptik wählen oder Farbe und Material ändern. Wir beraten Sie gerne zu passenden Kombinationen für Ihren Innenraum.",
      },
    ],
    related: ["sternenhimmel-einbauen", "ambientebeleuchtung-einbauen", "autositze-neu-beziehen"],
    media: [],
  },
  {
    slug: "sternenhimmel-einbauen",
    name: "Sternenhimmel einbauen",
    metaTitle: `Sternenhimmel einbauen – ${REGION}`,
    metaDescription:
      "Sternenhimmel für Ihr Auto: Wir integrieren Lichtpunkte in den Dachhimmel und beziehen ihn auf Wunsch gleich neu. Individuell bei Berlin.",
    intro:
      "Ein Sternenhimmel verwandelt den Dachhimmel in einen dezent leuchtenden Nachthimmel. Wir planen und installieren ihn passend zu Ihrem Fahrzeug.",
    description: [
      "Beim Sternenhimmel werden viele kleine Lichtpunkte per Lichtleiter in den Dachhimmel eingebracht. Die Lichtquelle sitzt versteckt im Fahrzeug, im Innenraum sind nur die feinen Lichtpunkte zu sehen.",
      "Da dafür ohnehin der Dachhimmel ausgebaut wird, bietet sich ein Neubezug an. So erhalten Sie einen sauberen, einheitlichen Dachhimmel mit Sternenhimmel aus einer Hand. Dichte, Anordnung und Lichtsteuerung besprechen wir individuell mit Ihnen.",
    ],
    highlights: [
      "Lichtpunkte per Lichtleiter im Dachhimmel",
      "Dichte und Anordnung nach Ihren Vorstellungen",
      "Kombinierbar mit Neubezug des Dachhimmels",
      "Verdeckte Verkabelung und saubere Montage",
    ],
    faq: [
      {
        question: "Kann ich einen Sternenhimmel in jedes Auto einbauen lassen?",
        answer:
          "In den meisten Fahrzeugen ist das möglich. Schicken Sie uns Fahrzeugtyp und Ausstattung, zum Beispiel mit Schiebedach, dann sagen wir Ihnen, was machbar ist.",
      },
      {
        question: "Wird dafür der Dachhimmel ausgebaut?",
        answer:
          "Ja, der Dachhimmel muss ausgebaut werden. Das lässt sich gut mit einem Neubezug verbinden.",
      },
    ],
    related: ["dachhimmel-neu-beziehen", "ambientebeleuchtung-einbauen", "tuerverkleidungen-neu-beziehen"],
    media: [
      { type: "video", src: "/leistungen/sternenhimmel/sternenhimmel-1.mp4", poster: "/leistungen/sternenhimmel/sternenhimmel-foto-1.webp", alt: "Sternenhimmel im Dachhimmel mit wechselnden Lichtfarben" },
      { type: "video", src: "/leistungen/sternenhimmel/sternenhimmel-2.mp4", poster: "/leistungen/sternenhimmel/sternenhimmel-foto-4.webp", alt: "Fertiger Sternenhimmel in einem Van mit Schiebedach" },
      { type: "video", src: "/leistungen/sternenhimmel/sternenhimmel-3.mp4", poster: "/leistungen/sternenhimmel/sternenhimmel-foto-5.webp", alt: "Sternenhimmel im Innenraum eines Vans" },
    ],
  },
  {
    slug: "ambientebeleuchtung-einbauen",
    name: "Ambientebeleuchtung einbauen",
    metaTitle: `Ambientebeleuchtung einbauen – ${REGION}`,
    metaDescription:
      "Ambientebeleuchtung im Auto nachrüsten: Wir integrieren Lichtleisten in Türverkleidungen, Armaturenbrett und Mittelkonsole. Autosattlerei Guk bei Berlin.",
    intro:
      "Dezentes Licht im Innenraum macht jede Fahrt angenehmer. Wir rüsten Ambientebeleuchtung nach und integrieren sie so, dass sie wie ab Werk wirkt.",
    description: [
      "Ambientebeleuchtung wird typischerweise in Türverkleidungen, im Fußraum, im Armaturenbrett oder in der Mittelkonsole verbaut. Wir verlegen die Lichtleisten verdeckt und integrieren sie sauber in die Verkleidungen.",
      "Besonders sinnvoll ist die Kombination mit einem Neubezug: Wenn Türverkleidungen oder Armaturenbrett ohnehin ausgebaut und neu bezogen werden, kann das Licht direkt eingearbeitet werden – ohne sichtbare Kabel oder aufgeklebte Leisten.",
    ],
    highlights: [
      "Lichtleisten in Türverkleidungen, Armaturenbrett und Mittelkonsole",
      "Verdeckte Kabelführung",
      "Farbwahl und Steuerung nach Absprache",
      "Kombinierbar mit Neubezug der Verkleidungen",
    ],
    faq: [
      {
        question: "Wo kann Ambientebeleuchtung verbaut werden?",
        answer:
          "Häufig in den Türverkleidungen, im Fußraum, im Armaturenbrett oder in der Mittelkonsole. Was bei Ihrem Fahrzeug sinnvoll ist, klären wir in der Beratung.",
      },
      {
        question: "Lässt sich die Beleuchtung später wieder entfernen?",
        answer:
          "Wir arbeiten so, dass die Installation sauber und nachvollziehbar bleibt. Sprechen Sie uns bei Bedarf vorab darauf an.",
      },
    ],
    related: ["sternenhimmel-einbauen", "tuerverkleidungen-neu-beziehen", "mittelkonsole-neu-beziehen"],
    media: [],
  },
  {
    slug: "motorradsitze-neu-beziehen",
    name: "Motorradsitze neu beziehen",
    metaTitle: `Motorradsitze neu beziehen – ${REGION}`,
    metaDescription:
      "Rissige oder ausgeblichene Motorradsitzbank? Wir beziehen Motorradsitze neu – wetterfest, griffig und im Look, den Sie sich wünschen. Autosattlerei bei Berlin.",
    intro:
      "Sonne, Regen und Alter setzen Motorradsitzen zu. Wir beziehen Ihre Sitzbank neu und passen Material, Naht und Optik an Ihr Motorrad an.",
    description: [
      "Eine Motorradsitzbank ist täglich Wind und Wetter ausgesetzt. Risse, Nässe im Schaum und ausgeblichene Bezüge sind die Folge. Wir nehmen den alten Bezug ab, prüfen den Schaum und die Sitzschale und beziehen die Sitzbank neu.",
      "Dabei verwenden wir strapazierfähige, für den Außeneinsatz geeignete Materialien. Ob schlicht, mit Ziernähten oder im Retro-Look für Chopper und Café Racer: Wir besprechen mit Ihnen Material, Farbe und Nahtbild.",
    ],
    highlights: [
      "Neubezug für Sportler, Tourer, Chopper und Klassiker",
      "Wetterfeste und griffige Materialien",
      "Ziernähte und individuelle Nahtbilder",
      "Prüfung und Instandsetzung des Schaums",
    ],
    faq: [
      {
        question: "Muss ich das ganze Motorrad vorbeibringen?",
        answer:
          "Nein, meist reicht es, wenn Sie die ausgebaute Sitzbank bringen. Bei Fragen zum Ausbau helfen wir Ihnen gerne telefonisch weiter.",
      },
      {
        question: "Kann die Sitzbank gleichzeitig angepasst werden?",
        answer:
          "Ja, Form und Polsterung können wir mitberücksichtigen. Mehr dazu auf der Seite „Sitzform von Motorradsitzen verändern“.",
      },
    ],
    related: ["sitzform-motorradsitze-veraendern", "sitzreparaturen", "autositze-neu-beziehen"],
    media: [],
  },
  {
    slug: "sitzform-motorradsitze-veraendern",
    name: "Sitzform von Motorradsitzen verändern",
    metaTitle: `Motorradsitz umbauen & Sitzform ändern – ${REGION}`,
    metaDescription:
      "Motorradsitz zu hoch, zu hart oder unbequem? Wir verändern die Sitzform Ihrer Sitzbank: niedriger, breiter oder bequemer. Autosattlerei Guk bei Berlin.",
    intro:
      "Nicht jede Serien-Sitzbank passt zu jedem Fahrer. Wir ändern Form und Polsterung Ihres Motorradsitzes, damit Sie bequemer und sicherer sitzen.",
    description: [
      "Ein Sitz, der zu hoch ist, zu schmal oder auf langen Touren unbequem wird, lässt sich anpassen. Wir arbeiten die Polsterung um, verändern die Kontur und beziehen die Sitzbank anschließend neu.",
      "Typische Wünsche sind ein niedrigerer Sitz für besseren Bodenkontakt, mehr Sitzfläche für Touren oder ein fester Sitz für sportliches Fahren. Wir besprechen Ihre Körpergröße, Ihr Fahrprofil und Ihr Motorrad und finden eine passende Lösung.",
    ],
    highlights: [
      "Sitzhöhe anpassen (niedriger oder höher)",
      "Sitzfläche und Kontur verändern",
      "Härte der Polsterung abstimmen",
      "Neubezug passend zur neuen Form",
    ],
    faq: [
      {
        question: "Kann man einen Motorradsitz niedriger machen?",
        answer:
          "In vielen Fällen ja, indem die Polsterung angepasst wird. Wie viel möglich ist, hängt von Sitzbank und Motorrad ab.",
      },
      {
        question: "Was brauche ich für eine Einschätzung?",
        answer:
          "Fotos der Sitzbank und des Motorrads sowie Ihre Wünsche genügen für eine erste Einschätzung. Nutzen Sie dafür das Kontaktformular.",
      },
    ],
    related: ["motorradsitze-neu-beziehen", "sitzreparaturen", "autositze-neu-beziehen"],
    media: [],
  },
  {
    slug: "sitzreparaturen",
    name: "Sitzreparaturen",
    metaTitle: `Sitzreparaturen für Autos – ${REGION}`,
    metaDescription:
      "Risse, Löcher, aufgeplatzte Nähte oder durchgesessene Polster? Wir reparieren Autositze fachgerecht. Autosattlerei Guk in Fredersdorf-Vogelsdorf.",
    intro:
      "Nicht immer muss der ganze Sitz neu bezogen werden. Wir reparieren Schäden am Bezug, an Nähten und an der Polsterung.",
    description: [
      "Typische Schäden sind aufgerissene Nähte, Risse im Leder, durchgescheuerte Seitenwangen oder ein eingefallener Sitzschaum. Wir sehen uns den Schaden an und sagen Ihnen ehrlich, ob eine Reparatur ausreicht oder ein Neubezug sinnvoller ist.",
      "Bei Reparaturen achten wir darauf, dass Material, Farbe und Nahtbild möglichst zum Rest des Sitzes passen.",
    ],
    highlights: [
      "Nähte nachnähen oder erneuern",
      "Einzelne Bezugsteile ersetzen",
      "Seitenwangen und Sitzflächen instand setzen",
      "Polsterung und Schaum auffrischen",
    ],
    faq: [
      {
        question: "Lohnt sich eine Reparatur oder ein Neubezug?",
        answer:
          "Das hängt vom Schaden ab. Bei einem einzelnen Riss oder einer Naht genügt oft eine Reparatur, bei flächigem Verschleiß ist ein Neubezug meist die bessere Lösung. Fotos helfen bei der Einschätzung.",
      },
    ],
    related: ["autositze-neu-beziehen", "originalsitzbezug-ersetzen", "oldtimer-sitze-restaurieren"],
    media: [],
  },
  {
    slug: "originalsitzbezug-ersetzen",
    name: "Beschädigten Original-Sitzbezug durch neuen Originalbezug ersetzen",
    metaTitle: `Original-Sitzbezug ersetzen – ${REGION}`,
    metaDescription:
      "Beschädigter Sitzbezug? Wir ersetzen ihn durch einen neuen Originalbezug, damit Ihr Sitz wieder aussieht wie ab Werk. Autosattlerei Guk bei Berlin.",
    intro:
      "Ist nur ein Sitz beschädigt, soll das Fahrzeug aber original bleiben, ersetzen wir den Bezug durch einen neuen Originalbezug.",
    description: [
      "Wer Wert auf ein originales Erscheinungsbild legt, möchte nicht gleich alle Sitze umgestalten. In diesem Fall tauschen wir den beschädigten Bezug gegen einen neuen Originalbezug aus und beziehen den Sitz fachgerecht damit.",
      "So bleiben Optik und Wert Ihres Fahrzeugs erhalten, und der beschädigte Sitz fällt nicht mehr aus der Reihe. Welcher Originalbezug passt und ob er verfügbar ist, klären wir anhand Ihres Fahrzeugs.",
    ],
    highlights: [
      "Neuer Originalbezug statt Eigenkreation",
      "Passend zu Modell, Ausstattung und Farbe",
      "Fachgerechte Montage auf bestehendem Sitz",
      "Ideal bei einzelnen beschädigten Sitzen",
    ],
    faq: [
      {
        question: "Woher bekomme ich einen passenden Originalbezug?",
        answer:
          "Nennen Sie uns Modell, Baujahr und Ausstattungslinie. Wir klären, welcher Bezug passt, und ob er verfügbar ist.",
      },
      {
        question: "Was, wenn es keinen Originalbezug mehr gibt?",
        answer:
          "Dann können wir einen Bezug in originalgetreuer Optik anfertigen. Sprechen Sie uns an.",
      },
    ],
    related: ["sitzreparaturen", "autositze-neu-beziehen", "oldtimer-sitze-restaurieren"],
    media: [],
  },
  {
    slug: "oldtimer-sitze-restaurieren",
    name: "Oldtimer-Sitze restaurieren",
    metaTitle: `Oldtimer-Sitze restaurieren – ${REGION}`,
    metaDescription:
      "Restaurierung von Oldtimer-Sitzen mit originalgetreuem Material und Handwerk: Polster, Bezug, Nähte. Autosattlerei Guk bei Berlin und Brandenburg.",
    intro:
      "Oldtimer-Sitze erzählen Geschichte. Wir restaurieren sie handwerklich und so nah am Original, wie es Ihr Fahrzeug verlangt.",
    description: [
      "Bei Oldtimern geht es um mehr als einen neuen Bezug. Polsterung, Federung, Sitzaufbau und Nahtbild gehören zum Charakter des Fahrzeugs. Wir bauen die Sitze auf, erneuern verschlissene Teile und beziehen sie originalgetreu.",
      "Anhand von Fotos, Unterlagen oder Mustern orientieren wir uns an der ursprünglichen Ausführung. Auch ältere Materialien und Muster stellen wir nach Möglichkeit authentisch nach.",
    ],
    highlights: [
      "Aufarbeitung von Polsterung und Sitzaufbau",
      "Originalgetreue Bezüge, Muster und Nähte",
      "Restaurierung einzelner Sitze oder kompletter Sitzanlagen",
      "Beratung zu zeitgenössischen Materialien",
    ],
    faq: [
      {
        question: "Arbeiten Sie nach Originalvorgaben?",
        answer:
          "Ja, wenn Sie das wünschen. Wir orientieren uns an Unterlagen, Fotos oder erhaltenen Teilen Ihres Fahrzeugs.",
      },
      {
        question: "Kann ich einen restaurierten Sitz nachträglich auch modernisieren?",
        answer:
          "Auf Wunsch ja, zum Beispiel mit mehr Komfort in der Polsterung. Wir besprechen, was zu Ihrem Fahrzeug passt.",
      },
    ],
    related: ["neuen-teppichboden-in-oldtimern-verlegen", "sitzreparaturen", "autositze-neu-beziehen"],
    media: [],
  },
  {
    slug: "neuen-teppichboden-in-oldtimern-verlegen",
    name: "Neuen Teppichboden in Oldtimern verlegen",
    metaTitle: `Teppichboden im Oldtimer erneuern – ${REGION}`,
    metaDescription:
      "Neuer Teppichboden für Ihren Oldtimer: Wir fertigen und verlegen passgenaue Teppiche für den kompletten Innenraum. Autosattlerei Guk bei Berlin.",
    intro:
      "Verschlissene oder muffige Teppiche trüben den Gesamteindruck eines Oldtimers. Wir verlegen passgenauen neuen Teppichboden im ganzen Innenraum.",
    description: [
      "Der Teppichboden gehört zu den Teilen eines Oldtimers, die am stärksten beansprucht werden und zugleich den Innenraum prägen. Wir bauen die alten Teppiche aus, prüfen den Untergrund und verlegen den neuen Teppichboden mit sauberen Kanten und Ausschnitten.",
      "Farbe, Material und Kantenfassung stimmen wir auf den Rest des Innenraums ab, auf Wunsch originalgetreu.",
    ],
    highlights: [
      "Ausbau der alten Teppiche",
      "Passgenaue Anfertigung für Ihr Modell",
      "Saubere Kanten, Ausschnitte und Befestigung",
      "Abstimmung von Farbe und Material mit dem Innenraum",
    ],
    faq: [
      {
        question: "Wird der Teppich nur ausgetauscht oder auch der Untergrund geprüft?",
        answer:
          "Beim Ausbau sehen wir uns auch den Untergrund an. Sollten wir dabei Auffälligkeiten finden, sprechen wir Sie an.",
      },
    ],
    related: ["oldtimer-sitze-restaurieren", "tuerverkleidungen-neu-beziehen", "armaturenbrett-neu-beziehen"],
    media: [],
  },
  {
    slug: "autositze-neu-beziehen",
    name: "Autositze neu beziehen",
    metaTitle: `Autositze neu beziehen – ${REGION}`,
    metaDescription:
      "Autositze neu beziehen in Leder, Alcantara oder Stoff: Individuell, passgenau und mit Liebe zum Detail. Autosattlerei Guk bei Berlin und Brandenburg.",
    intro:
      "Abgenutzte Sitze müssen nicht gleich ausgetauscht werden. Wir beziehen Ihre Autositze neu, in Original- oder in Wunschoptik.",
    description: [
      "Autositze sind die am stärksten beanspruchten Teile im Innenraum. Wir bauen die Sitze aus, nehmen den alten Bezug ab, prüfen und richten die Polsterung her und beziehen den Sitz neu.",
      "Sie haben die Wahl zwischen Leder, Kunstleder, Alcantara-Optik und Stoff. Farbe, Ziernähte, Perforation oder Steppmuster legen wir gemeinsam fest, ob dezent im Originalstil oder ganz individuell.",
    ],
    highlights: [
      "Leder, Kunstleder, Alcantara-Optik und Stoff",
      "Originalgetreu oder individuell gestaltet",
      "Ziernähte, Steppungen und Kontrastfarben",
      "Instandsetzung der Polsterung",
      "Für Pkw, Transporter und Sportwagen",
    ],
    faq: [
      {
        question: "Kann ich Sitze mit Sitzheizung neu beziehen lassen?",
        answer:
          "In der Regel ja. Wir achten darauf, dass Heizung und Elektrik beim Aus- und Einbau unversehrt bleiben. Nennen Sie uns bei der Anfrage gerne die Ausstattung.",
      },
      {
        question: "Wie läuft eine Anfrage ab?",
        answer:
          "Senden Sie uns Fotos der Sitze und Ihre Wünsche über das Kontaktformular. Wir melden uns mit einer Einschätzung bei Ihnen.",
      },
    ],
    related: ["sitzreparaturen", "originalsitzbezug-ersetzen", "lenkraeder-neu-beziehen"],
    media: [],
  },
  {
    slug: "lenkraeder-neu-beziehen",
    name: "Lenkräder neu beziehen",
    metaTitle: `Lenkrad neu beziehen – ${REGION}`,
    metaDescription:
      "Abgegriffenes Lenkrad? Wir beziehen Lenkräder neu in Leder oder Alcantara-Optik, mit Ziernaht nach Wunsch. Autosattlerei Guk bei Berlin.",
    intro:
      "Das Lenkrad berühren Sie bei jeder Fahrt. Ein neuer Bezug bringt Griffigkeit und Optik zurück und macht aus dem Lenkrad ein Detail, das gefällt.",
    description: [
      "Glänzende Stellen, rissiges Leder und abgegriffene Oberflächen sind typisch für ältere Lenkräder. Wir ziehen das Lenkrad neu auf und wählen dafür ein Material, das gut in der Hand liegt.",
      "Ob Leder, Alcantara-Optik oder eine Kombination, ob mit Mittelmarkierung oder Ziernaht in Kontrastfarbe: Sie entscheiden, wie Ihr Lenkrad am Ende aussieht.",
    ],
    highlights: [
      "Leder, Alcantara-Optik oder Materialmix",
      "Ziernähte in Wunschfarbe",
      "Auch für Sport- und Mehrfunktionslenkräder",
      "Passend zu Sitzen und Innenraum",
    ],
    faq: [
      {
        question: "Muss das Lenkrad ausgebaut werden?",
        answer:
          "In der Regel ja. Ob Sie es ausbauen oder wir, klären wir vorab. Bei Fahrzeugen mit Airbag ist besondere Vorsicht geboten, hier lassen wir uns zunächst Ihr Modell nennen.",
      },
    ],
    related: ["autositze-neu-beziehen", "mittelkonsole-neu-beziehen", "armaturenbrett-neu-beziehen"],
    media: [],
  },
  {
    slug: "tuerverkleidungen-neu-beziehen",
    name: "Türverkleidungen neu beziehen",
    metaTitle: `Türverkleidungen neu beziehen – ${REGION}`,
    metaDescription:
      "Ausgeblichene, beschädigte oder lose Türverkleidungen? Wir beziehen sie neu in Leder, Alcantara-Optik oder Stoff. Autosattlerei Guk bei Berlin.",
    intro:
      "Türverkleidungen sind sichtbar und werden täglich berührt. Mit einem Neubezug wirkt Ihr Innenraum sofort frischer.",
    description: [
      "Kratzer, Verfärbungen, sich lösender Bezug oder abgenutzte Armauflagen: Türverkleidungen zeigen Gebrauchsspuren besonders deutlich. Wir bauen sie aus, entfernen den alten Bezug und beziehen sie in Ihrem Wunschmaterial neu.",
      "Das Ergebnis passt zu Sitzen, Dachhimmel und Armaturenbrett. Auf Wunsch kombinieren wir den Neubezug mit Ambientebeleuchtung.",
    ],
    highlights: [
      "Neubezug einzelner Einsätze oder der ganzen Verkleidung",
      "Leder, Alcantara-Optik, Kunstleder oder Stoff",
      "Ziernähte und Farbkombinationen",
      "Kombinierbar mit Ambientebeleuchtung",
    ],
    faq: [
      {
        question: "Kann man nur einen Teil der Türverkleidung neu beziehen?",
        answer:
          "Ja, zum Beispiel nur Einsätze oder Armauflagen. Ob das optisch sinnvoll ist, besprechen wir anhand Ihres Fahrzeugs.",
      },
    ],
    related: ["ambientebeleuchtung-einbauen", "autositze-neu-beziehen", "mittelkonsole-neu-beziehen"],
    media: [],
  },
  {
    slug: "mittelkonsole-neu-beziehen",
    name: "Mittelkonsole neu beziehen",
    metaTitle: `Mittelkonsole neu beziehen – ${REGION}`,
    metaDescription:
      "Verkratzte oder abgegriffene Mittelkonsole? Wir beziehen Mittelkonsole und Armlehne neu – passend zum restlichen Innenraum. Autosattlerei Guk bei Berlin.",
    intro:
      "Mittelkonsole und Armlehne sind im Alltag ständig im Einsatz. Wir beziehen sie neu, damit sie wieder gut aussehen und sich gut anfassen.",
    description: [
      "An der Mittelkonsole entstehen mit der Zeit Kratzer, Verfärbungen und abgegriffene Stellen, vor allem an der Armlehne. Wir bauen die Teile aus und beziehen sie in einem Material, das zum Rest des Innenraums passt.",
      "Wenn Sitze, Türverkleidungen oder Lenkrad ebenfalls neu bezogen werden, stimmen wir alles aufeinander ab – so entsteht ein stimmiger Gesamteindruck.",
    ],
    highlights: [
      "Neubezug von Mittelkonsole, Armlehne und Ablagen",
      "Abgestimmt auf Sitze und Türverkleidungen",
      "Leder, Alcantara-Optik oder Kunstleder",
      "Ziernähte nach Wunsch",
    ],
    faq: [
      {
        question: "Kann die Armlehne einzeln bezogen werden?",
        answer:
          "Ja, auch das ist möglich. Oft lohnt es sich aber, Armlehne und Konsole in einem Zug zu bearbeiten.",
      },
    ],
    related: ["armaturenbrett-neu-beziehen", "tuerverkleidungen-neu-beziehen", "lenkraeder-neu-beziehen"],
    media: [],
  },
  {
    slug: "armaturenbrett-neu-beziehen",
    name: "Armaturenbrett neu beziehen",
    metaTitle: `Armaturenbrett neu beziehen – ${REGION}`,
    metaDescription:
      "Rissiges oder ausgeblichenes Armaturenbrett (Torpedo)? Wir beziehen es neu in Leder oder Alcantara-Optik. Autosattlerei Guk bei Berlin und Brandenburg.",
    intro:
      "Sonne und Alter setzen dem Armaturenbrett zu: Es wird rissig, blass oder klebrig. Wir beziehen es neu und geben dem Cockpit seine Wirkung zurück.",
    description: [
      "Das Armaturenbrett, auch Torpedo genannt, prägt den ersten Eindruck des Innenraums. Wir bauen es aus, entfernen den alten Bezug und beziehen es mit hochwertigem Material neu.",
      "Je nach Fahrzeug sind Neubezug in Leder oder Alcantara-Optik, kombiniert mit Ziernähten, möglich. Auch Teilbereiche wie die Oberseite oder Zierblenden können einzeln bearbeitet werden.",
    ],
    highlights: [
      "Neubezug des gesamten Armaturenbretts oder von Teilbereichen",
      "Reparatur von Rissen und Verformungen",
      "Leder, Alcantara-Optik oder Kunstleder",
      "Abgestimmt auf Lenkrad, Konsole und Türverkleidungen",
    ],
    faq: [
      {
        question: "Ist ein Neubezug bei Rissen im Armaturenbrett möglich?",
        answer:
          "In vielen Fällen ja. Wir sehen uns den Zustand an und sagen Ihnen, was machbar ist. Fotos erleichtern die erste Einschätzung.",
      },
      {
        question: "Wird dabei der Airbag berührt?",
        answer:
          "Bei Arbeiten am Armaturenbrett gehen wir mit Airbag-Bereichen besonders sorgfältig um. Nennen Sie uns bei der Anfrage Ihr Modell, dann klären wir das vorab.",
      },
    ],
    related: ["mittelkonsole-neu-beziehen", "lenkraeder-neu-beziehen", "tuerverkleidungen-neu-beziehen"],
    media: [],
  },
  {
    slug: "sitze-fuer-yachten-und-boote-neu-beziehen",
    name: "Sitze von Yachten und Booten neu beziehen",
    metaTitle: `Bootspolster & Yachtsitze neu beziehen – ${REGION}`,
    metaDescription:
      "Sitze und Polster von Yachten und Booten neu beziehen: wetterfeste, UV-beständige Materialien. Autosattlerei Guk bei Berlin und Brandenburg.",
    intro:
      "Wasser, Sonne und Salz sind eine Herausforderung für Bootspolster. Wir beziehen Sitze von Yachten und Booten mit Materialien, die dafür gemacht sind.",
    description: [
      "Auf dem Wasser müssen Polster mehr aushalten als im Auto: UV-Strahlung, Feuchtigkeit und ständiger Temperaturwechsel. Wir verwenden daher Materialien, die für den Marineeinsatz geeignet sind.",
      "Wir beziehen Sitzbänke, Steuerstände und Polster im Cockpit oder in der Kajüte neu. Form, Farbe und Naht stimmen wir mit Ihnen ab, damit das Ergebnis zu Ihrem Boot passt.",
    ],
    highlights: [
      "Wetter- und UV-beständige Marine-Materialien",
      "Sitzbänke, Steuerstände und Kajütenpolster",
      "Passgenaue Anfertigung nach Maß oder Muster",
      "Für Motorboote, Segelyachten und Sportboote",
    ],
    faq: [
      {
        question: "Welche Materialien eignen sich für Boote?",
        answer:
          "Für den Einsatz auf dem Wasser nutzen wir UV- und wasserbeständige Bezugsstoffe, die auch Salz und Feuchtigkeit gut verkraften. Details besprechen wir gerne persönlich.",
      },
      {
        question: "Muss das Boot zu Ihnen gebracht werden?",
        answer:
          "In der Regel reicht es, wenn Sie uns die Polster bringen. Ob ein Termin vor Ort nötig ist, klären wir nach Ihrer Anfrage.",
      },
    ],
    related: ["autositze-neu-beziehen", "sitzreparaturen", "motorradsitze-neu-beziehen"],
    media: [],
  },
];

export const getService = (slug: string) =>
  SERVICES.find((service) => service.slug === slug);
