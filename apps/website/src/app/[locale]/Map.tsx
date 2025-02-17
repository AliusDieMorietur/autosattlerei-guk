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

  if (!isLoaded) return <></>;

  return (
    <iframe
      className="w-full desktop:max-w-[70%] border-none rounded-xl h-[300px] tablet:h-[500px]"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d868.6000249940174!2d13.591360106931589!3d52.4545272726081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8491c47fce34b%3A0xb79e7f0d0fa3f557!2sAutosattlerei%20Guk.%20Auto%2C%20Motorrad%20und%20Boot%20neu%20beziehen!5e0!3m2!1sru!2sua!4v1733084030211!5m2!1sru!2sua"
      allowFullScreen={false}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};
