import axios from "axios";

const proxyurl = "https://cors-anywhere.herokuapp.com/";

class FoodService {
  constructor() {
    this.service = axios.create({
      baseURL: `${proxyurl}https://xz94zfs6u8.execute-api.eu-west-1.amazonaws.com/default/myBakery`,
    });
  }

  newSpecial = () => {
    return this.service
      .get()
      .then(response => response.data)
      .catch(err => console.log(err));
  };

}


export default FoodService;
