const stationInfo = document.getElementById('station-info');
const mapContainer = document.getElementById('map-container');
const mapImage = mapContainer.querySelector('img');

// 駅のデータ。座標(x, y)はmap.png画像ファイルにおける左上を原点としたピクセル位置です。
// TODO: 正確な駅名と座標に更新してください。
const stations = [
    { name: '名古屋', x: 534, y: 960, lines: ['東山線', '桜通線'], details: 'JR線、名鉄線、近鉄線との乗り換えが可能です。' },
    { name: '伏見', x: 719, y: 1054, lines: ['東山線', '鶴舞線'], details: '鶴舞線との乗り換えが可能です。' },
    { name: '栄', x: 902, y: 1054, lines: ['東山線', '名城線'], details: '名鉄瀬戸線（栄町駅）との乗り換えが可能です。' }
];

mapContainer.addEventListener('click', (event) => {
    // 画像の表示サイズと元の画像のサイズの比率を計算
    const rect = mapImage.getBoundingClientRect();
    const scaleX = mapImage.naturalWidth / rect.width;
    const scaleY = mapImage.naturalHeight / rect.height;

    // クリック座標を画像の元サイズに換算
    const imageX = (event.clientX - rect.left) * scaleX;
    const imageY = (event.clientY - rect.top) * scaleY;

    const clickedStation = findClickedStation(imageX, imageY);

    if (clickedStation) {
        showStationInfo(clickedStation);
    } else {
        stationInfo.innerHTML = '';
        stationInfo.style.display = 'none';
    }
});

function findClickedStation(x, y) {
    const clickRadius = 30; // クリック判定の半径（ピクセル単位）
    return stations.find(station => {
        const distance = Math.sqrt(Math.pow(station.x - x, 2) + Math.pow(station.y - y, 2));
        return distance < clickRadius;
    });
}

function showStationInfo(station) {
    stationInfo.innerHTML = `
        <h3>${station.name}</h3>
        <p><strong>路線:</strong> ${station.lines.join(', ')}</p>
        <p>${station.details}</p>
    `;
    stationInfo.style.display = 'block';
}