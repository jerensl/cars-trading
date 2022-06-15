from fastapi import HTTPException
import motor.motor_asyncio
from typing import List, Optional, Union
from pydantic import BaseModel, Field
from bson.objectid import ObjectId as BsonObjectId

MONGO_DETAILS = "mongodb://root:secret@localhost:27017"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

db_brand = client.brands
db_car = client.cars

brands_collection = db_brand.get_collection("brands_collection")
cars_collection = db_car.get_collection("cars_collection")

def brands_helper(brands) -> dict:
    return {
        "id": str(brands["_id"]),
        "name": brands["name"],
        "logo": brands["logo"],
        "description": brands["description"],
        "cars": [],
    }

def cars_helper(cars) -> dict:
    return {
        "id": str(cars["_id"]),
        "model": cars["model"],
        "images": cars["images"],
        "description": cars["description"],
        "price": cars["price"]
    }

class CarsSchema(BaseModel):
    model: str = Field(min_length=3, max_length=25)
    images: str = Field(min_length=5, max_length=100, title="Logo url to an image")
    description: Union[str, None] = Field(
        default=None, title="The description of the brand", max_length=300
    )
    price: float = Field(gt=0)

    class Config:
        schema_extra = {
            "example": {
                "model": "BMW",
                "logo": "https://imgur.com/gallery/xxxx",
                "description": "The acronym BMW stands for Bayerische Motoren Werke GmbH, which roughly translates to the Bavarian Engine Works Company. The name harks back to the company's origin in the German state of Bavaria. It also indicates BMW's original product range: engines for various applications",
            }
        }

class UpdateCarsModel(BaseModel):
    model: Optional[str]
    images: Optional[str]
    description: Optional[str]
    price: Optional[float]

    class Config:
        schema_extra = {
            "example": {
                "model": "BMW",
                "images": "https://imgur.com/gallery/xxxx",
                "description": "The acronym BMW stands for Bayerische Motoren Werke GmbH, which roughly translates to the Bavarian Engine Works Company. The name harks back to the company's origin in the German state of Bavaria. It also indicates BMW's original product range: engines for various applications",
            }
        }


class BrandsSchema(BaseModel):
    name: str = Field(min_length=3, max_length=25)
    logo: str = Field(min_length=5, max_length=100, title="Logo url to an image")
    description: Union[str, None] = Field(
        default=None, title="The description of the brand", max_length=300
    )
    cars: List[CarsSchema] = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "name": "BMW",
                "logo": "https://imgur.com/gallery/xxxx",
                "description": "The acronym BMW stands for Bayerische Motoren Werke GmbH, which roughly translates to the Bavarian Engine Works Company. The name harks back to the company's origin in the German state of Bavaria. It also indicates BMW's original product range: engines for various applications",
            }
        }


class UpdateBrandsModel(BaseModel):
    name: Optional[str]
    logo: Optional[str]
    description: Optional[str]
    cars: Optional[list]

    class Config:
        schema_extra = {
            "example": {
                "name": "BMW",
                "logo": "https://imgur.com/gallery/xxxx",
                "description": "The acronym BMW stands for Bayerische Motoren Werke GmbH, which roughly translates to the Bavarian Engine Works Company. The name harks back to the company's origin in the German state of Bavaria. It also indicates BMW's original product range: engines for various applications",
            }
        }



def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}

