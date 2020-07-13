import React from "react";
import Axios from "axios";
import { baseUrl } from "../config/BaseUrl";

class RegisterService {
  async register(fields) {
    let data = {};
    for (var k in fields) {
      if (fields.hasOwnProperty(k)) {
        data[k] = fields[k];
      }
    }
    console.log("data", data);
    try {
      let response = await Axios.post(baseUrl + "/register", data, {});
      return response;
      //   return null;
    } catch (error) {
      return error.response;
    }
  }

  async uniqueMobilePhone(value) {
    try {
      let response = await Axios.get(baseUrl + "/unique/mobile_no/" + value);
      return response;
      // return null;
    } catch (error) {
      return error.response;
    }
  }

  async uniqueEmail(value) {
    try {
      let response = await Axios.get(baseUrl + "/unique/email/" + value);
      return response;
      // return null;
    } catch (error) {
      return error.response;
    }
  }
}

export default RegisterService;
