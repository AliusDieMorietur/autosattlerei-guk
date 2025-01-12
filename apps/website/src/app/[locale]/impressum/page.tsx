import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Impressum - Autosattlerei Guk in Berlin",
    description: "Autosattlerei Guk in Berlin - Impressum",
  };
};

export default function Impressum(): JSX.Element {
  return (
    <div className="flex flex-col text-c7 p-5 desktopLg:p-0 -mt-4">
      <div className="text-c14">Impressum</div>
      <div>Stanislav Guk</div>
      <div className="mb-4">Autosattlerei Guk</div>
      <div className="text-c14">Hauptniederlassung</div>
      <div>Baruther Straße 13</div>
      <div className="mb-4">15806 Zossen</div>
      <div className="text-c14">Betriebsstätte</div>
      <div>Seelenbinderstraße 112</div>
      <div className="mb-4">12555 Berlin</div>
      <div className="text-c14">Kontakt</div>
      <div>Telefon: 0176-614-99059</div>
      <div className="mb-4">E-Mail: autosattler.guk@gmail.com</div>
      <div className="text-c14">Umsatzsteuer-ID</div>
      <div>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
      </div>
      <div className="mb-4">DE368433891</div>
      <div className="text-c14">
        Verbraucher­streit­beilegung / Universal­schlichtungs­stelle
      </div>
      <div>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </div>
    </div>
  );
}
