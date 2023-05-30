export function trackUserVisibility(): void {
  if (document.addEventListener)
    document.addEventListener("visibilitychange", handleVisibilityChange);
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
      lastWindowVisibleTimestamp + 2 * 60 * 1000;

    if (Date.now() >= fiftyHoursAfterTimestamp) {
      alert("você passou muito tempo inativo!");
    }
  }
}
