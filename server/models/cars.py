from .schema import cars_helper, cars_collection
from .brands import brands_collection ,insert_new_car_brand
from bson.objectid import ObjectId


# Add a new brand into to the database
async def add_car(id: str, car_data: dict) -> dict:
    car = await cars_collection.insert_one(car_data)
    new_car = await cars_collection.find_one({"_id": car.inserted_id})
    await insert_new_car_brand(id, new_car)
    return cars_helper(new_car)

async def retrieve_cars():
    cars = []
    async for car in cars_collection.find():
        newBrand = cars_helper(car)

        cars.append(newBrand)
    return cars