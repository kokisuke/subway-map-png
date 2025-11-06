const stationInfo = document.getElementById('station-info');
const mapImage = document.querySelector('#map-container img');

// We need to wait for the image to load to get its natural dimensions
mapImage.onload = () => {
    // 駅のデータ。座標(x, y)はmap.png画像ファイルにおける左上を原点としたピクセル位置です。
    const stations = [
        { name: '名古屋', x: 534, y: 960, lines: ['東山線', '桜通線'], details: 'JR線、名鉄線、近鉄線との乗り換えが可能です。' },
        { name: '伏見', x: 719, y: 1054, lines: ['東山線', '鶴舞線'], details: '鶴舞線との乗り換えが可能です。' },
        { name: '栄', x: 902, y: 1054, lines: ['東山線', '名城線'], details: '名鉄瀬戸線（栄町駅）との乗り換えが可能です。' }
        { name: '栄', x: 902, y: 1054, lines: ['東山線', '名城線'], details: '名鉄瀬戸線（栄町駅）との乗り換えが可能です。' }
        { name: '栄', x: 902, y: 1054, lines: ['東山線', '名城線'], details: '名鉄瀬戸線（栄町駅）との乗り換えが可能です。' }
        { name: '栄', x: 902, y: 1054, lines: ['東山線', '名城線'], details: '名鉄瀬戸線（栄町駅）との乗り換えが可能です。' }
        { name: '栄', x: 902, y: 1054, lines: ['東山線', '名城線'], details: '名鉄瀬戸線（栄町駅）との乗り換えが可能です。' }
        { name: '栄', x: 902, y: 1054, lines: ['東山線', '名城線'], details: '名鉄瀬戸線（栄町駅）との乗り換えが可能です。' }
        
        
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
