// KaTeX auto-render with retry. Wait for the deferred CDN scripts to land.
window.addEventListener("DOMContentLoaded", () => {
  let tries = 0;
  const run = () => {
    if (typeof renderMathInElement === "function") {
      renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
      return;
    }
    if (++tries < 50) setTimeout(run, 60);
  };
  run();
});
