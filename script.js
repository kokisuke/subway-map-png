const stationInfo = document.getElementById('station-info');
const mapImage = document.querySelector('#map-container img');

// We need to wait for the image to load to get its natural dimensions
mapImage.onload = () => {
    // 駅のデータ。座標(x, y)はmap.png画像ファイルにおける左上を原点としたピクセル位置です。
    const stations = [
        // 東山線
        { name: '高畑', x: 173, y: 1515, lines: ['東山線'], details: '' },
        { name: '八田', x: 173, y: 1360, lines: ['東山線'], details: '' },
        { name: '岩塚', x: 173, y: 1226, lines: ['東山線'], details: '' },
        { name: '中村公園', x: 173, y: 1065, lines: ['東山線'], details: '' },
        { name: '中村日赤', x: 173, y: 934, lines: ['東山線'], details: '' },
        { name: '本陣', x: 173, y: 824, lines: ['東山線'], details: '' },
        { name: '亀島', x: 383, y: 795, lines: ['東山線'], details: '' },
        { name: '名古屋', x: 523, y: 932, lines: ['東山線', '桜通線'], details: 'JR線、名鉄線、近鉄線との乗り換えが可能です。' },
        { name: '伏見', x: 693, y: 1054, lines: ['東山線', '鶴舞線'], details: '鶴舞線との乗り換えが可能です。' },
        { name: '栄', x: 876, y: 1054, lines: ['東山線', '名城線'], details: '名鉄瀬戸線（栄町駅）との乗り換えが可能です。' },
        { name: '新栄町', x: 1049, y: 1054, lines: ['東山線'], details: '' },
        { name: '千種', x: 1144, y: 1054, lines: ['東山線'], details: '' },
        { name: '今池', x: 1223, y: 1054, lines: ['東山線', '桜通線'], details: '' },
        { name: '池下', x: 1395, y: 1054, lines: ['東山線'], details: '' },
        { name: '覚王山', x: 1481, y: 1054, lines: ['東山線'], details: '' },
        { name: '本山', x: 1577, y: 1054, lines: ['東山線'], details: '' },
        { name: '東山公園', x: 1696, y: 1054, lines: ['東山線'], details: '' },
        { name: '星ヶ丘', x: 1775, y: 1054, lines: ['東山線'], details: '' },
        { name: '一社', x: 1850, y: 1054, lines: ['東山線'], details: '' },
        { name: '上社', x: 1925, y: 1054, lines: ['東山線'], details: '' },
        { name: '本郷', x: 1997, y: 1054, lines: ['東山線'], details: '' },
        { name: '藤が丘', x: 2076, y: 1054, lines: ['東山線'], details: '' },
        
        // その他の路線
        { name: '丸の内', x: 770, y: 896, lines: ['桜通線', '鶴舞線'], details: '' },
        { name: '久屋大通', x: 956, y: 896, lines: ['桜通線', '名城線'], details: '' },
        { name: '上前津', x: 951, y: 1308, lines: ['鶴舞線', '名城線'], details: '' },
        { name: '御器所', x: 1246, y: 1308, lines: ['桜通線', '鶴舞線'], details: '' },
        
        
    ];

    const initialInfoText = '<p>駅をクリックすると詳細が表示されます。</p>';

    mapImage.addEventListener('click', (event) => {
        // The image's displayed size
        const rect = mapImage.getBoundingClientRect();
        
        // The scale between the natural image size and the displayed size
        const scaleX = mapImage.naturalWidth / rect.width;
        const scaleY = mapImage.naturalHeight / rect.height;

        // event.offsetX/Y gives the click coordinates relative to the element (the image)
        // We scale these coordinates to match the natural dimensions of the image
        const imageX = event.offsetX * scaleX;
        const imageY = event.offsetY * scaleY;

        const clickedStation = findClickedStation(imageX, imageY);

        if (clickedStation) {
            showStationInfo(clickedStation);
        } else {
            // If no station is clicked, show the initial message
            stationInfo.innerHTML = initialInfoText;
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
    }
};

// Handle cases where the image is already cached and onload doesn't fire
if (mapImage.complete) {
    mapImage.onload();
}
