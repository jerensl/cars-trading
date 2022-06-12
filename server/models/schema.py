from fastapi import HTTPException
import motor.motor_asyncio
from typing import List, Optional, Union
from pydantic import BaseModel, Field
from bson.objectid import ObjectId as BsonObjectId

MONGO_DETAILS = "mongodb://root:secret@localhost:27017"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.brands

brands_collection = database.get_collection("brands_collection")

def brands_helper(brands) -> dict:
    return {
        "id": str(brands["_id"]),
        "name": brands["name"],
        "logo": brands["logo"],
        "description": brands["description"],
    }

class PydanticObjectId(BsonObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not isinstance(v, BsonObjectId):
            raise TypeError('ObjectId required')
        return str(v)

class CarMetadataSchema(BaseModel):
    carID: PydanticObjectId
    model: str
    price: float
    quantity: int

class BrandsSchema(BaseModel):
    name: str = Field(min_length=3, max_length=25)
    logo: str = Field(min_length=5, max_length=100, title="Logo url to an image")
    description: Union[str, None] = Field(
        default=None, title="The description of the brand", max_length=300
    )
    cars: Union[List[CarMetadataSchema], None]

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

    class Config:
        schema_extra = {
            "example": {
                "name": "BMW",
                "logo": "https://imgur.com/gallery/xxxx",
                "description": "The acronym BMW stands for Bayerische Motoren Werke GmbH, which roughly translates to the Bavarian Engine Works Company. The name harks back to the company's origin in the German state of Bavaria. It also indicates BMW's original product range: engines for various applications",
            }
        }

class CarSchema(BaseModel):
    model: str = Field(min_length=3, max_length=25)
    images: str = Field(min_length=5, max_length=100, title="Logo url to an image")
    description: Union[str, None] = Field(
        default=None, title="The description of the brand", max_length=300
    )

    class Config:
        schema_extra = {
            "example": {
                "model": "BMW",
                "logo": "https://imgur.com/gallery/xxxx",
                "description": "The acronym BMW stands for Bayerische Motoren Werke GmbH, which roughly translates to the Bavarian Engine Works Company. The name harks back to the company's origin in the German state of Bavaria. It also indicates BMW's original product range: engines for various applications",
            }
        }

class UpdateCarModel(BaseModel):
    model: Optional[str]
    images: Optional[str]
    description: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "model": "BMW",
                "images": "https://imgur.com/gallery/xxxx",
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


class BrandDatabase(): 
    def __init__(self): 
        try:
            self.conn = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
        except Exception as e:
            raise HTTPException(status_code=404, detail="Connection to database not found")
        