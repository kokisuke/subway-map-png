document.querySelectorAll(".station").forEach(station => {
  station.addEventListener("click", () => {
    const infoBox = document.getElementById("station-info");
    const stationName = station.innerText;

    let message = "";
    switch (station.id) {
      case "nagoya":
        message = "名古屋駅：東山線・桜通線が利用可能。JR・名鉄・近鉄へのアクセスも便利です。";
        break;
      case "sakae":
        message = "栄駅：名古屋の中心地。ショッピングや観光に最適なエリアです。";
        break;
      case "kanayama":
        message = "金山駅：主要な乗換駅で、JR・名鉄・地下鉄が利用可能です。";
        break;
      default:
        message = "情報がありません。";
    }

    infoBox.innerText = message;
  });
});
