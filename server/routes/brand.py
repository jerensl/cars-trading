from fastapi import APIRouter, Body, status 
from fastapi.encoders import jsonable_encoder

from models.brands import (
    retrieve_brand, 
    add_brand,
    retrieve_brands,
    delete_brand,
    update_brand
)

from models.schema import (
    BrandsSchema,
    ErrorResponseModel,
    ResponseModel,
    UpdateBrandsModel
)

router = APIRouter(
    prefix="/brand",
    tags=['brand']
)

@router.post("/", status_code=status.HTTP_201_CREATED)
async def add_car_brand(brand: BrandsSchema = Body(...)):
    brand = jsonable_encoder(brand)
    new_brand = await add_brand(brand)
    return ResponseModel(new_brand, "Student added successfully.")

@router.get("/")
async def list_of_car_brand():
    brands = await retrieve_brands()
    if brands:
        return ResponseModel(brands, "brands data retrieved successfully")
    return ResponseModel(brands, "Empty list returned")

@router.get("/{brand}")
async def search_car_brand():
    return {"Brand": ["BMW", "Daihatsu", "Honda", "Mitsubishi"]}

@router.get("/detail/{brand}")
async def get_car_brand_detail():
    return {"Bramd": "BMW", "Description": "......",}


@router.patch("/")
async def update_car_brand():
    return {"Brand": ["BMW", "Daihatsu", "Honda", "Mitsubishi"]}

@router.delete("/")
async def delete_car_brand():
    return {"Brand": ["BMW", "Daihatsu", "Honda", "Mitsubishi"]}
