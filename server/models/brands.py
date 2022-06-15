from models.schema import brands_helper, brands_collection, cars_helper
from utils.decode import create_aliased_response
from bson.objectid import ObjectId

# get list of brand from database
# async def retrieve_brands():
#     brands = []
#     async for brand in brands_collection.find():
#         print(brand)
#         brands.append(brands_helper(brand))
#     return brands

# get list of brand from database
async def retrieve_brands():
    brands = []
    async for brand in brands_collection.find():
        newBrand = brands_helper(brand)
        
        if len(brand["cars"]) >= 1:
            for car in brand["cars"]:
                print(car)
                newBrand["cars"].append(cars_helper(car))

        brands.append(newBrand)
    return brands



# Add a new brand into to the database
async def add_brand(brand_data: dict) -> dict:
    brand = await brands_collection.insert_one(brand_data)
    new_brand = await brands_collection.find_one({"_id": brand.inserted_id})
    return brands_helper(new_brand)


# Retrieve a brand with a matching ID
async def retrieve_brand(id: str) -> dict:
    brand = await brands_collection.find_one({"_id": ObjectId(id)})
    if brand:
        return brands_helper(brand)


# Update a brand with a matching ID
async def update_brand(id: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    brand = await brands_collection.find_one({"_id": ObjectId(id)})
    if brand:
        updated_brand = await brands_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_brand:
            return True
        return False

# inser a car to brand with a matching ID
async def insert_new_car_brand(id: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    brand = await brands_collection.find_one({"_id": ObjectId(id)})
    if brand:
        updated_brand = await  brands_collection.update_one({"_id": ObjectId(id)},{"$push":{"cars":data}},upsert=True)
        if updated_brand:
            return True
        return False


# Delete a brand from the database
async def delete_brand(id: str):
    brand = await brands_collection.find_one({"_id": ObjectId(id)})
    if brand:
        await brands_collection.delete_one({"_id": ObjectId(id)})
        return True