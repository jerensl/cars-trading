from .schema import cars_helper, cars_collection
from .brands import brands_collection ,insert_new_car_brand
from bson.objectid import ObjectId


# Add a new car into to the database
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

async def update_car(id: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    car = await cars_collection.find_one({"_id": ObjectId(id)})
    if car:
        updated_car = await cars_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_car:
            return True
        return False

# Delete a car from the database
async def delete_car(id: str):
    car = await cars_collection.find_one({"_id": ObjectId(id)})
    if car:
        await cars_collection.delete_one({"_id": ObjectId(id)})
        return True
    return False