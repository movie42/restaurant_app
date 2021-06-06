let restaurants;

export default class RestaurantsDAO {
  static async injectDB(connect) {
    if (restaurants) {
      return;
    }
    try {
      restaurants = await connect
        .db(process.env.RESTREVIE_NS)
        .collection("restaurants");
    } catch (e) {
      console.error(`Unable : ${e}`);
    }
  }

  static async getRestaurants({ filter = null, page = 0, pageItem = 50 } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $search: filters["zipcode"] } };
      }
    }
    let cursor;

    try {
      cursor = await restaurants.find(query);
    } catch (e) {
      console.error(`unable data ${e}`);
      return { restaurantsList: [], totalNumberRestaurant: 0 };
    }

    let displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();
      const totalNumberRestaurant = await restaurant.counterDocument(query);

      return { restaurantsList, totalNumberRestaurant };
    } catch (e) {
      console.error(`unable data ${e}`);
      return { restaurantsList: [], totalNumberRestaurant: 0 };
    }
  }
}
