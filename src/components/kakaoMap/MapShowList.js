import React, { useEffect, useState } from "react";
const { kakao } = window;


const MapShowList = (places) => {


  useEffect(() => {

    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(33.450705, 126.570677),
      level: 4
    };
    const map = new kakao.maps.Map(container, options);

    const test = [
      {
        title: '카카오',
        addr : "첨단로 242",

        latlng: new kakao.maps.LatLng(33.450705, 126.570677)
      },
      {
        title: '생태연못',
        latlng: new kakao.maps.LatLng(33.450936, 126.569477)
      },
      {
        title: '텃밭',
        latlng: new kakao.maps.LatLng(33.450879, 126.569940)
      },
      {
        title: '근린공원',
        latlng: new kakao.maps.LatLng(33.451393, 126.570738)
      }
    ];

    for (var i = 0; i < test.length; i ++) {
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: test[i].latlng, // 마커를 표시할 위치
        title : test[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다

      });
      const infowindow = new kakao.maps.InfoWindow({
        position : test[i].latlng,
        content : '<div style="font-size:12px; padding-left: 50px">' + test[i].title + '</div>'
      });
      infowindow.open(map, marker);
    }
  }, []);

  return (

    <div id='myMap' style={{
      width: '100%',
      height: '300px',
      margin: 'auto'
    }}></div>

  );
}

export default MapShowList;
