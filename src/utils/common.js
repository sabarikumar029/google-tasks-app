import moment from "moment/moment";
export const formatDate = (dateString, format = "DD MM YYYY") => {
    console.log(moment(dateString).format(format));
    return moment(dateString).format(format);
  };