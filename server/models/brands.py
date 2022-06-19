import string
from .schema import brands_helper, brands_collection, cars_helper
from utils.decode import create_aliased_response
from bson.objectid import ObjectId
import re

async def retrieve_brands():
    brands = []
    async for brand in brands_collection.find():
        newBrand = brands_helper(brand)
        
        if len(brand["cars"]) >= 1:
            for car in brand["cars"]:
                newBrand["cars"].append(cars_helper(car))

        brands.append(newBrand)
    return brands



# Add a new brand into to the database
async def add_brand(brand_data: dict) -> dict:
    brand_exists = await brands_collection.find_one({"name": brand_data['name']})
    if brand_exists != None:
        return None

    brand = await brands_collection.insert_one(brand_data)
    new_brand = await brands_collection.find_one({"_id": brand.inserted_id})
    return brands_helper(new_brand)



# Retrieve a brand with a matching name
async def retrieve_brand(name: str) -> dict:
    brand = await brands_collection.find_one({"name": name})
    if brand == None:
        return
    newBrand = brands_helper(brand)
    if len(brand["cars"]) >= 1:
        for car in brand["cars"]:
            newBrand["cars"].append(cars_helper(car))
    return newBrand


# Retrieve a brand with a matching name
async def search_brand(name: str) -> dict:
    query = re.compile('.*'+name+'.*', re.IGNORECASE)
    brand = await brands_collection.find_one({"name": query})
    if brand == None:
        return
    newBrand = brands_helper(brand)
    if len(brand["cars"]) >= 1:
        for car in brand["cars"]:
            newBrand["cars"].append(cars_helper(car))
    return newBrand

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

# Update a brand with a matching ID
async def update_brand_image(id: str, img_url: string):
    # Return false if an empty strig url is sent.
    if img_url < "":
        return False
    brand = await brands_collection.find_one({"_id": ObjectId(id)})
    if brand:
        updated_brand = await brands_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": {
                "logo": img_url
            }}
        )
        print(update_brand)
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
        