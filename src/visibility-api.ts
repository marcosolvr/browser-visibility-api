export function trackUserVisibility(): void {
  handleVisibilityChange();

  if (document.addEventListener)
    document.addEventListener("visibilitychange", handleVisibilityChange);

  window.onbeforeunload = function (event) {
    if (event)
      localStorage.setItem("lastWindowVisibleTimestamp", String(Date.now()));
  };
}

function handleVisibilityChange(): void {
  if (document.visibilityState === "hidden") {
    localStorage.setItem("lastWindowVisibleTimestamp", String(Date.now()));
  }

  if (document.visibilityState === "visible") {
    const lastWindowVisibleTimestamp: number = new Date(
      Number(localStorage.getItem("lastWindowVisibleTimestamp"))
    ).getTime();
    const fiftyHoursAfterTimestamp: number =
      lastWindowVisibleTimestamp + 1 * 60 * 1000;

    if (Date.now() >= fiftyHoursAfterTimestamp) {
      alert("você passou muito tempo inativo!");
    }
  }
}
