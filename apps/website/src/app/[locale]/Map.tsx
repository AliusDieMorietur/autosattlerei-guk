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
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.8652470032584!2d13.741954499999999!3d52.4996788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a836a174abd863%3A0x9b363d5dc7b6e6c6!2zRnJhbmtmdXJ0ZXIgQ2hhdXNzZWUgNzMsIDE1MzcwIEZyZWRlcnNkb3JmLVZvZ2Vsc2RvcmYsINCT0LXRgNC80LDQvdC40Y8!5e0!3m2!1sru!2sua!4v1753297690629!5m2!1sru!2sua"
      allowFullScreen={false}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};
