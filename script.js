document.addEventListener("DOMContentLoaded", () => {
  const areas = document.querySelectorAll("area");
  const nameDisplay = document.getElementById("station-name");
  const detailDisplay = document.getElementById("station-detail");

  areas.forEach(area => {
    area.addEventListener("click", e => {
      e.preventDefault();
      const name = area.dataset.name;
      nameDisplay.textContent = name;
      detailDisplay.textContent = `${name}駅は名古屋市営地下鉄の主要駅の1つです。`;
    });
  });
});
