"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

interface Props {
  id: number;
}

export function MetrikaScript({ id }: Props) {
  return (
    <Script id="yandex-metrika">
      {`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(`+ id + `, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true
        });
      `}
    </Script>
  );
}

// export function Metrika({
//   id
// }: Props) {
//   const pathName = usePathname();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     ym(id, "hit", window.location.href);
//   }, [id, pathName, searchParams]);

//   return null;
// }