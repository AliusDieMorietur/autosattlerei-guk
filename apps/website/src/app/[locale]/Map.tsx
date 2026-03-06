import { sendGTMEvent } from "@next/third-parties/google";
import { useEffect, useState } from "react";

export const Map = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const onUserAction = () => {
      if (isLoaded) return;
      setIsLoaded(true);
    };

    window.addEventListener("scroll", onUserAction);
    window.addEventListener("pointermove", onUserAction);

    return () => {
      window.removeEventListener("scroll", onUserAction);
      window.removeEventListener("pointermove", onUserAction);
    };
  }, []);

  const onMapClick = () => {
    sendGTMEvent({
      event: "conversion",
      send_to: process.env.NEXT_PUBLIC_GA_CONVERSION_ID,
      value: 1.0,
      currency: "EUR",
    });

    window.open(
      "https://maps.google.com/?q=Frankfurter+Chaussee+73,+Fredersdorf-Vogelsdorf",
      "_blank",
    );
  };

  if (!isLoaded) return <></>;

  return (
    <div className="relative w-full desktop:max-w-[70%]">
      <iframe
        className="w-full border-none rounded-xl h-[300px] tablet:h-[500px]"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1464.2832896913915!2d13.741590000000002!3d52.499485!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8491c47fce34b%3A0xb79e7f0d0fa3f557!2sAutosattlerei%20Guk.%20Auto%2C%20Motorrad%20und%20Boot%20neu%20beziehen!5e1!3m2!1sru!2sua!4v1772832203611!5m2!1sru!2sua"
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <button
        onClick={onMapClick}
        className="absolute inset-0 w-full h-full cursor-pointer bg-transparent"
        aria-label="Open in Google Maps"
      />
    </div>
  );
};
