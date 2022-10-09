import axios from "axios";

//export const SERVER_PATH = "http://localhost:7777"
export const SERVER_PATH = "http://192.168.131.181:7777"
export const CLIENT_PATH = "http://192.168.131.38:3000"



class ParkingService {

    addHeader(method,path,data){
      return axios({
        method: method,
        url: SERVER_PATH + path,
        headers: {
          'Authorization': localStorage.getItem("jwt").toString(),
          'Content-Type': 'application/json'
        },
        data : data
      })
    }

    /** 도시 리스트 받아오기 */
    getCities(){
        return axios.get(SERVER_PATH+"/api/city")
    }

    /** 차종(소,중,대 받아오기) */
    getCarType() {
      return axios.get(SERVER_PATH + "/api/car");
    }

    /** DB의 랜트 가능한 장소 조회 */
    getPlaces() {
      return axios.get(SERVER_PATH + "/api/place")
    }


    /** 개인이 들고있는 장소 조회하기 */
    getMyPlaces(){
      return this.addHeader("get","/api/parking")
    }

    /** Borrow 데이터 보내기*/
    postRentPlaceData(startTime,endTime,cost,message,placeId){
      return this.addHeader("post","/api/rent",{
        "startTime" : startTime,
        "endTime" : endTime,
        "message" : message,
        "placeId" : placeId,
        "cost" : cost
      })
    }

    getBorrow(){
      return this.addHeader("get","/api/borrow")
    }


    /** 차 등록 */
    postAddCar(carNumber, carModel,carSize){
      return this.addHeader("post","/api/car",{
        "carModel" : carModel,
        "carNumber" : carNumber,
        "size" : carSize
      })
    }

    /** 장소 등록 */
    postAddPlace(mapAddr,x_pos,y_pos,message,placeName,imgUrl){
      return this.addHeader("post","/api/place",{
        "mapAddr": mapAddr,
        "mapX": x_pos,
        "mapY": y_pos,
        "message": message,
        "placeName": placeName,
        "imgUrl" : imgUrl === "" ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDw0NDQ8NDw0NDw0NDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAABAAIH/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOqIoAkgKSApEEkQWJEEigCJAIoAjiwGUUARQM1HAABQANCgEkASIIEAQUAIIIqEEkQRSBFIEUQGFEBiKAIoACgGBoAAVQZRAAFAA0zQSQAggCEgMMBgIgwCooQRSgFIgikCKhAJEAigZRQMo0AA0AAIAAgEKQASQJBAVEoCIIFIwEUQRRBEGAoUQSRAIoECsAIgAGmQCpAMoigBSACSAA0AgcAIpASCCIIEggSIYBMBApEFCkCKQBUoGUQABACilAyGqyAVIoAJUACAVSQApAYQYCIIEggSIQJEIEggSCCSIBJAARQCqVAUJAKDQABAAEUACAQKBIEDDBCCIMAkECRDAMMZagEwRAY0yQKSBJAEEgFSAIIAqEAQpAMogAkAVBoApICgYBIUBostAmmSDSBAwhASEDSCAhACEgQqFBBLQANACimgEEAQIBBIEUAJgQEpAYQdAoECQgaLJAllA0ggKCAgIECAQWigqEgFSAJBAElQQSBIoEgQKSAkIGiyQJZIEskCWToFBAUECQQEIAkhQWhAEkqASAJBARhAEEAUEBIQEggjAgaQQNIEEQgK0ICggOhACEAKCAJVAEkASQBFAgiAMSAVVICQgRSApIFSkChiQEJAoUgVSQIJAEkCCQIJAqEgSgQFBAYokD//2Q==" : imgUrl
      })
    }

    /** 회원가입 */
    postSignUp(city,email,nickname,password,tel){
        return axios.post(SERVER_PATH+"/api/users", {
                "city": city,
                "email": email,
                "introduce": "안녕하세요",
                "nickname": nickname,
                "password": password,
                "tel": tel
            })

    }
    /** 로그인 */
    postSignIn(email,password){
        return axios.post(SERVER_PATH+"/api/users/login",{
            "email": email,
            "password": password
        })
    }
}

export default new ParkingService();