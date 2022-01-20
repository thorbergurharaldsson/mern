const apiConnection = async () => {
  let dataArr = [];
  try {
    const res = await fetch(
      "http://mernbackend.thorbergur.me:3450/api/contacts"
    );
    const data = await res.json();
    dataArr = data.data;
  } catch (error) {
    console.error("error fetching contacts: ", error);
  }
  return dataArr;
};

export default apiConnection();
