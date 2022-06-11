import motor.motor_asyncio
from typing import Optional
from pydantic import BaseModel, Field


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

class BrandsSchema(BaseModel):
    name: str = Field(...)
    logo: str = Field(...)
    description: str = Field(...)

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


def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}